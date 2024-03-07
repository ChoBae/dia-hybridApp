'use client';
import React, { useEffect, useState } from 'react';
import { IonContent, IonItem, IonLabel } from '@ionic/react';
import Layout from '@/components/Layout';
import { useParams } from 'react-router-dom';
import useHideIonTabBar from '@/utils/useHideIonTabBar';
import Header from '../components/Header';
import { useHistory } from 'react-router-dom';
import PracticeSessionSection from './PracticeSessionSection';
import axios from 'axios';
import { Question as QuestionType } from '@/types/Question';
import { useSession } from 'next-auth/react';
import { Session } from '@/types/Session';
const PracticeSessionMain: React.FC = () => {
  const history = useHistory();
  const params = useParams<{ pkValue: string }>();
  const { pkValue } = params;
  const { data: session, status } = useSession();
  const typedSession = session as Session;
  const hideTabBar = useHideIonTabBar();
  const [question, setQuestion] = useState<QuestionType>();
  useEffect(() => {
    async function fetchQuestion() {
      const question = await axios.get(`/api/question/getQuestion/?pkValue=${pkValue}`);
      setQuestion(question.data as QuestionType);
    }
    fetchQuestion();
  }, [pkValue]);
  return (
    <Layout showHeader={false} className="bg-primary-100 pt-20">
      <IonContent className="bg-primary-100">
        <Header
          handleBack={() => history.goBack()}
          title="모의연습"
          isSetting={true}
          className="bg-primary-100"
        />
        <PracticeSessionSection
          pkValue={pkValue}
          question={question as QuestionType}
          session={typedSession as Session}
        />
      </IonContent>
    </Layout>
  );
};

export default PracticeSessionMain;
