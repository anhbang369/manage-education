import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SyllabusView from "./Page/SyllabusView";
import SyllabusCreate from "./Page/SyllabusCreate";
import SyllabusList from "./Page/SyllabusList";

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
                    <SyllabusCreate></SyllabusCreate>
                </Route>
            </Switch>
        </Router>
    )
}