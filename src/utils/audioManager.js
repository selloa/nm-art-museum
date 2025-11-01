// Global audio manager to ensure only one audio plays at a time

class AudioManager {
  constructor() {
    this.audioInstances = new Map() // Map of id -> audio element
    this.currentPlayingId = null
  }

  play(id, audioSrc, loop = false, onEnded = null) {
    // Stop any currently playing audio
    if (this.currentPlayingId && this.currentPlayingId !== id) {
      this.stop(this.currentPlayingId)
    }

    // If same audio is already playing, stop it
    if (this.currentPlayingId === id && this.isPlaying(id)) {
      this.stop(id)
      return
    }

    // Get or create audio instance
    let audio = this.audioInstances.get(id)
    if (!audio) {
      audio = new Audio(audioSrc)
      audio.loop = loop
      if (onEnded) {
        audio.onended = () => {
          this.currentPlayingId = null
          onEnded()
        }
      } else {
        audio.onended = () => {
          this.currentPlayingId = null
        }
      }
      this.audioInstances.set(id, audio)
    }

    // Set loop
    audio.loop = loop

    // Play audio
    audio.play().catch(err => {
      console.error('Error playing audio:', err)
    })

    this.currentPlayingId = id
  }

  stop(id) {
    const audio = this.audioInstances.get(id)
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      if (this.currentPlayingId === id) {
        this.currentPlayingId = null
      }
    }
  }

  isPlaying(id) {
    return this.currentPlayingId === id && 
           this.audioInstances.has(id) && 
           !this.audioInstances.get(id).paused
  }

  stopAll() {
    this.audioInstances.forEach((audio) => {
      audio.pause()
      audio.currentTime = 0
    })
    this.currentPlayingId = null
  }
}

export const audioManager = new AudioManager()

