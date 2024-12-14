import BasicMenu from "../components/BasicMenu";

const BasicLayout = ({children}) => {
    return (
        <>
            {/* BasicMenu는 상단에 고정 */}
            <BasicMenu/>

            {/* 전체 레이아웃 컨테이너 */}
            <div className="bg-gray-50 min-h-screen flex flex-col px-4 py-8">
                {/* 메인 콘텐츠 영역 */}
                <main className="bg-white rounded-lg shadow-lg p-6 mt-8 flex-1">
                    {/* children은 동적으로 들어갈 내용 */}
                    {children}
                </main>
            </div>
        </>
    );
};

export default BasicLayout;
