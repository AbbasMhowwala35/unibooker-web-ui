import React, { useEffect, useState } from 'react';
import styles from "../../../styles/Profile.module.css";
import person from '../../../Images/person1.jpg';
import Image from 'next/image';

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birthdate: string;
  aboutYourself: string;
  profileImage: string;
}

const EditProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData"); 
    if (storedData) {
      setProfile(JSON.parse(storedData));
    } 
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    if (profile) {
      localStorage.setItem("userProfile", JSON.stringify(profile));
      alert("Profile updated successfully!");
    }
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.ProfileChildCard}>
      <div className="d-flex align-items-center">
        <h3>{isEditing ? 'Edit Profile' : 'Personal Profile'}</h3>
        {!isEditing && (
          <button onClick={handleEditClick} className={styles.themeEditProfile}>
            Edit
          </button>
        )}
      </div>
      {isEditing ? (
        <form className={styles.ProfileChildCardForm} onSubmit={handleSaveChanges}>
          <div className="row">
            <div className="col-md-6 mb-4">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                value={profile.first_name}
                onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                value={profile.last_name}
                onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="text"
                id="phone"
                className="form-control"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-4">
              <label htmlFor="birthDate" className="form-label">Birth Date</label>
              <input
                type="date"
                id="birthDate"
                className="form-control"
                value={profile.birthdate}
                onChange={(e) => setProfile({ ...profile, birthdate: e.target.value })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mb-4">
              <label htmlFor="aboutYourself" className="form-label">About Yourself</label>
              <textarea
                id="aboutYourself"
                className="form-control"
                rows={8}
                value={profile.aboutYourself}
                onChange={(e) => setProfile({ ...profile, aboutYourself: e.target.value })}
              ></textarea>
            </div>
          </div>
          <button type="submit" className="theme_btn">Save Changes</button>
        </form>
      ) : (
        <div className={`${styles.ProfileChildCardForm} ${styles.ProfileViewCard} d-flex justify-content-between gap-5`}>
          <div className={styles.ProfileImgSection}>
            <Image src={person} alt="Profile" className={styles.profileImageDisplay} />
            <h4>{`${profile.first_name} ${profile.last_name}`}</h4>
            <p>{profile.aboutYourself}</p>
          </div>
          <div className={styles.ProfileContentDisplaySection}>
            <div className="d-flex gap-5 mb-3 justify-content-between">
              <p><strong>First Name:</strong> {profile.first_name}</p>
              <p><strong>Last Name:</strong> {profile.last_name}</p>
            </div>
            <div className="d-flex gap-5 mb-3 justify-content-between">
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
            </div>
            {profile.birthdate && (<div className="d-flex gap-5 mb-3 justify-content-between">
              <p><strong>Birth Date:</strong> {profile.birthdate}</p>
            </div>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
