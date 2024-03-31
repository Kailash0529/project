import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Pokedex from './components/pokedex/Pokedex'
import { Link } from 'react-router-dom'
import CustomRoutes from './routes/CustomRoutes'


function App() {
  const [count, setCount] = useState(0)

  return (
  

  <div className='all'>
  <h1 className="pokedexheading"><Link to="/">Pokedex</Link></h1>

<CustomRoutes/>
  </div>
   
  )
}

export default App;
