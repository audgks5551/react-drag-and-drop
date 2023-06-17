import React, { useState } from 'react';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';

interface Post {
    id: number;
    title: string;
    content: string;
}

interface KeyValuePost {
    [key: number]: Post;
}

interface PostOrder {
    id: number;
    sequence: number;
    subPostOrders: PostOrder[];
}

interface InitData {
    posts: KeyValuePost;
    postOrders: PostOrder[];
}
const App1 = () => {
    const initData : InitData = {
        posts: {
            1: {id: 1, title: "title1", content: "content1"},
            2: {id: 2, title: "title2", content: "content2"},
            3: {id: 3, title: "title3", content: "content3"},
            4: {id: 4, title: "title4", content: "content4"},
            5: {id: 5, title: "title5", content: "content5"},
            6: {id: 6, title: "title6", content: "content6"},
            7: {id: 7, title: "title7", content: "content7"},
        },
        postOrders: [
            {id: 3, sequence: 0, subPostOrders: [
                    {id: 6, sequence: 0, subPostOrders: []},
                ]},
            {id: 2, sequence: 1, subPostOrders: [
                    {id: 5, sequence: 0, subPostOrders: []},
                ]},
            {id: 1, sequence: 2, subPostOrders: [
                    {id: 4, sequence: 0, subPostOrders: []},
                    {id: 7, sequence: 1, subPostOrders: []},
                ]},
        ]
    }

  const handleDragEnd = (result: DropResult) => {
    console.log(result);
  }

  return (
     <DragDropContext onDragEnd={handleDragEnd}>
       <Droppable droppableId="-1" isCombineEnabled={true} >
         {(provided, snapshot) => (
             <div {...provided.droppableProps} ref={provided.innerRef} className="bg-amber-500">
                 {initData.postOrders.map((postOrder) => (
                     <Draggable draggableId={postOrder.id+""} index={postOrder.id} key={postOrder.id} isDragDisabled={snapshot.isDraggingOver}>
                         {(provided, snapshot) => {
                             return (
                                 <div
                                     className="bg-red-400"
                                     {...provided.draggableProps}
                                     {...provided.dragHandleProps}
                                     ref={provided.innerRef}
                                 >
                                     <div className="my-2">
                                         {initData.posts[postOrder.id].title}
                                     </div>
                                     <div>
                                         {postOrder.subPostOrders.map((postOrder) => {
                                             return (
                                                 <Draggable draggableId={postOrder.id+""} index={postOrder.id} key={postOrder.id}
                                                            isDragDisabled={snapshot.isDragging}
                                                 >
                                                     {(provided, snapshot) => {
                                                         return (
                                                             <div {...provided.draggableProps}
                                                                  {...provided.dragHandleProps}
                                                                  ref={provided.innerRef}
                                                                  className="ml-4">
                                                                 {initData.posts[postOrder.id].title}
                                                             </div>
                                                         );
                                                     }}
                                                 </Draggable>
                                             );
                                         })}
                                     </div>



                                     {/*<Droppable droppableId={postOrder.id+""} isCombineEnabled={true}*/}
                                     {/*           direction={"vertical"} type={`child-${postOrder.id}`}*/}
                                     {/*>*/}
                                     {/*    {(provided, snapshot) => (*/}
                                     {/*        <div {...provided.droppableProps} ref={provided.innerRef} className="bg-blue-400">*/}
                                     {/*            {postOrder.subPostOrders.map((postOrder) => {*/}
                                     {/*                return (*/}
                                     {/*                    <Draggable draggableId={postOrder.id+""} index={postOrder.sequence} key={postOrder.id}*/}
                                     {/*                    >*/}
                                     {/*                        {(provided, snapshot) => {*/}
                                     {/*                            return (*/}
                                     {/*                                <div {...provided.draggableProps}*/}
                                     {/*                                     {...provided.dragHandleProps}*/}
                                     {/*                                     ref={provided.innerRef}*/}
                                     {/*                                     className="ml-4">*/}
                                     {/*                                    */}
                                     {/*                                </div>*/}
                                     {/*                            );*/}
                                     {/*                        }}*/}
                                     {/*                    </Draggable>*/}
                                     {/*                );*/}
                                     {/*            })}*/}
                                     {/*            {provided.placeholder}*/}
                                     {/*        </div>*/}
                                     {/*    )}*/}
                                     {/*</Droppable>*/}
                                 </div>
                             );
                         }}
                     </Draggable>
                 ))}
                 {provided.placeholder}
             </div>
         )}
       </Droppable>
     </DragDropContext>
  );
};

export default App1;