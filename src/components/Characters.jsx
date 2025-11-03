import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { audioManager } from '../utils/audioManager'
import './Characters.css'

const AUDIO_ID = 'animations-background'
const AUDIO_SRC = '/music/Twilight.mp3'

function Characters() {
  const { t } = useTranslation()
  const [isPlaying, setIsPlaying] = useState(false)
  
  const characters = [
    { id: 'dave', image: '/characters/dave.gif' },
    { id: 'bernard', image: '/characters/bernard.gif' },
    { id: 'syd', image: '/characters/syd.gif' },
    { id: 'razor', image: '/characters/razor.gif' },
    { id: 'michael', image: '/characters/michael.gif' },
    { id: 'wendy', image: '/characters/wendy.gif' },
    { id: 'jeff', image: '/characters/jeff.gif' },
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
    <section className="characters" id="characters">
      <button 
        className="characters-music-button"
        onClick={handlePlayPause}
        aria-label={isPlaying ? t('animations.musicButton.stop') : t('animations.musicButton.play')}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <div className="section-header">
        <h2 className="section-title">{t('characters.title')}</h2>
        <p className="section-description">
          {t('characters.description')}
        </p>
      </div>
      <div className="characters-grid">
        {characters.map((char) => (
          <div key={char.id} className="character-card">
            <div className="character-image-container">
              <img 
                src={char.image} 
                alt={t(`characters.list.${char.id}.name`)}
                className="character-image"
              />
            </div>
            <h3 className="character-name">{t(`characters.list.${char.id}.name`)}</h3>
            <p className="character-description">{t(`characters.list.${char.id}.description`)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Characters

