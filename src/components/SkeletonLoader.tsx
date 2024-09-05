import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      {/* Placeholder for title or heading */}
      <div className="bg-gray-200 h-8 w-1/2 animate-pulse"></div>

      {/* Placeholder for content blocks */}
      <div className="space-y-2">
        {/* Each of these divs represents a loading state for text content */}
        <div className="bg-gray-200 h-6 w-full animate-pulse"></div>
        <div className="bg-gray-200 h-6 w-full animate-pulse"></div>
        <div className="bg-gray-200 h-6 w-full animate-pulse"></div>
        <div className="bg-gray-200 h-6 w-full animate-pulse"></div>
        <div className="bg-gray-200 h-6 w-full animate-pulse"></div>
        <div className="bg-gray-200 h-6 w-full animate-pulse"></div>
        <div className="bg-gray-200 h-6 w-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
