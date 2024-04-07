import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SyllabusView from "./Page/SyllabusView";
import SyllabusCreate from "./Page/SyllabusCreate";
import SyllabusList from "./Page/SyllabusList";
import Login from "./components/googleSignIn/Login";
import TrainingProgramList from "./Page/TrainingProgramList";
import ViewProgram from "./Page/ViewProgram";
import CreateTrainingProgram from "./Page/CreateTrainingProgram";
import TrainingClassList from "./Page/TrainingClassList";
import TrainingCalander from "./Page/TrainingCalander";
import UserManagement from "./Page/UserManagement";
import UserPermission from "./Page/UserPermission";
import ClassView from "./Page/ClassView";
import CreateClass from "./Page/CreateClass";

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={() => <Login />} />
                <Route path="/syllabus" component={() => <SyllabusList />} />
                <Route path="/view" component={() => <SyllabusView />} />
                <Route path="/lp" component={() => <SyllabusCreate />} />
                <Route path="/training" component={() => <TrainingProgramList />} />
                <Route path="/program" component={() => <ViewProgram />} />
                <Route path="/create" component={() => <CreateTrainingProgram />} />
                <Route path="/class" component={() => <TrainingClassList />} />
                <Route path="/calender" component={() => <TrainingCalander />} />
                <Route path="/user" component={() => <UserManagement />} />
                <Route path="/permission" component={() => <UserPermission />} />
                <Route path="/class-view" component={() => <ClassView />} />
                <Route path="/class-create" component={() => <CreateClass />} />
                <Redirect from="/" to="/login" />
            </Switch>
        </Router>
    )
}