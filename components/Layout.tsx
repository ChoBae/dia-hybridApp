import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonButtons,
  IonButton,
  IonIcon,
  IonMenu,
} from '@ionic/react';
import { hammerOutline, menuOutline } from 'ionicons/icons';
import Logo from '@/ui/Logo';
import Header from './Header';
import { menuController } from '@ionic/core';
import ToggleMenu from './Header/Components/ToggleMenu';
import { useSession } from 'next-auth/react';
import type { Session } from '@/types/Session';

type Props = {
  children: React.ReactNode;
  showHeader?: boolean;
  className?: string;
};

const Layout = ({ children, showHeader = true, className }: Props) => {
  const { data: session } = useSession();
  const typedSession = session as Session;
  return (
    <>
      <ToggleMenu />
      <IonPage id="main-content" className={className}>
        {showHeader && <Header session={typedSession} />}
        {children}
      </IonPage>
    </>
  );
};
export default Layout;
