import React from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import Paginations from "../pagination/Paginations";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../services/helper";
import { statusChangeFunction } from "../../services/Apis";
import "./Table.css";

const Tables = ({
  userData,
  deleteUser,
  userGet,
  handlePrevious,
  handleNext,
  page,
  pageCount,
  setPage,
}) => {
  const handleChange = async (id, status) => {
    console.log(id, status);
    const response = await statusChangeFunction(id, status);
    console.log(response);
    if (response.status === 200) {
      userGet();
      toast.success("Status updated successfully");
    }
  };
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className="shadow">
              <div className="table-responsive-sm">
                <Table className="align-items-center" responsive>
                  <thead className="thead-dark">
                    <tr className="table-dark">
                      <th>ID</th>
                      <th>FullName</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>&nbsp;&nbsp;&nbsp;Status</th>
                      <th>Profile</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.length > 0 ? (
                      userData.map((element, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1 + (page - 1) * 6}</td>
                            <td>{element.fname + element.lname}</td>
                            <td>{element.email}</td>
                            <td>{element.gender === "Male" ? "M" : "F"}</td>
                            <td className="d-flex align-items-center">
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  className="dropdown_btn"
                                  id="dropdown-basic"
                                >
                                  <Badge
                                    bg={
                                      element.status === "Active"
                                        ? "brown"
                                        : "primary"
                                    }
                                    className={
                                      element.status === "Active" ? "brown" : ""
                                    }
                                  >
                                    {element.status} &nbsp;
                                    <i className="fa-solid fa-angle-down"></i>
                                  </Badge>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(element._id, "Active")
                                    }
                                  >
                                    Active
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(element._id, "InActive")
                                    }
                                  >
                                    InActive
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td className="img_parent">
                              <img
                                src={`${BASE_URL}/uploads/${element.profile}`}
                                alt="img"
                              />
                            </td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="light"
                                  className="action"
                                  id="dropdown-basic"
                                >
                                  <i className="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/userprofile/${element._id}`}
                                      className="text-decoration-none"
                                    >
                                      <i className="fa-solid fa-eye i-col"></i>
                                      &nbsp;
                                      <span>View</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/edit/${element._id}`}
                                      className="text-decoration-none"
                                    >
                                      <i className="fa-solid fa-pen-to-square i-col-2"></i>
                                      &nbsp;<span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <div
                                      onClick={() => deleteUser(element._id)}
                                    >
                                      <i className="fa-solid fa-trash i-col-3"></i>
                                      &nbsp;<span>Delete</span>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="7" className="no_data text-center">
                          No Data Found....!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
      </div>
      <ToastContainer />
    </>
  );
};

export default Tables;
