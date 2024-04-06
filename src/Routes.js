import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SyllabusView from "./Page/SyllabusView";
import SyllabusCreate from "./Page/SyllabusCreate";
import SyllabusList from "./Page/SyllabusList";
import Login from "./components/googleSignIn/Login";
import TrainingProgramList from "./Page/TrainingProgramList";
import ViewProgram from "./Page/ViewProgram";
import CreateTrainingProgram from "./Page/CreateTrainingProgram";

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/syllabus" component={() => <SyllabusList />} />
                <Route path="/view" component={() => <SyllabusView />} />
                <Route path="/lp" component={() => <SyllabusCreate />} />
                <Route path="/training" component={() => <TrainingProgramList />} />
                <Route path="/program" component={() => <ViewProgram />} />
                <Route path="/create" component={() => <CreateTrainingProgram />} />
                <Redirect from="/" to="/login" />
            </Switch>
        </Router>
    )
}