import React, { useEffect, useState } from 'react';

import { IonButton, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router';
import { chevronBackOutline, shareSocial } from 'ionicons/icons';
import copyToClipboard from '@/utils/copyToClipBoard';
import Question from '@/components/Question';
import { Question as QuestionType } from '@/types/Question';
import ScriptSection from '@/components/ScriptSection';
import Button from '@/components/Button';
import { Session } from '@/types/Session';
import { getQuestionDetails } from '@/app/api/getQuestionDetails';
import { QuestionSkeleton } from '@/ui/skeleton/QuestionSkeleton';
import axios from 'axios';
import SubmitIcon from '@/ui/icons/SubmitIcon';
import { Keyboard } from '@capacitor/keyboard';
interface Props {
  pk: string;
  handleClick: () => void;
  session?: Session;
}

const ProblemSection: React.FC<Props> = ({ pk, handleClick, session }) => {
  const [question, setQuestion] = useState<QuestionType>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  useEffect(() => {
    async function fetchQuestion() {
      const question = await axios.get(`/api/question/getQuestion/?pkValue=${pk}`);
      setQuestion(question.data as QuestionType);
    }
    fetchQuestion();
  }, [pk]);

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', info => {
      setIsEditing(true);
    });
    Keyboard.addListener('keyboardWillHide', () => {
      setIsEditing(false);
    });
    return () => {
      Keyboard.removeAllListeners();
    };
  }, []);
  return (
    <div className="flex flex-col gap-y-3 mb-4 h-[87%] px-4">
      {question ? (
        <Question
          question={question}
          session={session}
          isBookmarkOn={session ? true : false}
        ></Question>
      ) : (
        <QuestionSkeleton></QuestionSkeleton>
      )}
      <ScriptSection
        id={pk}
        className={`h-full ${isEditing ? 'mb-1' : 'mb-3'}`}
        isSaved={isSaved}
      ></ScriptSection>
      {isEditing && (
        <SubmitIcon onClick={() => setIsSaved(true)} className="h-[30px] w-[30px] mb-2" />
      )}
      {!isEditing && <Button onClick={handleClick}>모의연습 시작하기</Button>}
    </div>
  );
};

export default ProblemSection;
