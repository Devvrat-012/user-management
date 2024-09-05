import React from "react";

const SkeletonLoaderTable: React.FC = () => {
  return (
    <div className="p-4">
      {/* Title of the table */}
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      {/* Container for the table */}
      <div className="min-w-full bg-white border border-gray-200 rounded-lg">
        <table className="min-w-full">
          <thead>
            {/* Table header with skeleton loaders */}
            <tr>
              <th className="py-2 px-4 border-b bg-gray-200 animate-pulse">
                Name
              </th>
              <th className="py-2 px-4 border-b bg-gray-200 animate-pulse">
                Email
              </th>
              <th className="py-2 px-4 border-b bg-gray-200 animate-pulse">
                Phone
              </th>
              <th className="py-2 px-4 border-b bg-gray-200 animate-pulse">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Generate 5 rows of skeleton table data */}
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                {/* Skeleton cells for each column */}
                <td className="py-2 px-4 border-b bg-gray-100 h-6"></td>
                <td className="py-2 px-4 border-b bg-gray-100 h-6"></td>
                <td className="py-2 px-4 border-b bg-gray-100 h-6"></td>
                <td className="py-2 px-4 border-b bg-gray-100 h-6"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkeletonLoaderTable;
