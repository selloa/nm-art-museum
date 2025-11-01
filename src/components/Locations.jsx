import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { audioManager } from '../utils/audioManager'
import './Locations.css'

const AUDIO_ID = 'locations-background'
const AUDIO_SRC = '/music/Labor bei Nacht.mp3'

function Locations() {
  const { t } = useTranslation()
  const [isPlaying, setIsPlaying] = useState(false)

  const locations = [
    { id: 'loc1', image: '/locations/Mansion Entrance.png' },
    { id: 'loc2', image: '/locations/Labratory.png' },
    { id: 'loc3', image: '/locations/Basement.png' },
    { id: 'loc4', image: '/locations/Attic.png' },
    { id: 'loc5', image: '/locations/Library.png' },
    { id: 'loc6', image: '/locations/Kitchen.png' },
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
        aria-label={isPlaying ? t('locations.musicButton.stop') : t('locations.musicButton.play')}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <div className="section-header">
        <h2 className="section-title">{t('locations.title')}</h2>
        <p className="section-description">
          {t('locations.description')}
        </p>
      </div>
      <div className="locations-grid">
        {locations.map((location) => (
          <div key={location.id} className="location-card">
            <div className="location-image-container">
              {location.image ? (
                <img 
                  src={location.image} 
                  alt={t(`locations.list.${location.id}.name`)}
                  className="location-image"
                />
              ) : (
                <div className="location-image-placeholder">
                  <span className="placeholder-label">{t('locations.placeholder.label')}</span>
                  <span className="placeholder-dimensions">{t('locations.placeholder.dimensions')}</span>
                </div>
              )}
            </div>
            <h3 className="location-name">{t(`locations.list.${location.id}.name`)}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Locations

