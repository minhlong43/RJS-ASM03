import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Col,
  Row,
} from "reactstrap";
import { STAFFS, DEPARTMENTS } from "../shared/staffs";
import { LocalForm, Control, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
      selectedStaff: null,
      name: "",
      doB: "",
      salaryScale: 1,
      startDate: "",
      department: "",
      annualLeave: 0,
      overTime: 0,
      salary: 30000,
      image: "",
      touched: {
        name: false,
        doB: false,
        salaryScale: false,
        startDate: false,
        department: false,
        annualLeave: false,
        overTime: false,
      },
      modalOpen: false,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }
  handleBlur = (field) => (event) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  handleInput(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    // e.preventDefault();

    const newStaff = {
      id: this.props.staffList.length,
      name: this.state.name,
      doB: this.state.doB,
      department: this.state.department,
      salaryScale: this.state.salaryScale,
      startDate: this.state.startDate,
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: "/assets/images/alberto.png",
    };
    this.props.onStaff(newStaff);
    console.log(newStaff);
  }

  validate(
    name,
    department,
    salaryScale,
    doB,
    startDate,
    annualLeave,
    overTime
  ) {
    const errors = {
      name: "",
      department: "",
      salaryScale: "",
      annualLeave: "",
      overTime: "",
      doB: "",
      startDate: "",
    };
    if (this.state.touched.name && name.length < 3)
      errors.name = "Nhập tên nhân viên !";
    else if (this.state.touched.name && name.length > 50)
      errors.name = "Nhập tên nhân viên !";
    if (this.state.touched.department && department.length < 1)
      errors.department = "Nhập phòng ban !";
    if (this.state.touched.startDate && startDate.length < 1)
      errors.startDate = "Nhập ngày bắt đầu làm việc !";
    if (this.state.touched.doB && doB.length < 1) errors.doB = "Nhập ngày sinh";
    if (this.state.touched.salaryScale && salaryScale.length < 1)
      errors.salaryScale = "Nhập hệ số lương!";
    if (this.state.touched.annualLeave && annualLeave.length < 0)
      errors.annualLeave = "Nhập số ngày nghỉ còn lại !";
    if (this.state.touched.overTime && overTime.length < 0)
      errors.overTime = "Nhập số giờ tăng ca !";

    return errors;
  }

  render() {
    const onAddStaff = (staff) => {
      onAddStaff(staff);
    };

    const errors = this.validate(
      this.state.name,
      this.state.department,
      this.state.salaryScale,
      this.state.annualLeave,
      this.state.overTime,
      this.state.doB,
      this.state.startDate
    );

    return (
      <div className="container">
        <div key={this.props.id} className="row">
          <div className="col-12 mt-2">
            <form className="form-group row">
              {/* <div className="col-3"></div> */}
              <div className="col-4">
                <Button outline onClick={this.toggleModal}>
                  <span className="fa fa-pencil fa-lg"></span>Thêm nhân viên
                </Button>
                <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>
                    Thêm nhân viên
                  </ModalHeader>
                  <ModalBody>
                    <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                      {/* <Form> */}
                      <Row className="control-group">
                        <Label htmlFor="name" md={4}>
                          Họ tên:
                        </Label>
                        <Col md={8}>
                          <Control.text
                            model=".name"
                            className="form-control"
                            id="name"
                            name="name"
                            onChange={this.handleInput}
                            validators={{
                              required,
                              minLength: minLength(3),
                              maxLength: maxLength(30),
                            }}
                          />
                          <Errors
                            className="text-danger"
                            model=".name"
                            show="touched"
                            messages={{
                              required: "Chưa điền thông tin! ",
                              minLength: "Tên phải nhiều hơn 2 kí tự",
                              maxLength: "Tên phải ít hơn 30 kí tự",
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="control-group">
                        <Label htmlFor="doB" md={4}>
                          Ngày sinh:
                        </Label>
                        <Col md={8}>
                          <Control.input
                            type="date"
                            model=".doB"
                            className="form-control"
                            id="doB"
                            onChange={this.handleInput}
                            name="doB"
                            validators={{
                              required,
                            }}
                          />
                          <Errors
                            className="text-danger"
                            model=".doB"
                            show="touched"
                            messages={{
                              required: "Chưa điền thông tin!",
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="control-group">
                        <Label htmlFor="startDate" md={4}>
                          Ngày bắt đầu làm:
                        </Label>
                        <Col md={8}>
                          <Control.input
                            type="date"
                            model=".startDate"
                            onChange={this.handleInput}
                            className="form-control"
                            id="startDate"
                            name="startDate"
                            validators={{
                              required,
                            }}
                          />
                          <Errors
                            className="text-danger"
                            model=".startDate"
                            show="touched"
                            messages={{
                              required: "Chưa điền thông tin!",
                            }}
                          />
                        </Col>
                      </Row>

                      <Row className="control-group">
                        <Label htmlFor="department" md={4}>
                          Phòng ban{" "}
                        </Label>
                        <Col md={8}>
                          <Control.select
                            model=".department"
                            className="form-control"
                            id="department"
                            onChange={this.handleInput}
                            value={this.state.department}
                            name="department"
                            defaultValue="Sale"
                            validators={{
                              required,
                            }}
                          >
                            <option>Sales</option>
                            <option>HR</option>
                            <option>IT</option>
                            <option>Marketing</option>
                            <option>Finance</option>
                          </Control.select>
                          <Errors
                            className="text-danger"
                            model=".department"
                            show="touched"
                            messages={{
                              required: "Chưa điền thông tin!",
                            }}
                          />
                        </Col>
                      </Row>

                      <Row className="control-group mt-2">
                        <Label htmlFor="salaryScale" md={4}>
                          Hệ số lương:
                        </Label>
                        <Col md={8}>
                          <Control.text
                            model=".salaryScale"
                            className="form-control"
                            id="salaryScale"
                            onChange={this.handleInput}
                            name="salaryScale"
                            validators={{
                              required,
                              isNumber,
                              minLength: minLength(1),
                            }}
                          />
                          <Errors
                            className="text-danger"
                            model=".salaryScale"
                            show="touched"
                            messages={{
                              required: "Chưa điền thông tin!",
                              isNumber: "Hệ số lương là số!",
                              minLength: "Hệ số lương lớn hơn 0!",
                            }}
                          />
                        </Col>
                      </Row>

                      <Row className="control-group mt-2">
                        <Label htmlFor="annualLeave" md={4}>
                          Số ngày nghỉ còn lại:
                        </Label>
                        <Col md={8}>
                          <Control.text
                            model=".annualLeave"
                            className="form-control"
                            id="annualLeave"
                            onChange={this.handleInput}
                            name="annualLeave"
                            validators={{
                              required,
                              isNumber,
                              minLength: minLength(1),
                            }}
                          />
                          <Errors
                            className="text-danger"
                            model=".annualLeave"
                            show="touched"
                            messages={{
                              required: "Chưa điền thông tin!",
                              isNumber: "Số ngày nghỉ còn lại là số!",
                              minLength: "Chưa điền thông tin!",
                            }}
                          />
                        </Col>
                      </Row>

                      <Row className="control-group">
                        <Label htmlFor="overTime" md={4}>
                          Số ngày tăng ca:
                        </Label>
                        <Col md={8}>
                          <Control.text
                            model=".overTime"
                            className="form-control"
                            id="overTime"
                            onChange={this.handleInput}
                            name="overTime"
                            validators={{
                              required,
                              isNumber,
                              minLength: minLength(1),
                            }}
                          />
                          <Errors
                            className="text-danger"
                            model=".overTime"
                            show="touched"
                            messages={{
                              required: "Chưa điền thông tin!",
                              isNumber: "Số ngày tăng ca là số!",
                              minLength: "Chưa điền thông tin!",
                            }}
                          />
                        </Col>
                      </Row>
                      <Button type="submit" color="primary">
                        Thêm
                      </Button>
                    </LocalForm>
                  </ModalBody>
                </Modal>
              </div>
            </form>
          </div>
        </div>
        {/* <div className="row">{menu}</div> */}
      </div>
    );
  }
}

export default Menu;
