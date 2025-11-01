import React, { useState, useEffect } from 'react'
import { audioManager } from '../utils/audioManager'
import './Music.css'

function Music() {
  const [playingId, setPlayingId] = useState(null)

  const tracks = [
    { filename: 'Twilight.mp3', id: 'twilight', name: 'Twilight' },
    { filename: 'Tracy am Apparat.mp3', id: 'tracy', name: 'Tracy' },
    { filename: 'Labor bei Nacht.mp3', id: 'dungeon', name: 'Dungeon' },
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
        <h2 className="section-title">Music</h2>
        <p className="section-description">
          The soundtrack that sets the mood for Night of the Meteor. Each track enhances the pixel art adventure.
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
                <h3 className="music-name">{track.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Music

