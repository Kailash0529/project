import { useState } from "react";

function Todo({todoData,isFinished,changeFinished,onDelete,onEdit})
{
    const[finished,setFinished]=useState(isFinished);
    const[isEditting,setIseditting]=useState(false);
    const[editText,setEditText]=useState(todoData);
return(
<div>
<input type="checkbox" checked={finished} onChange={(e)=>{
    setFinished(e.target.checked)
    changeFinished(e.target.checked);
    
    }}/>

{(isEditting)?<input type="text" value={editText} onChange={e=>setEditText(e.target.value)}/>: <span>{todoData}</span>}
<button onClick={()=>{
    setIseditting(!isEditting);
    onEdit(editText);
}}>{(!isEditting)?'Edit':'save'}</button>
<button onClick={onDelete}>Delete</button>
</div>
);
}
export default Todo;