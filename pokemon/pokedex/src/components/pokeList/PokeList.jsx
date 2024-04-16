import React, { useState } from "react";

import './PokeList.css'
import Pokemon from "../pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";
function PokeList()
{
    // const [isLoading,setIsLoading]=useState(true);
    // const [pokemonList,setPokemonList]=useState([]);
    // const [pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon/')
    // const [prevUrl,setPrevUrl]=useState('');
    // const [nextUrl,setNextUrl]=useState('');
//     const [pokemonListstate,setPokemonListState]=useState({
//         isLoading:true,
//         pokemonList:[],
//         pokedexUrl:'https://pokeapi.co/api/v2/pokemon/',
//         prevUrl:'',
//         nextUrl:''
//     });
//     async function download()
//     {
//         // setIsLoading(true);
//         setPokemonListState({...pokemonListstate,isLoading:true});
//         const response=await axios.get(pokemonListstate.pokedexUrl);
//         const pokeResults=response.data.results;
//         console.log(pokeResults);
//         const resultskeandar= pokeResults.map((poke)=>axios.get(poke.url));
//         const dataeksath=await axios.all(resultskeandar);
//         const res=dataeksath.map((poke)=>{
// const pokedata=poke.data;
// return{id:pokedata.id,name:pokedata.name,image:(pokedata.sprites.other) ? pokedata.sprites.other.dream_world.front_default:pokedata.sprites.front_shiny
// ,types:pokedata.types
// }
//         });
//         // console.log(res);
//         // setPokemonList(res);
//         setPokemonListState({...pokemonListstate,pokemonList:res,isLoading:false,prevUrl:response.data.previous,nextUrl:response.data.next});
//         // setIsLoading(false);
        
        

//         // setPrevUrl(response.data.previous);
//         // setPokemonListState({...pokemonListstate,prevUrl:response.data.previous,nextUrl:response.data.next});
        

//         // console.log(prevUrl,nextUrl);
//         // setNextUrl(response.data.next);
//     }
//     useEffect(()=>{
//         download();
//     },[pokemonListstate.pokedexUrl]);
const[pokemonListState,setPokemonListState]=usePokemonList(false);
return(
   <div className="pokemon-list-wrapper"> 
   <div className="pokemon-wrapper">
    {(pokemonListState.isLoading )? 'loading':pokemonListState.pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)}
    </div>
    <div className="controls">
        <button disabled={pokemonListState.prevUrl==null} onClick={()=>setPokemonListState({...pokemonListState,pokedexUrl:pokemonListState.prevUrl})}>prev</button>
        <button disabled={pokemonListState.nextUrl==null} onClick={()=>setPokemonListState({...pokemonListState,pokedexUrl:pokemonListState.nextUrl})}>next</button>
    </div>
    </div>
)
}
export default PokeList;