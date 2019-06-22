import React from 'react';

import { userService } from '@/_services';

class StudentPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { users } = this.state;
        return (
            <div>
                <h1>Student Dasboard</h1>
                <p>This page can only be accessed by Student.</p>
                <div>
                    Student enrolled courses
                    {users &&
                    <ul>
                        {users.map(user =>
                            <li key={user.id}>{user.firstName} {user.lastName}</li>
                        )}
                    </ul>
                    }
                </div>
            </div>
        );
    }
}

export { StudentPage };