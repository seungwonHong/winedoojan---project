
const SkeletonMyProfile = () => {
  return (
    <div className="w-[343px] lg:w-[800px] md:w-[704px] flex flex-row gap-[16px] rounded-xl border border-gray-200 bg-gray-100 p-12 shadow-sm animate-pulse mb-2.5">
    <div className="w-2/5 h-[160px] bg-[#cfcccc] rounded-md mb-4" />
    <div className="w-3/5">
      <div className="w-1/3 h-[32px] bg-[#cfcccc] rounded mb-2" />
      <div className="h-[24px] bg-[#cfcccc] rounded mb-1" />
      <div className="h-[24px] bg-[#cfcccc] rounded mb-1" />
      <div className="h-[24px] bg-[#cfcccc] rounded mb-1" />
    </div>
  </div>
  );
};

export default SkeletonMyProfile;
