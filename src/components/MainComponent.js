import React, { Component } from "react";
import { DEPARTMENTS, STAFFS } from "../shared/staffs";
import Footer from "./FooterComponent";
import Header from "./HeaderComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Salary from "./SalaryComponent";
import Department from "./DepartmentComponent";
import StaffDetail from "./StaffItemComponent";
import StaffList from "./StaffListComponent";
import { connect } from "react-redux";
import { staffNew } from "../redux/Action";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    role: state.role,
  };
};

const mapDispatchToProps = (dispatch) => ({
  staffNew: (
    name,
    department,
    startDate,
    doB,
    salaryScale,
    annualLeave,
    overTime
  ) =>
    dispatch(
      staffNew(
        name,
        department,
        startDate,
        doB,
        salaryScale,
        annualLeave,
        overTime
      )
    ),
});
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
    this.onAddStaff = this.onAddStaff.bind(this);
  }

  onStaffSelect(staffID) {
    this.setState({ selectedStaff: staffID });
  }
  onAddStaff = (staff) => {
    const id = Math.floor(Math.random() * 10000 + 1);
    const newStaff = { id, ...staff };
    this.setState({
      staffs: [...this.state.staffs, newStaff],
    });
  };

  render() {
    const StaffsID = ({ match }) => {
      return (
        <StaffDetail
          staffs={
            this.props.staffs.filter(
              (staffs) => staffs.id === parseInt(match.params.id, 10)
            )[0]
          }
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/staff"
            component={() => (
              <StaffList
                staff={this.state.staffs}
                onAddStaff={this.onAddStaff}
              />
            )}
          />
          <Route exact path="/staff/:id" component={StaffsID} />
          <Route exact path="/department" component={Department} />
          <Route exact path="/salary" component={Salary} />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
