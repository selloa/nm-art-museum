import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { audioManager } from '../utils/audioManager'
import './Hero.css'

const AUDIO_ID = 'hero-background'
const AUDIO_SRC = '/music/Tracy am Apparat.mp3'

function Hero() {
  const { t } = useTranslation()
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
        <h1 className="hero-title">{t('hero.title')}</h1>
        <p className="hero-subtitle">{t('hero.subtitle')}</p>
        <p className="hero-description">
          {t('hero.description')}
        </p>
        <p className="hero-description-secondary">
          {t('hero.descriptionSecondary')}
        </p>
      </div>
      <button 
        className="hero-music-button"
        onClick={handlePlayPause}
        aria-label={isPlaying ? t('hero.musicButton.stop') : t('hero.musicButton.play')}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <div className="hero-image-container">
        <img 
          src="/MainGameArt.png" 
          alt={t('hero.imageAlt')}
          className="hero-image"
        />
      </div>
    </section>
  )
}

export default Hero

