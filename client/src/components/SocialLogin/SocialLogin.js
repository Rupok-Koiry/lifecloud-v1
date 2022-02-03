import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import classes from './SocialLogin.module.css';
const SocialLogin = ({ user_type }) => {
  const { myFirebase } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    try {
      const { user } = await myFirebase.signInUsingGoogle();
      const [firstName, lastName] = user.displayName.split(' ');
      const loggedUser = {
        email: user.email,
        firstName,
        lastName,
        user_type,
      };
      myFirebase.saveUser(loggedUser, 'PUT');
    } catch (error) {}
  };
  const handleFacebookLogin = async () => {
    try {
      const { user } = await myFirebase.signInUsingFacebook();
      const [firstName, lastName] = user.displayName.split(' ');
      const loggedUser = {
        email: user.email,
        firstName,
        lastName,
        user_type,
      };
      myFirebase.saveUser(loggedUser, 'PUT');
    } catch (error) {}
  };

  return (
    <>
      <div className={classes.separator}>
        <b>Or</b>
      </div>
      <div className={classes.wrapper}>
        <div
          className={classes.button}
          style={{ marginRight: '28px' }}
          onClick={handleGoogleLogin}
        >
          <div className={classes.icon}>
            <i className="fab fa-google"></i>
          </div>
          <span>Login With Google</span>
        </div>
        <div className={classes.button} onClick={handleFacebookLogin}>
          <div className={classes.icon}>
            <i className="fab fa-facebook-f"></i>
          </div>
          <span>Login With Facebook</span>
        </div>
      </div>
    </>
  );
};

export default SocialLogin;
