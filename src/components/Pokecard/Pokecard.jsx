import React from 'react';
import './Pokecard.css';
import { padId } from '../../utils/helpers';

const Pokecard = ({ id, name, type, exp, img, delay = 0 }) => {
  const imgSrc = img || `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padId(id)}.png`;
  return (
    <div className="Pokecard" style={{animationDelay: `${delay}s`}}>
      <h3 className="Pokecard-title">{name}</h3>
      <div className="Pokecard-image">
        <img src={imgSrc} alt={name} />
      </div>
      <div className="Pokecard-data">TYPE: <span>{type}</span></div>
      <div className="Pokecard-data">EXP: <span>{exp}</span></div>
    </div>
  );
};

export default Pokecard;
