import React, { Component } from "react";
import { Card, CardImg, CardTitle } from "reactstrap";
import { STAFFS } from "../shared/staffs";
import { NavLink } from "react-router-dom";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      selectedStaff: null,
      // name: "",
      // doB: "",
      // salaryScale: 1,
      // startDate: "",
      // department: "",
      // annualLeave: 0,
      // overTime: 0,
      // salary: 30000,
      // image: "",
      // touched: {
      //   name: false,
      //   doB: false,
      //   salaryScale: false,
      //   startDate: false,
      //   department: false,
      //   annualLeave: false,
      //   overTime: false,
      // },
      strSearch: "",
      modalOpen: false,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }
  // handleBlur = (field) => (event) => {
  //   this.setState({
  //     touched: { ...this.state.touched, [field]: true },
  //   });
  // };

  // handleSubmit = () => {
  //   const newStaff = {
  //     name: this.state.name,
  //     doB: this.state.doB,
  //     startDate: this.state.startDate,
  //     department: this.state.department,
  //     salaryScale: this.state.salaryScale,
  //     annualLeave: this.state.annualLeave,
  //     overTime: this.state.overTime,
  //     image: this.state.image,
  //   };
  //   this.props.onAdd(newStaff);
  // };

  // validate(
  //   name,
  //   department,
  //   salaryScale,
  //   doB,
  //   startDate,
  //   annualLeave,
  //   overTime
  // ) {
  //   const error = {
  //     name: "",
  //     department: "",
  //     salaryScale: "",
  //     doB: "",
  //     startDate: "",
  //     annualLeave: "",
  //     overTime: "",
  //   };
  //   if (this.state.touched.name && name.length < 3) error.name = "Lỗi";
  //   else if (this.state.touched.name && name.length > 50) error.name = "Lỗi";
  //   else if (this.state.touched.department && department.length < 1)
  //     error.department = "Vui lòng nhập vào";
  //   else if (this.state.touched.salaryScale && salaryScale.length < 1)
  //     error.salaryScale = "Vui lòng nhập vào";
  //   else if (this.state.touched.annualLeave && annualLeave.length < 1)
  //     error.annualLeave = "Vui lòng nhập vào";
  //   else if (this.state.touched.overTime && overTime.length < 1)
  //     error.overTime = "Vui lòng nhập vào";
  //   else if (this.state.touched.startDate && startDate.length < 1)
  //     error.startDate = "Vui lòng nhập vào";
  //   else if (this.state.touched.doB && doB.length < 1)
  //     error.doB = "Vui lòng nhập vào";
  //   return error;
  // }

  handleSearch(event) {
    event.preventDefault();
    this.setState({ strSearch: event.target.value });

    // let textValue = this.state.strSearch;
    // console.log(textValue);
  }
  handleClear(event) {
    event.preventDefault();
    this.setState({ strSearch: "" });
  }
  handleChange(event) {
    this.setState({ strSearch: event.target.value });
  }
  render() {
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

    // const RenderStaff = this.state.staffs.map((data) => {
    // const RenderStaff = ({ staffs }) => {
    //   return (
    //     // <div className="col-6 col-md-4 col-xl-2 mb-5" key={staffs.id}>
    //     <Card onClick={() => this.props.onClick(staffs.id)}>
    //       <NavLink className="nav-link" to={`/staff/${staffs.id}`}>
    //         <CardImg
    //           width="auto"
    //           height="200px"
    //           src={staffs.image}
    //           alt={staffs.name}
    //         />
    //       </NavLink>
    //       <CardTitle>{staffs.name}</CardTitle>
    //     </Card>
    //     // </div>
    //   );
    // };

    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h3>Nhân viên</h3>
          </div>
          <div className="col-8 mt-2">
            {/* <form className="form-group row"> */}
            <form className="form-group row" onSubmit={this.handleSearch}>
              <div className="col-8">
                <input
                  value={this.state.strSearch}
                  onChange={this.handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm"
                />
              </div>
              <div className="col-4">
                <button
                  onClick={this.handleSearch}
                  className="btn btn-success"
                  type="submit"
                >
                  Search
                </button>
                <button
                  onClick={this.handleClear}
                  className="btn btn-primary"
                  type="submit"
                >
                  Clear
                </button>
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
