import React from 'react';
import styles from "../../../styles/Profile.module.css";

const EditProfile = () => {
  return (
    <div className={styles.ProfileChildCard}>
      <h3>Edit Profile</h3>
      <form className={styles.ProfileChildCardForm}>
      <div className="row mb-4">
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input type="text" id="firstName" className="form-control" placeholder="Enter your first name" />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input type="text" id="lastName" className="form-control" placeholder="Enter your last name" />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" id="email" className="form-control" placeholder="Enter your email" />
        </div>
        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="text" id="phone" className="form-control" placeholder="Enter your phone number" />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <label htmlFor="birthDate" className="form-label">Birth Date</label>
          <input type="date" id="birthDate" className="form-control" />
        </div>
        <div className="col-md-6">
          <label htmlFor="aboutYourself" className="form-label">About Yourself</label>
          <textarea id="aboutYourself" className="form-control" placeholder="Tell us about yourself"></textarea>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Save Changes</button>
    </form>
    </div>
  );
};

export default EditProfile;
