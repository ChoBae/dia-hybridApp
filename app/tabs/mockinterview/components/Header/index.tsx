'use client';
import SettingIcon from '@/ui/icons/SettingIcon';
import ChevronLeftIcon from '@/ui/icons/ChevronLeftIcon';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useHistory } from 'react-router';
import { twMerge } from 'tailwind-merge';
interface HeaderProps {
  handleBack?: any;
  title: string;
  isSetting?: boolean;
  className?: string;
}
export default function Header({ handleBack, title, isSetting = false,className }: HeaderProps) {
  const history = useHistory();

  return (
    <header className={twMerge(`flex px-7 justify-center items-center`, className)}>
      <ChevronLeftIcon
        className="h-3 w-3 text-[#212121] cursor-pointer hover:opacity-50"
        onClick={handleBack}
      />
      <h1 className="text-lg p-0 sm:text-xl font-bold text-center text-primary-600 flex-grow">
        {title}
      </h1>
      {isSetting && (
        <SettingIcon onClick={() => history.push(`/tabs/settings`)} className="cursor-pointer hover:opacity-50" />
      )}
    </header>
  );
}
