import Chart from "react-google-charts";
import { useState, useEffect } from "react";

/*
{
    "taskName": "Replacing old pipes",
    "desc": "The task is to replace old pipes at a factory with new pipes",
    "startDate": "2021-11-10",
    "endDate": "2021-11-10",
    "link": "https://mekro.esitevr.com/mekroswiecie/?fov=150.0&vlon=5.99&vlat=-0.24&image=4334158958398892",
    "id": 1
  }  */

const formatData = (data) => {
  const [startYear, startMonth, startDate] = data.startDate.split("-");
  const [endYear, endMonth, endDate] = data.endDate.split("-");
  return [
    data.id,
    data.taskName,
    null,
    new Date(startYear, startMonth - 1, startDate),
    new Date(endYear, endMonth - 1, endDate),
    null,
    null,
    null,
  ];
};

const Gantt = () => {
  const [tasks, setTasks] = useState(null);
  const [formattedData, setFormattedData] = useState([]);
  const testiData = [];

  const headerData = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  const myData = [
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
  ];

  const data = [headerData, ...formattedData];

  console.log("oikein data?", formattedData);

  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data, "dataaaddd");
        setFormattedData(data.map(formatData));
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
        data={data}
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
