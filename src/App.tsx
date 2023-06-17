import React from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const App = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            /* Your Drag-and-Drop Application */
        </DndProvider>
    );
}

export default App;