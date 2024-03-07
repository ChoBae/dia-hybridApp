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
  IonMenu,
  IonButton,
} from '@ionic/react';
import Logo from '@/ui/Logo';
import { menuController } from '@ionic/core';
import ProfileToolbar from './components/ProfileToolbar';
type ToggleMenuProps = {
};

export default function ToggleMenu(props: ToggleMenuProps) {
  const menuRef = React.useRef<HTMLIonMenuElement | null>(null);
   const closeMenu = async () => {
     menuRef.current?.close();
   };
  return (
    <IonMenu ref={menuRef} contentId="main-content" side="end" id="main-menu">
      <IonHeader>
        <IonToolbar className="flex items-center bg-white">
          <IonTitle className="flex items-center justify-center" slot="">
            <Logo className="w-[52px] h-[20px] mx-auto" />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ">
        <ProfileToolbar />
        <IonList>
          <IonItem routerLink={'/tabs'} onClick={() => closeMenu()}>
            <IonLabel>홈</IonLabel>
          </IonItem>
          <IonItem routerLink={'/tabs/solve/backend'} onClick={() => closeMenu()}>
            <IonLabel>문제풀기</IonLabel>
          </IonItem>
          <IonItem routerLink={'/tabs/history'} onClick={() => closeMenu()}>
            <IonLabel>히스토리</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}
