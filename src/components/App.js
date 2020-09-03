import React, { Component } from 'react';
import List from '../components/List';
import { connect, Provider } from 'react-redux';
import  ActionButton from './ActionButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort } from '../actions';
import styled from 'styled-components';


const ListContainer = styled.div`
     display: flex;
    flex-direction: row;
`;

class App extends Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  constructor(props) {
    super(props);
    this.state = { apiResponse: '' };
  }
  callAPI() {
    fetch('http://localhost:9000/testAPI')
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }
  componentDidMount() {
    this.callAPI();
  }

  render() {
    const { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
          <p className="App-intro">{this.state.apiResponse}</p>
          <h2>Title</h2>
          <Droppable
            droppab
            leId="all-lists"
            direction="horizontal"
            type="list"
          >
            {(provided) => (
              <ListContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists.map((list, index) => (
                  <List
                    listID={list.id}
                    key={list.id}
                    title={list.title}
                    cards={list.cards}
                    index={index}
                  />
                ))}
                {provided.placeholder}
                <ActionButton list />
              </ListContainer>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}



const mapStateToProps = (state) => ({
  lists: state.lists,
});

export default connect (mapStateToProps) (App);
