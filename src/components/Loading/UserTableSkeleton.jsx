import React from "react";

const UserTableSkeleton = () => {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-100">
              <th className="p-4 pl-6 w-[35%]">
                <div className="h-3 bg-slate-200 rounded w-24"></div>
              </th>
              <th className="p-4 w-[25%]">
                <div className="h-3 bg-slate-200 rounded w-28"></div>
              </th>
              <th className="p-4 w-[20%]">
                <div className="h-3 bg-slate-200 rounded w-16"></div>
              </th>
              <th className="p-4 pr-6 text-right w-[20%]">
                <div className="h-3 bg-slate-200 rounded w-20 ml-auto"></div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {skeletonRows.map((_, index) => (
              <tr key={index} className="bg-white">
                <td className="p-4 pl-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0"></div>

                    <div className="h-4 bg-slate-200 rounded w-28"></div>
                  </div>
                </td>

                <td className="p-4">
                  <div className="h-3 bg-slate-200 rounded w-40"></div>
                </td>

                <td className="p-4">
                  <div className="h-5 bg-slate-200 rounded-md w-14"></div>
                </td>

                <td className="p-4 pr-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <div className="h-7 bg-slate-200 rounded-lg w-20"></div>
                    <div className="w-7 h-7 bg-slate-200 rounded-lg shrink-0"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTableSkeleton;
