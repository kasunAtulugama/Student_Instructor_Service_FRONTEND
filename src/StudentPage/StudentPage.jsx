import React from 'react';
import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';
import {forEach} from "react-bootstrap/es/utils/ElementChildren";
import {Link} from "react-router-dom";
import {userLoggedIn} from "../../actions/auth";

import { userService } from '@/_services';

class StudentPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
            assignments : [],
            selectedAssignment: ""
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
        let studentid = "IT16173064"; // Here you should get the loged in students id and assign it to the studentid variable from session
        //let date = new Date();
        //let curdate=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();

        fetch("http://localhost:4000/assignments/"+studentid).
        then((res) => {return res.json()}).
        then(data => {
            let assignmentsL = data.map(assignment => { return { value: assignment.module_name+"-"+assignment.assignment_name+"-"+assignment.start_date+"-"+assignment.duedate - assignment.assignmentFile} })
            this.setState({ assignments: assignmentsL});
        }).
        catch(error =>  {
            console.log(error);
        });
    }

    uploadFile = () => {
        const data = {
            assignmentname: "DS - ESB",
            studentid: "IT16173064" //Should came from session
        }
        this.props.history.push("/uploadAssignmentAnswer", {...data});
    }

    render() {
        const { users } = this.state;
        return (
            <ul>
                {this.state.assignments.map((assignment, i) => <ol><Link className="form-control" to="/uploadAssignmentAnswer" onClick={this.uploadFile} key={i} value={assignment.value}>{assignment.display}</Link></ol>)                }
            </ul>
        );
    }
}

export { StudentPage };