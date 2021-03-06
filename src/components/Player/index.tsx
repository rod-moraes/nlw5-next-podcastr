import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { usePlayer } from "../../contexts/PlayerContext";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState,
    playNext,
    playPrevious,
    HasNext,
    noHasPrevious,
    toggleLoop,
    isLooping,
    isShuffling,
    toggleShuffle,
    clearPlayerState
  } = usePlayer();

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  function setupProgressListener() {
    audioRef.current.currentTime = 0;
    audioRef.current.addEventListener("timeupdate", (event) => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  function handleSeek(amount: number){
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function handleEpisodeEnded(){
    if(HasNext){
      playNext();
    }else {
      clearPlayerState();
    }
  }

  const episode = episodeList[currentEpisodeIndex];
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/images/playing.svg" alt="Imagem de um fone" />
        <strong>Tocando agora</strong>
      </header>
      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ""}>
        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: "#04d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#04d361", borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </div>
        {episode && (
          <audio
            src={episode.url}
            autoPlay
            ref={audioRef}
            loop={isLooping}
            onEnded={handleEpisodeEnded}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={setupProgressListener}
          />
        )}
        <div className={styles.buttons}>
          <button
            type="button"
            disabled={!episode || episodeList.length === 1}
            onClick={toggleShuffle}
            className={isShuffling ? styles.isActive : ""}
          >
            <img src="/images/shuffle.svg" alt="Bot??o de Embaralhar" />
          </button>
          <button
            type="button"
            disabled={!episode || noHasPrevious}
            onClick={playPrevious}
          >
            <img
              src="/images/play-previous.svg"
              alt="Bot??o de tocar anterior"
            />
          </button>
          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src="/images/pause.svg" alt="Bot??o de Play" />
            ) : (
              <img src="/images/play.svg" alt="Bot??o de Play" />
            )}
          </button>
          <button
            type="button"
            disabled={!episode || !HasNext}
            onClick={playNext}
          >
            <img src="/images/play-next.svg" alt="Bot??o de tocar proxima" />
          </button>
          <button
            type="button"
            disabled={!episode}
            onClick={toggleLoop}
            className={isLooping ? styles.isActive : ""}
          >
            <img src="/images/repeat.svg" alt="Bot??o de repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}
