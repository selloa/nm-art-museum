import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Hero from './components/Hero'
import Villains from './components/Villains'
import Locations from './components/Locations'
import Characters from './components/Characters'
import Animations from './components/Animations'
import Music from './components/Music'
import LanguageSelector from './components/LanguageSelector'
import './App.css'

function App() {
  const { t } = useTranslation()
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

  // Disable right-click, text selection, and other interactions globally
  useEffect(() => {
    const isAllowedElement = (target) => {
      // Check if the click is on language selector or music buttons
      const allowedSelectors = [
        '.language-selector',
        '.language-select',
        '.play-button',
        '.hero-music-button',
        '.locations-music-button'
      ]
      
      // Check if the target or any parent matches allowed selectors
      for (const selector of allowedSelectors) {
        if (target.closest && target.closest(selector)) {
          return true
        }
      }
      
      // Also check if target itself matches
      if (target.matches) {
        return allowedSelectors.some(selector => target.matches(selector))
      }
      
      return false
    }

    const handleContextMenu = (e) => {
      // Always prevent right-click, even on allowed elements
      e.preventDefault()
      return false
    }

    const handleSelectStart = (e) => {
      if (!isAllowedElement(e.target)) {
        e.preventDefault()
        return false
      }
    }

    const handleDragStart = (e) => {
      if (!isAllowedElement(e.target)) {
        e.preventDefault()
        return false
      }
    }

    const handleCopy = (e) => {
      if (!isAllowedElement(e.target)) {
        e.preventDefault()
        return false
      }
    }

    const handleCut = (e) => {
      if (!isAllowedElement(e.target)) {
        e.preventDefault()
        return false
      }
    }

    const handleKeyDown = (e) => {
      // Disable common keyboard shortcuts for copy, select all, etc.
      if (!isAllowedElement(e.target)) {
        // Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A, Ctrl+S, Ctrl+P, F12, Ctrl+Shift+I, Ctrl+U
        if (
          (e.ctrlKey || e.metaKey) && (
            e.key === 'c' || 
            e.key === 'v' || 
            e.key === 'x' || 
            e.key === 'a' || 
            e.key === 's' || 
            e.key === 'p' ||
            e.key === 'u' ||
            (e.shiftKey && e.key === 'I')
          ) ||
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'J') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C')
        ) {
          e.preventDefault()
          return false
        }
      }
    }

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('dragstart', handleDragStart)
    document.addEventListener('copy', handleCopy)
    document.addEventListener('cut', handleCut)
    document.addEventListener('keydown', handleKeyDown)

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('dragstart', handleDragStart)
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('cut', handleCut)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="app">
      <LanguageSelector />
      <Hero />
      <Villains />
      <Locations />
      <Characters />
      <Animations />
      <Music />

      {/* Footer */}
      <footer className="app-footer">
        <p>{t('app.footer')}</p>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label={t('app.backToTop')}
        >
          ↑
        </button>
      )}
    </div>
  )
}

export default App

