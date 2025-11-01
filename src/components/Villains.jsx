import React from 'react'
import './Villains.css'

function Villains() {
  const villains = [
    { 
      name: 'Dr. Fred Edison', 
      id: 'dr-fred',
      image: '/villains/fred.gif',
      description: 'Resident mad scientist controlled by the meteor. Wasn\'t such a bad guy before the meteor took over.'
    },
    { 
      name: 'Nurse Edna Edison', 
      id: 'edna',
      image: '/villains/edna.gif',
      description: 'One demented lady. The only Edison who will NEVER join your side. Avoid her at all costs.'
    },
    { 
      name: 'Weird Ed Edison', 
      id: 'weird-ed',
      image: '/villains/ed.gif',
      description: 'The military guru. The only sane person in the mansion. Just wants to get rid of the meteor and save his father.'
    },
    { 
      name: 'Dead Cousin Ted Edison', 
      id: 'ted',
      image: '/villains/ted.gif',
      description: 'Technically never interacted with since he\'s dead, but gets mentioned a lot throughout the mansion.'
    },
    { 
      name: 'Green Tentacle', 
      id: 'green-tentacle',
      image: '/villains/green.gif',
      description: 'Too depressed to care about intruders. Can be a useful ally, but manic-depressive and could turn violent quickly.'
    },
    { 
      name: 'Purple Tentacle', 
      id: 'purple-tentacle',
      image: '/villains/purple.gif',
      description: 'Guards the door to Dr. Fred\'s inner lab. Almost all of the kid\'s special skills are geared toward getting past this guy.'
    },
  ]

  return (
    <section className="villains" id="villains">
      <div className="section-header">
        <h2 className="section-title">Villains</h2>
        <p className="section-description">
          The antagonists of Night of the Meteor. Each villain presents unique challenges and dark designs.
        </p>
      </div>
      <div className="villains-grid">
        {villains.map((villain) => (
          <div key={villain.id} className="villain-card">
            <div className="villain-image-container">
              <img 
                src={villain.image} 
                alt={villain.name}
                className="villain-image"
              />
            </div>
            <h3 className="villain-name">{villain.name}</h3>
            <p className="villain-description">{villain.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Villains

