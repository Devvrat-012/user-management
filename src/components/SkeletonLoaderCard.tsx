import React from "react";

const SkeletonLoaderCard: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      {/* Generate 5 skeleton cards */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm animate-pulse"
        >
          {/* Skeleton for the header or title of the card */}
          <div className="flex justify-between items-center mb-2">
            <div className="bg-gray-200 h-6 w-1/4"></div>
          </div>

          {/* Skeleton for the main content area */}
          <div className="mb-2">
            <div className="bg-gray-200 h-4 w-3/4"></div>
          </div>

          <div className="mb-2">
            <div className="bg-gray-200 h-4 w-1/2"></div>
          </div>

          {/* Skeleton for action buttons or tags */}
          <div className="flex space-x-2">
            <div className="bg-gray-200 h-6 w-1/4"></div>
            <div className="bg-gray-200 h-6 w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoaderCard;
