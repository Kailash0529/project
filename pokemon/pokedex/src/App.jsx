import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Pokedex from './components/pokedex/Pokedex'


function App() {
  const [count, setCount] = useState(0)

  return (
  <>
  <Pokedex/>
   </>
  )
}

export default App;