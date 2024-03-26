import React, { useEffect } from 'react';
import { NETFLIX_LOGO, NETFLIX_USER } from '../utils/constants';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice'

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
    });
  }

  // useEffect(() => {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         const { uid, email, displayName, photoURL } = user;
  //         dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
  //         navigate("/browse");
  //       } else {
  //         dispatch(removeUser());
  //         navigate("/");
  //       }
  //     });
  //   },[]);
    
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
    <div className='fixed top-0 left-0 w-screen px-8 py-2 bg-gradient-to-b from-black flex justify-between'>
        <img
            className='w-48'
            src={NETFLIX_LOGO}
            alt='logo'/>

        { user && 
          <div className='flex items-center'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full overflow-hidden'>
              <img
                className='w-full h-full object-cover'
                alt='userIcon'
                src={user?.photoURL}/>
            </div>
            
            <button onClick={handleSignOut} className='ml-4 font-bold text-white'>Sign Out</button>
          </div>
        }
    </div>
  );
}

export default Header;
