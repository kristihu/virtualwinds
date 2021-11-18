import React from "react";
import { useState, useEffect } from "react";
import Tasklist from "./Tasklist";

import Gantt from "./Gantt";
import TaskDetails from "./TaskDetails";

const Home = () => {
  const [tasks, setTasks] = useState(null);

  //   const handleDelete = (id) => {
  //     const newTasks = tasks.filter((task) => task.id !== id);
  //     setTasks(newTasks);
  //   };

  const handleClick = (e) => {
    console.log("hello", e);
  };

  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((res) => {
        if (!res.ok) {
          throw Error("Fetching the data failed");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, "dataaa");
        setTasks(data);
      })
      .catch((err) => {
        console.log(err.message, "error:");
      });
  }, []);
  // const handleClickAgain = (name) => {console.log('hello', name)}

  return (
    <>
      <div>{tasks && <Tasklist tasks={tasks} />}</div>
      <div>{tasks && <TaskDetails tasks={tasks} />}</div>
    </>
  );
};

export default Home;
