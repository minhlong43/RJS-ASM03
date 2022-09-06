import React from "react";
import { Breadcrumb, BreadcrumbItem, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

function StaffDetail(props) {
  if (props.staff != null) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 col-md-3">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/staff">Nhân viên</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </div>
        <div className="row">
          <StaffItem staff={props.staff} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function StaffItem(staffs) {
  if (staffs != null) {
    return (
      <div className="container">
        <div className="col-12">
          <div className="row mb-5">
            <div className="col-4">
              <CardImg width="100%" src={staffs.image} alt={staffs.name} />
            </div>
            <div key={staffs.id} className="col-8">
              <CardBody>
                <h4>Họ và tên: {staffs.name}</h4>
                <p>Ngày sinh: {dateFormat(staffs.doB, "dd/mm/yy")}</p>
                <p>
                  Ngày vào công ty: {dateFormat(staffs.startDate, "dd/mm/yy")}
                </p>
                <p>Phòng ban: {staffs.department.name}</p>
                <p>Số ngày nghỉ còn lại: {staffs.annualLeave}</p>
                <p>Số ngày đã làm thêm: {staffs.overTime}</p>
              </CardBody>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default StaffDetail;
