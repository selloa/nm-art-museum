import React, { useState, useEffect } from 'react'
import { audioManager } from '../utils/audioManager'
import './Locations.css'

const AUDIO_ID = 'locations-background'
const AUDIO_SRC = '/music/Labor bei Nacht.mp3'

function Locations() {
  const [isPlaying, setIsPlaying] = useState(false)

  const locations = [
    { name: 'Mansion Entrance', id: 'loc1', image: '/locations/Mansion Entrance.png' },
    { name: 'Labratory', id: 'loc2', image: '/locations/Labratory.png' },
    { name: 'Basement', id: 'loc3', image: '/locations/Basement.png' },
    { name: 'Attic', id: 'loc4', image: '/locations/Attic.png' },
    { name: 'Library', id: 'loc5', image: '/locations/Library.png' },
    { name: 'Kitchen', id: 'loc6', image: '/locations/Kitchen.png' },
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
    <section className="locations" id="locations">
      <button 
        className="locations-music-button"
        onClick={handlePlayPause}
        aria-label={isPlaying ? 'Stop background music' : 'Play background music'}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <div className="section-header">
        <h2 className="section-title">Locations</h2>
        <p className="section-description">
          Explore the detailed pixel art environments. Each location is crafted with care to create an immersive adventure.
        </p>
      </div>
      <div className="locations-grid">
        {locations.map((location) => (
          <div key={location.id} className="location-card">
            <div className="location-image-container">
              {location.image ? (
                <img 
                  src={location.image} 
                  alt={location.name}
                  className="location-image"
                />
              ) : (
                <div className="location-image-placeholder">
                  <span className="placeholder-label">Background</span>
                  <span className="placeholder-dimensions">640x400</span>
                </div>
              )}
            </div>
            <h3 className="location-name">{location.name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Locations

