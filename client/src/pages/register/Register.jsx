import axios from 'axios';
import { useRef, useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Topbar from '../../components/topbar/Topbar';
import SocialFooter from '../../components/socialFooter/socialFooter';
import Footer from '../../components/footer/Footer';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

export default function Register() {
  const [selectedGender, setSelectedGender] = useState('');
  const firstName = useRef();
  const lastName = useRef();
  const dateOfBirth = useRef();
  const gender = selectedGender;
  const phone = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const [error, setErro] = useState('');
  const [user, setUser] = useState({
    isOrganisation: false,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    password: '',
    passwordAgain: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, 'va');
    // setSelectedGender(e.target.value);
    setUser({
      ...user,
      [name]: value,
    });
    setErro('');
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (user.password !== user.passwordAgain) {
      setErro("Passwords don't match!");
    } else {
      setErro('');
      try {
        fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(user),
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            history.push('/login');
            console.log(res, 'res');
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  console.log(user, 'user');
  return (
    <>
      <Topbar />
      <div className="register">
        <div className="register-wrapper">
          <div className="loginLeft">
            <h3 className="register-logo">הרשמה</h3>
          </div>
          <div className="loginRight">
            <div className="RegBox">
              <form className="loginBox" onSubmit={handleClick}>
                <div className="names-container">
                  <input
                    placeholder="* שם פרטי"
                    required
                    onChange={handleChange}
                    ref={firstName}
                    value={user.firstName}
                    name="firstName"
                    className="name-input"
                  />
                  <input
                    placeholder="* שם משפחה"
                    required
                    onChange={handleChange}
                    ref={lastName}
                    value={user.lastName}
                    name="lastName"
                    className="name-input"
                  />
                </div>
                <input
                  placeholder="תאריך לידה * "
                  required
                  onChange={handleChange}
                  ref={dateOfBirth}
                  className="register-input"
                  value={user.dateOfBirth}
                  name="dateOfBirth"
                  type="date"
                />
                <div className="radio-container-register">
                  <h3
                    style={{
                      color: '#6097BF',
                      fontSize: '25px',
                      marginLeft: '15px',
                    }}
                  >
                    {' '}
                    מין:
                  </h3>
                  <div
                    className={`${
                      selectedGender === 'male' && 'register-active'
                    } radio-input-container-register`}
                    onClick={() => setSelectedGender('male')}
                  >
                    <input
                      type="radio"
                      value="male"
                      id="male"
                      onChange={handleChange}
                      name="gender"
                      checked={user.gender === 'male'}
                      className="radio"
                    />
                    <label htmlFor="male">ז</label>
                  </div>
                  <div
                    className={`${
                      selectedGender === 'female' && 'register-active'
                    } radio-input-container-register`}
                    onClick={() => setSelectedGender('female')}
                  >
                    <input
                      type="radio"
                      value="female"
                      id="female"
                      onChange={handleChange}
                      checked={user.gender === 'female'}
                      name="gender"
                      className="radio"
                    />
                    <label htmlFor="female">נ</label>
                  </div>
                  <div
                    className={`${
                      selectedGender === 'other' && 'register-active'
                    } radio-input-container-register`}
                    onClick={() => setSelectedGender('other')}
                  >
                    <input
                      type="radio"
                      value="other"
                      id="other"
                      onChange={handleChange}
                      checked={user.gender === 'other'}
                      name="gender"
                      className="radio"
                    />
                    <label htmlFor="other">א</label>
                  </div>
                </div>
                <input
                  placeholder="* טלפון"
                  required
                  value={user.phone}
                  name="phone"
                  ref={phone}
                  onChange={handleChange}
                  className="register-input"
                  type="phone"
                />
                <input
                  placeholder="* אימייל"
                  required
                  value={user.email}
                  name="email"
                  ref={email}
                  onChange={handleChange}
                  className="register-input"
                  type="email"
                />
                <input
                  placeholder="* בחר סיסמא"
                  required
                  value={user.password}
                  name="password"
                  ref={password}
                  className="register-input"
                  onChange={handleChange}
                  type="password"
                  minLength="6"
                />
                <input
                  placeholder="* הזן סיסמא שנית"
                  required
                  value={user.passwordAgain}
                  name="passwordAgain"
                  ref={passwordAgain}
                  onChange={handleChange}
                  className="register-input"
                  type="password"
                />
                <p style={{ color: 'red', textAlign: 'center' }}>
                  {error.length ? error : ''}
                </p>
                <div className="register-actions">
                  <div>
                    <Link
                      to="/login"
                      style={{ textDecoration: 'none' }}
                      className=""
                    >
                      {' '}
                      <span className="">התחברות (משתמש קיים) </span>
                    </Link>
                    |
                    <Link
                      to="/lostPassword"
                      style={{ textDecoration: 'none' }}
                      className=""
                    >
                      {' '}
                      <span className="">איבדתי סיסמא </span>
                    </Link>
                  </div>
                  <span style={{ marginBottom: '1rem' }}>
                    אני מאשר את תנאי השימוש ופרטיות{' '}
                    <input
                      type="checkbox"
                      style={{ marginLeft: '15px' }}
                    ></input>
                  </span>
                  <span style={{ display: 'flex', marginBottom: '1rem' }}>
                    אני מאשר קבלת מיילים <div className="container"></div>
                    <input
                      type="checkbox"
                      style={{ marginLeft: '15px' }}
                    ></input>
                  </span>
                </div>
                <button className="register-button" type="submit">
                  הרשמה
                </button>
              </form>
            </div>
            <SocialLogin />
          </div>
        </div>
      </div>
      <SocialFooter />
      <Footer />
    </>
  );
}
