import styles from "./styles.module.scss";

export default function Player() {
  return (
    <div className={styles.playerContainer}> 
    <header>
      <img src="/images/playing.svg" alt="Imagem de um fone"/>
      <strong>Tocando agora</strong>
    </header>     
    
    <div className={styles.emptyPlayer}>
      <strong>Selecione um podcast para ouvir</strong>
    </div>

    <footer className={styles.empty}>
      <div className={styles.progress}>
        <span>00:00</span>
        <div className={styles.slider}>
          <div className={styles.emptySlider}/>
        </div>
        <span>00:00</span>
      </div>
      
      <div className={styles.buttons}>
        <button type="button">
          <img src="/images/shuffle.svg" alt="Botão de Embaralhar"/>
        </button>
        <button type="button">
          <img src="/images/play-previous.svg" alt="Botão de tocar anterior"/>
        </button>
        <button type="button" className={styles.playButton}>
          <img src="/images/play.svg" alt="Botão de Play"/>
        </button>
        <button type="button">
          <img src="/images/play-next.svg" alt="Botão de tocar proxima"/>
        </button>
        <button type="button">
          <img src="/images/repeat.svg" alt="Botão de repetir"/>
        </button>
      </div>
    </footer>

    </div>
  );
}
