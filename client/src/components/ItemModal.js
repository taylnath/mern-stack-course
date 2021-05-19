import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { addItem } from '../actions/itemActions';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { v1 as uuid } from 'uuid';

function ItemModal (){
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = e => {
    setName(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();

    const newItem = {
      // id: uuid(),
      name: name
    }

    // add item via addItem action
    dispatch(addItem(newItem));

    // close modal
    toggle();
  };

  return (
    <div>
      <Button
      color="dark"
      style={{marginBottom: '2rem'}}
      onClick={toggle}
      >Add Item</Button>

      <Modal
      isOpen={modal}
      toggle={toggle}
      >
        <ModalHeader toggle={toggle}>
          Add To Shopping List
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label htmlFor="item"></Label>
              <Input
              type="text"
              name="name"
              id="item"
              placeholder="Add shopping item"
              onChange={onChange}
              />
              <Button 
                color="dark"
                style={{marginTop: '2rem'}}
                block
              >Add Item</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ItemModal;