import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Tables from "../../components/Tables/Tables";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import {
  addData,
  updateData,
  deleteData,
} from "../../components/Context/ContextProvider";
import {
  userGetFunction,
  deleteFunction,
  exporttoCsvFunction,
} from "../../services/Apis";
import "./Home.css";

const Home = () => {
  const [userData, setUserData] = useState([]);
  //setup Spinner
  const [showSpinner, setShowSpinner] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { userAdd, setUserAdd } = useContext(addData);
  const { userUpdate, setUserUpdate } = useContext(updateData);
  const { dltData, setDltData } = useContext(deleteData);
  const navigate = useNavigate();

  const addUser = () => {
    navigate("/register");
  };

  //get users data
  const userGet = async () => {
    const response = await userGetFunction(search, page);

    if (response.status === 200) {
      setUserData(response.data.usersData);
      setPageCount(response.data.Pagination.pageCount);
    } else {
      console.log("Error to fetch user data: " + response.status);
    }
  };

  //user delete
  const deleteUser = async (id) => {
    const response = await deleteFunction(id);
    if (response.status === 200) {
      userGet();
      setDltData(response.data);
    } else {
      toast.error(response.response.message);
    }
  };

  //export user
  const exportUser = async () => {
    const response = await exporttoCsvFunction();
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank");
    } else {
      toast.error(response.response.message);
    }
  };

  // paginations
  //handle prev btn
  const handlePrevious = async () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  //handle next btn
  const handleNext = async () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpinner(false);
    }, 1200);
  }, [search, page]);
  return (
    <div className="container">
      {userAdd ? (
        <Alert
          variant="success"
          className="mt-3"
          onClose={() => setUserAdd("")}
          dismissible
        >
          {userAdd.fname.toUpperCase()} Successfully Added...
        </Alert>
      ) : (
        ""
      )}
      {userUpdate ? (
        <Alert
          variant="primary"
          className="mt-3"
          onClose={() => setUserUpdate("")}
          dismissible
        >
          {userUpdate.fname.toUpperCase()} Successfully Updated...
        </Alert>
      ) : (
        ""
      )}
      {dltData ? (
        <Alert
          variant="primary"
          className="mt-3"
          onClose={() => setDltData("")}
          dismissible
        >
          {dltData.fname.toUpperCase()} Deleted successfully !...
        </Alert>
      ) : (
        ""
      )}
      <div className="main_div">
        {/* search btn */}
        <div className="search_add mt-4 d-flex justify-content-between">
          <div className="search col-lg-4">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 mt-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="danger" className="search_btn mt-2">
                Search
              </Button>
            </Form>
          </div>
          {/* add btn */}
          <div>
            <Button
              variant="danger"
              onClick={addUser}
              className="add_btn mx-2 mt-2"
            >
              <i class="fa-solid fa-plus">&nbsp;</i>Add User
            </Button>
            {/* export to csv  */}
            <Button
              variant="danger"
              onClick={exportUser}
              className="export_btn mt-2 "
            >
              Export To Csv
            </Button>
          </div>
        </div>
      </div>
      {/* Conditionally render Spinner or Table */}
      {showSpinner ? (
        <Spinner />
      ) : (
        <div className="mt-5">
          <Tables
            userData={userData}
            deleteUser={deleteUser}
            userGet={userGet}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
