import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList()
{
    const [pokemonListState,setPokemonListState]=useState({
        isLoading:true,
        pokemonList:[],
        pokedexUrl:'https://pokeapi.co/api/v2/pokemon/',
        prevUrl:'',
        nextUrl:'',
        
    });
    async function download()
    {
        // setIsLoading(true);
      
       
            setPokemonListState((state)=>({...state,isLoading:true}));
            const response=await axios.get(pokemonListState.pokedexUrl);
            const pokeResults=response.data.results;
            console.log(pokeResults);
            setPokemonListState((state)=>({
    ...state,
    nextUrl:response.data.next,
    prevUrl:response.data.previous
            }));
        const resultskeandar= pokeResults.map((poke)=>axios.get(poke.url));
        const dataeksath=await axios.all(resultskeandar);
        const res=dataeksath.map((poke)=>{
const pokedata=poke.data;
return{id:pokedata.id,name:pokedata.name,image:(pokedata.sprites.other) ? pokedata.sprites.other.dream_world.front_default:pokedata.sprites.front_shiny
,types:pokedata.types
}
        });
        // console.log(res);
        // setPokemonList(res);
        setPokemonListState((pokemonListState)=>({...pokemonListState,pokemonList:res,isLoading:false}));

        // setIsLoading(false);
        // setPrevUrl(response.data.previous);
        // setPokemonListState({...pokemonListstate,prevUrl:response.data.previous,nextUrl:response.data.next});
        // console.log(prevUrl,nextUrl);
        // setNextUrl(response.data.next);
    
}
    useEffect(()=>{
        download();
    },[pokemonListState.pokedexUrl]);
    return[ pokemonListState,setPokemonListState];
}
export default usePokemonList;