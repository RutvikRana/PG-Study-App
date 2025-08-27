import React from 'react';

const SkeletonBox: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-slate-700 rounded-md shimmer ${className}`} />
);

const InfoSectionSkeleton: React.FC = () => (
  <div className="bg-slate-800/70 p-4 rounded-lg border border-slate-700 h-full">
    <div className="flex items-center gap-2 mb-3">
        <SkeletonBox className="h-6 w-6 rounded-full" />
        <SkeletonBox className="h-5 w-32" />
    </div>
    <div className="space-y-2">
      <SkeletonBox className="h-4 w-full" />
      <SkeletonBox className="h-4 w-5/6" />
      <SkeletonBox className="h-4 w-3/4" />
    </div>
  </div>
);


const DrugInfoCardSkeleton: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-6" aria-label="Loading drug information">
      <header className="pb-4 border-b border-slate-700">
        <SkeletonBox className="h-5 w-1/4 mb-2" />
        <SkeletonBox className="h-10 w-1/2" />
      </header>

      <div className="space-y-6">
         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
                 <div className="bg-slate-800/70 p-4 rounded-lg border border-slate-700 h-full">
                    <div className="flex items-center gap-2 mb-3">
                        <SkeletonBox className="h-6 w-6 rounded-full" />
                        <SkeletonBox className="h-5 w-32" />
                    </div>
                     <SkeletonBox className="h-4 w-3/4" />
                </div>
            </div>
            <div className="lg:col-span-3">
                <InfoSectionSkeleton />
            </div>
         </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoSectionSkeleton />
            <InfoSectionSkeleton />
            <InfoSectionSkeleton />
        </div>
      </div>
    </div>
  );
};

export default DrugInfoCardSkeleton;
