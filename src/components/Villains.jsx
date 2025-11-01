import React from 'react'
import { useTranslation } from 'react-i18next'
import './Villains.css'

function Villains() {
  const { t } = useTranslation()
  const villains = [
    { id: 'dr-fred', image: '/villains/fred.gif' },
    { id: 'edna', image: '/villains/edna.gif' },
    { id: 'weird-ed', image: '/villains/ed.gif' },
    { id: 'ted', image: '/villains/ted.gif' },
    { id: 'green-tentacle', image: '/villains/green.gif' },
    { id: 'purple-tentacle', image: '/villains/purple.gif' },
  ]

  return (
    <section className="villains" id="villains">
      <div className="section-header">
        <h2 className="section-title">{t('villains.title')}</h2>
        <p className="section-description">
          {t('villains.description')}
        </p>
      </div>
      <div className="villains-grid">
        {villains.map((villain) => (
          <div key={villain.id} className="villain-card">
            <div className="villain-image-container">
              <img 
                src={villain.image} 
                alt={t(`villains.list.${villain.id}.name`)}
                className="villain-image"
              />
            </div>
            <h3 className="villain-name">{t(`villains.list.${villain.id}.name`)}</h3>
            <p className="villain-description">{t(`villains.list.${villain.id}.description`)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Villains

