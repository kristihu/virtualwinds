import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

const Modaali = ({ show, handleClose, selectedValue }) => {
  const [comment, setComment] = useState([]);
  const [startDate, setStartDate] = useState();

  const handleComments = (e) => {
    e.preventDefault();

    const comments = [...selectedValue.comments, comment];

    const task = { ...selectedValue, comments };

    fetch("http://localhost:8000/tasks/" + selectedValue.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then(() => {
      console.log("new comment added");
      handleClose();
    });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedValue.taskName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Description: <p>{selectedValue.desc}</p>
          Startdate: <DatePicker value={selectedValue.startDate} />
          EndDate:
          <DatePicker
            onChange={(date) => setStartDate(date)}
            value={selectedValue.endDate}
          />
        </Modal.Body>
        <Modal.Footer>
          <a href={selectedValue.link}>Link to eSite</a>

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
              {selectedValue.comments.map((comment) => (
                <li key={comment}>{comment}</li>
              ))}
            </ul>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modaali;
