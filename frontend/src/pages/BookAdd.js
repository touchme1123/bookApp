import React, {useState} from 'react';
import BasicLayout from "../layouts/BasicLayout";
import {addOne} from "../api/bookAPI";
import {useNavigate} from "react-router-dom";

function BookAdd(props) {
    const navigate = useNavigate();
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        info: '',
        quantity: '',
        price: '',
        delFlag: false,
        files: [],
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBookData({
            ...bookData,
            [name]: value,
        });
    };


    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setBookData({
            ...bookData,
            files: files,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmAdd = window.confirm('Are you sure you want to add this book?');
        if (confirmAdd) {
            try {
                const res = await addOne(bookData);  // 비동기 요청을 처리하기 위해 `await` 사용
                const bno = res.data
                navigate(`/booklist/detail/${bno}`);  // bno 값이 동적으로 URL에 삽입됩니다.
                console.log(res.data);
            } catch (e) {
                console.error(e);
            }
        }

    };

    return (
        <BasicLayout>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">책 등록</h2>
                    <form onSubmit={handleSubmit}>
                        {/* 책 제목 */}
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                                책 제목
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={bookData.title}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="책 제목을 입력하세요"
                                required
                            />
                        </div>

                        {/* 저자 */}
                        <div className="mb-6">
                            <label htmlFor="author" className="block text-gray-700 font-medium mb-2">
                                저자
                            </label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={bookData.author}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="저자명을 입력하세요"
                                required
                            />
                        </div>

                        {/* 책 정보 */}
                        <div className="mb-6">
                            <label htmlFor="info" className="block text-gray-700 font-medium mb-2">
                                책 정보
                            </label>
                            <textarea
                                id="info"
                                name="info"
                                value={bookData.info}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="책에 대한 정보를 입력하세요"
                                rows="4"
                                required
                            />
                        </div>

                        {/* 재고 수량 */}
                        <div className="mb-6">
                            <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
                                재고 수량
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={bookData.quantity}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="재고 수량을 입력하세요"
                                required
                            />
                        </div>

                        {/* 가격 */}
                        <div className="mb-6">
                            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                                가격
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={bookData.price}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="가격을 입력하세요"
                                required
                            />
                        </div>

                        {/* 책 이미지 */}
                        <div className="mb-6">
                            <label htmlFor="imageList" className="block text-gray-700 font-medium mb-2">
                                책 이미지
                            </label>
                            <input
                                type="file"
                                id="imageList"
                                name="imageList"
                                multiple
                                onChange={handleFileChange}
                                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* 제출 버튼 */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-8 py-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            >
                                책 등록
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BasicLayout>
    );
}

export default BookAdd;
