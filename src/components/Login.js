import React, { useRef, useState } from 'react';
import { NETFLIX_BG } from '../utils/constants';
import { checkValidData } from '../utils/validate';
import Header from './Header';
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [isSignUpForm, setIsSignUpForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const emailID = useRef(null);
    const passwordID = useRef(null);
    const fullNameID = useRef(null);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleSubmitForm = () => {
        const message = checkValidData(emailID?.current?.value, passwordID?.current?.value, fullNameID?.current?.value, isSignUpForm);
        setErrorMessage(message);

        if (message) return; // If the error message is there, then the code will return from here.

        // Sign In or Sign Up Logic

        if (isSignUpForm) {
            createUserWithEmailAndPassword(auth, emailID?.current?.value, passwordID?.current?.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: fullNameID?.current?.value,
                        photoURL: "https://avatars.githubusercontent.com/u/30213899?v=4"
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                    }).catch((error) => {

                    });
                    console.log("User signed in with Email and Password: ", user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("Error occurred while signing up User.");
                    console.log(errorCode + " : " + errorMessage);
                    setErrorMessage(errorMessage);
                });
        } else {
            signInWithEmailAndPassword(auth, emailID?.current?.value, passwordID?.current?.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("User signed in with Email and Password: ", user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage);
                });
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (isSignUpForm) {
            if (name === 'email') {
                setEmail(value);
            } else if (name === 'password') {
                setPassword(value);
            } else if (name === 'confirmPassword') {
                setConfirmPassword(value);
            } else if (name === 'fullName') {
                setFullName(value);
            }
        } else {
            if (name === 'email') {
                setEmail(value);
            } else if (name === 'password') {
                setPassword(value);
            }
        }
    };

    const toggleSignUpForm = () => {
        setIsSignUpForm(!isSignUpForm);
    };

    return (
        <div>
            <Header />
            <div className="bg-cover h-screen flex justify-center items-center relative" style={{ backgroundImage: `url(${NETFLIX_BG})` }}>
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                <form className="bg-white opacity-80 p-8 rounded-lg relative z-10 w-full max-w-md" onSubmit={handleSubmit}>
                    <h2 className="text-xl font-medium text-gray-700 mb-4">{isSignUpForm ? 'Sign Up' : 'Sign In'}</h2>
                    <div className="mb-8">
                        {isSignUpForm && (
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    ref={fullNameID}
                                    type="text"
                                    className="block w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-sm outline-none"
                                // id="fullName" 
                                // name="fullName" 
                                // value={fullName} 
                                // onChange={handleChange} 
                                // required
                                />
                            </div>
                        )}
                        <label className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            ref={emailID}
                            type="email"
                            className="block w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-sm outline-none"
                        // id="email" 
                        // name="email" 
                        // value={email} 
                        // onChange={handleChange} 
                        // required
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            ref={passwordID}
                            type="password"
                            className="block w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-sm outline-none"
                        // id="password" 
                        // name="password" 
                        // value={password} 
                        // onChange={handleChange} 
                        // required
                        />
                        {<p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>}

                        <div className="mt-2 text-sm text-gray-500">
                            Password must contain:
                            <ul className="list-disc pl-5">
                                <li>At least 8 characters</li>
                                <li>At least one digit</li>
                                <li>At least one lowercase letter</li>
                                <li>At least one uppercase letter</li>
                            </ul>
                        </div>
                    </div>


                    <div className="flex justify-end">
                        <button
                            type="submit"
                            onClick={handleSubmitForm}
                            className="bg-red-700 block w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
                            {isSignUpForm ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                    <p className="py-4 cursor-pointer text-sm text-blue-500" onClick={toggleSignUpForm}>
                        {isSignUpForm ? 'Already have an account? Sign in' : 'New to Netflix? Sign up now'}
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
