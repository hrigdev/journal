import React from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
function Journal_name(props) {
  
  function finder(event) {
    props.load_entry(event.target.name);
    console.log(event.target.name);
    props.setInput(0);
    console.log(props.name);

  }

  function delete_journal(){
    props.delete_(props.del);
    
  }
  

  return (
    <div className="main-header">
    <button className={`button-header ${props.name}`} name={props.index} onClick={finder}>
      <div className="date-card">
        <div style={{ fontSize: "15px" }}>{props.initial_date.slice(0, 4)}</div>
        <div style={{ fontSize: "25px" }}>{props.initial_date.slice(8, 10)}</div>
      </div>
      <div className="name-card">{props.title.slice(0,14)}{props.title.length>15?"....": " "}</div>
      </button>
      <div className="del">
      <button onClick={delete_journal} ><DeleteOutlineIcon/></button>
      </div>
      </div>

  );
}

export default Journal_name;


