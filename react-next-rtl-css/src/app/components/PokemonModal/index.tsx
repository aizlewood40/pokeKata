import * as React from 'react';
import Modal from '../Modal';
import PokemonTypeBadges from '../PokemonGrid/PokemonCard/PokemonTypeBadges';
import styles from './index.module.css';

type PokemonModalProps = {
    isOpen: boolean;
    onClose: () => void;
    pokemon: any;
};

const PokemonModal: React.FC<PokemonModalProps> = ({ isOpen, onClose, pokemon }) => {
    if (!pokemon) return null;

    const [displayShiny, setDisplayShiny] = React.useState(false);

    const getAllTypes = (): string[] | null => {
        if (!pokemon.types || pokemon.types.length === 0) {
            return null;
        }
        return pokemon.types.map((typeInfo: any) => typeInfo.type.name);
    };

    const allTypes = getAllTypes();

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={pokemon.name}>
            <div className={styles.pokemonDetails}>
                <div className={styles.imageSection}>
                    <button 
                        className={styles.shinyToggle} 
                        onClick={() => setDisplayShiny(!displayShiny)}
                    >
                        {displayShiny ? 'Show Normal' : 'Show Shiny'}
                    </button>
                    <img 
                        className={styles.pokemonImage} 
                        src={displayShiny ? pokemon.sprites?.front_shiny : pokemon.sprites?.front_default} 
                        alt={pokemon.name} 
                    />
                </div>
                
                <div className={styles.infoSection}>
                    <div className={styles.basicInfo}>
                        <p><strong>Height:</strong> {(pokemon.height / 10).toFixed(1)} m</p>
                        <p><strong>Weight:</strong> {(pokemon.weight / 10).toFixed(1)} kg</p>
                        <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
                    </div>

                    {allTypes && (
                        <div className={styles.typesSection}>
                            <strong>Types:</strong>
                            <PokemonTypeBadges types={allTypes} />
                        </div>
                    )}

                    {pokemon.stats && (
                        <div className={styles.statsSection}>
                            <h3>Stats</h3>
                            <div className={styles.stats}>
                                {pokemon.stats.map((stat: any, index: number) => (
                                    <div key={index} className={styles.statItem}>
                                        <span className={styles.statName}>
                                            {stat.stat.name.replace('-', ' ')}:
                                        </span>
                                        <div className={styles.statBar}>
                                            <div 
                                                className={styles.statValue} 
                                                style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                                            >
                                                {stat.base_stat}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {pokemon.abilities && (
                        <div className={styles.abilitiesSection}>
                            <h3>Abilities</h3>
                            <div className={styles.abilities}>
                                {pokemon.abilities.map((ability: any, index: number) => (
                                    <span key={index} className={styles.ability}>
                                        {ability.ability.name.replace('-', ' ')}
                                        {ability.is_hidden && ' (Hidden)'}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default PokemonModal;