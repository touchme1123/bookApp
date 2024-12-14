import React from 'react';
import BasicLayout from "../layouts/BasicLayout";
import BookList from "./BookList";

function Main(props) {
    return (
        <BasicLayout>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400">
                <div className="text-center p-8 bg-white bg-opacity-70 rounded-lg shadow-lg max-w-3xl w-full">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Bookstore</h1>
                    <p className="text-lg text-gray-600 mb-6">여기에서 당신이 좋아하는 책들을 찾고 관리할 수 있습니다.</p>
                    <div className="flex justify-center space-x-4">
                        <a
                            href="/booklist"
                            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        >
                            책 목록 보기
                        </a>
                        <a
                            href="/bookadd"
                            className="bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                        >
                            책 추가하기
                        </a>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}

export default Main;
