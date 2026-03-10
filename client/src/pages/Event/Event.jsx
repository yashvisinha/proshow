import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Event.module.css';
import discoballIcon from '../../assets/discoball.png';
import CameraIcon from '../../assets/CameraIcon.png';
import defaultPic from '../../assets/defaultPic.png';

const EventPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Demo data – in real app this will come from QR scan result
  const entryData = {
    name: 'Name',
    department: 'Department',
    rollNumber: '100100100',
    teamName: 'Team Name',
    teamRole: 'Team Role',
    profilePhoto: '', // leave empty or replace with real URL later
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).toUpperCase(),
  };

  const handleAllowEntry = () => {
    // TODO: real allow entry logic (API call, toast, etc.)
    setShowModal(false);
  };

  const handleCloseModal = () => setShowModal(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const handleLogout = () => {
    setShowMenu(false);
    navigate('/'); // ← this line redirects to the Login page (root route)
    // Optional: clear auth state if you have any
    // localStorage.removeItem('isLoggedIn');
  };

  return (
    <div className={styles.container}>
      {/* Mock status bar */}
      <div className={styles.statusBar}>
        <div className={styles.statusIcons}>
          <i className="fas fa-signal" />
          <i className="fas fa-wifi" />
          <i className="fas fa-battery-full" />
        </div>
      </div>

      {/* Header with hamburger */}
      <header className={styles.header}>
        <button
          type="button"
          className={styles.hamburgerBtn}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>

        <h1 className={styles.pageTitle}>Proshow Verification</h1>

        {showMenu && (
          <>
            <div className={styles.menuOverlay} onClick={() => setShowMenu(false)} />
            <div className={styles.dropdownMenu}>
              <button
                type="button"
                className={styles.menuItem}
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </>
        )}
      </header>

      {/* Disco ball hero */}
      <div className={styles.eventIconContainer}>
        <img src={discoballIcon} alt="Disco ball" className={styles.eventIcon} />
      </div>

      {/* Verify button */}
      <div className={styles.scanContainer}>
        <button
          type="button"
          className={styles.verifyButton}
          onClick={() => setShowModal(true)}
        >
          <img src={CameraIcon} alt="Camera" className={styles.verifyIcon} />
          <span className={styles.verifyText}>Verify Entry</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className={styles.modalOverlay} onClick={handleCloseModal} />
          <div className={styles.modalContent}>
            <div className={styles.modalCard}>
              <button className={styles.modalCloseBtn} onClick={handleCloseModal}>
                ×
              </button>

              {/* Profile picture */}
              <div className={styles.profilePhotoContainer}>
                <img
                  src={entryData.profilePhoto || defaultPic}
                  alt={`${entryData.name || 'User'} profile`}
                  className={styles.profilePhoto}
                  onError={(e) => {
                    e.target.src = defaultPic;
                    e.target.onerror = null;
                  }}
                />
              </div>

              <div className={styles.modalTime}>{entryData.time}</div>

              {[
                { label: 'Name', value: entryData.name },
                { label: 'Department', value: entryData.department },
                { label: 'Roll Number', value: entryData.rollNumber },
                { label: 'Team Name', value: entryData.teamName || '—' },
                { label: 'Team Role', value: entryData.teamRole || '—' },
              ].map((field, idx) => (
                <div key={idx} className={styles.modalField}>
                  <div className={styles.modalLabel}>{field.label}</div>
                  <div className={styles.modalValue}>{field.value}</div>
                </div>
              ))}

              <button
                type="button"
                className={styles.allowEntryButton}
                onClick={handleAllowEntry}
              >
                Allow Entry
              </button>
            </div>
          </div>
        </>
      )}

      <footer className={styles.developedBy}>
        Developed by Team NF Webops
      </footer>
    </div>
  );
};

export default EventPage;