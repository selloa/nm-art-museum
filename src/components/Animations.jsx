import React from 'react'
import { useTranslation } from 'react-i18next'
import './Animations.css'

function Animations() {
  const { t } = useTranslation()

  const animations = [
    { filename: 'attack.gif', id: 'attack' },
    { filename: 'custom.gif', id: 'custom' },
    { filename: 'host.gif', id: 'host' },
    { filename: 'sleep.gif', id: 'sleep' },
    { filename: 'walk.gif', id: 'walk' },
  ]

  return (
    <section className="animations" id="animations">
      <div className="section-header">
        <h2 className="section-title">{t('animations.title')}</h2>
        <p className="section-description">
          {t('animations.description')}
        </p>
      </div>
      <div className="animations-grid">
        {animations.map((animation, index) => (
          <div 
            key={animation.id} 
            className={`animation-card ${index < 2 ? 'animation-card-large' : 'animation-card-small'}`}
          >
            <div className="animation-image-container">
              <img 
                src={`/animations/${animation.filename}`}
                alt={t(`animations.list.${animation.id}.name`)}
                className="animation-image"
              />
            </div>
            <h3 className="animation-name">{t(`animations.list.${animation.id}.name`)}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Animations

