'use client';
import React, { useEffect, useState } from 'react';
import { getQuestionList } from '@/app/api/getQuestionList';
import { IonList } from '@ionic/react';
import Question from '@/components/Question';
// import Question from './components/Question';
import type { Question as QuestionType } from '@/types/Question';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import type { Session } from '@/types/Session';

interface SolveListProps {
  query: string;
}

const SolveList: React.FC<SolveListProps> = ({ query }) => {
  const { data: session, status } = useSession();
  const typedSession = session as Session;
  const [questionList, setQuestionList] = useState<QuestionType[]>([]);
  useEffect(() => {
    async function fetchQuestionList() {
      const questionList = await axios.get('/api/question/getList/?query=backend');
      setQuestionList(questionList.data as QuestionType[]);
    }
    fetchQuestionList();
  }, [query]);
  return (
    <section className="grid gap-3 mb-3 px-4">
      {questionList.map((question: QuestionType, i) => (
        <Question
          question={question}
          key={question.pkValue}
          isDetail={true}
          session={typedSession}
        />
        // <Question id={question.pkValue} title={question.korTitleValue} key={i} />
      ))}
    </section>
  );
};

export default SolveList;
