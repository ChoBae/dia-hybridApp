'use client';
import React, { useEffect, useState } from 'react';
import InterviewIntroIcon from '@/ui/icons/InterviewIntroIcon';
import Button from '@/components/Button';
import Typed from 'typed.js';
import { useHistory } from 'react-router';
import { TestVoicePlayer } from './TestVoicePlayer';
import Recorder from '@/components/Recorder';

interface Props {
}

const SettingsSection: React.FC<Props> = ({ }) => {
  const history = useHistory();
  const [testVoiceStart, setTestVoiceStart] = useState<boolean>(false);
  const [recordedVoiceStart, setRecordedVoiceStart] = useState<boolean>(false);
  const [recordStart, setRecordStart] = useState<boolean>(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  return (
    <section className="flex flex-col px-5 w-full h-screen">
      <div className="flex flex-col w-full ml-4 mb-3">
        <h1 className="text-lg text-primary-gray-900 font-semibold">음량 테스트</h1>
        <p className="text-sm font-normal text-primary-gray-800">
          테스트 음성을 재생시켜 기기의 볼륨을 조절해주세요
        </p>
      </div>
      <TestVoicePlayer src="https://dnia6texl8y7f.cloudfront.net/[경석]%20http와%20https.mp3" />
      <div className={`flex flex-col ml-4 ${window.innerHeight < 670 ? 'mt-3' : 'mt-[60px]'} mb-3`}>
        <h1 className="text-lg text-primary-gray-900 font-semibold">마이크 테스트</h1>
        <p className="text-sm font-normal text-primary-gray-800">
          예시 문장을 녹음해 자신의 목소리를 확인해보세요
        </p>
      </div>
      <Recorder setAudioBlob={setAudioBlob}></Recorder>
      {audioBlob ? (
        <TestVoicePlayer src={URL.createObjectURL(audioBlob)} />
      ) : (
        <TestVoicePlayer src="" />
      )}
    </section>
  );
};

export default SettingsSection;
