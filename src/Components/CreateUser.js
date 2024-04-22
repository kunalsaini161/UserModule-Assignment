import React, { useEffect, useState,useRef } from 'react';

const UserPreview = ({ formData }) => {
  return (
    <div>
      <p>Name: {formData.name}</p>
      <p>Gender: {formData.gender}</p>
      <p>Email: {formData.email}</p>
      <p>Mobile: {formData.mobile}</p>
      <p>Category: {formData.category}</p>
      <p>Technology: {formData.technology.join(', ')}</p>
      <p>Profile Picture: {formData.profilePicture ? formData.profilePicture.name : 'None'}</p>
    </div>
  );
};

const CreateUser = () => {

  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    email: '',
    mobile: '',
    category: 'General',
    technology: [],
    profilePicture: null,
  });

  const fileInputRef = useRef(null);
  const [dataUser,setDataUser]=useState([]);
  const [errors, setErrors] = useState({});
  // const [imageData,setImageData]=useState(null)

  const [showModal,setShowModal]=useState(false);

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedTechnology = checked
      ? [...formData.technology, name]
      : formData.technology.filter((tech) => tech !== name);
    setFormData({ ...formData, technology: updatedTechnology });

  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     const base64String = reader.result;
    //     setImageData(base64String);
    //   };
    //   reader.readAsDataURL(file);
    // }
    // console.log(file,imageData)
    setFormData({ ...formData, profilePicture: file});
    // setFormData({ ...formData, profilePictureBase: imageData });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length === 0) {
      
      setShowModal(true);
      setErrors({})
    } else {
     
      setErrors(validationErrors);
    }
  };

  const validateFormData = (data) => {
    console.log(data)
    let errors = {};
    // Name validation
    if (!data.name || data.name.length < 2 || data.name.length > 30 || !/^[a-zA-Z\s]+$/.test(data.name)) {
      errors.name = 'Name must be between 2 and 30 characters long, and contain only letters and spaces';
    }
    // Email validation
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Enter a valid email address';
    }
    // Mobile validation
    if (!data.mobile || !/^\d{10}$/.test(data.mobile)) {
      errors.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (data.technology.length===0) {
      errors.technology = 'Please select at least one technolgy';
    }
    // Profile picture validation
    if (!data.profilePicture) {
      errors.profilePicture = 'picture needs to be uploaded';
    }else if(!['image/jpeg', 'image/jpg', 'image/png'].includes(data.profilePicture.type)){
      errors.profilePicture = 'Only JPEG, JPG, and PNG file types are allowed';
    }
    console.log(errors)
    return errors;
  };

  const handleModalSubmit = () => {

    console.log(formData);
    let FinalData=dataUser.push(formData);
    console.log(FinalData)
    setDataUser([...dataUser,formData])
    console.log(dataUser);
    localStorage.setItem("usersData",JSON.stringify(dataUser));
    setShowModal(false);
    setFormData({
      name: '',
      gender: 'male',
      email: '',
      mobile: '',
      category: 'General',
      technology: [],
      profilePicture: null,
      profilePictureBase:null
    })
    fileInputRef.current.value = '';
    
  };

  const handleModalCancel = () => {
    
    setShowModal(false);
  };

  useEffect(()=>{
    let dat=JSON.parse(localStorage.getItem("usersData"));
    if(dat){
      setDataUser(dat);
    }
    // setData(dat);
  },[])

  return (
    <div className="container">
      <h1>Create User</h1>
      {/* Form */}
      <form onSubmit={(e)=>handleSubmit(e)}>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            className={`form-control ${errors.name && 'is-invalid'}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={(e)=>handleChange(e)}
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
                checked={formData.gender === 'male'}
                onChange={(e)=>handleChange(e)}
              />
              <label className="form-check-label" htmlFor="male">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="female"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={(e)=>handleChange(e)}
              />
              <label className="form-check-label" htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className={`form-control ${errors.email && 'is-invalid'}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={(e)=>handleChange(e)}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        {/* Mobile */}
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">Mobile:</label>
          <input
            type="text"
            className={`form-control ${errors.mobile && 'is-invalid'}`}
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={(e)=>handleChange(e)}
          />
          {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
        </div>
        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category:</label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={formData.category}
            onChange={(e)=>handleChange(e)}
          >
            <option value="General">General</option>
            <option value="SC/ST">SC/ST</option>
            <option value="OBC">OBC</option>
          </select>
        </div>
        {/* Technology */}
        <div className="mb-3">
          <label>Technology:</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                id="c"
                name="C"
                checked={formData.technology.includes('C')}
                onChange={(e)=>handleCheckboxChange(e)}
              />
              <label className="form-check-label" htmlFor="c">C</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                id="java"
                name="java"
                checked={formData.technology.includes('java')}
                onChange={(e)=>handleCheckboxChange(e)}
              />
              <label className="form-check-label" htmlFor="java">java</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                id="c++"
                name="C++"
                checked={formData.technology.includes('C++')}
                onChange={(e)=>handleCheckboxChange(e)}
              />
              <label className="form-check-label" htmlFor="c++">C++</label>
            </div>
            
          </div>
          {errors.technology && <div className="invalid-feedback d-block">{errors.technology}</div>}
        </div>
        {/* Profile Picture */}
        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">Profile Picture:</label>
          <input
            type="file"
            className={`form-control ${errors.profilePicture && 'is-invalid'}`}
            id="profilePicture"
            name="profilePicture"
            accept="image/jpeg, image/jpg, image/png"
            onChange={(e)=>handleFileChange(e)}
            ref={fileInputRef}
            // value={formData.profilePicture}
          />
          {errors.profilePicture && <div className="invalid-feedback">{errors.profilePicture}</div>}
        </div>
        {/* Submit button */}
        <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Preview</button>
      </form>
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Preview User</h5>
              <button type="button" className="btn-close" onClick={(e)=>handleModalCancel(e)}></button>
            </div>
            <div className="modal-body">
              <UserPreview formData={formData} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={(e)=>handleModalSubmit(e)}>Submit</button>
              <button type="button" className="btn btn-secondary" onClick={(e)=>handleModalCancel(e)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;