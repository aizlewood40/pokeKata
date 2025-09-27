import * as React from 'react';
import styles from './index.module.css';
import PokemonTypeBadges from './PokemonTypeBadges';
import PokemonModal from '../../PokemonModal';

type PokemonCardProps = {
    name: string;
    url: string;
    defaultImageUrl?: string;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, url, defaultImageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" }) => {

    const [details, setDetails] = React.useState<any>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    React.useEffect(() => {
        // You can fetch more details about the Pokémon here if needed

        const fetchDetails = async () => {
            const response = await fetch(url);
            // add artificial delay to simulate loading state
            await new Promise((resolve) => setTimeout(resolve, 500));
            const data = await response.json();
            setDetails(data);
        };
        fetchDetails();
    }, [url]);

    const getPrimaryType = (): string => {
        if (!details || !details.types || details.types.length === 0) {
            return 'normal';
        }

        return details.types[0].type.name;
    };

    const getAllTypes = (): string[] | null => {
        if (!details || !details.types || details.types.length === 0) {
            return null;
        }

        return details.types.map((typeInfo: any) => typeInfo.type.name);
    };

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const allTypes = getAllTypes();

    return !details ? (
        <div className={`${styles.container} ${styles.normal}`}>
            <img className={styles.image} src={defaultImageUrl} alt={name} />
            <div className={styles.info}>
                <h3>{name}</h3>
            </div>
        </div>
    ) : (
        <>
            <div className={`${styles.container} ${styles[getPrimaryType()]}`} onClick={handleCardClick}>
                <img className={styles.image} src={details.sprites.front_default} alt={details.name} />
                <div className={styles.info}>
                    <h3>{details.name}</h3>
                    {allTypes && (
                        <PokemonTypeBadges types={allTypes} />
                    )}
                </div>
            </div>
            <PokemonModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                pokemon={details} 
            />
        </>
    );
};

export default PokemonCard;