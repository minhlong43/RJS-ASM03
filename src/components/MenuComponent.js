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
import { STAFFS } from "../shared/staffs";
import { NavLink } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";

// const isNumber = (val) => !isNaN(Number(val));
// const required = (val) => val && val.length;
// const maxLength = (len) => (val) => !val || val.length <= len;
// const minLength = (len) => (val) => val && val.length >= len;

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
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

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInput = this.handleInput.bind(this);
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

  handleSubmit = (value) => {
    const newStaff = {
      name: this.state.name,
      doB: this.state.doB,
      startDate: this.state.startDate,
      department: this.state.department,
      salaryScale: this.state.salaryScale,
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: "/assets/images/alberto.png",
    };
    if (!this.state.doB || !this.state.startDate)
      this.setState({
        touched: { doB: true, startDate: true },
      });
    else this.props.onAdd(newStaff);
  };

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
      errors.name = "Tên phải lớn hơn 3 kí tự !";
    else if (this.state.touched.name && name.length > 50)
      errors.name = "Tên phải nhỏ hơn 50 kí tự !";
    else if (this.state.touched.department && department.length < 1)
      errors.department = "Vui lòng nhập phòng ban !";

    const reg = /^\d+$/;
    if (
      this.state.touched.salaryScale &&
      !reg.test(salaryScale) &&
      salaryScale.length < 1
    )
      errors.salaryScale = "Vui lòng nhập hệ số lương là số !";
    else if (
      this.state.touched.annualLeave &&
      !reg.test(annualLeave) &&
      annualLeave.length < 1
    )
      errors.annualLeave = "Vui lòng nhập số ngày nghỉ còn lại !";
    else if (
      this.state.touched.overTime &&
      !reg.test(overTime) &&
      overTime.length < 1
    )
      errors.overTime = "Vui lòng nhập số giờ tăng ca !";
    else if (this.state.touched.startDate)
      errors.startDate = "Vui lòng nhập ngày bắt đầu làm việc !";
    else if (this.state.touched.doB) errors.doB = "Vui lòng nhập ngày sinh";
    return errors;
  }

  handleSearch(event) {
    event.preventDefault();
    this.setState({ strSearch: event.target.value });
  }
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
        else if (
          data.name.toLowerCase().includes(this.state.strSearch.toLowerCase())
        )
          return data;
      })
      .map((data) => {
        return (
          <div className="col-6 col-md-4 col-xl-2 mb-5" key={data.id}>
            {/* <RenderStaff staffs={this.state.staffs} /> */}
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
            {/* <form className="form-group row"> */}
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
                <button
                  onClick={this.handleSearch}
                  className="btn btn-success"
                  type="submit"
                >
                  Search
                </button>
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
                    <Form onSubmit={this.handleSubmit}>
                      <Row className="control-group">
                        <Label htmlFor="name" md={4}>
                          Họ tên:
                        </Label>
                        <Col md={8}>
                          <Input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={this.state.name}
                            invalid={errors.name === ""}
                            onBlur={this.handleBlur("name")}
                            onChange={this.handleInput}
                          />
                          <FormFeedback>{errors.name}</FormFeedback>
                        </Col>
                      </Row>
                      <Row className="control-group">
                        <Label htmlFor="doB" md={4}>
                          Ngày sinh:
                        </Label>
                        <Col md={8}>
                          <Input
                            type="date"
                            className="form-control mt-2"
                            id="doB"
                            name="doB"
                            value={this.state.doB}
                            invalid={errors.doB === ""}
                            onBlur={this.handleBlur("doB")}
                            onChange={this.handleInput}
                          />
                          <FormFeedback>{errors.doB}</FormFeedback>
                        </Col>
                      </Row>
                      <Row className="control-group">
                        <Label htmlFor="startDate" md={4}>
                          Ngày bắt đầu làm:
                        </Label>
                        <Col md={8}>
                          <Input
                            type="date"
                            className="form-control mt-2"
                            id="startDate"
                            name="startDate"
                            value={this.state.startDate}
                            invalid={errors.startDate === ""}
                            onBlur={this.handleBlur("startDate")}
                            onChange={this.handleInput}
                          />
                          <FormFeedback>{errors.startDate}</FormFeedback>
                        </Col>
                      </Row>

                      <Row className="control-group">
                        <Label htmlFor="department" md={4}>
                          Phòng ban{" "}
                        </Label>
                        <Col md={8}>
                          <Control.select
                            model=".department"
                            id="department"
                            className="form-control mt-2"
                            value={this.state.department}
                            name="department"
                            invalid={errors.department === ""}
                            onBlur={this.handleBlur("department")}
                            onChange={this.handleInput}
                            defaultValue="Sale"
                          >
                            <option>Sales</option>
                            <option>HR</option>
                            <option>IT</option>
                            <option>Marketing</option>
                            <option>Finance</option>
                          </Control.select>
                          <FormFeedback>{errors.department}</FormFeedback>
                        </Col>
                      </Row>
                      <Row className="control-group mt-2">
                        <Label htmlFor="annualLeave" md={4}>
                          Số ngày nghỉ còn lại:
                        </Label>
                        <Col md={8}>
                          <Input
                            type="text"
                            className="form-control mt-2"
                            id="annualLeave"
                            name="annualLeave"
                            value={this.state.annualLeave}
                            invalid={errors.annualLeave === ""}
                            onBlur={this.handleBlur("annualLeave")}
                            onChange={this.handleInput}
                          />
                          <FormFeedback>{errors.annualLeave}</FormFeedback>
                        </Col>
                      </Row>
                      <Row className="control-group">
                        <Label htmlFor="overTime" md={4}>
                          Số ngày tăng ca:
                        </Label>
                        <Col md={8}>
                          <Input
                            type="text"
                            className="form-control mt-2"
                            id="overTime"
                            name="overTime"
                            value={this.state.overTime}
                            invalid={errors.overTime === ""}
                            onBlur={this.handleBlur("overTime")}
                            onChange={this.handleInput}
                          />
                          <FormFeedback>{errors.overTime}</FormFeedback>
                        </Col>
                      </Row>
                      <Button type="submit" value="submit" color="primary">
                        Thêm
                      </Button>
                    </Form>
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
