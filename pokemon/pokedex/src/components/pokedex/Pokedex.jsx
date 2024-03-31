import React from "react";
import Search from "../search/Search";
import './Pokedex.css'
import PokeList from "../pokeList/PokeList";
function Pokedex()
{
    return(
        <div className="wrapper"> 
        <Search/>
        <PokeList/>
        </div>
    )
}
export default Pokedex;