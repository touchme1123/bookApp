import React from 'react';

function Loading(props) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 mx-auto mb-4"></div>
                <p className="text-lg font-semibold text-gray-700">로딩 중...</p>
                <p className="text-sm text-gray-500">잠시만 기다려 주세요.</p>
            </div>
        </div>
    );
}

export default Loading;
