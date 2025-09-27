"use client";
import * as React from 'react';
import PokemonCard from './PokemonCard';
import styles from './index.module.css';

const PokemonGrid: React.FC = () => {

    const [pokemon, setPokemon] = React.useState<PokemonResult[]>([]);

    React.useEffect(() => {
        // Fetch and display Pokémon data here
        const fetchData = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
            const data = await response.json();
            setPokemon(data?.results);
        };
        fetchData();
    }, []);

    return (
        <div className={styles.grid}>
            {pokemon.map((poke) => (
                <PokemonCard key={poke.name} name={poke.name} url={poke.url} />
            ))}
        </div>
    );
};

export default PokemonGrid;