import React from "react";
import Journal_name from "./Journal_name"

function Side_header(props){

    function change(){
        props.setInput(1)
    }
    return(
        <>
            <nav className="navbar">
        
                <div className="name">
                    Keeper
                </div>
                
                <button onClick={(change)}>new</button>
                <div className="header-slider">
                {props.list.map((entry,index)=>{
                                   return( <Journal_name key={index} index={index} title={entry.title} load_entry={props.load_entry} setInput={props.setInput} initial_date={entry.initial_date} />
)
                })}
                
                </div>
            </nav>

        </>

    )
}

export default Side_header;