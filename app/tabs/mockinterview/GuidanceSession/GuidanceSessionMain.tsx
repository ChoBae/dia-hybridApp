'use client';
import React, { useEffect, useState } from 'react';
import { IonContent, IonItem, IonLabel } from '@ionic/react';
import Layout from '@/components/Layout';
import { useParams } from 'react-router-dom';
import useHideIonTabBar from '@/utils/useHideIonTabBar';
import Header from '../components/Header';
import { useHistory } from 'react-router-dom';
import GuidanceSessionSection from './GuidanceSessionSection';

const GuidanceSessionMain: React.FC = () => {
  const history = useHistory();
  const params = useParams<{ pkValue: string }>();
  const { pkValue } = params;
  const hideTabBar = useHideIonTabBar();

  return (
    <Layout showHeader={false} className='bg-primary-100 pt-20'>
      <IonContent className='bg-primary-100'>
        <Header handleBack={() => history.goBack()} title="모의연습" isSetting={true} className='bg-primary-100'/>
        <GuidanceSessionSection pkValue={pkValue} />
      </IonContent>
    </Layout>
  );
};

export default GuidanceSessionMain;
