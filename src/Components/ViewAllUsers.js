import React, { useEffect, useState } from 'react';

const ViewAllUsers = () => {
  // Fetch data from local storage
  const [data,setData]=useState([])
  useEffect(()=>{
    const userDataFinal = JSON.parse(localStorage.getItem('usersData'));
    setData(userDataFinal);
  },[]);

  return (
    <div className="container">
      <h1>View All Users</h1>
      <div className='row mt-3 gx-3'>
      <h5 className="col-2">Name</h5>
          <h5 className="col-3">Email</h5>
          <h5 className="col-2">Gender</h5>
          <h5 className="col-2">Mobile</h5>
          <h5 className="col-1">Category</h5>
          <h5 className="col-2">Technology</h5>
      </div>
      {data?.map((userData)=>(
        <div className="">
        <div className="row gx-3">
          <p className="col-2">{userData.name}</p>
          <p className="col-3">{userData.email}</p>
          <p className="col-2">{userData.gender}</p>
          <p className="col-2">{userData.mobile}</p>
          <p className="col-1">{userData.category}</p>
          <p className="col-2">{userData.technology.join(', ')}</p>
        </div>
      </div>
      ))}
    </div>
  );
};

export default ViewAllUsers;