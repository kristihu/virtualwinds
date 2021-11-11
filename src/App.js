import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Modal, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import Cardlist from "./components/Cardlist";
import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [tasks, setTasks] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState("1");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("http://localhost:8000/list")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data, "data");
        setTasks(data);
      });
  }, []);

  const handleDelete = (id) => {
    console.log("clicked", id);
    const newTasks = tasks.filter((task) => task.id !== id);
    console.log(newTasks, "newtas");
    setTasks(newTasks);
  };

  const openModal = (task) => {
    console.log(task, "TASKIVI");

    setSelectedTask(task.id);
    setShow(true);
  };

  const openModal2 = (task) => {
    console.log(task);
    setShow(true);
  };

  const newTask = () => {
    return <div></div>;
  };

  return (
    <Router>
      <div className="App">
        <Nav />

        <h1>Managing virtual winds</h1>
        <Container>
          <Switch>
            <Route path="/">
              <Row>
                <Col sm={12}>
                  {tasks && (
                    <Cardlist
                      tasks={tasks}
                      handleDelete={handleDelete}
                      openModal={openModal}
                    />
                  )}
                </Col>
              </Row>

              <Button onClick={() => openModal2(newTask)}>Add new Task</Button>
            </Route>
          </Switch>
        </Container>
        <>
          <Modal dialogClassName="my-modal" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              {tasks && (
                <Modal.Title>{tasks[selectedTask - 1].name}</Modal.Title>
              )}
            </Modal.Header>
            {tasks && (
              <Modal.Body>
                {tasks[selectedTask - 1].category} <br />{" "}
                <a href={tasks[selectedTask - 1].link}>Link to eSite</a>
              </Modal.Body>
            )}
            <Modal.Footer>
              <input></input>

              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    </Router>
  );
}

export default App;
