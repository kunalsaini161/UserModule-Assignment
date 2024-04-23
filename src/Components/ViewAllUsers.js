import React, { useEffect, useState } from "react";
import "./ViewAllUsers.css";
const ViewAllUsers = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const finalData = JSON.parse(localStorage.getItem("usersData"));
    setData(finalData);
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mb-5">View All Users</h1>
      <div className="row mt-3 gx-3 fieldborder">
        <h5 className="col-2 ">Name</h5>
        <h5 className="col-2">Email</h5>
        <h5 className="col-2">Gender</h5>
        <h5 className="col-2">Mobile</h5>
        <h5 className="col-1">Category</h5>
        <h5 className="col-1 ms-5">Technologies</h5>
      </div>
      {data?.map((dataSaved) => (
        <div className="">
          <div className="row gx-3 databorder">
            <p className="col-2 ">{dataSaved.name}</p>
            <p className="col-2">{dataSaved.email}</p>
            <p className="col-2">{dataSaved.gender}</p>
            <p className="col-2">{dataSaved.mobile}</p>
            <p className="col-1">{dataSaved.category}</p>
            <p className="col-1 ms-5">{dataSaved.technology.join(", ")}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewAllUsers;
