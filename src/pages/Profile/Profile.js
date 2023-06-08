import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { singleUserGetFunction } from "../../services/Apis";
import { BASE_URL } from "../../services/helper";
import Spinner from "../../components/Spinner/Spinner";
import moment from "moment";
import "./Profile.css";

const Profile = () => {
  const [userProfile, setUserProfile] = useState();
  const [showSpin, setShowSpin] = useState(true);

  const { id } = useParams();

  const userProfileGet = async () => {
    const response = await singleUserGetFunction(id);

    if (response.status === 200) {
      setUserProfile(response.data);
    }
  };

  useEffect(() => {
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  });

  return (
    <div>
      {showSpin ? (
        <Spinner />
      ) : (
        <div className="container">
          <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center">
                    <img
                      src={`${BASE_URL}/uploads/${userProfile.profile}`}
                      alt=""
                    />
                  </div>
                </div>
              </Row>
            </Card.Body>
          </Card>
          <Card className="card-profile shadow col-lg-6 mx-auto mt-3">
            <Card.Body>
              <Row>
                <div className="text-center">
                  <h3 className="display-3">
                    {userProfile.fname + " " + userProfile.lname}
                  </h3>
                  <h4>
                    <i class="fa-solid fa-envelope email"></i>&nbsp;:-{" "}
                    <span>{userProfile.email}</span>
                  </h4>
                  <h5>
                    <i class="fa-solid fa-mobile"></i>&nbsp;:-&nbsp;
                    <span>{userProfile.mobile}</span>
                  </h5>
                  <h4>
                    <i class="fa-solid fa-person"></i>&nbsp;:-
                    <span>{userProfile.gender}</span>
                  </h4>
                  <h4>
                    <i class="fa-solid fa-location-dot location"></i>
                    &nbsp;:-&nbsp;
                    <span>{userProfile.location}</span>
                  </h4>
                  <h4>
                    Status &nbsp;:-&nbsp;<span>{userProfile.status}</span>
                  </h4>
                  <h5>
                    <i class="fa-solid fa-calendar-days calendar"></i>&nbsp;Date
                    Created &nbsp;:-&nbsp;
                    <span>
                      {moment(userProfile.dateCreated).format("DD-YY-MM")}
                    </span>
                  </h5>
                  <h5>
                    <i class="fa-solid fa-calendar-days calendar"></i>&nbsp;Date
                    Updated &nbsp;:-&nbsp;<span>{userProfile.dateUpdated}</span>
                  </h5>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Profile;
