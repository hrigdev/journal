import { useState, useEffect } from 'react';
import Journal_entry from './components/Journal_entry';
import Side_header from './components/Side_header';
import Prev_entry from './components/Prev_entry';
import { v4 as uuidv4 } from 'uuid';



import './App.css';


function App() {

  const [entries, setEntries]= useState([]);
  const [load, setLoad]= useState([]);
  const [input, setInput]= useState(0);
  function submit_entry(entry){

    if(entry.index==null){
      let saveTime= new Date().toString();
      entry.initial_date= saveTime;
      entry.index = uuidv4();
      setEntries(prevValue=>{
        return([
          ...prevValue,
          entry
        ])
      })
      
    }else{
      let s= new Date().toString();
      entry.update_date= s;
      setEntries(prevValue =>
        prevValue.map(e => (e.index === entry.index ? entry : e))
    );
    }
    setInput(0); // Reset input view after saving
    setLoad(entry); // Load the newly created/updated entry


    
    }

    useEffect(() => {
      console.log(entries);
    }, [entries]);
  

    function load_entry(index){
      console.log(entries[index]);
      setLoad(entries[index]);
      console.log(load)
      setInput(0); // Ensure the input state is set correctly when loading an entry

    }

  return (
    <>

  {input==0 && load && entries.length!==0?<Prev_entry submit_entry={submit_entry} load={load}/>:<Journal_entry save_entry={submit_entry} />}
    <Side_header list={entries} load_entry={load_entry} setInput={setInput}/>

    </>

  )
}

export default App;
