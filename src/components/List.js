import React from 'react';
import MainCard from './MainCard';
import ActionButton from './ActionButton';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const ListContainer = styled.div`
    background-color: #dfe3e6;
    border-radius: 3px;
    width: 300px;
    padding: 6px;
    height: 100%;
    margin-right: 8px;
`;


const List = ({title, cards, listID, index}) => {
  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provided) => (
        <ListContainer
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listID)}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h4>{title}</h4>
                {cards.map((card, index) => (
                  <MainCard
                    key={card.id}
                    index={index}
                    text={card.text}
                    id={card.id}
                  />
                ))}
                <ActionButton listID={listID} />
                {provided.placeHolder}
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  );
};

export default List
