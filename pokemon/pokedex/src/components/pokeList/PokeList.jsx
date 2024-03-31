import React, { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
import './PokeList.css'
import Pokemon from "../pokemon/Pokemon";
function PokeList()
{
    const [isLoading,setIsLoading]=useState(true);
    const [pokemonList,setPokemonList]=useState([]);
    const [pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon/')
    const [prevUrl,setPrevUrl]=useState('');
    const [nextUrl,setNextUrl]=useState('');
    async function download()
    {
        setIsLoading(true);
        const response=await axios.get(pokedexUrl);
        const pokeResults=response.data.results;
        const resultskeandar= pokeResults.map((poke)=>axios.get(poke.url));
        const dataeksath=await axios.all(resultskeandar);
        const res=dataeksath.map((poke)=>{
const pokedata=poke.data;
return{id:pokedata.id,name:pokedata.name,image:(pokedata.sprites.other) ? pokedata.sprites.other.dream_world.front_default:pokedata.sprites.front_shiny
,types:pokedata.types
}
        });
        // console.log(res);
        setPokemonList(res);
        setIsLoading(false);
        setPrevUrl(response.data.previous);
        setNextUrl(response.data.next);
    }
    useEffect(()=>{
        download();
    },[pokedexUrl]);
return(
   <div className="pokemon-list-wrapper"> 
   <div className="pokemon-wrapper">
    {(isLoading )? 'loading':pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)}
    </div>
    <div className="controls">
        <button disabled={prevUrl==null} onClick={()=>setPokedexUrl(prevUrl)}>prev</button>
        <button disabled={nextUrl==null} onClick={()=>setPokedexUrl(nextUrl)}>next</button>
    </div>
    </div>
)
}
export default PokeList;