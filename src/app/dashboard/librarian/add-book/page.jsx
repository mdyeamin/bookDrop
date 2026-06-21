import React from 'react';
import { FiInfo } from "react-icons/fi";
import AddNewBookForm from '../../../../components/dashboard/librarian/AddNewBookForm';
import { getUserSession } from '@/lib/core/session';

const AddBook = async() => {
    const user = await getUserSession();
    
      const userId = user?.user?.id;
      console.log(userId);
      
    return (
        <div className="p-6 max-w-4xl mx-auto w-full">
            {/* Header Design matching your image */}
            <div className="mb-8">
                <h1 className="text-[28px] font-bold text-[#0A2540] mb-5 tracking-tight">
                    Add New Book
                </h1>
                
                <div className="bg-[#F8F9FA] border-l-[3px] border-[#0A2540] p-4 rounded-r-md flex items-start gap-3">
                    <FiInfo className="text-[#0A2540] shrink-0 mt-0.5" size={16} strokeWidth={2.5} />
                    <p className="text-[14px] text-slate-600 font-medium">
                        Note: Submitted books are strictly set to 'Pending Approval' and require admin review before going public.
                    </p>
                </div>
            </div>

            {/* Your remaining content */}
            <AddNewBookForm userId={userId}/>
        </div>
    );
};

export default AddBook;