import React, { useState } from "react";
import './Search.css'
import useDebounce from "../../hooks/useDebounce";
function Search(updateSearchT)
{
  const debouncedCallback=useDebounce((e)=>updateSearchT.updateSearchT(e.target.value))
return(
   <div className="search-wrapper">
     <input id="pokemon-name-search" type= "text" placeholder="pokemon name..." onChange={(e)=>debouncedCallback(e,'123')}/>
   </div>
  
);
}
export default Search;