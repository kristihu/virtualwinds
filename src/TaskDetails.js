import React from "react";
import { useParams } from "react-router-dom";

const TaskDetails = ({ tasks }) => {
  const { id, taskName } = useParams();
  console.log(tasks, "sinkku");

  return (
    <div>
      <h2>{id}</h2>
      <p>{taskName}</p>
    </div>
  );
};

export default TaskDetails;
