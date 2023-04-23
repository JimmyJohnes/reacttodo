import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [list, setList] = useState([]);

  const addItem = (item) =>
  {
    if(item!== "")
    {
      let nlist = []
      for(let item of list) nlist.push(item);
      nlist.push(item)
      setList(nlist)
      updateList(nlist)
    }
  }
  const removeItem = (index) =>
  {
    let nlist = []
    for(let item in list)
    {
      if(item==index) 
      {

      }
      else
      {
        nlist.push(list[item])
      }
    }
    setList(nlist)
    updateList(nlist)
  }
  const updateList = async (nlist) =>
  {
    const startingList = await fetch('http://localhost:3000/set', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(
      {
        "list": nlist
      })
    });
  }
  const getStartList = async () =>
  {
    const startingList = await fetch('http://localhost:3000');
    const result = await startingList.json();
    setList(result.list);
  }
  useEffect( ()=>{
    getStartList()
  },[]);
  return (
    <>
      <input type='text' placeholder='add to list' id='input'/>
      <button onClick={() => addItem(input.value)}>Add to List</button>
      <h1>Current List</h1>
      <ul>
        {list.map((item,index) => {
          return <li key={index+1} onClick={(e) => removeItem(index)}>{item}</li>
        })}
      </ul>
    </>
  )
}

export default App
