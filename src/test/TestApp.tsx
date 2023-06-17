import React from "react";
import PageBar from "./PageBar";
import {useRecoilState} from "recoil";
import {pagesData} from "./pages";

const TestApp = () => {
    const [{pages, tree},] = useRecoilState(pagesData);
    return (
        <div className="bg-sky-400 p-2 m-2">
            <PageBar key={0} page={pages[0]}/>
        </div>
    );
}

export default TestApp;