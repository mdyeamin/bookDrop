import BooksTable from '@/components/dashboard/admin/BookApprovalQueue/BooksTable';
import {  getAllBooksByAdmin } from '@/lib/api/books'; 

import React from 'react';

const AllBooks = async () => {
    
    const manageBooks = await getAllBooksByAdmin();
console.log(manageBooks);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">
                    Manage All Books
                </h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    Total Books: {manageBooks?.length}
                </span>
            </div>
            
            
            <BooksTable initialBooks={manageBooks} />
        </div>
    );
};

export default AllBooks;