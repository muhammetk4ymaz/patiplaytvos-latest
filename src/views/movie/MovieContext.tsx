import React, {createContext, useContext, useState, ReactNode} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {OnProgressData} from 'react-native-video';
import {SupportedKeys} from '../../components/remote-control/SupportedKeys';

interface IMovieContext {
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  controlsVisible: boolean;
  setControlsVisible: (controlsVisible: boolean) => void;
  buffering: boolean;
  setBuffering: (buffering: boolean) => void;
  progress: OnProgressData;
  setProgress: (progress: OnProgressData) => void;
  progressFocused: boolean;
  setProgressFocused: (progressFocused: boolean) => void;
  pressedKey: SupportedKeys | undefined;
  setPressedKey: (pressedKey: SupportedKeys | undefined) => void;
  isOnlyProgressVisible: boolean;
  setIsOnlyProgressVisible: (isOnlyProgressVisible: boolean) => void;
  currentProgress: number;
  setCurrentProgress: (currentProgress: number) => void;
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
}

const MovieContext = createContext<IMovieContext | undefined>(undefined);

export const MovieProvider = ({children}: {children: ReactNode}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [controlsVisible, setControlsVisible] = React.useState(false);
  const [buffering, setBuffering] = React.useState(true);
  const [progressFocused, setProgressFocused] = React.useState(false);
  const [progress, setProgress] = React.useState<OnProgressData>({
    currentTime: 0,
    playableDuration: 0,
    seekableDuration: 0,
  });
  const [pressedKey, setPressedKey] = React.useState<
    SupportedKeys | undefined
  >();
  const [isOnlyProgressVisible, setIsOnlyProgressVisible] =
    React.useState(false);
  const [currentProgress, setCurrentProgress] = React.useState(0);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  return (
    <MovieContext.Provider
      value={{
        isPaused,
        setIsPaused,
        controlsVisible,
        setControlsVisible,
        buffering,
        setBuffering,
        progress,
        setProgress,
        progressFocused,
        setProgressFocused,
        pressedKey,
        setPressedKey,
        isOnlyProgressVisible,
        setIsOnlyProgressVisible,
        currentProgress,
        setCurrentProgress,
        isModalVisible,
        setIsModalVisible,
      }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};
