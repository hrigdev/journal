import React from "react";

function Journal_name(props){

    function finder(event){
        props.load_entry(event.target.name)     
        props.setInput(0)
        console.log(props)
    }

    return(
        <button name={props.index} onClick={finder}>
        {props.title}
        <br />
        {props.initial_date.slice(0,10)}
        </button>

    )
}


export default Journal_name;