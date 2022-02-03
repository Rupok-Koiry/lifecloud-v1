import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classes from './userProfile.module.css';
import './userandprofiles.css';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import Lock from '../../assets/Lock.png';
import facebook from '../../assets/facebook.png';
import ProgressBar from '../../components/progressbar/progressBar';
import instagram from '../../assets/instagram.png';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import ENTopbar from '../../components/topbar/ENTopBar';
import ENSocialFooter from '../../components/socialFooter/ENSocialFooter';
import { Notifications } from '@material-ui/icons';
export const ENUserAndprofiles = () => {
  const LoggedUser = useContext(AuthContext);
  const { myFirebase } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [isOrganisation, setIsOrganisation] = useState(true);
  const id = useParams().id;
  useEffect(() => {
    fetchuserprofiles();
  }, []);
  const fetchuserprofiles = async () => {
    const res = await axios.get(`/api/profile/getallprofileofSingleUser/${id}`);
    setData(res.data);
    console.log(res, 'res');
  };
  const Notifications = [
    {
      date: '12.12.21',
      time: '10:02',
      action: 'commented on your memory',
      profileImg: 'https://picsum.photos/200/300',
    },
    {
      date: '12.12.21',
      time: '10:02',
      action: 'scanned a QR code for one of your profile: ...',
      profileImg: 'https://picsum.photos/200/300',
    },
    {
      date: '12.12.21',
      time: '10:02',
      action: 'added a memory on one of your profiles: ...',
      profileImg: 'https://picsum.photos/200/300',
    },
    {
      date: '12.12.21',
      time: '10:02',
      action: 'added your profile ... as a friend',
      profileImg: 'https://picsum.photos/200/300',
    },
  ];
  const organisation = {
    _id: '89723g4f234rfvdsgfb',
    firstName: 'atalef',
    lastName: 'organisation',
    admins: [{ _id: 'lku21h3412', firstName: 'test admin' }],
  };
  return (
    <>
      <ENTopbar />
      {!show ? (
        <>
          <div className="profile">
            <div className="profileRight">
              <div className="user-main">
                <h1 className="user-name">
                  Hello, {LoggedUser.user.firstName}!
                </h1>
                <div
                  className="notifications-btn"
                  onClick={() => setShow(true)}
                >
                  Notifications
                </div>
                {/* <p className='user-description'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,{' '}
            </p> */}
              </div>
              <div className="profiles-container">
                {isOrganisation && (
                  <div>
                    <h1>Main Profile</h1>
                    <Link
                      to={`/organisationdetails`}
                      state={{ id: organisation._id }}
                      style={{ cursor: 'hover' }}
                    >
                      <div className="profile-container">
                        <img
                          className="profile-image"
                          src={`http://localhost:8800/${organisation.profileImg}`}
                          alt=""
                        />
                        <div className="profile-name">
                          {organisation.firstName} {organisation.lastName}
                        </div>
                        <ul className="admins-list">
                          {organisation.admins &&
                            organisation.admins.map((admin) => (
                              <li key={admin._id}>{admin.firstName}</li>
                            ))}
                        </ul>
                      </div>
                    </Link>
                  </div>
                )}
                <h1 className="profile-title">My Profiles</h1>
                <div className="profiles">
                  {data && data.length > 0 ? (
                    data.map((userProfiles, i) => {
                      return (
                        <Link
                          to={`/profiledetails/${userProfiles._id}`}
                          state={{ id: userProfiles._id }}
                          key={i}
                          style={{ cursor: 'hover' }}
                        >
                          <div className="profile-container" key={i}>
                            <img
                              className="profile-image"
                              src={`http://localhost:8800/${userProfiles.profileImg}`}
                              alt=""
                            />
                            <div className="profile-name">
                              {userProfiles.firstName} {userProfiles.lastName}
                            </div>
                            <ul className="admins-list">
                              {userProfiles.admins &&
                                userProfiles.admins.map((admin) => (
                                  <li key={admin._id}>{admin}</li>
                                ))}
                            </ul>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <div
                      style={{
                        paddingTop: '8%',
                        paddingLeft: '29%',
                      }}
                    >
                      {' '}
                      <ProgressBar />
                    </div>
                  )}
                  <Link to={`/createprofile/${LoggedUser.user._id}`}>
                    <div className="profile-container">
                      <div className="profile-image create-profile-container">
                        +
                      </div>
                      <div className="profile-name"> Create new profile</div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="settings-container">
                <h1 className="profile-title">Account settings</h1>
                <div className="btns-container">
                  <div className="big-button">
                    <img
                      src={Lock}
                      alt=""
                      style={{ height: '15px', width: '15px' }}
                    ></img>
                    פרטי{' '}
                  </div>
                  <div className="big-button">Payments</div>
                  <div className="big-button">Manage plan</div>
                </div>
                <div>
                  <h3 className="settings-subtitle">:Plan type </h3>
                  <h3 className="settings-subtitle">:Plan time </h3>
                </div>
                <Link to="/">
                  <div className="logout-btn" onClick={myFirebase.logout}>
                    Logout
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <ENSocialFooter backgroundColor="#ABC9DB" color="#fff" />
        </>
      ) : (
        <div className="notifications-container">
          <div className="notifications-title" style={{ direction: '' }}>
            <h1 style={{ fontSize: '60px', paddingLeft: '160px' }}>
              Notifications
            </h1>
            <h1
              onClick={() => setShow(false)}
              style={{
                cursor: 'pointer',
                paddingLeft: '115px',
              }}
            >
              Back
            </h1>
          </div>
          <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>
            New Notifications
          </h3>
          {Notifications.map((n) => {
            return (
              <div className="notification-line" style={{ direction: 'ltr' }}>
                <div className="notification-text">
                  <span>{n.date}</span> | <span>{n.time}</span>{' '}
                  <span>{n.action}</span>
                </div>
                <img
                  alt=""
                  src={n.profileImg}
                  className="notification-img"
                ></img>
              </div>
            );
          })}
          <ENSocialFooter backgroundColor="#DCECF4;" color="#6097BF" />
        </div>
      )}
      <Footer />
    </>
  );
};
