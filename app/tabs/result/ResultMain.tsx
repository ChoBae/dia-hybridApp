'use client';
import React, { useEffect, useState } from 'react';
import { IonContent, IonItem, IonLabel } from '@ionic/react';
import Layout from '@/components/Layout';
import SolveList from './SolveList';
import { useParams, useLocation } from 'react-router';
import { getTags } from '@/utils/getTags';
import SolveHeader from './MockInterviewHeader';
import useHideIonTabBar from '@/utils/useHideIonTabBar';
import { PracticeResult } from '@/types/PracticeResult';
import { HistoryType } from '@/types/History';

const ResultMain: React.FC = () => {
  const params = useParams<{ pkValue: string }>();
  const { pkValue } = params;

  const location = useLocation<HistoryType>();
  // console.log('location state', {
  //   location.state.pkValue,
  //   location.state.question,
  //   location.state.contentValue,
  //   location.state.typeValue,
  //   location.state.createdTimeValue,
  //   location.state.elapsedTimeValue,
  //   location.state.filePathValue,
  //   location.state.elapsedTimeValue,
  // });
  // alert(location?.state?.pkValue);
  return (
    <Layout>
      <IonContent fullscreen>
        {/* <SolveHeader currentTag={currentTag} setCurrentTag={setCurrentTag} />
        <SolveList query={query} /> */}
        result 메인
      </IonContent>
    </Layout>
  );
};

export default ResultMain;
