import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Journal_entry(props){
    const [entryvalue, setentryValue] = useState('');

    const [entry,setEntry]= useState({index:null , title:"", content:"", initial_date:"", update_date:""});
    


    function submit_entry(event){
        event.preventDefault();
        console.log(entry);

        setEntry(prevValue=>{
            return(
                {   
                    ...prevValue,
                }
            )
        })
        props.save_entry(entry);
    }

    function input_entry(event){
        const {name, value}= event.target;
        setEntry(prevValue=>{
            return(
                {...prevValue,
                    [name]: value
                }
            )
        })

        console.log(entryvalue)
    }

    function handleContentChange(value) {
        setEntry(prevValue => ({
            ...prevValue,
            content: value
        }));
    }

    
    return(
        <>
            <form className="journal_entry" onSubmit={submit_entry}>
            <input value={entry.title}className="title" name="title" placeholder="Title" type="text" onChange={input_entry}></input>
            <ReactQuill
                    theme="snow"
                    value={entry.content}
                    onChange={handleContentChange}

                />
            <button type="submit">Done</button>
            </form>
        </>
    )
}   



export default Journal_entry;