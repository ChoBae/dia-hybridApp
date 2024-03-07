"use client";
import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuButton,
  IonButtons,
  IonButton,
  IonIcon,
  IonMenu,
} from '@ionic/react';
import { hammerOutline, menuOutline } from 'ionicons/icons';
import Logo from '@/ui/Logo';
import type { Session } from '@/types/Session';
interface HeaderProps {
  session?: Session;
}

export default function Header({ session }: HeaderProps) {

  return (
    <IonHeader className="ion-no-border pt-3 bg-white" color="none">
      <IonToolbar className="flex justify-between items-center bg-white py-3" color="none">
        <IonTitle className="text-left px-4 ">
          <Logo className="w-[52px] h-[20px]" />
        </IonTitle>
        {/* <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons> */}
        <IonButtons slot="end" className="-space-x-2 mr-2">
          {/* <IonButton onClick={() => setShowNotifications(true)}>
            <IonIcon icon={notificationsOutline} />
          </IonButton> */}
          {/* 추가된 부분 */}
          {/* <IonButton>
            <IonIcon icon={menuOutline} className="text-[#757575]" />
          </IonButton> */}
          <IonButton>
            {/* <IonIcon icon={menuOutline} className="text-[#757575]" /> */}
            <IonMenuButton className="text-[#757575]"></IonMenuButton>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}
