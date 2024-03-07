'use client';

import {
  IonPage,
  IonHeader,
  IonItem,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonToggle,
  IonLabel,
} from '@ionic/react';

import { useEffect, useState } from 'react';

const Settings = () => {
  const [notificationState, setNotificationState] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/user-notification`)
      .then(response => response.json())
      .then(data => {
        setNotificationState(data.notifications);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Enable Notifications</IonLabel>
            <IonToggle checked={notificationState} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
