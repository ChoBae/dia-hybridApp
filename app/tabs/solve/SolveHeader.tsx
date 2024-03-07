import Question from '@/components/Question';
import React, { useEffect, useState } from 'react';
import { getQuestionList } from '@/app/api/getQuestionList';
import { IonList } from '@ionic/react';
import CategoryButton from './components/CategoryButton';
import Link from 'next/link';
import { getTags } from '@/utils/getTags';
import Tag from './components/Tag';
interface SolveHeaderProps {
    currentTag: string;
    setCurrentTag: (tag: string) => void;
}

const SolveHeader: React.FC<SolveHeaderProps> = ({ currentTag,setCurrentTag }) => {
  const tags = getTags();
  return (
    <div className="sticky top-0 z-10 px-4 py-3 flex flex-col items-center bg-white">
      <div className="flex flex-row w-full mb-4 bg-white ">
        <Link href={`/tabs/solve/${currentTag}`} className="flex-1">
          <CategoryButton selected={true}>개별연습</CategoryButton>
        </Link>
        <Link href={`/tabs/practice/${currentTag}`} className="flex-1">
          <CategoryButton>실전연습</CategoryButton>
        </Link>
      </div>
      <IonList className="flex flex-row gap-1.5 overflow-x-auto w-full bg-none no-scrollbar backdrop-blur-sm">
        {tags.map((tag, index) => (
          <Tag key={index} selected={currentTag} setTag={setCurrentTag}>
            {tag.name}
          </Tag>
        ))}
      </IonList>
    </div>
  );
};

export default SolveHeader;
