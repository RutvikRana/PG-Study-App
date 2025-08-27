import React from 'react';

const SkeletonBox: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-slate-700 rounded-md shimmer ${className}`} />
);

const InfoSectionSkeleton: React.FC<{ hasTitle?: boolean }> = ({ hasTitle = true }) => (
  <div className="bg-slate-800/70 p-4 rounded-lg border border-slate-700 h-full">
    {hasTitle && (
      <div className="flex items-center gap-2 mb-3">
        <SkeletonBox className="h-6 w-6 rounded-full" />
        <SkeletonBox className="h-5 w-32" />
      </div>
    )}
    <div className="space-y-2">
      <SkeletonBox className="h-4 w-full" />
      <SkeletonBox className="h-4 w-5/6" />
      <SkeletonBox className="h-4 w-full" />
      <SkeletonBox className="h-4 w-3/4" />
    </div>
  </div>
);


const ExplanationCardSkeleton: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-6" aria-label="Loading explanation">
      <InfoSectionSkeleton />
      <div className="bg-slate-800/70 p-4 rounded-lg border border-slate-700 h-full">
         <div className="flex items-center gap-2 mb-3">
            <SkeletonBox className="h-6 w-6 rounded-full" />
            <SkeletonBox className="h-5 w-40" />
        </div>
        <div className="flex justify-center items-center w-full min-h-[200px]">
            <SkeletonBox className="h-56 w-full" />
        </div>
      </div>
    </div>
  );
};

export default ExplanationCardSkeleton;
