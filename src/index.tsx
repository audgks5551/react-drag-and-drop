import React from 'react';
import ReactDOM from 'react-dom/client';
import Card from "./Card";
import './index.css';
import Board, {KnightPosition} from "./Board";
import {observe} from "./Game";
import TestApp from "./test/TestApp";
import {RecoilRoot} from "recoil";
console.log("index.tsx");

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <RecoilRoot>
        <TestApp />
    </RecoilRoot>
)

// observe(({knightX, knightY}: KnightPosition) =>
//     root.render(
//         <Board knightPosition={{knightX, knightY}} />
//     )
// );


