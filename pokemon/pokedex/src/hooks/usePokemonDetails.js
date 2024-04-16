// import  axios from "axios";
// import { useEffect, useState } from "react";
// import usePokemonList from "./usePokemonList";

// function usePokemonDetails(id)
// {
//     // let pokemonListHookResponse=[];
//     const [details,setDetails]=useState({});


//     async function download()
//     {
//         const response=await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
//         console.log(response.data);
//         setDetails({
//             name:response.data.name,
//             image:response.data.sprites.other.dream_world.front_default,
//             height:response.data.height,
//             weight:response.data.weight,
//             types:response.data.types.map((t)=>t.type.name)

//         });
//         // setIsloading(false);
//        setPokemonListState({...pokemonListstate,url:`https://pokeapi.co/api/v2/type/${details.types?details.types[0]:'fire'}`});
//     }
//     const[pokemonListstate,setPokemonListState]=usePokemonList(true);


//     useEffect(()=>{
//         download();
//     },[])
//     return[details,pokemonListstate];
// }
// export default usePokemonDetails;
import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";


function usePokemonDetails(id,pokemonName) {
    const [details, setDetails] = useState({});

    async function download() {
        let response;
        if(pokemonName)
        {
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        }
        else{
         response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        }
        const pokemonOfSameTypes=await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types?response.data.types[0].type.name:''}`)
        setDetails({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            height: response.data.height,
            weight: response.data.weight,
            types: response.data.types.map((t) => t.type.name), 
            similarPokemons:pokemonOfSameTypes.data.pokemon.slice(0,5)
        });
       setPokemonListState({...pokemonListState,type:response.data.types?response.data.types[0].type.name:''});

    }
    const [pokemonListState, setPokemonListState] = usePokemonList();


    useEffect(() => {
        download();
    }, []);

    // useEffect(() => {
    //     if (details.types && details.types.length > 0) {
    //         setPokemonListState({
    //             ...pokemonListState,
    //             pokedexUrl: `https://pokeapi.co/api/v2/type/${details.types[0]}`
    //         });

    //     }
    // }, [details, setPokemonListState]);

    return [details];
}

export default usePokemonDetails;
