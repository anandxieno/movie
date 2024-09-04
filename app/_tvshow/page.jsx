'use client'
import React, { useState } from 'react'
import Header from '../components/Header'
import { addUser } from '../redux/slice'
import { useDispatch , useSelector } from 'react-redux'

const TvShow = () => {
 
  let[userList, setUserList] = useState(0)

  let dispatch = useDispatch();

  const addRedux = () =>{
    setUserList(userList+ 1);
    dispatch(addUser(userList))
  }

  const todoData=useSelector((data)=>data.usersData.users);


  return (
    <>
    <Header/>
    <div>
        <div className="grid grid-cols-12 gap-4 mt-20">
               <div className="col-span-4">

               </div>
               <div className="col-span-8">
                 <h2>Welcome to tv shows</h2>
                 <button onClick={addRedux} >Start button</button>
               </div>


               {
                 todoData.length && todoData.map((item)=>(
                  <h6 key={item.id} >{item.name}</h6>
              ))
               }
        </div>
    </div>
    </>
    
  )
}

export default TvShow
