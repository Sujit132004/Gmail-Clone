import React, { useEffect, useState } from 'react'
import Message from './Message'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { setEmails } from '../redux/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';

const Messages = () => {

    const dispatch=useDispatch();
    const {emails,searchText}=useSelector(store=>store.appSlice);
    const [tempEmail,setTempEmail]=useState(emails);

    useEffect(()=>{
        const q=query(collection(db,"emails"),orderBy('createdAt','desc'));
        const unsubscribe=onSnapshot(q,(snapshot)=>{
          const allEmails=snapshot.docs.map((doc)=>({...doc.data(), id:doc.id}));
          dispatch(setEmails(allEmails));
        })

        //clean up
        return ()=>unsubscribe();

    },[]);
    useEffect(()=>{
      const filteredEmail=emails?.filter((email)=> {
        return email ?.subject?.toLowerCase().includes(searchText.toLowerCase()) || 
                email ?.to?.toLowerCase().includes(searchText.toLowerCase())  ||
                email ?.message?.toLowerCase().includes(searchText.toLowerCase())
      })
      setTempEmail(filteredEmail)
    },[searchText,emails])
  return (
    <div>
      {
        tempEmail && tempEmail?.map((email)=><Message email={email}/>)
      }
    </div>
  )
}

export default Messages