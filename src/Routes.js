import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SyllabusView from "./Page/SyllabusView";
import SyllabusCreate from "./Page/SyllabusCreate";
import SyllabusList from "./Page/SyllabusList";
import Login from "./components/googleSignIn/Login";

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/syllabus" component={() => <SyllabusList />} />
                <Route path="/view" component={() => <SyllabusView />} />
                <Route path="/lp" component={() => <SyllabusCreate />} />
                <Redirect from="/" to="/login" />
            </Switch>
        </Router>
    )
}