import { useState, useEffect } from "react";
import Journal_entry from "./components/Journal_entry";
import Side_header from "./components/Side_header";
import Prev_entry from "./components/Prev_entry";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./App.css";

function App() {
  const [entries, setEntries] = useState([]);
  const [load, setLoad] = useState(null);
  const [input, setInput] = useState(0);

  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3000/");
      setEntries(response.data);
      console.log('Data fetched:', response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log('Attempting to fetch data...');
    fetchAPI();
  }, []);

  async function submit_entry(entry) {
    if (entry.index == null) {
      entry.index = uuidv4();
      let saveTime = new Date().toString();
      entry.initial_date = saveTime;
      setEntries((prevValue) => [...prevValue, entry]);
      try {
        await axios.post("http://localhost:3000/journal_entry", entry);
      } catch (error) {
        console.log("Error saving entry:", error);
      }
    } else {
      let s = new Date().toString();
      entry.update_date = s;
      setEntries((prevValue) =>
        prevValue.map((e) => (e.index === entry.index ? entry : e))
      
      );
      await axios.patch(await axios.patch(`http://localhost:3000/update_journal/${entry.index}`, entry)    );

    }
    setInput(0);
    setLoad(entry);
  }

  function load_entry(index) {
    setLoad(entries[index]);
    setInput(0);
  }

  

  return (
    <>
      {entries.length > 0 ? (
        input === 0 && load ? (
          <Prev_entry submit_entry={submit_entry} load={load} />
        ) : (
          <Journal_entry save_entry={submit_entry} />
        )
      ) : (
          <Journal_entry save_entry={submit_entry} />
      )}
      <Side_header
        load={load}
        list={entries}
        load_entry={load_entry}
        setInput={setInput}
        i={load?.index}
      />
    </>
  );
}

export default App;