import "./App.css";
import React, { useState, useEffect } from "react";
import { Card } from "antd";
import axios from "axios";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Auth/FirebaseConfig'
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { CheckOutlined } from '@ant-design/icons';
import { getFirestore, collection, addDoc } from "firebase/firestore";



const { Meta } = Card;
const db = getFirestore();

const saveUserDetails = async (uid, title, image, type, calories, ingredients) => {
    const userRef = collection(db, "rescipes"); // Assuming "users" is the collection name in Firestore
    const newUserDoc = {
        uid,
        title, image, type, calories, ingredients
    };
    await addDoc(userRef, newUserDoc);
    console.log("recipe added")
};

function App() {
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("pizza");
    const [error, setError] = useState(null);

    const [user, setUser] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u)
                localStorage.setItem('uid', u.uid);
            }
            else { navigate("/Login"); }
        })
        getRecipes();
    }, [query]);

    const getRecipes = async () => {
        try {
            const response = await axios.get(
                `https://api.edamam.com/search?q=${query}&app_id=${import.meta.env.VITE_APPID}&app_key=${import.meta.env.VITE_APPKEY}`
            );
            console.log(response)

            const data = await response.data;
            setRecipes(data.hits);

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
        <div style={{ width: "98vw" }} className="bg-gray-300 w-full flex flex-col items-center justify-center gap-4 px-4 md:w-11/12 md:px-6 lg:w-10/12 lg:px-8 xl:w-8/12 xl:px-10">
            <Navbar user={user} />
            <h4 style={{color:"black"}}> {user && user.email} SEARCH FOR A RECIPE OF YOUR CHOICE</h4>

            <form onSubmit={getSearch} className="search-form">

                <div class="sm:col-span-4">
                    <div style={{display:"flex"}} class="mt-2">
                        <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input style={{ width: "25vw" }} value={search}
                                onChange={updateSearch} type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Search Recipe" />
                        </div>
                        <button style={{background:"black"}} className="search-button" type="submit">
                            Search
                        </button>
                    </div>
                </div>

            </form>
            <div className="recipes grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {recipes &&
                    recipes.map((recipe, index) => (
                        <Recipe
                            uid={localStorage.getItem("uid")}
                            type={recipe.recipe.cuisineType}
                            key={index}
                            title={recipe.recipe.label}
                            calories={recipe.recipe.calories}
                            image={recipe.recipe.image}
                            ingredients={recipe.recipe.ingredientLines}
                        /> // for each item in recipe get RECIPE COMPONENT and set data values
                    ))}
            </div>
        </div>
    );
}

export default App;

function Recipe({ uid, title, image, type, calories, ingredients }) {
    const saveRecipeDetails = () => {
        if (uid) {
            saveUserDetails(uid, title, image, type, calories, ingredients);
        } else {
            // Handle the case when uid is undefined
            console.log('User is not authenticated.');
        }
    }
    return (
        <Card
            style={{
                width: 300,background:"gray", color:"white"
            }}
            cover={<img alt="example" src={image} />}
            actions={[
                <CheckOutlined  key="setting" onClick={saveRecipeDetails} />,
            ]}
        >
            <Meta style={{color:"white"}} title={title} description={type} />
        </Card>
    );
}
