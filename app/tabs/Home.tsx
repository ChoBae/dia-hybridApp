'use client';

import Card from '../../components/Card';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
} from '@ionic/react';
import Notifications from '../../components/Notifications';
import { useState } from 'react';
import { notificationsOutline } from 'ionicons/icons';
import { getHomeItems } from '@/store/selectors';
import Store from '@/store';
import { HomeItem } from '@/mock';
import Layout from '@/components/Layout';
import Intro from '@/components/Intro';
import { useSession } from 'next-auth/react';

const Home = () => {
  const homeItems = Store.useState(getHomeItems) as HomeItem[];
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <Layout>
      <IonContent  fullscreen>
        <div className="flex flex-col justify-center mx-auto items-center w-full">
          <Notifications
            open={showNotifications}
            onDidDismiss={() => setShowNotifications(false)}
          />
          <Intro />
        </div>
      </IonContent>
    </Layout>
  );
};

export default Home;
