import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BasicLayout from "../layouts/BasicLayout";
import { getOne, putOne, deleteOne, API_SERVER_HOST } from '../api/bookAPI';

function BookDetail() {
    const { bno } = useParams(); // URL 파라미터에서 bookId를 추출합니다.
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedBook, setUpdatedBook] = useState({});
    const [loading, setLoading] = useState(true);

    // 책 데이터를 가져오는 useEffect
    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            try {
                const res = await getOne(bno); // API에서 데이터 가져오기
                setBook(res.data);
                setUpdatedBook(res.data); // 초기값 설정
            } catch (error) {
                console.error('Error fetching book:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [bno]);

    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    if (!book) {
        return <div className="text-center text-red-500">Book not found</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBook({ ...updatedBook, [name]: value });
    };

    const handleSave = async () => {
        setIsEditing(false);
        try {
            await putOne(bno, updatedBook); // 수정된 데이터를 API에 저장
            setBook(updatedBook); // 수정된 데이터를 UI에 반영
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this book?');
        if (confirmDelete) {
            try {
                await deleteOne(bno); // 책 삭제 API 호출
                navigate('/booklist'); // 삭제 후 목록으로 이동
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    return (
        <BasicLayout>
            <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row items-center mb-6 space-y-4 md:space-y-0">
                    <img
                        src={book.uploadFileNames && book.uploadFileNames.length > 0
                            ? `${API_SERVER_HOST}/api/books/view/${book.uploadFileNames[0]}`
                            : 'https://littledeep.com/wp-content/uploads/2019/04/littledeep_illustration_book_style2.png'}
                        alt={book.title}
                        className="w-64 h-96 object-cover rounded-lg shadow-md"
                    />
                    <div className="ml-0 md:ml-6 flex-1">
                        <h1 className="text-4xl font-semibold text-gray-800">{book.title}</h1>
                        <p className="text-lg text-gray-600">by {book.author}</p>
                    </div>
                </div>

                {isEditing ? (
                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={updatedBook.title}
                                onChange={handleChange}
                                className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="info"
                                value={updatedBook.info}
                                onChange={handleChange}
                                className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={updatedBook.price}
                                onChange={handleChange}
                                className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                            <input
                                type="number"
                                name="quantity"
                                value={updatedBook.quantity}
                                onChange={handleChange}
                                className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleSave}
                                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="text-gray-800 text-lg mb-4">{book.info}</p>
                        <div className="flex justify-between items-center text-lg font-semibold">
                            <p>Price: ${book.price}</p>
                            <p>Stock: {book.quantity}</p>
                        </div>

                        <div className="mt-6 flex space-x-4 justify-center md:justify-start">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </BasicLayout>
    );
}

export default BookDetail;
