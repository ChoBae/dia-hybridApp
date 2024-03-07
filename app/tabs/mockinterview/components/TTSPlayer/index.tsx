'use client';
import { VoiceType } from '@/types/Voice';
import React, { useState, useRef, useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

interface TTSPlayerProps {
  isStart: boolean;
  setDuration: (duration: number) => void;
  handleStop?: (interimResult: string, time: number) => void;
  voice: VoiceType;
  isEnd?: boolean;
}

export default function TTSPlayer({
  isStart,
  setDuration,
  handleStop,
  voice,
  isEnd,
}: TTSPlayerProps) {
  const audio1Ref = useRef<HTMLAudioElement | null>(null);
  const audio2Ref = useRef<HTMLAudioElement | null>(null);
  const [isAudio1Playing, setIsAudio1Playing] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [interimResult, setInterimResult] = useState<string>('');
  const playAudio1 = () => {
    if (audio1Ref.current) {
      audio1Ref.current.play();
    }
  };

  const playAudio2 = () => {
    if (audio2Ref.current) {
      // audio1Ref.current!.pause(); // 재생 전에 일단 중지
      audio2Ref.current.play();
    }
  };

  const stopAudio = () => {
    if (audio1Ref.current) {
      audio1Ref.current.pause();
      // setIsAudio1Playing(false);
    }
    if (audio2Ref.current) {
      audio2Ref.current.pause();
    }
  };

  useEffect(() => {
    let timer: any;
    if (isStart) {
      playAudio1();
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
      // stopSpeechToText();
    };
  }, [isStart, voice]);

  useEffect(() => {
    if (handleStop && !isStart && !isEnd) {
      SpeechRecognition.stop();
      // console.log('이렇게 대답함, ', interimResult, time);
      handleStop(interimResult as any, time);
    }
    return () => {
      SpeechRecognition.removeAllListeners();
    };
  }, [isStart, handleStop]);

  const handleAudio1Ended = () => {
    setTimeout(() => {
      playAudio2();
    }, 1000);
  };
  const handleLoadedMetadata = () => {
    if (audio1Ref.current) {
      const audioDuration = audio1Ref.current.duration;
      setDuration(audioDuration);
    }
  };
  const handleAudio2Ended = () => {
    stopAudio();
    hanldleRecognition();
  };

  const hanldleRecognition = () => {
    const available = SpeechRecognition.available();
    if (!available) {
      alert('SpeechRecognition is not available');
      return;
    }
    const microCheckPermission = SpeechRecognition.checkPermissions();
    // console.log('microCheckPermission', microCheckPermission);
    // if (!microCheckPermission) {
    //   console.log('inner test', microCheckPermission);
    //   return;
    // }
    SpeechRecognition.requestPermissions();

    SpeechRecognition.start({
      language: 'ko-KR',
      partialResults: true,
      popup: false,
    });
    SpeechRecognition.addListener('partialResults', (result: any) => {
      if (result.matches && result.matches.length > 0) {
        setInterimResult(result.matches[0]);
      }

      // android has differnet result type
      if (result.value && result.value.length > 0) {
        setInterimResult(result.value[0]);
      }
    });
  };
  return (
    <div>
      {voice && (
        <audio
          ref={audio1Ref}
          src={voice.fileUrlValue}
          onEnded={handleAudio1Ended} //
          onLoadedMetadata={handleLoadedMetadata}
          preload="true"
        ></audio>
      )}
      <audio ref={audio2Ref} onEnded={handleAudio2Ended} src="/sounds/beep.mp3"></audio>
    </div>
  );
}
