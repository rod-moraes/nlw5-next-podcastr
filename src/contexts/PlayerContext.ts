import {createContext} from 'react';

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
  togglePlay:  ()=>void;
  play: (episode:Episode)=>void
  setPlayingState: (state:boolean)=>void;
};


export const PlayerContext = createContext({} as PlayerContextData);