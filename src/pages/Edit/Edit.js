import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { singleUserGetFunction, editFunction } from "../../services/Apis";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner/Spinner";
import { updateData } from "../../components/Context/ContextProvider";
import { BASE_URL } from "../../services/helper";
import "./Edit.css";

const Edit = () => {
  const [inputData, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  const [status, setStatus] = useState("");
  const [imageData, setImageData] = useState("");
  const [image, setImage] = useState("");

  //preview image
  const [preview, setPreview] = useState("");

  const { userUpdate, setUserUpdate } = useContext(updateData);

  //setup Spinner
  const [showSpinner, setShowSpinner] = useState(true);

  //get id(params)
  const { id } = useParams();
  const navigate = useNavigate();

  // setInput value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  //set status
  const setStatusValue = (e) => {
    setStatus(e.value);
  };

  //set Profile
  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  const userProfileGet = async () => {
    const response = await singleUserGetFunction(id);

    if (response.status === 200) {
      setInputData(response.data);
      setStatus(response.data.status);
      setImageData(response.data.profile);
    }
  };

  //submit userData(preventing the same page)
  const submitUserData = async (e) => {
    e.preventDefault();

    //destructuring
    const { fname, lname, email, mobile, gender, location } = inputData;

    if (fname === "") {
      toast.error("First Name is required !");
    } else if (lname === "") {
      toast.error("Last Name is required !");
    } else if (email === "") {
      toast.error("Email is required !");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !");
    } else if (mobile === "") {
      toast.error("Mobile Number is required !");
    } else if (mobile.length > 10) {
      toast.error("Enter Valid Mobile !");
    } else if (gender === "") {
      toast.error("Gender is required !");
    } else if (status === "") {
      toast.error("Status is required!");
    } else if (location === "") {
      toast.error("Location is required!");
    } else {
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("user_profile", image || imageData);
      data.append("location", location);

      const config = {
        "Content-Type": "multipart/form-data",
      };

      const response = await editFunction(id, data, config);
      if (response.status === 200) {
        setUserUpdate(response.data);
        navigate("/");
      } else {
        toast.error(response.response.data);
      }
    }
  };

  //Status Options
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  useEffect(() => {
    userProfileGet();
  }, [id]);

  useEffect(() => {
    if (image) {
      setImageData("");
      setPreview(URL.createObjectURL(image));
    }
    setTimeout(() => {
      setShowSpinner(false);
    });
  }, [image]);

  return (
    <div>
      {showSpinner ? (
        <Spinner />
      ) : (
        <div className="container">
          <h2 className="text-center mt-1">Update Your Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile_div text-center">
              <img
                src={image ? preview : `${BASE_URL}/uploads/${imageData}`}
                alt="img"
              />
            </div>
            <Form>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter FirstName"
                    name="fname"
                    value={inputData.fname}
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter LastName"
                    name="lname"
                    value={inputData.lname}
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={inputData.email}
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Mobile"
                    value={inputData.mobile}
                    name="mobile"
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    checked={inputData.gender == "Male" ? true : false}
                    onChange={setInputValue}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    checked={inputData.gender == "Female" ? true : false}
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Status</Form.Label>
                  <Select
                    options={options}
                    // defaultValue={options.find(
                    //   (option) => option.value === status
                    // )}
                    onChange={setStatusValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Profile</Form.Label>
                  <Form.Control
                    type="file"
                    name="user_profile"
                    onChange={setProfile}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Enter Your Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Location"
                    name="location"
                    value={inputData.location}
                    onChange={setInputValue}
                  />
                </Form.Group>

                <Button variant="danger" type="submit" onClick={submitUserData}>
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      )}
    </div>
  );
};

export default Edit;
