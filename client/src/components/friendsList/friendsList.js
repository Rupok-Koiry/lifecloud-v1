import React, { useState } from 'react'
import './friendslist.css'
import Rectangle7 from '../../assets/Rectangle7.png'
const FriendsList = (friends) => {
    const [friendsList, setFriendsList] = useState({
        friendRequests: [{ name: 'עומר רז', profileImg: Rectangle7 }],
        friends: [{ name: 'עומר רז', profileImg: Rectangle7 }],
        admins: [{ name: 'עומר רז', profileImg: Rectangle7 }]
    })
    const [isAdmin, setIsAdmin] = useState(true)
    return (
        <div className="friends-list">
            {isAdmin ? (
                <div>
                    <h1>חברים חדשים</h1>
                    {friendsList.friendRequests.map(friend => {
                        return (
                            <div className="friend-request" key={friend.id}>
                                <div className='friend-request-details'>
                                    <img src={friend.profileImg} alt="profile" />
                                    <p>{friend.name}</p>
                                </div>
                                <div>
                                    <span>הוסף חבר</span>
                                    |
                                    <span>סרב</span>
                                </div>
                            </div>
                        )
                    })}
                    <h1>חברים</h1>
                    {friendsList.friends.map(friend => {
                        return (
                            <div className="friend-request" key={friend.id}>
                                <div className='friend-request-details'>
                                    <img src={friend.profileImg} alt="profile" />
                                    <p>{friend.name}</p>
                                </div>
                                <div>
                                    <span>הסר חבר</span>
                                    |
                                    <span>הפוך לאדמין</span>
                                </div>
                            </div>
                        )
                    })}
                    <h1>רשימת אדמינים</h1>
                    {friendsList.admins.map(friend => {
                        return (
                            <div className="friend-request" key={friend.id}>
                                <div className='friend-request-details'>
                                    <img src={friend.profileImg} alt="profile" />
                                    <p>{friend.name}</p>
                                </div>
                                <div>
                                    <span>- הסר אדמין</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div>
                    <h1>חברים</h1>
                    {friends.friends.map(friend => {
                        return (
                            <div className="friend-request" key={friend.id}>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
export default FriendsList