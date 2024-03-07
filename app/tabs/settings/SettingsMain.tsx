'use client';
import React, { useEffect, useState } from 'react';
import { IonContent, IonItem, IonLabel } from '@ionic/react';
import Layout from '@/components/Layout';
import useHideIonTabBar from '@/utils/useHideIonTabBar';
import Header from '../mockinterview/components/Header';
import { useHistory } from 'react-router-dom';
import SettingsSection from './SettingsSection';

const SettingsMain: React.FC = () => {
  const history = useHistory();
  const hideTabBar = useHideIonTabBar();

  return (
    <Layout showHeader={false} className="pt-20">
      <IonContent >
        <Header
          handleBack={() => history.goBack()}
          title="환경설정"
          isSetting={false}
        />
        <SettingsSection />
      </IonContent>
    </Layout>
  );
};

export default SettingsMain;
