import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/login.module.css';
import Head from 'next/head';

function Login() {

  return (

    <div className={styles.login}>
      <div className={styles.centercontainer}>
        <div className={styles.card}>
          <div className={styles.leftside}>
          <h1 className={styles.h1label}>Sunburst Family Tree</h1>
          <h2 className={styles.h2label}>An interactive platform to view and manage your family's relationships.</h2>
          </div>
          <div className={styles.rightside}>

            <h1 className={styles.loginlabel}>LOGIN</h1>


            <form>
              <div className={styles.inputContainer}>

                <label className={styles.label}>Email</label><br />
                <input type="text" id="Email" className={styles.logininput} />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Password</label><br />
                <input type="password" id="Password" className={styles.logininput}/>
              </div>

              <div className={styles.logincontainer}>
                <span className={styles.errortxt}>Incorrect email or password</span>
              </div>

              <div className={styles.parentcontainer}>
                <button type="submit" className={styles.btnlogin}>Login</button>
              </div>

              <div className={styles.logincontainer}>
                <span className={styles.registrationtext}>New User?</span>
                <Link href="/registration" className={styles.registrationlink}>Create an account</Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login; 