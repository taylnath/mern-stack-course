import { useState, useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { v1 as uuid } from 'uuid';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getItems, deleteItem, addItem } from '../actions/itemActions';
import PropTypes from 'prop-types'

function ShoppingList (props){
  // const [items, setItems] = useState([
  //   { id: uuid(), name: 'Eggs'},
  //   { id: uuid(), name: 'Milk'},
  //   { id: uuid(), name: 'Steak'},
  //   { id: uuid(), name: 'Water'},
  // ]);
  // const items = props.item;
  const items = useSelector(state => state.item.items);
  console.log(items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <Container>
      {/* <Button 
        color="dark" 
        style={{marginBottom: '2rem'}}
        onClick={() => {
          const name = prompt('Enter Item');
          if (name){
            console.log(name);
            dispatch(addItem(name));
            // dispatch(getItems());
            // dispatch(items => {
            //   console.log("in dispatch");
            //   console.log(items);
            //   return [...items, { id: uuid(), name}];
            // });
          }
        }}
        >
        Add Item
      </Button> */}
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => ( 
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                className="remove-btn"
                color="danger"
                size="small"
                onClick={() => dispatch(deleteItem(_id))}
                >&times;</Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  )
}

// const mapStateToProps = (state) => ({
//   item: state.item
// })

export default ShoppingList;
// export default connect(mapStateToProps, { getItems })(ShoppingList);