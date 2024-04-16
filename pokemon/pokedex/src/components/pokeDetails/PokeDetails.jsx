import {  useParams } from "react-router-dom";
import './PokemonDetails.css'

import usePokemonDetails from "../../hooks/usePokemonDetails.js";
function PokeDetails({pokemonName})

{
    // const [details,setDetails]=useState({});
    // const[isLoading,setIsloading]=useState(true);
    const {id}=useParams(); 
    // console.log({id});
    const[details]=usePokemonDetails(id,pokemonName);

return(
    <div className="pokemon-details-wrapper">
        <img src={details.image} alt="" className="image"/>

        <div className="name">
            {details.name}
        </div>
        <div className="height">height:{details.height}</div>
        <div className="weight">weight:{details.weight}</div>
        <div className="types">
         {details.types&&details.types.map((t)=><div key={t}>{t}</div>)}
        </div>
        {
            details.types&&details.similarPokemons&&
            <div className="pokemon-details-wrapper">
                <h2 className="types">more {details.types[0]} type pokemons </h2>
                <ul>
                    {details.similarPokemons.map((p)=><li className="more" key={p.pokemon.url}>{p.pokemon.name}</li>)}
                </ul>
            </div>
        }
       
    </div>
)
}
export default PokeDetails;