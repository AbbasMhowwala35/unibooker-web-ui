import React, { useState } from 'react';
import styles from "../../../styles/Profile.module.css";
import person from '../../../Images/person1.jpg'
import Image from 'next/image';
interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  aboutYourself: string;
  profileImage: string;
}

const initialProfile: Profile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  birthDate: '1990-01-01',
  aboutYourself: 'Lorem ipsum dolor sit amet.',
  profileImage: '/path/to/profile/image.jpg',
};

const EditProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>(initialProfile);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className={styles.ProfileChildCard}>
      <div className='d-flex align-items-center'>
        <h3>{isEditing ? 'Edit Profile' : 'Personal Profile'}</h3>
        {isEditing ? "" : <button onClick={handleEditClick} className={styles.themeEditProfile}>Edit</button>}
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
                placeholder="Enter your first name"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                placeholder="Enter your last name"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
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
                placeholder="Enter your email"
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
                placeholder="Enter your phone number"
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
                value={profile.birthDate}
                onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mb-4">
              <label htmlFor="aboutYourself" className="form-label">About Yourself</label>
              <textarea
                id="aboutYourself"
                className="form-control"
                placeholder="Tell us about yourself"
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
            <h4>Sana Ullah</h4>
            <p>Form Inivory coast</p>
          </div>
          <div className={styles.ProfileContentDisplaySection}>
            <div className={`${styles.ProfileViewCardRow} d-flex gap-5 mb-3 justify-content-between`}>
              <p><strong>First Name:</strong> {profile.firstName}</p>
              <p><strong>Last Name:</strong> {profile.lastName}</p>
            </div>
            <div className={`${styles.ProfileViewCardRow} d-flex gap-5 mb-3 justify-content-between`}>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
            </div>
            <div className={`${styles.ProfileViewCardRow} d-flex gap-5 mb-3 justify-content-between`}>
              <p><strong>Birth Date:</strong> {profile.birthDate}</p>
              <p><strong>About You:</strong> {profile.aboutYourself}</p>
            </div>
            <div className='mt-5'>
              <h6>About Yourself</h6>
              <p>A common man typically leads an ordinary life, focusing on work, family, and daily activities. He might have dreams and aspirations like anyone else, and faces challenges and successes throughout life. Usually adaptable, resilient, and hardworking, a common man contributes to society in various roles, embodying the majority's experiences and values. He represents the typical person, with all the complexities and simplicities of daily existence. Amidst the myriad of roles, he may be a silent hero, an unsung bearer of society's pillars, often overlooked yet integral. His story is woven into the fabric of everyday life, echoing the collective narrative of humanity.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
