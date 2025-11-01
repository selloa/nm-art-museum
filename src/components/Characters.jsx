import React from 'react'
import './Characters.css'

function Characters() {
  const characters = [
    { 
      name: 'Dave', 
      id: 'dave',
      image: '/characters/dave.gif',
      description: 'The hero, you have to use this guy. No special skills, but great soundtrack.'
    },
    { 
      name: 'Bernard', 
      id: 'bernard',
      image: '/characters/bernard.gif',
      description: 'The resident geek. Can fix the radio to call the meteor police and repair the telephone.'
    },
    { 
      name: 'Syd', 
      id: 'syd',
      image: '/characters/syd.gif',
      description: 'The cool musician with awesome shades. Master of the piano.'
    },
    { 
      name: 'Razor', 
      id: 'razor',
      image: '/characters/razor.gif',
      description: 'The punk rocker. Great piano player. The same as Syd in every respect but gender.'
    },
    { 
      name: 'Michael', 
      id: 'michael',
      image: '/characters/michael.gif',
      description: 'The photographer who can develop film. The only one who can get Weird Ed to help you out.'
    },
    { 
      name: 'Wendy', 
      id: 'wendy',
      image: '/characters/wendy.gif',
      description: 'The writer who wants to be a famous novelist. Can edit bad manuscripts with typewriters.'
    },
    { 
      name: 'Jeff', 
      id: 'jeff',
      image: '/characters/jeff.gif',
      description: 'Beach bum whose only ambition is to live in a van by the sea. Can fix the phone.'
    },
  ]

  return (
    <section className="characters" id="characters">
      <div className="section-header">
        <h2 className="section-title">Characters</h2>
        <p className="section-description">
          Meet the cast of Night of the Meteor. Each character brings unique abilities and personality to the adventure.
        </p>
      </div>
      <div className="characters-grid">
        {characters.map((char) => (
          <div key={char.id} className="character-card">
            <div className="character-image-container">
              <img 
                src={char.image} 
                alt={char.name}
                className="character-image"
              />
            </div>
            <h3 className="character-name">{char.name}</h3>
            <p className="character-description">{char.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Characters

