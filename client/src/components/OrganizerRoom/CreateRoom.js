import React, { useState } from "react";
import { connect } from "react-redux";
import { createRoom } from "../../actions/orgRoomActions";
import { Container ,Row ,Col ,Button } from "reactstrap";

const CreateRoom = (props) => {
  const [roomName, setRoomName] = useState("");
  const {createRoom,toggle} = props ;

  const handleSubmit = (e) => {
    e.preventDefault();
    createRoom({roomName});
    setRoomName("");
    toggle()
  };

  return (
    <Container className='pb-5'>
      <form onSubmit={handleSubmit}>
        <Row className='justify-content-center'>
          <Col xs='10'>
            <input
              className="createroom-input text-break"
              type="text"
              name="roomName"
              placeholder="ENTER ROOM NAME"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
            />    
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col xs='10' md='5' className='text-center mt-4'>
            <Button type="submit" value="Submit" className="btn btn-dark org-btn">
              CREATE
            </Button>
          </Col>

          <Col xs='10' md='5' className='text-center mt-4'>
            <Button type='button' onClick={toggle} className="btn btn-dark org-btn">
                CANCEL
            </Button>
          </Col>
        </Row> 
      </form>
    </Container>
  );
};

export default connect(null, { createRoom })(CreateRoom);
