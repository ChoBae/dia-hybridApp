'use client';

import { Redirect, Route } from 'react-router-dom';
import Home from './Feed';
import Lists from './Lists';
import ListDetail from '../../components/ListDetail';
import Settings from './Settings';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon  } from '@ionic/react';
import Notifications from '../../components/Notifications';
import { useState } from 'react';
import { notificationsOutline } from 'ionicons/icons';
// import setShowNotifications from '../../components/Notifications';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Feed</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowNotifications(true)}>
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Header;
