import React, { useEffect, useState } from "react";
import { getUser } from "../login/loginCrud";

const Profile = () => {
  const [userData, setUserData] = useState("");
  const fetchUserData = async () => {
    let temp = await getUser();
    setUserData(temp);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div style={{ color: "white", margin: "2em" }}>
        <p>
          <span style={{ fontWeight: "bolder" }}>Name : </span>
          {userData.userName}
        </p>
        <p>
          <span style={{ fontWeight: "bolder" }}>Contact : </span>
          {userData.contact}
        </p>
        <p>
          <span style={{ fontWeight: "bolder" }}>Email : </span>
          {userData.email}
        </p>
      </div>
    </>
  );
};

export default Profile;
