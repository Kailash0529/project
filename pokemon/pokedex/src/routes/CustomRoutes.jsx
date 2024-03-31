import { Routes,Route } from "react-router-dom";
import Pokedex from "../components/pokedex/Pokedex";
import PokeDetails from "../components/pokeDetails/PokeDetails";
function CustomRoutes()
{
return(
    <Routes>
    <Route path="/" element={<Pokedex/>}/>
<Route path="/pokemon/:id" element={<PokeDetails/>}/>
    
</Routes>
)
}
export default CustomRoutes;