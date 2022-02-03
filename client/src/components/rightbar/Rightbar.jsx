import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Add, Remove, Edit } from '@material-ui/icons';
import './rightbar.css';
import Online from '../online/Online';
import { AuthContext } from '../../context/AuthContext';

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState();
  const [editView, setEditView] = useState(false);

  // let dataobj = { city: '', from: '', relationship: '0', username: '' };

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get('/users/friends/' + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    // setFollowed(currentUser.following.includes(user?._id));
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: 'UNFOLLOW', payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: 'FOLLOW', payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        {/* <h4 className="rightbarTitle">People You follow</h4> */}
        {/* <ul className="rightbarFriendList">
          {friends.map((user) => (
          
            <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img className="rightbarProfileImg"  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + 'person/noAvatar.png'
                  } alt="" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
          </li>
          ))}
          {console.log(friends)}
        </ul> */}
      </>
    );
  };

  const ProfileRightbar = () => {
    const [city, setCity] = useState('');
    const [from, setFrom] = useState('');
    const [rel, setRel] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
      setCity(user.city);
      setFrom(user.from);
      setRel(user.relationship);
      setUsername(user.username);
    }, []);

    const EditSubmissionHandler = async (e) => {
      e.preventDefault();
      const updatedData = {
        ...user,
        userId: user._id,
        city,
        from,
        relationship: rel,
        username,
      };
      const resd = await axios.put('/users/' + user._id, updatedData);
      window.location.reload();
    };
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">
          User information{' '}
          {user.username === currentUser.username && (
            <Edit
              style={{ marginLeft: '5rem', marginTop: '20' }}
              onClick={(e) => setEditView(!editView)}
            />
          )}
        </h4>

        {editView && user.username === currentUser.username ? (
          <div className="rightbarInfo">
            <form onSubmit={EditSubmissionHandler}>
              {/* {JSON.stringify(data)} */}
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <input
                  className="rightbarInfoKey"
                  style={{ borderRadius: '8px' }}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <input
                  className="rightbarInfoKey"
                  style={{ borderRadius: '8px' }}
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>

              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <select
                  value={rel}
                  onChange={(e) => setRel(Number(e.target.value))}
                >
                  <option value="1">Single</option>
                  <option value="2"> Married</option>
                  <option value="0">-</option>
                </select>
                {/* <span className="rightbarInfoValue">
                  {rel === 1 ? 'Single' : rel === 2 ? 'Married' : '-'}
                </span> */}
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
        ) : (
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">{user.from}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship:</span>
              <span className="rightbarInfoValue">
                {user.relationship === 1
                  ? 'Single'
                  : user.relationship === 2
                  ? 'Married'
                  : '-'}
              </span>
            </div>
          </div>
        )}
        <h4 className="rightbarTitle">User follows</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={'/profile/' + friend.username}
              style={{ textDecoration: 'none' }}
            >
              <div key={friend.username} className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : 'https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png'
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
