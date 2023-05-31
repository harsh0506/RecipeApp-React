import React from 'react';
import { useNavigate } from "react-router-dom";
import { app } from './FirebaseConfig';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app)

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your email and password")
      setError("Please enter your email and password");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      alert("Please enter a password with at least 6 characters");
      setError("Please enter a password with at least 6 characters");
      return;
    }

    const data = await signInWithEmailAndPassword(auth, email, password)
    navigate("/")
    console.log(data)
  };

  const SIWG = async () => {
    try {
      alert("the code is wriiten but it is under testing")
      /*
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      const userData = {
        userId: user.user.uid,
        userEmail: user.user.email,
        userName: user.user.displayName,
        userImage: user.user.photoURL
      }

      return userData
      */
    } catch (error) {
      setError(error)
    }

  };

  return (
    <>
      <div style={{ width: "98vw" }} class=" App min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div
          class="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1"
        >
          <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">

            <div class="mt-12 flex flex-col items-center">
              <h1 class="text-2xl xl:text-3xl font-extrabold">
               Login
              </h1>
              <div class="w-full flex-1 mt-8">

                <div class="mx-auto max-w-xs">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="name"
                    placeholder="Enter a email"
                  />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="Email"
                    placeholder="Enter your password"
                  />
                  <button
                    onClick={handleLogin}
                    class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <svg
                      class="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span class="ml-3">
                      start Typing
                    </span>
                  </button>
                  <h2>Not a member , <a href="/Signup">Sign Up</a></h2>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/notes-5bb98.appspot.com/o/Privacy%20policy-rafiki.png?alt=media&token=6fb6a5ea-a9df-4ac0-bcf7-962b02adba52&_gl=1*1igs98v*_ga*MTAxNTUzMTQ0LjE2NzEwNjkyOTU.*_ga_CW55HF8NVT*MTY4NTU0ODgzNy40Ni4xLjE2ODU1NDg5MjQuMC4wLjA.')" }}
            ></div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Login;