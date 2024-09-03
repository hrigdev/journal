import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CheckIcon from '@mui/icons-material/Check';
import Prev_entry from "./Prev_entry";

function Journal_entry(props) {
  const [checkent, setChecksetent] = useState(false);
  const [isEditing, setEditing] = useState(true);
  const [entry, setEntry] = useState({
    index: null,
    title: "",
    content: "",
    initial_date: "",
    update_date: "",
  });

  function validateEntry(title, content) {
    if (title.trim().length > 0 && content.trim().length > 0) {
      setChecksetent(true);
    } else {
      setChecksetent(false);
    }
  }

  function submit_entry(event) {
    event.preventDefault();
    props.save_entry(entry);
    props.setInput(0);
    setEditing(false);
  }

  function input_entry(event) {
    const { name, value } = event.target;
    setEntry((prevValue) => {
      const updatedEntry = { ...prevValue, [name]: value };
      validateEntry(updatedEntry.title, updatedEntry.content);
      return updatedEntry;
    });
  }

  function handleContentChange(value) {
    setEntry((prevValue) => {
      const updatedEntry = { ...prevValue, content: value };
      validateEntry(updatedEntry.title, updatedEntry.content);
      return updatedEntry;
    });
  }

  return (
    <>
      {isEditing ? (
        <div>
          <form className="journal_entry" onSubmit={submit_entry}>
            <input
              value={entry.title}
              className="title"
              name="title"
              placeholder="Title"
              type="text"
              onChange={input_entry}
              autoFocus
            />
            <ReactQuill
              placeholder="Content..."
              theme="snow"
              value={entry.content}
              onChange={handleContentChange}
            />
            <button className={checkent ? "done" : "notdone"} type="submit" disabled={!checkent}>
              <CheckIcon />
            </button>
          </form>
        </div>
      ) : (
        <Prev_entry submit_entry={props.submit_entry} setInput={props.setInput} load={entry} />
      )}
    </>
  );
}

export default Journal_entry;