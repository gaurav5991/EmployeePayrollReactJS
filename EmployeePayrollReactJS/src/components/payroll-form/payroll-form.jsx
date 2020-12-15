import React from 'react';
import './payroll-form.scss';
import logo from "../../assets/images/logo.png"
import profilePic1 from "../assets/profile-images/Ellipse -3.png";
import profilePic2 from "../assets/profile-images/Ellipse -1.png";
import profilePic3 from "../assets/profile-images/Ellipse -8.png";
import profilePic4 from "../assets/profile-images/Ellipse -7.png";
import EmployeeService from '../services/employee-service';
import { Redirect } from 'react-router-dom';


class Employee extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            profilePic: '',
            gender: '',
            department: '',
            salary: 400000,
            startDate: '',
            note: ''
        }
        this.departmentArr = []
        this.employeeService = new EmployeeService()
    }

    save = async (event) => {
        event.preventDefault()
        alert(JSON.stringify(this.state))
        
        let payrollDTO = {
            name: this.state.name,
            profilePic: this.state.profilePic,
            gender: this.state.gender,
            department: this.state.department,
            salary: this.state.salary,
            startDate: this.state.startDate,
            note: this.state.note
        }

        this.employeeService.addEmployee(payrollDTO).then(response => {
            console.log("data added" + response.toString())
        }).catch(e => {
            console.error("Error adding data" + e.toString())
        })

        return (<Redirect to="" />)
    }

    reset = () => {
        this.setState({
            name: '',
            profilePic: '',
            gender: '',
            department: '',
            salary: 400000,
            startDate: '',
            note: ''
        })
    }

    inputUpdate = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    radioUpdate = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    multipleCheckBoxes = e => {
        this.departmentArr.push(e.target.value)
        this.setState({ [e.target.name]: this.departmentArr })
    }

    PayrollHeader(props) {
        return <header className="header-content header">
            <div className="logo-content">
                <img src={props.logo} alt=""></img>
                <div>
                    <span className="emp-text">EMPLOYEE</span><br></br>
                    <span className="emp-text">PAYROLL</span>
                </div>
            </div>
        </header>
    }

    Avatar(props) {
        return <label>
            <input type="radio" id={props.id} name="profilePic" value={props.url} onChange={props.onChecked}
                required></input>
            <img className="profile" id='image1' src={props.image} alt="" />
        </label>
    }

    Gender(props) {
        return <>
            <label className="label text" htmlFor={props.name}>Gender</label>
            <div>
                <input type="radio" id="male" name={props.name} value="M" onChange={props.onChecked} required></input>
                <label className="text" htmlFor="male">Male</label>
                <input type="radio" id="female" name={props.name} value="F" onChange={props.onChecked} required></input>
                <label className="text" htmlFor="female">Female</label>
            </div>
        </>
    }

    Department(props) {
        return <>
            <input className="checkbox" type="checkbox" id={props.id} name={props.name} value={props.value} onChange={props.onChecked} ></input>
            <label className="text" htmlFor={props.id}>{props.value}</label>
        </>
    }

    render() {
        return (
            <>
                <this.PayrollHeader logo={logo} />
                <div className="form-content">
                    <form className="form" action="#" onSubmit={this.save}>
                        <div className="form-head">Employee Payroll Form
                    </div>
                        {/* name */}
                        <div className="row-content">
                            <label className="label text" htmlFor="name">Name</label>
                            <input className="input" type="text" id="name" name="name" value={this.state.name} onChange={this.inputUpdate} placeholder="Your name..." required>
                            </input>
                            <error-output className="text-error" htmlFor="text">
                            </error-output>
                        </div>
                        {/* Profile Picture */}
                        <div className="row-content">
                            <label className="label text" htmlFor="profile">Profile image</label>
                            <div className="profile-radio-content">
                                <this.Avatar id="profile1" url="../assets/profile-images/Ellipse -3.png" image={profilePic1} onChecked={this.radioUpdate} />
                                <this.Avatar id="profile2" url="../assets/profile-images/Ellipse 1.png" image={profilePic2} onChecked={this.radioUpdate} />
                                <this.Avatar id="profile3" url="../assets/profile-images/Ellipse -8.png" image={profilePic3} onChecked={this.radioUpdate} />
                                <this.Avatar id="profile4" url="../assets/profile-images/Ellipse -7.png" image={profilePic4} onChecked={this.radioUpdate} />
                            </div>
                        </div>
                        {/* Gender */}
                        <div className="row-content">
                            <this.Gender name="gender" onChecked={this.radioUpdate} />
                        </div>
                        {/* Department */}
                        <div className="row-content">
                            <label className="label text" htmlFor="department">Department</label>
                            <div>
                                <this.Department id="hr" value="HR" name="department" onChecked={this.multipleCheckBoxes} />
                                <this.Department id="sales" value="Sales" name="department" onChecked={this.multipleCheckBoxes} />
                                <this.Department id="finance" value="Finance" name="department" onChecked={this.multipleCheckBoxes} />
                                <this.Department id="engineer" value="Engineer" name="department" onChecked={this.multipleCheckBoxes} />
                                <this.Department id="others" value="Others" name="department" onChecked={this.multipleCheckBoxes} />
                            </div>
                        </div>
                        {/* Salary */}
                        <div className="row-content">
                            <label className="label text" htmlFor="salary">Choose your salary</label>
                            <input className="input slider" type="range" name="salary" id="salary" min="300000" max="500000" step="100"
                                value={this.state.salary} onChange={this.inputUpdate}></input>
                            <output className="salary-output text" htmlFor="salary">{this.state.salary}</output>
                        </div>
                        {/* Start Date */}
                        <div className="row-content">
                            <label className="label text" htmlFor="startDate">Start Date</label>
                            <input className="input text date" type="date" id="startDate" name="startDate" value={this.state.startDate} onChange={this.inputUpdate} required></input>
                            <error-output className="date-error" htmlFor="startDate"></error-output>
                        </div>
                        {/* Notes */}
                        <div className="row-content">
                            <label className="label text" htmlFor="note">Notes</label>
                            <textarea className="input note" id="note" name="Notes" value={this.state.note} onChange={this.inputUpdate} placeholder=""
                            ></textarea>
                        </div>
                        {/* Buttons */}
                        <div className="buttonParent">
                            <a href="./home.html" className="resetButton button cancelButton" id="cancelButton">Cancel</a>
                            <div className="submit-reset">
                                <button type="submit" className="button submitButton" id="submitButton">Submit</button>
                                <button type="reset" className="resetButton button" onClick={this.reset}>Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </>

        );
    }
}

export default Employee;