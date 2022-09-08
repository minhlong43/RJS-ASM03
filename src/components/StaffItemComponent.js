import React from "react";
import { Breadcrumb, BreadcrumbItem, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

function StaffDetail(props) {
  if (props.staffs != null) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 col-md-3">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/staff">Nhân viên</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.staffs.name}</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </div>

        <div className="container">
          <div className="col-12">
            <div className="row mb-5">
              <div className="col-4">
                <CardImg
                  width="100%"
                  src={props.staffs.image}
                  alt={props.staffs.name}
                />
              </div>
              <div key={props.staffs.id} className="col-8">
                <CardBody>
                  <h4>Họ và tên: {props.staffs.name}</h4>
                  <p>Ngày sinh: {dateFormat(props.staffs.doB, "dd/mm/yy")}</p>
                  <p>
                    Ngày vào công ty:{" "}
                    {dateFormat(props.staffs.startDate, "dd/mm/yy")}
                  </p>
                  <p>Phòng ban: {props.staffs.department.name}</p>
                  <p>Số ngày nghỉ còn lại: {props.staffs.annualLeave}</p>
                  <p>Số ngày đã làm thêm: {props.staffs.overTime}</p>
                </CardBody>
              </div>
            </div>
          </div>
        </div>
      </div>
      // </div>
    );
  } else {
    return <div></div>;
  }
}

export default StaffDetail;
