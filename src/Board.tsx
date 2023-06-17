import React, {ReactNode} from "react";
import Square from "./Square";
import Knight from "./Knight";
import {canMoveKnight, ItemTypes, moveKnight} from "./Game";
import {DndProvider, useDrag, useDrop} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

console.log("Board.tsx");

interface BoardProps {
    knightPosition: KnightPosition;
}

interface RenderSquareProps {
    i: number;
    knightPosition: KnightPosition;
}

export interface KnightPosition {
    knightX: number;
    knightY: number;
}

function renderSquare({i, knightPosition}: RenderSquareProps) {
    const x = i % 8
    const y = Math.floor(i / 8)

    return (
        <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
            <BoardSquare knightPosition={{knightX: x, knightY: y}}>
                {renderPiece({knightX: x, knightY: y}, knightPosition)}
            </BoardSquare>
        </div>
    )
}

function renderPiece({knightX: x, knightY: y}: KnightPosition, {knightX, knightY}: KnightPosition) {
    if (x === knightX && y === knightY) {
        return <Knight />
    }
}

interface BoardSquare {
    knightPosition: KnightPosition;
    children: ReactNode;
}

export function BoardSquare({knightPosition ,children}: BoardSquare) {
    const black = (knightPosition.knightX + knightPosition.knightY) % 2 === 1

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: ItemTypes.KNIGHT,
        canDrop: () => canMoveKnight(knightPosition),
        drop: () => moveKnight(knightPosition),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }), [knightPosition.knightX, knightPosition.knightY])

    return (
        <div
            ref={drop}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <Square black={black}>{children}</Square>
            {isOver && !canDrop && <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'red',
                }}
            />}
            {!isOver && canDrop && <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                }}
            />}
            {isOver && canDrop && <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'green',
                }}
            />}
        </div>
    )
}

const Board = ({ knightPosition }: BoardProps) => {

    const squares = []
    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare({i, knightPosition}))
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexWrap: 'wrap'
                }}
            >
                {squares}
            </div>
        </DndProvider>

    )
}

export default Board;