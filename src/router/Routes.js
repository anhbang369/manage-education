import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Login } from "../components/googleSignIn/Login";
import { SyllabusList } from "../page/SyllabusList";
import { TrainingProgramList } from "../page/TrainingProgramList";
import { ViewProgram } from "../page/ViewProgram";
import { CreateTrainingProgram } from "../page/CreateTrainingProgram";
import { TrainingClassList } from "../page/TrainingClassList";
import { TrainingCalander } from "../page/TrainingCalander";
import { UserManagement } from "../page/UserManagement";
import { UserPermission } from "../page/UserPermission";
import { ClassView } from "../page/ClassView";
import { CreateClass } from "../page/CreateClass";
import { SyllabusView } from "../page/SyllabusView";
import { SyllabusCreate } from "../page/SyllabusCreate";

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={() => <Login />} />
                <Route path="/syllabus" component={() => <SyllabusList />} />
                <Route path="/lp" component={() => <SyllabusCreate />} />
                <Route path="/training" component={() => <TrainingProgramList />} />
                <Route path="/program/:id" component={() => <ViewProgram />} />
                <Route path="/create" component={() => <CreateTrainingProgram />} />
                <Route path="/class" component={() => <TrainingClassList />} />
                <Route path="/calender" component={() => <TrainingCalander />} />
                <Route path="/user" component={() => <UserManagement />} />
                <Route path="/permission" component={() => <UserPermission />} />
                <Route path="/class-view/:id" component={() => <ClassView />} />
                <Route path="/class-create" component={() => <CreateClass />} />
                <Route path="/view/:id" component={() => <SyllabusView />} />
                <Redirect from="/" to="/login" />
            </Switch>
        </Router>
    )
}