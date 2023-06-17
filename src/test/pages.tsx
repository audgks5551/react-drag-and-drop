import {atom, selector} from "recoil";

export interface Page {
    id: number;
    title: string;
}

export interface PageKeyValue {
    [key: number]: Page;
}

export interface Tree {
    [id: number]: number[];
}

export interface PagesData {
    pages: PageKeyValue;
    tree: Tree;
}

export const pagesData = atom<PagesData>({
    key: 'pagesData',
    default: {
        pages: {
            0: { id: 0, title: "Container"},
            1: {id: 1, title: "title1"},
            2: {id: 2, title: "title2"},
            3: {id: 3, title: "title3"},
            4: {id: 4, title: "title4"},
            5: {id: 5, title: "title5"},
            6: {id: 6, title: "title6"},
        },
        tree: {
            0: [1, 2],
            1: [3],
            2: [],
            3: [4, 5],
            4: [],
            5: [6],
            6: [],
        },
    },
});

export const PageIdManager = atom<number>({
    key: "PageIdManager",
    default: 6,
})

export const increasePageId = selector<number>({
    key: 'increasePageId',
    get: ({ get }) => {
        return get(PageIdManager) + 1;
    },
    set: ({set, get}, newValue) => {
        return set(PageIdManager, newValue);
    }
})