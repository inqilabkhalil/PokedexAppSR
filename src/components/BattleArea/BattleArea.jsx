import React from 'react';
import Pokedeck from '../Pokedeck/Pokedeck';
import './BattleArea.css';

const pokemonData = [
  { "id": 4, "name": "Charmander", "type": "fire", "base_experience": 62 },
  { "id": 7, "name": "Squirtle", "type": "water", "base_experience": 63 },
  { "id": 11, "name": "Metapod", "type": "bug", "base_experience": 72 },
  { "id": 12, "name": "Butterfree", "type": "flying", "base_experience": 178 },
  { "id": 25, "name": "Pikachu", "type": "electric", "base_experience": 112 },
  { "id": 39, "name": "Jigglypuff", "type": "normal", "base_experience": 95 },
  { "id": 94, "name": "Gengar", "type": "poison", "base_experience": 225 },
  { "id": 133, "name": "Eevee", "type": "normal", "base_experience": 65 }
];

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

let t1 = [];
let t2 = [];
let exp1 = 0;
let exp2 = 0;

try {
  const shuffled = shuffleArray(pokemonData);

  const promises = shuffled.map(p => 
    fetch(`https://pokeapi.co/api/v2/pokemon/${p.id}`)
      .then(res => res.json())
      .then(data => ({
        ...p,
        img: data.sprites?.other?.['official-artwork']?.front_default || p.img
      }))
  );

  const formattedPokemon = await Promise.all(promises);

  t1 = formattedPokemon.slice(0, 4);
  t2 = formattedPokemon.slice(4, 8);

  exp1 = t1.reduce((acc, curr) => acc + curr.base_experience, 0);
  exp2 = t2.reduce((acc, curr) => acc + curr.base_experience, 0);
} catch (error) {
  console.error("Failed to fetch pokemon images", error);
  const shuffled = shuffleArray(pokemonData);
  t1 = shuffled.slice(0, 4);
  t2 = shuffled.slice(4, 8);
  exp1 = t1.reduce((acc, curr) => acc + curr.base_experience, 0);
  exp2 = t2.reduce((acc, curr) => acc + curr.base_experience, 0);
}

const BattleArea = () => {
  const handlePlayAgain = () => {
    window.location.reload();
  };

  return (
    <div className="BattleArea">
      {t1.length > 0 ? (
        <>
          <Pokedeck pokemon={t1} exp={exp1} isWinner={exp1 > exp2} />
          <div className="BattleArea-vs">
            <h1>VS</h1>
            <button className="BattleArea-btn" onClick={handlePlayAgain}>Play Again</button>
          </div>
          <Pokedeck pokemon={t2} exp={exp2} isWinner={exp2 > exp1} />
        </>
      ) : (
        <h2>Pokemon yüklənə bilmədi. Xahiş edirəm səhifəni yeniləyin!</h2>
      )}
    </div>
  );
};

export default BattleArea;
