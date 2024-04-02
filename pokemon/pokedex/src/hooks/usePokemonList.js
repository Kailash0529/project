import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(url)
{
    const [pokemonListstate,setPokemonListState]=useState({
        isLoading:true,
        pokemonList:[],
        pokedexUrl:url,
        prevUrl:'',
        nextUrl:''
    });

    async function download()
    {
        // setIsLoading(true);
        setPokemonListState({...pokemonListstate,isLoading:true});
        const response=await axios.get(pokemonListstate.pokedexUrl);
        const pokeResults=response.data.results;
        console.log(pokeResults);
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
        setPokemonListState({...pokemonListstate,pokemonList:res,isLoading:false,prevUrl:response.data.previous,nextUrl:response.data.next});
        // setIsLoading(false);
        
        

        // setPrevUrl(response.data.previous);
        // setPokemonListState({...pokemonListstate,prevUrl:response.data.previous,nextUrl:response.data.next});
        

        // console.log(prevUrl,nextUrl);
        // setNextUrl(response.data.next);
    }
    useEffect(()=>{
        download();
    },[pokemonListstate.pokedexUrl]);
    return{ pokemonListstate,setPokemonListState};
}
export default usePokemonList;