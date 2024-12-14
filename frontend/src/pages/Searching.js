import React, {useEffect, useState} from 'react';
import BasicLayout from "../layouts/BasicLayout";
import {API_SERVER_HOST, getList} from "../api/bookAPI";

function Searching(props) {

    // 상태 변수
    const [searchQuery, setSearchQuery] = useState(''); // 검색어
    const [filteredBooks, setFilteredBooks] = useState([]); // 필터된 책 목록
    const [books, setBooks] = useState([]); // 전체 책 목록
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    // 데이터 가져오기 (페이지네이션)
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await getList({page: currentPage, size: itemsPerPage});
                setBooks(res.data.dtoList);
                setTotalPages(res.data.totalPage);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBooks();
    }, [currentPage]);

    // 검색어 입력 핸들러
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // 검색 트리거 핸들러
    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            setFilteredBooks(books); // 검색어가 비어있으면 전체 책 목록 보여주기
        } else {
            const filtered = books.filter(book =>
                (book.title && book.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (book.author && book.author.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredBooks(filtered);
        }
    };


    // 페이지네이션 버튼 클릭 핸들러
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 페이지네이션 숫자 생성
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <BasicLayout>
            <div className="p-6">
                <div className="text-2xl font-semibold mb-6">Search for Books</div>

                {/* 검색 입력창 */}
                <div className="mb-6 flex items-center space-x-2">
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Search by title or author"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
                    >
                        Search
                    </button>
                </div>

                {/* 검색 결과 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book, index) => (
                            <div key={index} className="text-center">
                                <img
                                    src={book.uploadFileNames && book.uploadFileNames.length > 0
                                        ? `${API_SERVER_HOST}/api/books/view/${book.uploadFileNames[0]}`
                                        : 'https://littledeep.com/wp-content/uploads/2019/04/littledeep_illustration_book_style2.png'}
                                    alt={book.title}
                                    className="w-full h-40 object-cover mb-2 rounded-md"
                                />
                                <div className="font-semibold">{book.title}</div>
                                <div className="text-gray-500">{book.author}</div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-lg text-gray-500">
                            No books found.
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
            </div>
        </BasicLayout>
    );
}

export default Searching;
