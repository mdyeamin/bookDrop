'use client'
import { handleDeleteBook } from '@/lib/action/books';
import { Button } from '@heroui/react';
import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const DeleteButton = ({id}) => {
    return (
        <div>
            <Button
                  onClick={async() => await handleDeleteBook(id)}
                    size="sm"
                    variant="bordered"
                    className="bg-white border-slate-200 text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 font-semibold h-9 px-4 rounded flex items-center gap-2 transition-colors"
                  >
                    <FiTrash2 size={13} />
                    Delete Record
                  </Button>
        </div>
    );
};

export default DeleteButton;