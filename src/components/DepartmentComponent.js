import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import { DEPARTMENTS } from "../shared/staffs";

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: DEPARTMENTS,
    };
  }

  render() {
    const department = this.state.departments.map((data) => {
      return (
        <div className="col-lg-4 col-md-3 col-6 mb-5">
          <Card>
            <CardBody>
              <h3>{data.name}</h3>
              <p>Số lượng nhân viên: {data.numberOfStaff}</p>
            </CardBody>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h3>Phòng ban</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="row">{department}</div>
        </div>
      </div>
    );
  }
}
export default Department;
