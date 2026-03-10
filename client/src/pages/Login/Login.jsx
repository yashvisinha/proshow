import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';   // ← add this import
import styles from './Login.module.css';
import NfGoldLogo from './nf_logo.png';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();   // ← add this hook

  const handleAuthLogin = () => {
    setIsLoading(true);

    // Simulate loading / auth delay (optional – remove in production)
    setTimeout(() => {
      setIsLoading(false);
      navigate('/event');   // ← redirects to Event page
    }, 800); // 800ms fake delay – feels more natural
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.loginScreen}>
        <div className={styles.content}>
          <div className={`${styles.logoContainer} ${styles.animateEntry} ${styles.delay1}`}>
            <img
              src={NfGoldLogo}
              alt="NF Logo"
              className={styles.nfLogo}
            />
          </div>

          <div className={`${styles.headlines} ${styles.animateEntry} ${styles.delay2}`}>
            <h1 className={styles.headline1}>
              <span className={styles.goldenText}>Feel</span> the Beat
            </h1>
            <h1 className={styles.headline2}>
              Join the <span className={styles.goldenText}>Fest</span>.
            </h1>
          </div>

          <button
            className={`${styles.authButton} ${styles.animateEntry} ${styles.delay3}`}
            onClick={handleAuthLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Redirecting...' : 'LOG IN WITH DAUTH'}
          </button>
        </div>

        <footer className={`${styles.credits} ${styles.animateEntry} ${styles.delay4}`}>
          Developed by Team NF WebOps
        </footer>
      </div>
    </div>
  );
};

export default Login;