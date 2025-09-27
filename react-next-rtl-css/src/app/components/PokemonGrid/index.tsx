"use client";
import * as React from 'react';
import PokemonCard from './PokemonCard';
import styles from './index.module.css';

const PokemonGrid: React.FC = () => {

    const [pokemon, setPokemon] = React.useState<PokemonResult[]>([]);
    const [offset, setOffset] = React.useState(0);

    React.useEffect(() => {
        // Fetch and display Pokémon data here
        const fetchData = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=25&offset=${offset}`);
            const data = await response.json();
            setPokemon((d) => [...d, ...data?.results]);
        };
        fetchData();
    }, [offset]);

    React.useEffect(() => {
        const handleScroll = () => {
                const { scrollTop, scrollHeight, clientHeight } = window.document.documentElement;
                // Check if user has scrolled to within 200px of the bottom
                if (scrollTop + clientHeight >= scrollHeight - 800) {
                    setOffset(offset + 25);
                }
        };

            window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pokemon]);

    return (
        <div className={styles.grid}>
            {pokemon.map((poke) => (
                <PokemonCard key={poke.name} name={poke.name} url={poke.url} />
            ))}
        </div>
    );
};

export default PokemonGrid;