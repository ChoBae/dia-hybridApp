import { IonIcon } from '@ionic/react';
import { useHistory } from 'react-router';
import ChevronLeftIcon from '@/ui/icons/ChevronLeftIcon';
import ShareIcon from '@/ui/icons/ShareIcon';
import { chevronBackOutline, shareSocial } from 'ionicons/icons';
import copyToClipboard from '@/utils/copyToClipBoard';

interface Props {}

const ProblemHeader: React.FC<Props> = ({}) => {
  const history = useHistory();

  return (
    <div className="flex items-center mb-5 px-5">
      <ChevronLeftIcon
        className="h-3 w-3 mb-1 text-[#212121] cursor-pointer hover:opacity-50"
        onClick={() => history.goBack()}
      />
      <h1 className="flex mt-1 text-lg items-center justify-center leading-[21.6px] sm:text-xl font-bold text-center text-primary-600 flex-grow">
        스크립트 작성
      </h1>
      <div className="mr-1 mb-2" onClick={() => copyToClipboard()}>
        <ShareIcon />
      </div>
    </div>
  );
};

export default ProblemHeader;
