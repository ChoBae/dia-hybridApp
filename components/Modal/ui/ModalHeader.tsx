import XmarkIcon from "@/ui/icons/XmarkIcon";

type Props = {
  closeModal: () => void;
};
export const ModalHeader = ({ closeModal }: Props) => {
  return (
    <div className="absolute top-5 right-5">
      <XmarkIcon
        className="w-3 h-3 cursor-pointer text-gray-500 hover:text-gray-700"
        onClick={closeModal}
      />
    </div>
  );
};
