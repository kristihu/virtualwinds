import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

const Modaali = ({ show, tasks, handleClose, selected }) => {
  const [comment, setComment] = useState([]);
  const [startDate, setStartDate] = useState();

  const handleComments = (e) => {
    e.preventDefault();

    const comments = [...tasks[selected].comments, comment];

    const task = { comment };

    fetch("http://localhost:8000/comments/" + selected, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then(() => {
      console.log("new comment added");
    });
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {selected && (
            <Modal.Title>{tasks[selected - 1].taskName}</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          Description: {selected && <p>{tasks[selected - 1].desc}</p>}
          Startdate:{" "}
          {selected && <DatePicker value={tasks[selected - 1].startDate} />}
          EndDate:
          {selected && (
            <DatePicker
              onChange={(date) => setStartDate(date)}
              value={tasks[selected - 1].endDate}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          {selected && <a href={tasks[selected - 1].link}>Link to eSite</a>}

          <form onSubmit={handleComments}>
            <label>
              <input
                type="text"
                name="name"
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
            <input type="submit" value="add comment" />
          </form>

          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
          <div className="commentSection">
            <ul>
              <li>{tasks[0].comments}</li>
            </ul>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modaali;
