import './Pokemon.css'
function Pokemon({name,image})
{
    console.log(name,image);
return(
    <div className="pokemon">
        <div className="pokemon-name">{name}</div>
        <div><img src={image} className="pokemon-image"/></div>
    </div>
)
}
export default Pokemon;