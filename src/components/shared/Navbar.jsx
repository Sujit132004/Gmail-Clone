import React, { useEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io';
import { CiCircleQuestion } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiDotsNineBold } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, setUser } from '../../redux/appSlice';
import { AnimatePresence } from 'framer-motion';
import { motion } from "framer-motion";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
const Navbar = () => {

    const [input, setInput] = useState("");
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const signOutHandler=()=>{
        signOut(auth).then(()=>{
            dispatch(setUser(null));
        }).catch((err)=>console.log(err));
    }
    useEffect(() => {
        dispatch(setSearchText(input));
    }, [input]);  //jab jab ye input change hoga ...tab tab use Effect call hoga aur searchText mai enter ki hui value aa jayegi 
    const { user } = useSelector(store => store.appSlice);

    return (
        <div className='flex items-center justify-between mx-3 h-16 '>
            <div className='flex items-center gap-10'>
                <div className='flex items-center gap-2'>
                    <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer '>
                        <RxHamburgerMenu size={"24px"} />
                    </div>
                    <img src='https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png' alt='gmail-logo' className='w-8' />
                    <h1 className='text-2xl text-gray-500 font-medium '>Gmail</h1>
                </div>
            </div>
            <div className='md:block hidden w-[50%] mr-60' >
                <div className='flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full'>
                    <IoIosSearch size={"24px"} className='text-gray-700' />
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}


                        type="text" placeholder='Search Mail'
                        className='rounded-full w-full bg-transparent outline-none px-1'
                    />
                </div>
            </div>
            <div className='md:block hidden '>
                <div className='flex items-center gap-2 '>
                    <div className='p-3 rounded-full hover:bg-gray-300 cursor-pointer'>
                        <CiCircleQuestion size={"20px"} />
                    </div>
                    <div className='p-3 rounded-full hover:bg-gray-300 cursor-pointer'>
                        <CiSettings size={"20px"} />
                    </div>
                    <div className='p-3 rounded-full hover:bg-gray-300 cursor-pointer'>
                        <PiDotsNineBold size={"20px"} />
                    </div>
                    <div className=' relative cursor-pointer '>
                        <Avatar onClick={() => setToggle(!toggle)} src={user.photoURL} size='40' round={true} />
                        <AnimatePresence>
                            {
                                toggle && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.1 }}
                                        className='absolute right-2 z-20 shadow-lg bg-white rounded-md'
                                    >
                                        <p  onClick={signOutHandler} className='p=2 underline '>Logout</p>

                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar