import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history, Role } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { AdminPage } from '@/AdminPage';
import { LoginPage } from '@/LoginPage';
import {InstructorPage} from "@/InstructorPage/InstructorPage";
import {SignUpPage} from "@/SignUpPage";
import {StudentPage} from "@/StudentPage";


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false,
            isInstructor: false,
            isStudent: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin,
            isInstructor: x && x.role === Role.Instructor,
            isStudent: x && x.role === Role.User
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser, isAdmin, isInstructor, isStudent } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                {isInstructor && <Link to="/instructor" className="nav-item nav-link">Instructor Dashboard</Link>}
                                {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin Dashboard</Link>}
                                {isStudent && <Link to="/student" className="nav-item nav-link">Student Dashboard</Link>}
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    }
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
                                    <PrivateRoute path="/instructor" roles={[Role.Instructor]} component={InstructorPage} />
                                    <PrivateRoute path="/student" roles={[Role.User]} component={StudentPage} />
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/signup" component={SignUpPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export { App }; 