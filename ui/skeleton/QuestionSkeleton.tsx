export const QuestionSkeleton = () => {
  return (
    <div className="flex relative w-full flex-col bg-[#F9F5FF] rounded-[5px] px-4 py-[18px]">
      <div className="flex flex-col gap-y-[2px] animate-pulse">
        <div className=" h-2 bg-slate-700 rounded"></div>
        <div className=" h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  );
};
