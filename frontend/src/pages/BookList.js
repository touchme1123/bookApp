import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BasicLayout from "../layouts/BasicLayout";
import { API_SERVER_HOST, getList } from '../api/bookAPI';

function BookList() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        // 데이터 새로 고침 로직
        const fetchBooks = async () => {
            try {
                const res = await getList({ page: currentPage, size: itemsPerPage });
                setBooks(res.data.dtoList);
                setTotalPages(res.data.totalPage); // 총 페이지 설정
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks(); // useEffect 내에서 fetchBooks 호출
    }, [currentPage]); // currentPage가 변경될 때마다 실행

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 페이지 번호 생성
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <BasicLayout>
            <div className="text-2xl font-semibold mb-6">Book List</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
                {books.length > 0 ? (
                    books.map((book) => (
                        <Link to={`/booklist/detail/${book.bno}`} key={book.bno}>
                            <div className="border p-4 rounded-lg flex flex-col">
                                {/* 이미지 크기 고정 */}
                                <img
                                    src={book.uploadFileNames && book.uploadFileNames.length > 0
                                        ? `${API_SERVER_HOST}/api/books/view/${book.uploadFileNames[0]}`
                                        : 'https://littledeep.com/wp-content/uploads/2019/04/littledeep_illustration_book_style2.png'}
                                    alt={book.title}
                                    className="w-full h-48 object-cover mb-4 rounded-md"  // 크기 고정
                                />
                                {/* Book Info */}
                                <div className="flex flex-col flex-grow">
                                    <div className="text-lg font-semibold truncate">{book.title}</div>
                                    <div className="text-sm text-gray-500 truncate">{book.author}</div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center text-lg text-gray-500">
                        No books available.
                    </div>
                )}
            </div>

            {/* 페이지네이션 */}
            <div className="mt-6 flex justify-center">
                <nav>
                    <ul className="flex space-x-2">
                        {pageNumbers.map((number) => (
                            <li key={number}>
                                <button
                                    onClick={() => paginate(number)}
                                    className={`px-4 py-2 rounded-md ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-300`}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </BasicLayout>
    );
}

export default BookList;
