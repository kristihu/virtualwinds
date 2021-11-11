import React from "react";
import { Card, Button, Container, Row } from "react-bootstrap";

const Cardlist = ({ tasks, handleDelete, openModal }) => {
  console.log("tasksList", tasks);

  return (
    <>
      <Container>
        <Row>
          {tasks.map((task) => (
            <Card key={task.id} style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://source.unsplash.com/user/erondu/600x400"
              />
              <Card.Body>
                <Card.Title>{task.name}</Card.Title>
                <Card.Text>{task.name}</Card.Text>
                <Button
                  id={task.id}
                  variant="primary"
                  onClick={() => handleDelete(task.id)}
                >
                  Go somewhere
                </Button>
                <Button onClick={() => openModal(task)}>... </Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>{" "}
    </>
  );
};

export default Cardlist;
