import React from 'react';
import BookCard from './BookCard';

const BooksContainer = ({ books }) => {
    return (
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                    <BookCard key={book._id} book={book}/>
                ))}
            </div>
        </div>
    );
};

export default BooksContainer;