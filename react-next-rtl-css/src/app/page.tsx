import Image from "next/image";
import styles from "./page.module.css";

import PokemonGrid from "./components/PokemonGrid";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Welcome to the PokeKata App</h1>
      <PokemonGrid />
    </div>
  );
}

