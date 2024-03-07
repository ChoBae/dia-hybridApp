'use client';
import React, { useEffect, useState } from 'react';
import { IonContent, IonItem, IonLabel } from '@ionic/react';
import Layout from '@/components/Layout';
// import SolveList from './SolveList';
import { useParams } from 'react-router-dom';
import { getTags } from '@/utils/getTags';
import ProblemHeader from './ProblemHeader';
import { useHistory } from 'react-router-dom';
import { getQuestionDetails } from '@/app/api/getQuestionDetails';
import { useSession } from 'next-auth/react';
import type { Session } from '@/types/Session';
import type { Question } from '@/types/Question';
import ProblemSection from './ProblemSection';
import { TabsCustomEvent } from '@ionic/react';
import useHideIonTabBar from '@/utils/useHideIonTabBar';
import Tabs from '../../Tabs';
import { Modal } from '@/components/Modal';

const ProblemMain: React.FC = () => {
  const history = useHistory();
  const params = useParams<{ pkValue: string }>();
  const { pkValue } = params;
  const { data: session } = useSession();
  const typedSession = session as Session;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [animationClass, setAnimationClass] = useState<string>('');
  const hideTabBar = useHideIonTabBar();

  const solveQuestion = () => {
    setIsModalOpen(false);
    history.push(`/tabs/solve/mockinterview/${pkValue}`);
  };
  const hideMenu = async () => {
    setAnimationClass('animate-fadeOutDown');
    await new Promise(r => setTimeout(r, 600));
    setIsModalOpen(false);
  };
  const handleClick = () => {
    if (isModalOpen) {
      hideMenu();
    } else {
      setAnimationClass('animate-fadeInUp');
      setIsModalOpen(true);
    }
  };

  return (
    <Layout>
      <IonContent className="h-full">
        <ProblemHeader />
        <ProblemSection pk={pkValue} handleClick={handleClick} session={typedSession} />
        <Modal
          animationClass={animationClass}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          isOverlayClickClose={true}
        >
          <Modal.Header closeModal={hideMenu} />
          <Modal.Body
            title="개별 모의연습을 시작해볼까요?"
            description="문제의 리얼한 TTS가 제공되며 소요 시간은 평균 1~2분입니다."
          />
          <Modal.Button onClick={solveQuestion}>시작하기</Modal.Button>
        </Modal>
      </IonContent>
    </Layout>
  );
};

export default ProblemMain;
