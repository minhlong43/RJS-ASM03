import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  Label,
  Col,
  FormFeedback,
  Row,
} from "reactstrap";
import { STAFFS, DEPARTMENTS } from "../shared/staffs";
import { NavLink } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";
import { staffNew } from "../redux/Action";

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
      strSearch: "",
      modalOpen: false,
    };

    // this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   const newStaff = {
  //     name: this.state.name,
  //     doB: this.state.doB,
  //     startDate: this.state.startDate,
  //     department: this.state.department,
  //     salaryScale: this.state.salaryScale,
  //     annualLeave: this.state.annualLeave,
  //     overTime: this.state.overTime,
  //     image: "/assets/images/alberto.png",
  //   };

  //   this.props.staffNew(newStaff);
  // };

  handleSubmit(value) {
    // value.preventDefault();
    console.log("Current State is: " + JSON.stringify(this.state));
    alert("Current State is: " + JSON.stringify(this.state));
    this.toggleModal();
    // this.props.onStaffNew(
    //   this.props.id,
    //   value.name,
    //   value.department,
    //   value.salaryScale,
    //   value.doB,
    //   value.startDate,
    //   value.annualLeave,
    //   value.overTime
    // );
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

  // handleSearch(event) {
  //   event.preventDefault();
  //   const strSearchs = this.state.strSearch;
  //   // this.setState(strSearch);
  //   console.log(strSearchs);
  // }
  handleChange(event) {
    this.setState({ strSearch: event.target.value });
  }
  render() {
    const errors = this.validate(
      this.state.name,
      this.state.department,
      this.state.salaryScale,
      this.state.annualLeave,
      this.state.overTime,
      this.state.doB,
      this.state.startDate
    );

    const menu = this.state.staffs
      .filter((data) => {
        if (this.state.strSearch === "") return data;
        else if (data.name.toLowerCase().includes(this.state.strSearch))
          return data;
      })
      .map((data) => {
        return (
          <div className="col-6 col-md-4 col-xl-2 mb-5" key={data.id}>
            {/* <StaffDetail staffs={data} /> */}
            <Card onClick={() => this.props.onClick(data.id)}>
              <NavLink className="nav-link" to={`/staff/${data.id}`}>
                <CardImg
                  width="auto"
                  height="200px"
                  src={data.image}
                  alt={data.name}
                />
              </NavLink>
              <CardTitle>{data.name}</CardTitle>
            </Card>
          </div>
        );
      });

    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h3>Nhân viên</h3>
          </div>
          <div className="col-8 mt-2">
            <form className="form-group row" onSubmit={this.handleSearch}>
              <div className="col-6">
                <input
                  value={this.state.strSearch}
                  onChange={this.handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm"
                />
              </div>

              <div className="col-3">
                {/* <button
                  onClick={this.handleSearch}
                  className="btn btn-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
              <div className="col-3">
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
        <div className="row">{menu}</div>
      </div>
    );
  }
}

export default Menu;
