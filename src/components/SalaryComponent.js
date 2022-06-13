import React, { Component } from "react";
import { Card, CardBody, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { STAFFS } from "../shared/staffs";
import { Link } from "react-router-dom";

class Salary extends Component {
  constructor(props) {
    super(props);
    this.state = { staffs: STAFFS };
  }
  render() {
    const salary = this.state.staffs.map((data) => {
      return (
        <div className="col-lg-4 col-md-3 col-6 mb-5">
          <Card>
            <CardBody>
              <h3>{data.name}</h3>
              <p>Mã nhân vien: {data.id}</p>
              <p>Hệ số lương: {data.salaryScale}</p>
              <p>Số ngày làm thêm: {data.overTime}</p>
              <p>
                Lương: {data.salaryScale * 3000000 + data.overTime * 200000}
              </p>
            </CardBody>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="col-12">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staff">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
          </Breadcrumb>
          <hr />
        </div>
        <div className="row">{salary}</div>
      </div>
    );
  }
}

export default Salary;
