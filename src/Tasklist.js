import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Modaali from "./Modaali";

const Tasklist = ({ tasks }) => {
  console.log("tasklististä", tasks);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    console.log(id);
    setShow(true);
    setSelected(id);
    setSelectedValue(tasks.find((task) => task.id === id));
  };

  console.log("selectedValue", selectedValue);

  return (
    <div>
      <Container>
        <Row>
          {tasks.map((task) => (
            <Col sm key={task.id}>
              <div>
                <Card className="task-card">
                <Card.Img style={{height:'180px', width:'286px'}} variant="top" src={task.imageURL}/>
                  <Card.Body>
                    <Card.Title style={{height:"3rem", textAlign:"left"}}>{task.taskName}</Card.Title>
                    <Card.Text style={{textAlign:"left"}}>Description: <span style={{color:"gray", display:"block"}}>{task.desc}</span></Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    {/* <Button onClick={() => handleDelete(task.id)}>Delete</Button>{" "} */}
                    <Button
                      onClick={() => handleShow(task.id)}
                      variant="dark"
                      style={{width:"100%"}}
                    >
                      Edit
                    </Button>
                  </Card.Footer>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      {selectedValue && (
        <Modaali
          show={show}
          handleClose={handleClose}
          selectedValue={selectedValue}
        />
      )}
    </div>
  );
};

export default Tasklist;
