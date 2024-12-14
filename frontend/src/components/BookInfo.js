import React from 'react';

function BookInfo({ imageUrl, title, author }) {
    return (
        <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
            <img src={imageUrl} alt={title} className="w-full h-64 object-cover" />
            <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-600">by {author}</p>
            </div>
        </div>
    );
}

export default BookInfo;
