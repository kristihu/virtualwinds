import Chart from "react-google-charts";
import { useState, useEffect } from "react";

const Gantt = () => {
  const [tasks, setTasks] = useState(null);
  const testiData = [];

  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data, "dataaaddd");
        setTasks(data);
      });
  }, []);
  console.log(tasks, "ganttask");

  return (
    <div>
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="Gantt"
        loader={<div>Loading Chart</div>}
        data={[
          [
            { type: "string", label: "Task ID" },
            { type: "string", label: "Task Name" },
            { type: "string", label: "Resource" },
            { type: "date", label: "Start Date" },
            { type: "date", label: "End Date" },
            { type: "number", label: "Duration" },
            { type: "number", label: "Percent Complete" },
            { type: "string", label: "Dependencies" },
          ],
          [
            "1",
            "Replacing old pipes",
            null,
            new Date(2014, 5, 22),
            new Date(2014, 5, 25),
            null,
            0,
            null,
          ],
          [
            "Replacing ventilation machine",
            "Replacing ventilation machine",
            null,
            new Date(2014, 5, 21),
            new Date(2014, 5, 26),
            null,
            0,
            null,
          ],
          [
            "Installation of gas cylinder machine",
            "Installation of gas cylinder machine",
            null,
            new Date(2014, 5, 21),
            new Date(2014, 5, 23),
            null,
            100,
            null,
          ],
        ]}
        options={{
          height: 400,
          gantt: {
            trackHeight: 30,
          },
        }}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
};

export default Gantt;
