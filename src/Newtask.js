import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
const Newtask = () => {
  const [taskName, setTaskName] = useState("");
  const [desc, setDesc] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [link, setLink] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const comments = [];
    const task = { taskName, desc, startDate, endDate, link, comments };
    fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then(() => {
      console.log("new task added");
      alert("a New task has been added");
      history.push("/");
    });
  };

  return (
    <div className="newtask">
      <h2>Add a new task</h2>
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Task name</Form.Label>
          <Form.Control
            onChange={(e) => setTaskName(e.target.value)}
            value={taskName}
            type="text"
            placeholder="Task Name"
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          placeholder="Description"
          controlId="exampleForm.ControlTextarea1"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        >
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Link</Form.Label>
          <Form.Control
            onChange={(e) => setLink(e.target.value)}
            value={link}
            type="text"
            placeholder="Link to eSite"
          />
        </Form.Group>
        <Form.Group>
          Start Date:
          <DatePicker
            value={startDate}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </Form.Group>
        Due Date:
        <Form.Group>
          <DatePicker
            value={endDate}
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </Form.Group>
        <Button type="submit">Add new task</Button>
      </form>
    </div>
  );
};

export default Newtask;
