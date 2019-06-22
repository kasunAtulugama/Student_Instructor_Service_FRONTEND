import React, { Component } from 'react';
import axios from 'axios';

class SignUpPage extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeFirstName=this.onChangeFirstName.bind(this);
        this.onChangeLastName=this.onChangeLastName.bind(this);
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);

        this.onSubmit=this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            role: ''
        }
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const users={
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            username:this.state.username,
            password:this.state.password,
            role: 'User'
        };


        axios.post('http://localhost:4000/users/signup',users)
            .then(res=>console.log(res));

        this.setState({
            firstName: '',
            lastName: '',
            username: '',
            password: ''
        });


        this.props.history.push('/');
    }

    render() {
        return (
            <div style={{ marginTop: 20 }}>

                <h3 className="text-primary">Student SignUp</h3>

                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>First Name:</label>
                        <input type="text" className="form-control"
                               value={this.state.firstName}
                               onChange={this.onChangeFirstName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Last Name:</label>
                        <input type="text" className="form-control"
                               value={this.state.lastName}
                               onChange={this.onChangeLastName}
                        />
                    </div>


                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" className="form-control"
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control"
                               value={this.state.password}
                               onChange={this.onChangePassword}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Signup" className="btn btn-primary" />
                    </div>

                </form>




            </div>
        )
    }

}

export { SignUpPage };