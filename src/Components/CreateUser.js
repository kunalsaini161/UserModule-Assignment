import React, { useEffect, useState, useRef } from "react";
import "./CreateUser.css";

const CreateUser = () => {
  const [savedData, setsavedData] = useState({
    name: "",
    gender: "male",
    email: "",
    mobile: "",
    category: "General",
    technology: [],
    profilePicture: null,
  });

  const PreviewUserDetails = ({ savedData }) => {
    return (
      <div>
        <p>Name: {savedData.name}</p>
        <p>Gender: {savedData.gender}</p>
        <p>Email: {savedData.email}</p>
        <p>Mobile: {savedData.mobile}</p>
        <p>Category: {savedData.category}</p>
        <p>Technology: {savedData.technology.join(", ")}</p>
        <p>
          Profile Picture:{" "}
          {savedData.profilePicture ? savedData.profilePicture.name : "None"}
        </p>
      </div>
    );
  };

  const [dataUser, setDataUser] = useState([]);
  const [errors, setErrors] = useState({});
  const [displayModal, setdisplayModal] = useState(false);

  // Handle changes in form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setsavedData({ ...savedData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setsavedData({ ...savedData, profilePicture: file });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const errorMessages = validatesavedData(savedData);
    if (Object.keys(errorMessages).length === 0) {
      setdisplayModal(true);
      setErrors({});
    } else {
      setErrors(errorMessages);
    }
  };

  //Field Validations
  const validatesavedData = (data) => {
    console.log(data);
    let errors = {};

    // Name
    if (
      !data.name ||
      data.name.length < 3 ||
      data.name.length > 30 ||
      !/^[a-zA-Z\s]+$/.test(data.name)
    ) {
      errors.name =
        "Name must contain at least 3 and at most 30 characters and should only contain letters and spaces";
    }

    // Email
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Enter a valid email address";
    }

    // Mobile
    if (!data.mobile || !/^\d{10}$/.test(data.mobile)) {
      errors.mobile = "Enter a valid 10-digit cell number";
    }
    if (data.technology.length === 0) {
      errors.technology = "Select at least one technology";
    }

    // Profile
    if (!data.profilePicture) {
      errors.profilePicture = "Upload the picture";
    } else if (
      //Image extensions
      !["image/jpeg", "image/jpg", "image/png"].includes(
        data.profilePicture.type
      )
    ) {
      errors.profilePicture = "Only JPEG, JPG, and PNG file types are allowed";
    }
    console.log(errors);
    return errors;
  };
  
  //Function to handle tech checkboxes
  const handleTechChange = (e) => {
    const { name, checked } = e.target;
    const updatedTechnology = checked
      ? [...savedData.technology, name]
      : savedData.technology.filter((tech) => tech !== name);
    setsavedData({ ...savedData, technology: updatedTechnology });
  };

  const fileInputRef = useRef(null);

  //Function to handle submission of data
  const onModalSubmit = () => {
    console.log(savedData);
    let FinalData = dataUser.push(savedData);
    console.log(FinalData);
    setDataUser([...dataUser, savedData]);
    console.log(dataUser);
    localStorage.setItem("usersData", JSON.stringify(dataUser));
    setdisplayModal(false);
    setsavedData({
      name: "",
      gender: "male",
      email: "",
      mobile: "",
      category: "General",
      technology: [],
      profilePicture: null,
      profilePictureBase: null,
    });
    fileInputRef.current.value = "";
  };

  const onModalCancel = () => {
    setdisplayModal(false);
  };

  useEffect(() => {
    let dat = JSON.parse(localStorage.getItem("usersData"));
    if (dat) {
      setDataUser(dat);
    }
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mb-3">Create User</h1>

      {/* Form */}
      <form className="form-css" onSubmit={(e) => handleOnSubmit(e)}>
        
        {/* Name Field */}
        <div className="mb-3 ">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className={`form-control ${errors.name && "is-invalid"}`}
            id="name"
            name="name"
            placeholder="Enter Name"
            value={savedData.name}
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label>Gender:</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="male"
                name="gender"
                value="male"
                checked={savedData.gender === "male"}
                onChange={(e) => handleChange(e)}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="female"
                name="gender"
                value="female"
                checked={savedData.gender === "female"}
                onChange={(e) => handleChange(e)}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className={`form-control ${errors.email && "is-invalid"}`}
            id="email"
            name="email"
            placeholder="Enter Email"
            value={savedData.email}
            onChange={(e) => handleChange(e)}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Mobile */}
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile:
          </label>
          <input
            type="text"
            className={`form-control ${errors.mobile && "is-invalid"}`}
            id="mobile"
            name="mobile"
            placeholder="Enter mobile number"
            value={savedData.mobile}
            onChange={(e) => handleChange(e)}
          />
          {errors.mobile && (
            <div className="invalid-feedback">{errors.mobile}</div>
          )}
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category:
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={savedData.category}
            onChange={(e) => handleChange(e)}>
            <option value="General">General</option>
            <option value="SC/ST">SC/ST</option>
            <option value="OBC">OBC</option>
          </select>
        </div>

        {/* Technology */}
        <div className="mb-3">
          <label className="mb-2" >Technology:</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                id="c"
                name="C"
                checked={savedData.technology.includes("C")}
                onChange={(e) => handleTechChange(e)}
              />
              <label className="form-check-label" htmlFor="c">
                C
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                id="java"
                name="java"
                checked={savedData.technology.includes("java")}
                onChange={(e) => handleTechChange(e)}
              />
              <label className="form-check-label" htmlFor="java">
                Java
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                id="c++"
                name="C++"
                checked={savedData.technology.includes("C++")}
                onChange={(e) => handleTechChange(e)}
              />
              <label className="form-check-label" htmlFor="c++">
                C++
              </label>
            </div>
          </div>
          {errors.technology && (
            <div className="invalid-feedback d-block">{errors.technology}</div>
          )}
        </div>

        {/* Profile Picture Section*/}
        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">
            Profile Picture:
          </label>
          <input
            type="file"
            className={`form-control ${errors.profilePicture && "is-invalid"}`}
            id="profilePicture"
            name="profilePicture"
            accept="image/jpeg, image/jpg, image/png"
            onChange={(e) => handleFileChange(e)}
            ref={fileInputRef}
          />
          {errors.profilePicture && (
            <div className="invalid-feedback">{errors.profilePicture}</div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => handleOnSubmit(e)}>
          Preview
        </button>
      </form>
      <div
        className={`modal fade ${displayModal ? "show" : ""}`}
        style={{ display: displayModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Preview User</h5>
              <button
                type="button"
                className="btn-close"
                onClick={(e) => onModalCancel(e)}></button>
            </div>
            <div className="modal-body">
              <PreviewUserDetails savedData={savedData} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => onModalSubmit(e)}>
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={(e) => onModalCancel(e)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
