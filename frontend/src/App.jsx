import { useState } from 'react'
import './App.css'
import Player from './components/Player'
import { PlayerProvider } from './components/usePlayer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <PlayerProvider>
        <h1>[Group name 🤘 replace me in App.jsx] </h1>
        <Player />
      </PlayerProvider>
    </div>
  )
}

export default App
