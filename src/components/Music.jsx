import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { audioManager } from '../utils/audioManager'
import './Music.css'

function Music() {
  const { t } = useTranslation()
  const [playingId, setPlayingId] = useState(null)

  const tracks = [
    { filename: 'Twilight.mp3', id: 'twilight' },
    { filename: 'Tracy am Apparat.mp3', id: 'tracy' },
    { filename: 'Labor bei Nacht.mp3', id: 'dungeon' },
  ]

  useEffect(() => {
    // Check which track is playing
    const checkPlaying = () => {
      for (const track of tracks) {
        if (audioManager.isPlaying(`music-${track.id}`)) {
          setPlayingId(track.id)
          return
        }
      }
      setPlayingId(null)
    }
    
    // Listen for audio changes
    const interval = setInterval(checkPlaying, 100)
    
    return () => clearInterval(interval)
  }, [tracks])

  const handlePlayPause = (trackId, filename) => {
    const audioId = `music-${trackId}`
    const audioSrc = `/music/${filename}`

    if (playingId === trackId) {
      audioManager.stop(audioId)
      setPlayingId(null)
    } else {
      audioManager.play(audioId, audioSrc, false, () => {
        setPlayingId(null)
      })
      setPlayingId(trackId)
    }
  }

  return (
    <section className="music" id="music">
      <div className="section-header">
        <h2 className="section-title">{t('music.title')}</h2>
        <p className="section-description">
          {t('music.description')}
        </p>
      </div>
      <div className="music-grid">
        {tracks.map((track) => (
          <div key={track.id} className="music-card">
            <div className="music-content">
              <button 
                className="play-button"
                onClick={() => handlePlayPause(track.id, track.filename)}
              >
                {playingId === track.id ? '⏸' : '▶'}
              </button>
              <div className="music-info">
                <div className="music-icon">♪</div>
                <h3 className="music-name">{t(`music.list.${track.id}.name`)}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Music

