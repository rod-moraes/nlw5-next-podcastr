import { createContext, useState, ReactNode, useContext } from "react";

interface Episode {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextData = {
  episodeList: Array<Episode>;
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  noHasPrevious: boolean;
  HasNext: boolean;
  togglePlay: () => void;
  toggleLoop: () => void;
  play: (episode: Episode) => void;
  playNext: () => void;
  playPrevious: () => void;
  setPlayingState: (state: boolean) => void;
  playList: (list: Episode[],index: number) => void;
  toggleShuffle:()=>void
  clearPlayerState:()=>void
  
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;
};

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);  
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }
  const noHasPrevious = currentEpisodeIndex -1<0;
  const HasNext = isShuffling || currentEpisodeIndex +1<episodeList.length;

  function playNext(){
    if(isShuffling){
      const nextRandomEpisodesIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRandomEpisodesIndex);
    }else if(!HasNext){
      setCurrentEpisodeIndex(currentEpisodeIndex+1);
    }
  }

  function clearPlayerState(){
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  function playPrevious(){
    if(noHasPrevious){
      return
    }else{
      setCurrentEpisodeIndex(currentEpisodeIndex-1);
    }
  }


  function playList(list: Episode[], index: number){
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        setPlayingState,
        play,
        playList,
        playPrevious,
        playNext,
        isPlaying,
        togglePlay,
        HasNext,
        noHasPrevious,
        isLooping,
        toggleLoop,
        toggleShuffle,
        isShuffling,
        clearPlayerState,

      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = ()=>{
  return useContext(PlayerContext);
}