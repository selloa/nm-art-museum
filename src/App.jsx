import React from 'react'
import Hero from './components/Hero'
import Villains from './components/Villains'
import Locations from './components/Locations'
import Characters from './components/Characters'
import Animations from './components/Animations'
import Music from './components/Music'
import './App.css'

function App() {
  return (
    <div className="app">
      <Hero />
      <Villains />
      <Locations />
      <Characters />
      <Animations />
      <Music />
    </div>
  )
}

export default App

