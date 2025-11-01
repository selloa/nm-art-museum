import React, { useState, useEffect } from 'react'
import { audioManager } from '../utils/audioManager'
import './Animations.css'

const AUDIO_ID = 'animations-background'
const AUDIO_SRC = '/music/Twilight.mp3'

function Animations() {
  const [isPlaying, setIsPlaying] = useState(false)

  const animations = [
    { filename: 'attack.gif', id: 'attack', name: 'Attack Animation' },
    { filename: 'custom.gif', id: 'custom', name: 'Custom Character Animation' },
    { filename: 'host.gif', id: 'host', name: 'New Character Animation' },
    { filename: 'sleep.gif', id: 'sleep', name: 'Cutscene Animation' },
    { filename: 'walk.gif', id: 'walk', name: 'Walk Cycle' },
  ]

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
    <section className="animations" id="animations">
      <button 
        className="animations-music-button"
        onClick={handlePlayPause}
        aria-label={isPlaying ? 'Stop background music' : 'Play background music'}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <div className="section-header">
        <h2 className="section-title">Animations</h2>
        <p className="section-description">
          Pixel-perfect animated GIFs showcasing the game's dynamic moments and character movements.
        </p>
      </div>
      <div className="animations-grid">
        {animations.map((animation, index) => (
          <div 
            key={animation.id} 
            className={`animation-card ${index < 2 ? 'animation-card-large' : 'animation-card-small'}`}
          >
            <div className="animation-image-container">
              <div className="gif-badge">GIF</div>
              <img 
                src={`/animations/${animation.filename}`}
                alt={animation.name}
                className="animation-image"
              />
            </div>
            <h3 className="animation-name">{animation.name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Animations

