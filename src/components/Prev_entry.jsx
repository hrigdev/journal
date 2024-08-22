import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { convertHtmlToMarkdown } from './TurndownService'; // Adjust the import path
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
function Prev_entry(props) {
    const [markdownContent, setMarkdownContent] = useState('');
    const [isEditing, setIsEditing] = useState(false); // To toggle between read and edit mode
    const [content, setContent] = useState('');
    const [showUd, setShow]= useState(true);

    useEffect(() => {
        if (props.load.content) {
            const markdown = convertHtmlToMarkdown(props.load.content);
            setMarkdownContent(markdown);
            setContent(props.load.content); // Initialize the content state
        }
    }, [props.load.content]);

    const handleContentChange = (newContent) => {
        setContent(newContent);
      
    };

    function finalChange() {
        // Ensure the original index is preserved during the update
        let updatedEntry = {
            index: props.load.index, // Preserve the original index
            title: props.load.title,
            initial_date: props.load.initial_date,
            content: content
        };
        console.log(updatedEntry);
        const markdown = convertHtmlToMarkdown(content);
        setMarkdownContent(markdown)
        props.submit_entry(updatedEntry); // Pass the updated entry with the original index
        handleToggleEdit();
    }queueMicrotask

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };


    function showUpdates(){

        setShow(!showUd);
    }

    function checker(){
        if(props.load.update_date.length< 10){
            console.log("what")
            return true;
        }
        else{
            console.log("what")

            return false;
        }
    }

    return (
        <div className="journal_entry">
            <h1 contentEditable={false} className="title">{props.load.title}</h1>
            <div>
                <i>Created on: {props.load.initial_date.slice(0, 21)}</i>
                <span hidden={props.load.update_date.length< 10?true:false}>
                    <button onClick={showUpdates} style={{all:"unset", position:"relative", top:"2px", left:"4px",   cursor:"pointer"}}>{showUd?<SubdirectoryArrowLeftIcon fontSize="sm"/>: <ArrowDownwardIcon fontSize="sm"/>}</button>
            
                </span>
            </div>
                 <i hidden={showUd}>Last Updated on: {props.load.update_date.slice(0, 21)} </i>

            <i></i>
            {isEditing ? (
                <>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={handleContentChange}
                    />
                    <button onClick={finalChange}>Save</button>
                </>
            ) : (
                <div className="content">
                    <ReactMarkdown>
                        {markdownContent}
                    </ReactMarkdown>
                    <button onClick={handleToggleEdit}>Edit</button>
                </div>
            )}
        </div>
    );
}

export default Prev_entry;
