import React, { useState, useEffect, useContext } from 'react';
import share from '../../assets/share.png';
import axios from 'axios';
import Topbar from '../topbar/Topbar';
import { useParams } from 'react-router';
import './memory-creation.css';
import SnackBar from '../snackbar/SnackBar';
const MemoryCreation = () => {
  const [profiledata, setProfileData] = useState([]);
  const id = useParams().profileid;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [text, setText] = useState('');
  const [multiFiles, setMultiFiles] = useState();
  useEffect(() => {
    fetchuserprofiles();
  }, []);
  const fetchuserprofiles = async () => {
    const res = await axios.get(
      `http://localhost:8800/api/profile/getSingleProfileDetails/${id}`
    );
    setProfileData(res.data);
  };
  const handleText = (e) => {
    setText(e.target.value);
  };
  const onChangeMultiplePicture = (e) => {
    setMultiFiles(e.target.files[0]);
  };
  const handleClick = async (e) => {
    console.log(id, 'id');
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append('originalUser', id);
      formdata.append('firstName', profiledata.originalUser[0].firstName);
      formdata.append('lastName', profiledata.originalUser[0].lastName);
      // for (let i = 0; i < multiFiles.length; i++) {
      formdata.append('memoryImges', multiFiles);

      // }
      console.log(formdata, 'formdata');
      fetch('/api/memory/createMemory', {
        method: 'POST',
        body: formdata,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          fetch(`/api/notification/addnotifications`, {
            method: 'POST',
            headers: {
              'Content-Type': 'Application/json',
            },
            body: JSON.stringify({
                profileId: res.originalUser[0],
                loggedInId: profiledata.originalUser[0]._id,
            }),
          }).then((res) => {
            return res.json();
          }).then(res=>{
              console.log('notification->',res)
          });
          console.log(res, 'memory created fuccesfully');
          if (res) {
            setMessage('Profile updated successfully!');
            setOpen(true);
          }
        });
      // let res = await axios.post('api/profile/createProfile', formdata);
      // console.log('res', res)
      // history.push('/login');
    } catch (err) {
      console.log(err);
      setMessage('Something went wrong!');
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setMessage('');
  };
  return (
    <>
      <Topbar />
      <div className="memory-creation-container">
        <div className="memory-creation-title">
          <h1>Memory Creation</h1>
        </div>
        <div className="memory-creation-content">
          <input
            className="memory-creation-input"
            name="text"
            onChange={handleText}
          />
          <div className="action-container">
            <div className="white-circle share-icon">
              <image alt="" className="share-icon" src={share}></image>
            </div>
            <span>share</span>
          </div>
          <div className="action-container">
            {/* <div className='white-circle add-icon'>+</div> */}
            <input
              id="profilePic"
              type="file"
              className="white-circle add-icon"
              name="multiplefiles"
              // multiple
              onChange={onChangeMultiplePicture}
            />
            <span>Add image</span>
          </div>
          <div className="action-container">
            <div className="white-circle add-icon">+</div>
            <span>Add video</span>
          </div>
        </div>
        <div className="memory-creation-bottom-actions">
          <div className="publish-btn" onClick={handleClick}>
            Publish
          </div>
          <div className="dlt-btn">Delete</div>
        </div>
      </div>
      <SnackBar open={open} handleClose={handleClose} message={message} />
    </>
  );
};

export default MemoryCreation;
