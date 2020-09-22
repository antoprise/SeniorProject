import React, { useState } from "react";
import { connect } from "react-redux";
import { joinRoom } from "../../actions/roomActions";
import { Container ,Row ,Col ,Button } from "reactstrap";

const JoinRoom = (props) => {
    const [roomCode, setRoomCode] = useState("");
    const {
      joinRoom,
      toggle
    } = props ;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        joinRoom(roomCode);
        setRoomCode("");
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
                  name="roomCode"
                  placeholder="ENTER ROOM CODE"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  required
                />    
              </Col>
            </Row>
            <Row className='justify-content-center'>
              <Col xs='10' md='5' className='text-center mt-4'>
                <Button type="submit" value="Submit" className="btn btn-dark org-btn">
                  JOIN
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

}

export default connect(null, { joinRoom })(JoinRoom);