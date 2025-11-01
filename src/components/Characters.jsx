import React from 'react'
import { useTranslation } from 'react-i18next'
import './Characters.css'

function Characters() {
  const { t } = useTranslation()
  const characters = [
    { id: 'dave', image: '/characters/dave.gif' },
    { id: 'bernard', image: '/characters/bernard.gif' },
    { id: 'syd', image: '/characters/syd.gif' },
    { id: 'razor', image: '/characters/razor.gif' },
    { id: 'michael', image: '/characters/michael.gif' },
    { id: 'wendy', image: '/characters/wendy.gif' },
    { id: 'jeff', image: '/characters/jeff.gif' },
  ]

  return (
    <section className="characters" id="characters">
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

