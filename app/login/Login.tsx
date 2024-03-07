'use client';
import React, { useEffect, useState } from 'react';
import { signIn, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import GithubIcon from '@/ui/icons/GithubIcon';
import Logo from '@/ui/Logo';
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
} from '@ionic/react';
import { loginWithGithub } from '@/utils/helper';
import { useHistory } from 'react-router-dom';
interface LoginProps {
  providers?: Record<string, ClientSafeProvider>;
  prevPath?: string;
}

export default function Login({ prevPath = process.env.NEXT_PUBLIC_CLIENT_URL }: LoginProps) {
  const [providers, setProviders] = useState<ClientSafeProvider | null>(null);
  const history = useHistory();
  const callback = () => {
    history.push('/')
  };
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      // console.log(res)
      setProviders(res as any);
    })();
  }, []);
  return (
    <IonPage className="flex h-screen w-full bg-gradient-to-r from-purple-300 via-pink-200 to-red-200  justify-center items-center no-scrollbar overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-center items-center px-10 py-24 rounded-lg gap-4">
        <div className="flex flex-col justify-center items-center m-20">
          <Logo className="w-[150px]" />
          <p className="text-base text-[#616161] sm:text-lg text-center mb-2 sm:mb-4 whitespace-nowrap">
            Developer Interview Assistant
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xs text-[#616161] sm:text-md mb-2 sm:mb-4">
            자체적인 회원가입은 정책상 지원하지 않습니다 🛠️
          </p>
          {/* {providers &&
            Object.values(providers).map((provider: any) => (
              <div key={provider.name}>
                <button
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: prevPath,
                    })
                  }
                  className="bg-[#333] text-white flex items-center justify-center gap-2 px-4 sm:px-8 py-1 sm:py-2 rounded hover:opacity-90"
                >
                  {provider.name === 'GitHub' && (
                    <>
                      <GithubIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                      Login with GitHub
                    </>
                  )}
                </button>
              </div>
            ))} */}
          <button
            onClick={() => loginWithGithub(callback)}
            className="bg-[#333] text-white flex items-center justify-center gap-2 px-4 sm:px-8 py-1 sm:py-2 rounded hover:opacity-90"
          >깃허브 로그인 </button>
        </div>
      </div>
    </IonPage>
  );
}
