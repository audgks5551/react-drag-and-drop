import React, {ReactNode} from 'react'
console.log("Square.tsx");

interface SquareProps {
    black: boolean;
    children: ReactNode;
}

const Square = ({ black, children }: SquareProps) => {
    const fill = black ? 'black' : 'white'
    const stroke = black ? 'white' : 'black'

    return (
        <div
            className="w-full h-full"
            style={{
                backgroundColor: fill,
                color: stroke,
            }}
        >
            {children}
        </div>
    );
}

export default Square;