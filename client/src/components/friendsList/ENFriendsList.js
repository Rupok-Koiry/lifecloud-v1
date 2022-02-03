import React, { useState, useEffect } from 'react'
import './friendslist.css'
import Rectangle7 from '../../assets/Rectangle7.png'
import axios from 'axios'
const ENFriendsList = ({ proid, profiledata, setrfriendReq, setAdminres }) => {
    const [friendsList, setFriendsList] = useState({
        friendRequests: [{ name: 'Omer Raz', profileImg: Rectangle7 }],
        friends: [{ name: 'Omer Raz', profileImg: Rectangle7 }],
        admins: [{ name: 'Omer Raz', profileImg: Rectangle7 }]
    })
    const [userid, setuserid] = useState('')

    const [users, setUsers] = useState([])
    useEffect(() => {
        fetchUsers()
    }, [])
    const fetchUsers = async () => {
        const res = await axios.get(`api/users/all/every`);
        setUsers(res.data)
    }
    console.log(users)
    const [isAdmin, setIsAdmin] = useState(true)
    const handleAddFriend = (e) => {
        console.log(e, proid, 'e')
        setuserid(e)
        fetch(`api/profile/addFriends/${proid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({ isFriend: false, userId: e }),
        })
            .then((res) => {
                return res.json();
            }).then(res => {
                console.log(res, 'res')
                setrfriendReq(res)
            })


    }
    const handleAddAcceptFrined = (e) => {
        // setuserid(e)

        fetch(`api/profile/addAcceptFriends/${proid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({ isFriend: true, userId: e._id, user: e.user[0]._id }),
        })
            .then((res) => {
                return res.json();
            }).then(res => {
                console.log(res, 'res')
                setrfriendReq(res)
            })


    }

    const handleAddAdmins = (e) => {
        console.log(e, proid, 'e')
        setuserid(e)
        fetch(`/api/profile/addAdmins/${proid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({ isAdmin: true, userId: e }),
        })
            .then((res) => {
                return res.json();
            }).then(res => {
                console.log(res, 'res')
                setAdminres(res)
            })


    }



    console.log(profiledata, 'profiledata list')
    let valchek = profiledata && profiledata.addFriends.length > 0 && profiledata.addFriends.map((item, i) => {
        return item.user.map(itemA => {
            return itemA._id
        })
    })
    let valcheckFinal = valchek && valchek.length > 0 && valchek.map((item, i) => {
        return {
            id: item[0],
        };
    })
    let valfinalcheckid = valcheckFinal && valcheckFinal.map(item => {
        return item.id
    })

    let e = users.map((n, i) => valfinalcheckid && valfinalcheckid.includes(n._id))

    ///// for admins
    let valchekAdmin = profiledata && profiledata.addAdmins.length > 0 && profiledata.addAdmins.map((item, i) => {
        return item.user.map(itemA => {
            return itemA._id
        })
    })
    console.log(valchekAdmin)
    let valcheckFinaladmin = valchekAdmin && valchekAdmin.length > 0 && valchekAdmin.map((item, i) => {
        return {
            id: item[0],
        };
    })
    let valfinalcheckidadmin = valcheckFinaladmin && valcheckFinaladmin.map(item => {
        return item.id
    })

    let eAdmin = users.map((n, i) => valfinalcheckidadmin && valfinalcheckidadmin.includes(n._id))

    return (
        <div className="friends-list">
            {isAdmin ? (
                <div>
                    <h1>New friends</h1>
                    {profiledata && profiledata.addFriends.length > 0 ? profiledata.addFriends.map((friend, i) => {
                        return (
                            <div className="friend-request" key={friend.user && friend.user[0]._id}>
                                <div className='friend-request-details'>
                                    <img src={friend.profileImg} alt="profile" />
                                    <p>{friend.user && friend.user[0].firstName}</p>
                                </div>
                                <div>
                                    <span style={{ cursor: 'pointer' }} onClick={() => handleAddAcceptFrined(friend)}>Add Friend</span>
                                    |
                                    <span style={{ cursor: 'pointer' }} onClick={() => handleAddFriend(friend.user[0]._id)}>decline</span>
                                </div>
                            </div>
                        )
                    }) : <div style={{ textAlign: 'center' }}>There is no friend here</div>}
                    <h1>Friends</h1>
                    {users && users.length > 0 && users.map((user, i) => {
                        // console.log(e[i] == true, 'valchek[user._id]')
                        return (
                            <div className="friend-request" key={user._id}>
                                <div className='friend-request-details'>
                                    <img src={Rectangle7} alt="profile" />
                                    <p>{user.firstName}</p>
                                </div>
                                <div>


                                    {/* <span onClick={() => handleAddFriend(user._id)} style={{ cursor: 'pointer' }}>Remove Friend</span> */}
                                    {e[i] ? <span style={{ cursor: 'pointer' }}>Friend reqest sent</span> : <span onClick={() => handleAddFriend(user._id)} style={{ cursor: 'pointer' }}>Add Friend</span>}



                                    |
                                    {eAdmin[i] ? <span style={{ cursor: 'pointer' }}>Admin</span> : <span onClick={() => handleAddAdmins(user._id)} style={{ cursor: 'pointer' }}>+ Add as admin</span>}

                                </div>
                            </div>
                        )
                    })}
                    <h1>Admin List</h1>
                    {profiledata && profiledata.addAdmins.length > 0 ? profiledata.addAdmins.map((admin, i) => {
                        return (
                            <div className="friend-request" key={admin.user && admin.user[0]._id}>
                                <div className='friend-request-details'>
                                    <img src={admin.profileImg} alt="profile" />
                                    <p>{admin.user && admin.user[0].firstName}</p>
                                </div>
                                <div>
                                    <span onClick={() => handleAddAdmins(admin.user[0]._id)} style={{ cursor: 'pointer' }}>Remove admin</span>
                                </div>
                            </div>
                        )
                    }) : <div style={{ textAlign: 'center' }}>There is no admin here</div>}
                </div>
            ) : (
                <div>
                    <h1>Friends</h1>
                    {/* {friends.friends.map(friend => {
                        return (
                            <div className="friend-request" key={friend.id}>
                            </div>
                        )
                    })} */}
                </div>
            )}
        </div>
    )
}
export default ENFriendsList