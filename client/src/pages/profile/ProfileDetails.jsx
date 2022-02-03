import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import profile from './dummy-profiles.json';
import waze from '../../assets/waze.png';
import wts from '../../assets/wts.png';
import zoom from '../../assets/zoom.png';
import google from '../../assets/google.png';
import map from '../../assets/map.png';
import share from '../../assets/share.png';
import heart from '../../assets/heart.png';
import instagram from '../../assets/instagram.png';
import facebook from '../../assets/facebook.png';
import { Link } from 'react-router-dom';
import './profiledetails.css';
import TopBar from '../../components/topbar/Topbar';
import ProgressBar from '../../components/progressbar/progressBar';
import { Gallery } from '../../components/gallery/gallery';
// import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router';
import Memory from '../../components/memory/Memory';
import Popup from 'reactjs-popup';
import { useHistory } from 'react-router';
import SnackBar from '../../components/snackbar/SnackBar';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import FriendsList from '../../components/friendsList/friendsList';
// import { useParams } from 'react-router-dom';
export default function Profile() {
  const { dispatch } = useContext(AuthContext);
  const [profiledata, setProfileData] = useState([]);
  const [memoryData, setmemoryData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [text, setText] = useState({ comments: [{ text: '' }] });
  const [show, setShow] = useState('wall');
  const history = useHistory();
  const [likeMessage, setLikeMessage] = useState('');
  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState();
  const [DellComment, setDelComment] = useState('');
  const [friendFlagReq, setrfriendReq] = useState([]);
  const [adminFlagReq, setAdminres] = useState([]);
  const id = useParams().id;
  const [memories, setMemories] = useState([]);
  const [next, setnext] = useState(1);
  const handleShowMoreMemories = () => {
    setnext(next + 4);
  };
  console.log(id);
  useEffect(() => {
    setCommenting('');
    setComment('');
    setLikeMessage('');
  }, [likeMessage, comment, DellComment, friendFlagReq, adminFlagReq]);
  useEffect(() => {
    fetchuserprofiles();
  }, []);
  useEffect(() => {
    if (Object.keys(profiledata).length > 0) {
      fetchmemories();
    }
  },[]);
  const fetchuserprofiles = async () => {
    const res = await axios.get(
      (`/api/profile/getSingleProfileDetails/${id}` || `https://api.lifecloud-qr.com/api/profile/getSingleProfileDetails/${id}`)
    );
    setProfileData(res.data);
    console.log(res, 'res');
  };

  const fetchmemories = async () => {
    const res = await axios.get(
      (`/api/memory/getallmemory/${id}` || `https://api.lifecloud-qr.com/api/memory/getallmemory/${id}`)
    );
    console.log(res, 'res memory');
    setmemoryData(res.data);
  };

  console.log(memoryData, 'get all memory');
  console.log(profiledata);
  let pasrseAxios = Object.keys(profiledata).length
    ? JSON.parse(profiledata.lifeAxis)
    : '';
  console.log(pasrseAxios);
  console.log();
  const handleLike = (e) => {
    try {
      const formdata = new FormData();
      let data = {
        userId: profiledata.originalUser[0]._id,
      };
      fetch((`/api/memory/like/${e._id}` || `https://api.lifecloud-qr.com/api/memory/like/${e._id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);

          if (res) {
            setLikeMessage(res);
            // setMessage('like added successfully!')
            // setOpen(true)
          }
        });
    } catch (err) {
      console.log(err);
      setMessage('Something went wrong!');
      setOpen(true);
    }
  };

  //
  const handleComment = (e) => {
    console.log(e);
    try {
      fetch((`/api/memory/comment/${e._id}` || `https://api.lifecloud-qr.com/api/memory/comment/${e._id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(text),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);

          if (res) {
            setCommenting(false);
            setComment(res);
            // setMessage('like added successfully!')
            // setOpen(true)
          }
        });
    } catch (err) {
      console.log(err);
      setMessage('Something went wrong!');
      setOpen(true);
    }
  };

  //

  const onhandleChangeComment = (e) => {
    setText({
      comments: [
        {
          text: e.target.value,
        },
      ],
    });
  };

  const handleDelete = (e, id) => {
    console.log(e, id);
    fetch((`/api/memory/commentdell/${id}` || `https://api.lifecloud-qr.com/api/memory/commentdell/${id}`), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ comment: e }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setDelComment(res);
        if (res) {
          setCommenting(false);
          setComment(res);
          // setMessage('like added successfully!')
          // setOpen(true)
        }
      });
  };
  const handleDellMemory = (e) => {
    console.log(e, 'e');
    fetch((`/api/memory/commentdellOBJ/${e._id}` || `https://api.lifecloud-qr.com/api/memory/commentdellOBJ/${e._id}`), {
      method: 'DELETE',
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setDelComment(res);
        if (res) {
          setCommenting(false);
          setComment(res);
          history.push(`/userprofiles/${profiledata.originalUser[0]._id}`);
          setMessage('delete successfully!');
          // setOpen(true)
        }
      });
  };
  const handleClose = () => {
    setOpen(false);
    setMessage('');
  };
  var options = {
    weekday: 'long', //to display the full name of the day, you can use short to indicate an abbreviation of the day
    day: 'numeric',
    month: 'long', //to display the full name of the month
    year: 'numeric',
  };
  console.log(text, 'setText');

  const loggedUser = JSON.parse(localStorage.getItem('user'));
console.log(profiledata)
  if (Object.keys(profiledata).length > 0) {
    return (
      <div>
        <TopBar />
        <img
          src={(`http://localhost:8800/${profiledata.wallImg}` || `https://api.lifecloud-qr.com/${profiledata.wallImg}`)}
          alt=""
          className="profile-cover"
        ></img>
        <div className="profile-details">
          <img
            src={(`http://localhost:8800/${profiledata.profileImg}` || `https://api.lifecloud-qr.com/${profiledata.profileImg}`)}
            alt=""
            className="profile-img"
          ></img>
          <div className="deceased-details">
            <h1>{`${profiledata.firstName} ${profiledata.lastName}`}</h1>
            <p>
              {profiledata.birthDate.split('T')[0]} -{' '}
              {profiledata.deathDate.split('T')[0]}
            </p>
            {/* <p>{profile[0].city}</p> */}
          </div>
        </div>
        <div className="btns-container">
          <div>
            {(profiledata.originalUser[0]._id === loggedUser._id ||
              profiledata.addAdmins.indexOf()) && (
              <Link to={`/editprofiles/${id}`}>
                <span className="small-btn">ערוך פרופיל</span>
              </Link>
            )}
            <span className="small-btn">הוסף חבר</span>
            <span className="small-btn" onClick={() => setShow('friends')}>
              רשימת חברים
            </span>
          </div>
          <div className="big-btns-container">
            <div
              onClick={() => setShow('bio')}
              className={`${show === 'bio' && 'active'} big-btn`}
            >
              ביוגרפיה
            </div>
            <div
              onClick={() => setShow('wall')}
              className={`${show === 'wall' && 'active'} big-btn`}
            >
              קיר
            </div>
          </div>
        </div>
        <div
          className={`${
            show === 'wall' && 'display'
          } d-none wall-main-container`}
        >
          <div className="memorial-container">
            <h1 className="memorial-title">תאריך האזכרה</h1>
            <div className="details-and-icons">
              <div className="memorial-details">
                <h3>| {profiledata.birthDate.split('T')[0]}</h3>
                <h3>| {profiledata.deathDate.split('T')[0]}</h3>
                <h3>| {profiledata.wazeLocation}</h3>
              </div>
              <div className="profile-icons-container">
                <img
                  src={waze}
                  alt=""
                  className="icon"
                  href={`https://www.waze.com/ul?q=${profiledata.wazeLocation}`}
                ></img>
                <img
                  src={zoom}
                  alt=""
                  className={`${!profiledata.zoomLink && 'no-link-icon'} icon`}
                ></img>
              </div>
            </div>
          </div>
          <div className="gallery-container">
            <Gallery profiledata={profiledata} id={id} />
            <div onClick={() => setShow('gallery')} className="full-btn">
              {' '}
              + לכל הגלריה
            </div>
          </div>
          <div className="grave-location-container">
            <h1 className="grave-location-title">מיקום הקבר</h1>
            <div className="grave-imgs-container">
              <img
                src={(`http://localhost:8800/${profiledata.graveImg}` || `https://api.lifecloud-qr.com/${profiledata.graveImg}`)}
                alt=""
                className="grave-img"
              ></img>
            </div>
            <div className="navigation-btn">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${profiledata.googleLocation}`}
              ></a>
              לחץ כאן כדי לנווט לקבר <img src={google} alt=""></img>
            </div>
          </div>
          <div className="memories-div">
            <h1 className="memories-title">זכרונות</h1>
            <div className="memories-container">
              {/* {memoryData.forEach((data, key) => { */}
              {/* console.log(data.file[0], '--> data') */}
              {memoryData.length > 0 ? (
                memoryData.map(
                  (
                    imgData,
                    index //change to memories
                  ) => (
                    <Popup
                      trigger={
                        <div className="memory-container" key={index}>
                          <img
                            src={(`http://localhost:8800/${imgData.file}` || `https://api.lifecloud-qr.com/${imgData.file}`)}
                            alt=""
                            className="memory-img"
                          ></img>
                          {/* {imgData.file.map(item => {
                          return <img
                            src={`http://localhost:8800/${item}`}
                            alt=""
                            className="memory-img"
                          ></img>
                        })} */}

                          <div className="icons-container">
                            <div className="memory-heart-container">
                              <div className="heart-div">
                                <img
                                  style={{ cursor: 'pointer' }}
                                  className="heart-icon"
                                  src={heart}
                                  alt=""
                                ></img>
                                <span>{imgData.likes.length}</span>
                              </div>
                            </div>
                            <div className="facebook-container">
                              <div className="heart-div">
                                <img
                                  className="heart-icon"
                                  src={facebook}
                                  alt=""
                                ></img>
                              </div>
                            </div>
                            <div className="instagram-container">
                              <div className="heart-div">
                                <img
                                  className="heart-icon"
                                  src={instagram}
                                  alt=""
                                ></img>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      modal
                      nested
                    >
                      {(close, item) => (
                        <Memory
                          close={close}
                          data={imgData}
                          index={index}
                          handleLike={handleLike}
                          onhandleChangeComment={onhandleChangeComment}
                          handleComment={handleComment}
                          setCommenting={setCommenting}
                          commenting={commenting}
                          handleDelete={handleDelete}
                          handleDellMemory={handleDellMemory}
                        /> //change to memories
                      )}
                    </Popup>
                  )
                )
              ) : (
                <p style={{ marginBottom: '40px' }}>כאן יהיו הזכרונות שלנו מ</p>
              )}

              {/* })} */}
            </div>
            <div className="memory-actions">
              <div
                className={
                  next >= profiledata.gallery.length
                    ? ' hideBtn '
                    : ` full-memory-btn`
                }
                onClick={handleShowMoreMemories}
              >
                + עוד זכרונות
              </div>
              <Link to={`/memorycreation/${id}`}>
                <div className="full-memory-btn">+ הוסף זיכרון</div>
              </Link>
            </div>
          </div>
        </div>
        <div className={`${show === 'bio' && 'display'} d-none`}>
          <div className="bio-content">
            <h1 className="bio-name">{profiledata.firstName}.</h1>
            <p className="bio-bio">{profiledata.description}</p>
          </div>
          <div className="life-axis">
            <h1 className="axis-name">ביוגרפיה וציר חיים</h1>
            {/* <p className="axis-desc">{profiledata.description}</p> */}
          </div>
          <div>
            {pasrseAxios.map((axis) => (
              <div className="axis-container">
                <div className="axis-sub-container">
                  <h1 className="axis-title">{axis.axisTitle}</h1>
                  <p className="axis-description2">{axis.axisDescription}</p>
                </div>
                <div className="axis-bubble">
                  <span>{axis.axisDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`${show === 'gallery' && 'display'} full-gallery d-none`}
        >
          <div className="full-gallery-container">
            {profiledata.gallery.map((img, index) => (
              <div className="full-gallery-img-container" key={index}>
                <img
                  src={(`http://localhost:8800/${img}` || `https://api.lifecloud-qr.com/${img}`)}
                  alt=""
                  className="full-gallery-img"
                ></img>
                <div className="heart-container">
                  <div className="heart-div">
                    <img className="heart-icon" src={heart} alt=""></img>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`${show === 'friends' && 'display'} friends-list d-none`}
        >
          <FriendsList />
        </div>
        <SnackBar open={open} handleClose={handleClose} message={message} />
        <SocialFooter />
        <Footer />
      </div>
    );
  } else {
    return (
      <h1 style={{ textAlign: 'center', paddingTop: '20%' }}>
        <ProgressBar />
      </h1>
    );
  }
}
