import React, { useEffect } from 'react';
import { NETFLIX_LOGO, NETFLIX_USER } from '../utils/constants';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice'
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleGptSearchClick = () => {
    // Toggle the GPT Search
    dispatch(toggleGptSearchView());
  };
    
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
     
        <img
            className='w-48'
            src={NETFLIX_LOGO}
            alt='logo'/>

        { user && 
          <div className='flex items-center'>
            {/* Search Bar */}
            <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
            
            {/* User Icon */}
            <div className='w-12 h-12 flex items-center justify-center rounded-full overflow-hidden'>
              <img
                className='w-full h-full object-cover'
                alt='userIcon'
                src={NETFLIX_USER}
              />
            </div>
            
            {/* Sign Out Button */}
            <button onClick={handleSignOut} className='ml-4 font-bold text-white'>Sign Out</button>
          </div>
        }

    </div>
  );
}

export default Header;
