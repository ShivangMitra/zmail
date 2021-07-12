import { BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Signup from "./Signup";
import Dashboard from "../components/Dashboard"
import Login from "../components/Login"
import PrivateRoute from "./PrivateRoute";
import Mail from "../components/Mail"
import History from "./History";
// import ForgotPassword from "./ForgotPassword";
// import UpdateProfile from "./UpdateProfile";

import './App.css';

function App() {
  return (

          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard}/>
              <PrivateRoute path="/mails" component={Mail} />
              <PrivateRoute path="/history" component={History} />
              {/* <PrivateRoute path="/update-profile" component={UpdateProfile}/> */}
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
              {/* <Route path="/forgot-password" component={ForgotPassword}/> */}
            </Switch>
        </Router>

  );
}

export default App;
