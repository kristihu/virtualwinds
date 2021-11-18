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
          <b>Description:</b> <p>{selectedValue.desc}</p>
          <p><b>Startdate:</b> <DatePicker value={selectedValue.startDate}/></p>
          <p><b>EndDate:</b>
          <DatePicker
            onChange={(date) => setStartDate(date)}
            value={selectedValue.endDate}
          /></p>
          <p><b>Link to esite:</b> <a href={selectedValue.link}>To esite</a></p>
          <div style={{textAlign:"left"}}>
            <form style={{margin:"0em"}} onSubmit={handleComments}>
            <label>
              <textarea
                type="text"
                name="name"
                cols="45"
                rows="3"
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
            <br />
            <input className="add-comment-btn" type="submit" value="Add comment" />
          </form>
          </div>
        </Modal.Body>
        <Modal.Footer>



          <div style={{margin:"auto", marginTop:"1rem"}} >
            <Button style={{margin:"0.25em"}} variant="secondary">Discard Changes</Button>
            <Button style={{margin:"0.25em"}} variant="dark" onClick={handleClose}>
            Save Changes
          </Button>
          </div>
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
