import React from 'react';
import axios from 'axios';
import { userService } from '@/_services';

class UploadPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
            selectedFile: null,
            dashStudent: this.props.location.state,
            fileName: ""
        };
    }

    handleChanges=event=>{
        console.log(event.target.files[0]);

        this.setState({
            selectedFile:event.target.files[0],
            fileName:event.target.files[0].name,
            loaded: 0,
        });
        console.log(event.target.files[0].name);
    }

    uploadAssignment = () => {
        const data = new FormData();

        let stid = "IT16173064"; // Here you should get the loged in students id and assign it to the studentid variable
        let date = new Date();
        let curdate=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
        let assignName = "DS - EJB";//this.state.dashStudent.assignment_name

        data.append('studentid',stid);
        data.append('assignmentname',assignName);
        data.append('date',curdate);
        data.append('filename',this.state.fileName);
        data.append('ploadFile',this.state.selectedFile);
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        axios.post("http://localhost:4000/files/upload",data,{

        },config).then(res =>{
            console.log(res);
        })

    }


    render() {
        const { users } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="offset-md-3 col-md-6">
                        <div className="form-group files">

                            <label>Upload Answer Here</label>
                            <input type="file" id="uploadFile" name="uploadFile" onChange={this.handleChanges} className="form-control-file"/>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.uploadAssignment}> Upload</button>
                    </div>

                </div>
            </div>
        );
    }
}

export { UploadPage };