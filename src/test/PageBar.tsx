import {useRecoilState} from "recoil";
import {increasePageId, Page, pagesData} from "./pages";

interface PageBarProps {
    page: Page;
}

const PageBar = ({ page }: PageBarProps) => {
    console.log("pageBar");
    const [{pages, tree}, setPagesData] = useRecoilState(pagesData);
    const [autoIncrementId, setAutoIncrementId] = useRecoilState(increasePageId);

    const subPages = (tree[page.id] || []).map(
        (id) => pages[id]
    );

    const createHandler = (pageId: number) => {
        console.log("작동");

        const copyPages = {
            ...pages,
            [autoIncrementId]: {id: autoIncrementId, title: `title${autoIncrementId}`}
        };
        setPagesData({
            pages: copyPages,
            tree: {
                ...tree,
                [pageId] : [...tree[pageId] , autoIncrementId],
                [autoIncrementId]: [],
            },
        })
        setAutoIncrementId(autoIncrementId);
    }

    return <div className="bg-red-400 p-1">
        {page.id === 0 ? <div>
                <div>
                    <button className="p-2 border rounded ml-2" onClick={() => createHandler(page.id)}>페이지 생성</button>
                </div>
            </div> :
            <div className="bg-white p-2 my-1 flex items-center">
                <div>{page.title}</div>
                <div>
                    <button className="p-2 border rounded ml-2" onClick={() => createHandler(page.id)}>생성</button>
                    <button className="p-2 border rounded ml-2">삭제</button>
                </div>
            </div>}
        {subPages.map((subPage) => (
            <div key={subPage.id} className="ml-4 p-1 my-1 bg-gray-600">
                <PageBar key={subPage.id} page={subPage} />
            </div>
        ))}
    </div>
}

export default PageBar;