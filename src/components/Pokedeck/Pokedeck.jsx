import React from 'react';
import Pokecard from '../Pokecard/Pokecard';
import './Pokedeck.css';

const Pokedeck = ({ pokemon, exp, isWinner }) => {
  let title;
  if (isWinner) {
    title = <h2 className="Pokedeck-winner">Winner</h2>;
  } else {
    // Top team doesn't have a specific title in reference image usually, or maybe "Loser". We will just render nothing, or "Loser" if needed.
    // In reference image, Top team just has EXP. Bottom team has "Winner" and EXP. 
    // We'll leave it empty unless it's a winner to match screenshot layout perfectly.
    // Actually the reference shows top team has score, bottom team has Winner + score. 
  }

  return (
    <div className="Pokedeck-container">
      {title}
      <h2 className="Pokedeck-exp">{exp}</h2>
      <div className="Pokedeck-cards">
        {pokemon.map((p, idx) => (
          <Pokecard 
            key={`${p.id}-${idx}`} 
            id={p.id} 
            name={p.name} 
            type={p.type} 
            exp={p.base_experience} 
            img={p.img}
            delay={idx * 0.15}
          />
        ))}
      </div>
    </div>
  );
};

export default Pokedeck;
