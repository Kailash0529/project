import React, { useState } from "react";
import Search from "../search/Search";
import './Pokedex.css'
import PokeList from "../pokeList/PokeList";
import PokeDetails from "../pokeDetails/PokeDetails";
function Pokedex()
{
    const [searchT,setSearcht]=useState('');
    return(
        <div className="wrapper"> 
        <Search updateSearchT={setSearcht}/>
        {searchT}
        {/* <PokeList/> */}
        {(searchT.length==0)?<PokeList/>:<PokeDetails key={searchT} pokemonName={searchT}/>}
        </div>
    )
}
export default Pokedex;