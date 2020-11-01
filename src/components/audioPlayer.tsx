import * as React from 'react'
import ReactAudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

type Props = {
  src: string;
}

const AudioPlayer = (props: Props) => {
  return (
    <ReactAudioPlayer
      autoPlay={ false }
      src={ props.src }
    />
  );
}

export default AudioPlayer;
