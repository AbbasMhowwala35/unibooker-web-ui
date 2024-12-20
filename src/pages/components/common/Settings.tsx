import React from "react";
import { Form } from "react-bootstrap";
import { FaMoon, FaKey, FaBell, FaSms, FaEnvelope } from "react-icons/fa";
import styles from "../../../styles/Profile.module.css";

const Settings = () => {
  return (
    <div className={styles.ProfileChildCard}>
      <h3>Settings</h3>
      <div className={styles.ProfileChildCardForm}>
        <div className={styles.settingBox}>
          {/* Dark Mode */}
          <div className={styles.settingItem}>
            <div>
              <FaMoon className={styles.settingIcon} />
              <span>Dark Mode</span>
            </div>
            <Form>
              <Form.Check 
                type="switch"
                id="custom-switch"
                className={styles.switchIcon}
              />
            </Form>
          </div>
          {/* Change Language */}
          <div className={styles.settingItem}>
            <span>Change Language</span>
            <span className={styles.settingArrow}>&gt;</span>
          </div>
          {/* Change Password */}
          <div className={styles.settingItem}>
          <div>
            <FaKey className={styles.settingIcon} />
            <span>Change Password</span>
            </div>
            <span className={styles.settingArrow}>&gt;</span>
          </div>

          {/* Notification Header */}
          <h5 className={styles.notificationHeader}>Notification</h5>

          {/* Push Notification */}
          <div className={styles.settingItem}>
            <FaBell className={styles.settingIcon} />
            <span>Push Notification</span>
            <Form.Check type="switch" className={styles.settingSwitch} defaultChecked />
          </div>

          {/* SMS Notification */}
          <div className={styles.settingItem}>
            <FaSms className={styles.settingIcon} />
            <span>SMS Notification</span>
            <Form.Check type="switch" className={styles.settingSwitch} defaultChecked />
          </div>

          {/* Email Notification */}
          <div className={styles.settingItem}>
            <FaEnvelope className={styles.settingIcon} />
            <span>Email Notification</span>
            <Form.Check type="switch" className={styles.settingSwitch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
