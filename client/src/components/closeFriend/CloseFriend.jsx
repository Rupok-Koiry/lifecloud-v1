import './closeFriend.css';
import { Link } from 'react-router-dom';

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="sidebarFriend">
      <Link to={`/profile/${user.username}`}>
        <img
          className="sidebarFriendImg"
          src={
            user.profilePicture
              ?  user.profilePicture
              : "https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png"
          }
          alt=""
        />
      </Link>
      <span className="sidebarFriendName">{user.username}</span>
    </div>
  );
}
