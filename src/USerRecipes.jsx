import "./App.css";
import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined  } from '@ant-design/icons';

import Navbar from "./Navbar";
import { signOut } from "firebase/auth";
import { getFirestore, deleteDoc, doc, collection, addDoc, getDocs, where, query as fireQuery } from "firebase/firestore";

const { Meta } = Card;
const db = getFirestore();

function App() {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("pizza");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRecipes(localStorage.getItem("uid"))
        //getRecipes(UserDetails.get());
    }, []);

    const Delete = async (id) => {
        const documentRef = doc(db, 'rescipes', id);
        deleteDoc(documentRef)
            .then(() => {
                console.log('Document successfully deleted!');
            })
            .catch((error) => {
                console.error('Error deleting document:', error);
            });
        getRecipes(localStorage.getItem("uid"))
    }

    const getRecipes = async (user) => {
        try {
            const recipesRef = collection(db, "rescipes"); // Assuming "recipes" is the name of your Firestore collection

            // Create a query with the "where" clause
            const q = fireQuery(recipesRef, where("uid", "==", user)); // Replace "cuisineType" and "italian" with your desired field and value

            const querySnapshot = await getDocs(q);
            const recipesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setRecipes(recipesData);
            setError(null);
        } catch (error) {
            console.log(error)
            setError(error.message);
        }
    };

    // with the on change, everytime the input changes run update search
    const updateSearch = (e) => {
        setSearch(e.target.value); //search will be updated to the value written in input box
        console.log(search);
    };

    const getSearch = (e) => {
        e.preventDefault(); //stop the page from refreshing and reseting the state
        setQuery(search);
    };

    return (
        <div style={{ width: "98vw" }} className="w-full flex flex-col items-center justify-center gap-4 px-4 md:w-11/12 md:px-6 lg:w-10/12 lg:px-8 xl:w-8/12 xl:px-10">
            <Navbar />
            <h4 style={{color:"black" , fontWeight:500}}> Your Recipes</h4>
            <div className="recipes grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {recipes &&
                    recipes.map((recipe, index) => (
                        <Recipe
                            onClick={() => Delete(recipe.id)}
                            id={recipe.id}
                            type={recipe.cuisineType}
                            key={index}
                            title={recipe.title}
                            calories={recipe.calories}
                            image={recipe.image}
                            ingredients={recipe.ingredients}
                        />
                    ))}
            </div>
        </div>
    );
}

export default App;



function Recipe({ id, title, image, type, calories, ingredients , onClick }) {
    console.log({ title, image, type, calories, ingredients })
    return (
        <Card
            style={{
                width: 300
            }}
            cover={<img alt="example" src={image} />}
            actions={[
                <DeleteOutlined  key="setting" onClick={onClick} />,
            ]}
        >
            <Meta title={title} description={type} />
            <h2>{type}</h2>
            <p>{String(ingredients)}</p>
        </Card>
    );
}
