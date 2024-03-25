import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SyllabusView from "./Page/SyllabusView";
import SyllabusCreate from "./Page/SyllabusCreate";
import SyllabusList from "./Page/SyllabusList";
import Login from "./components/googleSignIn/Login";

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <SyllabusList></SyllabusList>
                </Route>
                <Route path="/syllabus">
                    <SyllabusView></SyllabusView>
                </Route>
                <Route>
                    <Login></Login>
                </Route>
            </Switch>
        </Router>
    )
}