import React, { useEffect,useContext } from 'react'
import { useParams } from 'react-router';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import {fetchuserprofiles} from '../../apiCalls'
export const ENUserAndprofiles = () => {
    // const [data, setData] = React.useState([])
    
  const { profiledata, dispatch } = useContext(AuthContext);
    const id = useParams().id;
    useEffect(() => {
        fetchuserprofiles(id,dispatch)
    }, [])
    // const fetchuserprofiles = async () => {
    //     const res = await axios.get(`/api/profile/getallprofileofSingleUser/${id}`);

    //     setData(res.data)
    // }
    console.log(profiledata)
    return <>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div>
                <h1>hello</h1>
                <p>Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
            </div>
            <div>
                <button>notificaction</button>
            </div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginTop: '20px' }}>
            {profiledata && profiledata.length > 0 && profiledata.map(((userProfiles, i) => {
                
                return <Link to={`/profiledetails/${userProfiles._id}`}> <div key={i} >
                    <p>User:{userProfiles.firstName}</p>
                    profile Image
                    <div>
                        <img style={{ width: '100px', height: '100px' }} src={`http://localhost:8800/${userProfiles.profileImg}`} alt="" />
                    </div>
                    Wall Image
                    <div>
                        <img style={{ width: '100px', height: '100px' }} src={`http://localhost:8800/${userProfiles.wallImg}`} alt="" />
                    </div>
                    <p>gender: {userProfiles.gender}</p>
                    <p>googleLocation: {userProfiles.googleLocation}</p>
                </div></Link>
            }))}
        </div>
    </>
}
