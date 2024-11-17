import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Axios from 'axios'

function App() {
  const [foodName, setFoodName]=useState("");
  const [days,setDays]=useState();
  const [newFoodName, setNewFoodName]=useState("");
  const [foodList, setFoodList]= useState([]);

  useEffect(()=>{
    Axios.get("http://localhost:3003/read").then((response=>{
      setFoodList(response.data);
    }))

  },[foodList]);

  const addToList = ()=>{
    Axios.post("http://localhost:3003/insert",{
      foodName: foodName,
      days: days,
    })
  }

  const updateFood = (id)=>{

    Axios.put("http://localhost:3003/update",{
      id: id,
      newFoodName:newFoodName,
    })
  }

  const deleteFood= (id)=>{
    Axios.delete(`http://localhost:3003/delete/${id}`,{
      id:id,
      
    })
  }
  return (
    <>
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <label>Food Name</label>
      <input type="text" onChange={(e)=>setFoodName(e.target.value)} />
      <label>Days</label>
      <input type="number" onChange={(e)=>setDays(e.target.value)} />
      <button onClick={addToList}>Add to List</button>

      <h1>foodList</h1>
      {
        foodList.map((val,key)=>{
          return(
            <div className="food" key={key}>
              <h1>{val.foodName}</h1>
              <h1>{val.daysSinceiAte}</h1>{""}
              <input type="text"
              placeholder='new food name...'
              onChange={(e)=>setNewFoodName(e.target.value)} />
              <button onClick={()=>updateFood(val._id)}>Update</button>
              <button onClick={()=>deleteFood(val._id)}>Delete</button>
            </div>
          )
      })
      }
    </div>
      
    </>
  )
}

export default App
