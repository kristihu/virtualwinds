import "./App.css";

import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Newtask from "./Newtask";
import TaskDetails from "./TaskDetails";
import Gantt from "./Gantt";
import Navigation from "./Navigation";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/newtask">
              <Newtask />
            </Route>
            <Route path="/tasks/:id">
              <TaskDetails />
            </Route>
            <Router path="/gantt">
              <Gantt />
            </Router>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
