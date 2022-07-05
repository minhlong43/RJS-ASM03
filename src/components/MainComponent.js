import React, { Component } from "react";
import { DEPARTMENTS, STAFFS } from "../shared/staffs";
import Footer from "./FooterComponent";
import Header from "./HeaderComponent";
import Menu from "./MenuComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Salary from "./SalaryComponent";
import Department from "./DepartmentComponent";
import StaffDetail from "./StaffItemComponent";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    role: state.role,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // addComment: (dishId, rating, author, comment) =>
  //   dispatch(addComment(dishId, rating, author, comment)),
});
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
      selectedStaff: null,
    };
    this.addStaff = this.addStaff.bind(this);
  }

  onStaffSelect(staffID) {
    this.setState({ selectedStaff: staffID });
  }
  addStaff = (staff) => {
    const id = Math.floor(Math.random() * 10000 + 1);
    const newStaff = { id, ...staff };
    this.setState({
      staffs: [...this.state.staffs, newStaff],
    });
    console.log(newStaff);
    console.log(this.state.staffs);
  };

  render() {
    const StaffsID = ({ match }) => {
      return (
        <StaffDetail
          staffs={
            this.state.staffs.filter(
              (staffs) => staffs.id === parseInt(match.params.staffID, 10)
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
              <Menu
                staffs={this.state.staffs}
                onClick={(staffID) => this.onStaffSelect(staffID)}
              />
            )}
          />
          {/* <Route
            exact
            path="/staff"
            component={() => (
              <StaffDetail onAdd={this.addStaff} staffs={this.state.staffs} />
            )}
          /> */}
          <Route exact path="/department" component={Department} />
          <Route exact path="/staff/:staffID" component={StaffsID} />
          <Route exact path="/salary" component={Salary} />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
