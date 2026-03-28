import React from 'react';
import Pokedeck from '../Pokedeck/Pokedeck';
import './BattleArea.css';

const pokemonData = [
  { id: 4, name: "Charmander", type: "fire", base_experience: 62 },
  { id: 7, name: "Squirtle", type: "water", base_experience: 63 },
  { id: 11, name: "Metapod", type: "bug", base_experience: 72 },
  { id: 12, name: "Butterfree", type: "flying", base_experience: 178 },
  { id: 25, name: "Pikachu", type: "electric", base_experience: 112 },
  { id: 39, name: "Jigglypuff", type: "normal", base_experience: 95 },
  { id: 94, name: "Gengar", type: "poison", base_experience: 225 },
  { id: 133, name: "Eevee", type: "normal", base_experience: 65 }
];

let team1 = [...pokemonData];
let team2 = [];

while (team2.length < 4) {
  let randomIndex = Math.floor(Math.random() * team1.length);

  let selected = team1[randomIndex];

  // team2-ye elave et
  team2.push(selected);

  // team1-den sil (spread ile yeni array)
  team1 = [
    ...team1.slice(0, randomIndex),
    ...team1.slice(randomIndex + 1)
  ];
}

let exp1 = team1.reduce((sum, p) => sum + p.base_experience, 0);
let exp2 = team2.reduce((sum, p) => sum + p.base_experience, 0);

const BattleArea = () => {
  return (
    <div className="BattleArea">
      <Pokedeck pokemon={team1} exp={exp1} isWinner={exp1 > exp2} />

      <div className="BattleArea-vs">
        <h1>VS</h1>
      </div>

      <Pokedeck pokemon={team2} exp={exp2} isWinner={exp2 > exp1} />
    </div>
  );
};

export default BattleArea;