import React, { useContext, useRef, useState, useEffect } from 'react';
import './login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import SocialFooter from '../../components/socialFooter/socialFooter';
import Footer from '../../components/footer/Footer';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
// import FacebookLogin from 'react-facebook-login';
// import { authentication } from '../../config/firebase';
// import {
//   signInWithPopup,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   getAuth,
// } from 'firebase/auth';
// import faIcon from '../../assets/faIcon.png';
// import ggIcon from '../../assets/ggIcon.png';
// const responseFacebook = (response) => {
//ser information retrieval
// console.log(response);
// };
// const responseGoogle = () => {
//   let provider = new GoogleAuthProvider();
//   signInWithPopup(authentication, provider)
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
// import TwitterLogin from 'react-twitter-auth';
// import FacebookLogin from 'react-facebook-login';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import { useHistory, useRouteMatch } from 'react-router-dom';
// import LoginHooks from './LoginHooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  // const [googleData, setGoogleData] = useState(null);
  // const history = useHistory();
  // const [visible, setVisible] = useState('none');
  // const [isSignedIn, setIsSignedIn] = useState('logoff');

  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({ email: email, password: password }, dispatch);
  };
  const componentClicked = (data) => {
    console.warn(data);
  };
  useEffect(() => {
    // checkIfUserLoggedWithGoogle();
  }, []);

  // const checkIfUserLoggedWithGoogle = async () => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/firebase.User
  // const uid = user.uid;
  // console.log(user);
  // ...
  // } else {
  // User is signed out
  // ...
  // }
  // });
  // };

  return (
    <>
      <Topbar />
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <span className="loginDesc">התחברות</span>
          </div>
          <div></div>
          <div className="loginRight">
            <div className="loginBox">
              <form className="loginBox" onSubmit={handleClick}>
                <input
                  placeholder="מייל*"
                  type="email"
                  value={email}
                  required
                  className="login-input"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  placeholder="סיסמא*"
                  type="password"
                  value={password}
                  required
                  minLength="6"
                  className="login-input"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  placeholder="טלפון"
                  type="phone"
                  value={phone}
                  minLength="6"
                  className="login-input"
                  onChange={(e) => setPhone(e.target.value)}
                />
                {/* <div className="socialLoginContainer">
                  <div className="facebook-login" style={{ paddingRight: '40px'}}>
                    <FacebookLogin
                      
                      appId="387118209870956"
                      autoLoad={false}
                      fields="name,email,picture"
                      onClick={componentClicked}
                      callback={responseFacebook}
                    />
                  </div>

                  <div className="google-Login">
                    <img src={ggIcon} alt="" onClick={responseGoogle}></img>
                  </div>
                </div> */}
                <button
                  className="login-button"
                  type="submit"
                  disabled={isFetching}
                >
                  {isFetching ? (
                    <CircularProgress color="white" size="20px" />
                  ) : (
                    'התחבר'
                  )}
                </button>
                <span className="loginForgot"></span>
              </form>
              <div className="loginRegisterContainer">
                <p className="login-register-button">
                  {isFetching ? (
                    <CircularProgress color="white" size="15px" />
                  ) : (
                    <Link
                      to="/register"
                      style={{ textDecoration: 'none' }}
                      className="login-register-button"
                    >
                      הרשמה
                    </Link>
                  )}
                </p>
                |
                <p className="login-register-button">
                  {isFetching ? (
                    <CircularProgress color="white" size="15px" />
                  ) : (
                    <Link
                      to="/register"
                      style={{ textDecoration: 'none' }}
                      className="login-register-button"
                    >
                      שכחתי סיסמה
                    </Link>
                  )}
                </p>
              </div>
            </div>
            <SocialLogin />
          </div>
        </div>
      </div>
      <SocialFooter backgroundColor="#6097bf" color="#fff" />
      <Footer />
    </>
  );
};

export default Login;
