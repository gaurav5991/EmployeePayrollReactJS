import React from 'react'
import './home.scss'
import '../payroll-form/payroll-form.scss'
import logo from '../../assets/images/logo.png'
import deleteIcon from '../../assets/icons/delete-black-18dp.svg'
import editIcon from '../../assets/icons/create-black-18dp.svg'
import addIcon from '../../assets/icons/add-24px.svg'
import EmployeeService from '../../services/employee-service';
import { Link } from 'react-router-dom'

export default class EmployeeHome extends React.Component {
    constructor() {
        super()
        this.state = {
            employeeData: []
        }
        this.employeeService = new EmployeeService()
    }

    populateEmployeeData() {
        this.employeeService.getAllEmployee().then(response => {
            let fetchedEmployeeData = response.data.data
            this.setState({ employeeData: fetchedEmployeeData })
        }).catch(error => {
            alert("Error getting data" + error.toString())
        })
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

    remove() { }

    update() { }

    Display(props) {
        return (
            <table id="display" className="table">
                <tbody>
                    <tr key={-1}>
                        <th></th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Start Date</th>
                        <th>Actions</th>
                    </tr>
                    {
                        props.employeeArr && props.employeeArr.map((element, index) => (
                            <tr key={index}>
                                <td><img className="profile" alt="" src={element.profilePic} /></td>
                                <td>{element.name}</td>
                                <td>{element.gender}</td>
                                <td>{element.department && element.department.map((dept, key) =>
                                    (<div className='dept-label' key={key}>{dept}</div>))}</td>
                                <td>{element.salary}</td>
                                <td>{element.startDate}</td>
                                <td>
                                    <img onClick={() => this.remove(element.employeeId)} src={deleteIcon} alt="delete" />
                                    <img onClick={() => this.update(element.employeeId)} src={editIcon} alt="edit" />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }

    render() {
        this.populateEmployeeData()
        return (
            <>
                <this.PayrollHeader logo={logo} />
                <div className="top-content">
                    <div className="emp-detail-text">
                        Employee Details <div id="emp-count" className="emp-count">10</div>
                    </div>
                    <Link to="/payroll-form" className="add-button">
                        <img src={addIcon} alt="" />Add User</Link>
                </div>
                <div className="main-content">
                    <div className="table-main">
                        <this.Display employeeArr={this.state.employeeData} />
                    </div>
                </div>

            </>
        )
    }
}