'use client';
import React, { useEffect, useState, useCallback } from 'react';
import EqualizerIcon from '@/ui/icons/EqualizerIcon';
import { MicroIcon } from '@/ui/icons/MicroIcon';
import {
  VoiceRecorder,
  VoiceRecorderPlugin,
  RecordingData,
  GenericResponse,
  CurrentRecordingStatus,
} from 'capacitor-voice-recorder';


type Props = {
  setAudioBlob: (blob: Blob) => void;
};
const Recorder: React.FC<Props> = (props: Props) => {
  const { setAudioBlob } = props;
  const [onRec, setOnRec] = useState<boolean>(false);

  const startRecording = async () => {
    const result = await VoiceRecorder.requestAudioRecordingPermission();
    // const permissionStatus = await VoiceRecorder.hasAudioRecordingPermission();
    // if (!permissionStatus.value) {
    //   const result = await VoiceRecorder.requestAudioRecordingPermission();
    //   if (!result.value) {
    //     console.error('User did not grant audio recording permission');
    //     return;
    //   }
    // }
    try {
      const result = await VoiceRecorder.startRecording();
      setOnRec(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };
  const stopRecording = async () => {
    try {
      const result = await VoiceRecorder.stopRecording();
      setOnRec(false);
      const audioData = new Uint8Array(
        atob(result.value.recordDataBase64)
          .split('')
          .map(char => char.charCodeAt(0))
      ); 

      const audioBlob = new Blob([audioData], { type: result.value.mimeType });
      setAudioBlob(audioBlob);
      // Now you can use the path to access the recorded audio file
      // For example, to read the file as a blob
      // const file = await Filesystem.readFile({
      //   path: path,
      //   directory: FilesystemDirectory.Data,
      // });
      // Convert file data to Blob
      // const blob = new Blob([file.data], { type: 'audio/mp3' });
      // setAudioBlob(blob);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };
  return (
    <>
      <div className="flex flex-col px-9 py-[27px] w-full h-full max-h-[180px] bg-primary-100 rounded-[5px] relative mb-4">
        <h1 className="text-[16px] font-semibold leading-[19.2px] text-primary-400 text-center">
          다이아는 개발자 모의면접 플랫폼입니다
        </h1>
        <div className="absolute inset-0 flex justify-center items-center mt-4">
          <div className="bg-primary-600 p-3 w-14 h-14 flex justify-center items-center rounded-full z-50 relative hover:opacity-75">
            <div
              className={`w-full h-full absolute ring-8 ring-primary-200 rounded-full ${
                onRec ? 'animate-ping' : ''
              }`}
              onClick={onRec ? stopRecording : startRecording}
            ></div>
            <MicroIcon className="w-[17px] h-[24px]" />
          </div>
          <EqualizerIcon className="w-full h-full absolute inset-0 animate-pulse z-40" />
        </div>
      </div>
    </>
  );
};

export default Recorder;
