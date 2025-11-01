import React, { useState, useEffect } from 'react'
import { audioManager } from '../utils/audioManager'
import './Hero.css'

const AUDIO_ID = 'hero-background'
const AUDIO_SRC = '/music/Tracy am Apparat.mp3'

function Hero() {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Check if this audio is playing when component mounts or updates
    const checkPlaying = () => {
      setIsPlaying(audioManager.isPlaying(AUDIO_ID))
    }
    
    // Listen for audio changes
    const interval = setInterval(checkPlaying, 100)
    
    return () => clearInterval(interval)
  }, [])

  const handlePlayPause = () => {
    if (isPlaying) {
      audioManager.stop(AUDIO_ID)
      setIsPlaying(false)
    } else {
      audioManager.play(AUDIO_ID, AUDIO_SRC, true, () => {
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Night of the Meteor</h1>
        <p className="hero-subtitle">A Maniac Mansion Fan Remake</p>
        <p className="hero-description">
          Welcome to the mansion of the Edison's. 20 years ago, a large meteor crash-landed in the Edison's front yard. 
          The meteor was in fact the infamous Murderous Purple Slimy Meteor, the terror of the galaxy! Using Dr. Fred as its tool, 
          the meteor has begun swiping teenagers to suck their brains out. The newest kidnap involves Dave's girlfriend Sandy the cheerleader. 
          Not one to take things lightly, Dave enlists the help of friends and goes into the mansion to find Sandy.
        </p>
        <p className="hero-description-secondary">
          Welcome artists! Explore the pixel art universe we're building.
          Scroll down to discover characters, villains, locations, animations, and music.
        </p>
      </div>
      <button 
        className="hero-music-button"
        onClick={handlePlayPause}
        aria-label={isPlaying ? 'Stop background music' : 'Play background music'}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <div className="hero-image-container">
        <img 
          src="/MainGameArt.png" 
          alt="Night of the Meteor - Main Game Art"
          className="hero-image"
        />
      </div>
    </section>
  )
}

export default Hero

