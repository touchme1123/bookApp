import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import Loading from "../pages/Loading";

// 페이지 컴포넌트들
const MainPage = lazy(() => import("../pages/Main"));
const BookAdd = lazy(() => import("../pages/BookAdd"));
const BookList = lazy(() => import("../pages/BookList"));
const BookDetail = lazy(() => import("../pages/BookDetail"));
const Searching = lazy(() => import("../pages/Searching"));

const root = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={<Loading/>}><MainPage/></Suspense>,
    },
    {
        path: "/bookadd",
        element: <Suspense fallback={<Loading/>}><BookAdd/></Suspense>,
    },
    {
        path: "/booklist", // 부모 경로
        element: <Suspense fallback={<Loading/>}><BookList/></Suspense>,
    },
    {
        path: "/searching",
        element: <Suspense fallback={<Loading/>}><Searching/></Suspense>,
    },
    {
        path: "/booklist/detail/:bno",
        element: <Suspense fallback={<Loading/>}><BookDetail/></Suspense>,
    },
]);

export default root;
