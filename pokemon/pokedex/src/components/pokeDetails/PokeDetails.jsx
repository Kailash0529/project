import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'
function PokeDetails()

{
    const [details,setDetails]=useState({});
    const {id}=useParams(); 
    // console.log({id});
    async function download()
    {
        const response=await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response.data);
        setDetails({
            name:response.data.name,
            image:response.data.sprites.other.dream_world.front_default,
            height:response.data.height,
            weight:response.data.weight,
            types:response.data.types.map((t)=>t.type.name)

        })
    }
    useEffect(()=>{
        download();
    },[]) 

return(
    <div className="pokemon-details-wrapper">
        <img src={details.image} alt="" className="image"/>

        <div className="name">
            {details.name}
        </div>
        <div className="height">height:{details.height}</div>
        <div className="weight">weight:{details.weight}</div>
        <div className="types">
            {details.types}
        </div>
    </div>
)
}
export default PokeDetails;