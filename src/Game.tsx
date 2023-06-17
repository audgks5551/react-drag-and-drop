import {KnightPosition} from "./Board";

console.log("Game.tsx");

let knightPosition: KnightPosition = {knightX: 0, knightY: 0};

let observer: ({knightX, knightY}: KnightPosition) => void = () => {}

function emitChange() {
    observer(knightPosition)
}

export function observe(o: ({knightX, knightY}: KnightPosition) => void) {
    observer = o;
    emitChange()
}

export function moveKnight({knightX, knightY}: KnightPosition) {
    knightPosition = {knightX, knightY}
    emitChange()
}

export const ItemTypes = {
    KNIGHT: 'knight'
}

export function canMoveKnight({knightX, knightY}:KnightPosition) {
    const dx = knightX - knightPosition.knightX
    const dy = knightY - knightPosition.knightY

    return (
        (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
        (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    )
}