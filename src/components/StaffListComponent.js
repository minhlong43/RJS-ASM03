import React, { useState } from "react";
import { Card, CardImg, CardTitle, Form, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Menu from "./MenuComponent";

function RenderStaffList({ staff, onClick }) {
  return (
    <Card>
      <Link to={`/staff/${staff.id}`}>
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <div>
          <CardTitle>{staff.name}</CardTitle>
        </div>
      </Link>
    </Card>
  );
}

const StaffList = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchStaff, setSearchStaff] = useState(props.staff);

  const submitSearch = (e) => {
    e.preventDefault();
    searchName(searchInput);
  };

  const searchName = (value) => {
    const sName = value;
    if (sName !== "") {
      const result = props.staff.filter((s) =>
        s.name.toLowerCase().match(sName.toLowerCase())
      );
      if (result.length > 0) {
        setSearchStaff(result);
      } else {
        alert("Không tìm thấy kết quả");
      }
    } else {
      setSearchStaff([...props.staff]);
    }
  };

  const onAddStaff = (staff) => {
    props.onAddStaff(staff);
  };

  const staff1 = searchStaff.map((staff) => {
    return (
      <div className="col-lg-2 col-md-4 col-6" key={staff.id}>
        <RenderStaffList staff={staff} onClick={props.onClick} />
      </div>
    );
  });

  return (
    <div className="container">
      <div key={props.id} className="row">
        <div className="col-3">
          <h3 className="staff ">Nhân Viên</h3>
          <Menu staffList={props.staff} onStaff={onAddStaff} />
        </div>
        <div className="col-9">
          <Form onSubmit={submitSearch} className="form">
            <div className="col-8">
              <Input
                type="text"
                id="search"
                name="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Nhập tên nhân viên muốn tìm"
              />
            </div>
            <div className="col-4">
              <Button
                type="submit"
                value="name"
                color="primary"
                className="search"
              >
                Tìm
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div className="row" key={props.id}>
        {staff1}
      </div>
    </div>
  );
};
export default StaffList;
