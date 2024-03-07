'use client';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import type { User } from '@/types/User';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { useSession } from 'next-auth/react';
import type { Session } from '@/types/Session';
interface ProfileToolbarProps {
  user?: User;
  // loginHandler: () => void;
}
export default function ProfileToolbar({ user }: ProfileToolbarProps) {
  const { data: session } = useSession();
  const typedSession = session as Session;
  return (
    <>
      <div className="grid gap-y-2 m-4">
        <h1 className="font-semibold text-sm">내 정보</h1>
        {session && typedSession.user ? (
          <>
            <img
              className=" h-10 w-10 rounded-full justify-items-center items-center itmes-self-center"
              src={typedSession.user.image_url || '/default-user.png'}
              alt="user Image"
            />
            <p className="font-semibold ">{typedSession.user.nickname}</p>
          </>
        ) : (
          <p className="font-semibold text-primary">로그인이 필요합니다.</p>
        )}
      </div>

      {/* <IonList className="list-none divide-y divide-gray-100"> */}
      {/* <IonItem>프로필 편집(준비중)</IonItem> */}
      {session && typedSession.user ? (
        <IonItem onClick={() => signOut()}>
          <IonLabel>로그아웃</IonLabel>
        </IonItem>
      ) : (
        <IonItem routerLink="/login">
          <IonLabel>로그인</IonLabel>
        </IonItem>
      )}
      {/* </IonList> */}
    </>
  );
}
