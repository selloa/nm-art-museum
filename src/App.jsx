import React, { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Villains from './components/Villains'
import Locations from './components/Locations'
import Characters from './components/Characters'
import Animations from './components/Animations'
import Music from './components/Music'
import './App.css'

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setShowBackToTop(scrollTop > 300) // Show button after scrolling 300px
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="app">
      <Hero />
      <Villains />
      <Locations />
      <Characters />
      <Animations />
      <Music />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  )
}

export default App

