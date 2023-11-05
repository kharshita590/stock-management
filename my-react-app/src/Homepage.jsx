import React from 'react'
import styles from  "./software.module.css";
import {useNavigate} from 'react-router-dom';

export const Homepage = () => {
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('../login')
    }

    const handleSubmit2=(e)=>{
        e.preventDefault();
        navigate('../register')
    }

  return (
    <div className={styles['special-page']}>
        <div className={styles.container}>
        {/* <img src={softwareImage} className="software" alt="Software"/> */}
        <h2 className = {styles.h}>Manage your stocks with best inventory management system! Add and remove automatically!</h2>

    </div>
    <div className={styles.btnContainer}>
    <button className= {styles.btn1} onClick={handleSubmit}>Sign in</button>
    <button className={styles.btn2} onClick={handleSubmit2}>Sign Up</button>
    </div>

    <footer className={styles.footer1}>
        <h4 className={styles.hw}>&copy; 2023 Harshita Kumari. All rights reserved.</h4>
      </footer>
    </div>
  )
}
