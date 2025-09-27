import * as React from 'react';
import styles from './index.module.css';

type PokemonCardProps = {
    types: string[];
};

const PokemonTypeBadges: React.FC<PokemonCardProps> = ({ types }) => {
    return (
        <div className={styles.container}>
            {types.map((type) => (
                <span key={type} className={`${styles.typeBadge} ${styles[type]}`}>
                    {type}
                </span>
            ))}
        </div>
    );
}

export default PokemonTypeBadges;