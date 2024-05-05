import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "../components/googleSignIn/Login";
import SyllabusList from "../../src/page/SyllabusList";
import TrainingProgramList from "../page/TrainingProgramList";
import ViewProgram from "../page/ViewProgram";
import CreateTrainingProgram from "../page/CreateTrainingProgram";
import TrainingClassList from "../page/TrainingClassList";
import TrainingCalander from "../page/TrainingCalander";
import UserManagement from "../page/UserManagement";
import UserPermission from "../page/UserPermission";
import ClassView from "../page/ClassView";
import CreateClass from "../page/CreateClass";
import SyllabusView from "../page/SyllabusView";
import SyllabusCreate from "../page/SyllabusCreate";
import MaterialList from "../page/MaterialList";
import UserPermissionView from "../page/UserPermissionView";

export const Routes = () => {

    const accessRole = localStorage.getItem('role');

    return (
        <Router>
            <Switch>
                <Route path="/login" component={() => <Login />} />
                {!(accessRole === 'GUEST' || accessRole === null) && (
                    <>
                        <Route path="/syllabus" component={() => <SyllabusList />} />
                        <Route path="/lp" component={() => <SyllabusCreate />} />
                        <Route path="/training" component={() => <TrainingProgramList />} />
                        <Route path="/program/:id" component={() => <ViewProgram />} />
                        <Route path="/class" component={() => <TrainingClassList />} />
                        <Route path="/calender" component={() => <TrainingCalander />} />
                        <Route path="/class-view/:id" component={() => <ClassView />} />
                        <Route path="/view/:id" component={() => <SyllabusView />} />
                        <Route path="/material" component={() => <MaterialList />} />
                        {(accessRole === 'SUPER_ADMIN') && (
                            <Route path="/permission-update" component={() => <UserPermission />} />
                        )}
                        {!(accessRole === 'GUEST' || accessRole === 'STUDENT') && (
                            <>
                                <Route path="/permission" component={() => <UserPermissionView />} />
                                <Route path="/create" component={() => <CreateTrainingProgram />} />
                                <Route path="/class-create" component={() => <CreateClass />} />
                                <Route path="/user" component={() => <UserManagement />} />
                            </>
                        )}
                    </>

                )}
                <Redirect from="/" to="/login" />
            </Switch>
        </Router>
    )
}