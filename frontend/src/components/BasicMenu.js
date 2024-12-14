import { Link } from "react-router-dom";

const BasicMenu = () => {
    return (
        <nav id="navbar" className="bg-blue-600 shadow-md">
            <div className="w-full max-w-7xl mx-auto">
                <ul className="flex justify-center items-center p-4 space-x-8">
                    <li className="text-white text-xl font-semibold hover:text-blue-300 transition-colors duration-300">
                        <Link to="/">메인</Link>
                    </li>
                    <li className="text-white text-xl font-semibold hover:text-blue-300 transition-colors duration-300">
                        <Link to="/booklist">목록</Link>
                    </li>
                    <li className="text-white text-xl font-semibold hover:text-blue-300 transition-colors duration-300">
                        <Link to="/bookadd">추가</Link>
                    </li>
                    <li className="text-white text-xl font-semibold hover:text-blue-300 transition-colors duration-300">
                        <Link to="/searching">검색</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default BasicMenu;
