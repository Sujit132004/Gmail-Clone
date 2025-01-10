import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import GoogleButton from 'react-google-button';
import { auth, provider } from '../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/appSlice';

const Login = () => {
    const dispatch=useDispatch();
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      dispatch(setUser(
        {
           displayName:result.user.displayName,
           email:result.user.email,
           photoURL:result.user.photoURL, 
        }
      ))

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="p-8 bg-white flex flex-col gap-6 rounded-2xl shadow-2xl w-96">
        <h1 className="text-center text-2xl font-semibold text-gray-800">Welcome Back!</h1>
        <p className="text-center text-gray-600">Sign in to continue to your account</p>
        <div className='flex justify-center'>
             <GoogleButton  onClick={signInWithGoogle} />
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="block w-full border-b border-gray-300"></span>
          
          <span className="block w-full border-b border-gray-300"></span>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
