import axios from 'axios';
import { useRef, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Topbar from '../../components/topbar/Topbar';
import profiles from './dummy-profiles.json';
import './profile.css';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router';
import moment from 'moment'
import SnackBar from '../../components/snackbar/SnackBar'
export default function ProfileEdit() {
    const { user } = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [coverData, setCoverData] = useState(null);
    const [profiledata, setProfileData] = useState({})
    const id = useParams().id;
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [multiFiles, setMultiFiles] = useState()
    const [inputList, setInputList] = useState([
        { axisTitle: '', axisDate: '', axisDescription: '' },
    ]);
    const [selectedGender, setSelectedGender] = useState('');
    const firstName = useRef();
    const lastName = useRef();
    const companyName = useRef();
    const birthDate = useRef();
    const deathDate = useRef();
    const gender = selectedGender;
    const phone = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const wazeLocation = useRef();
    const googleLocation = useRef();
    const description = useRef();
    const axisDescription = useRef();
    const axisTitle = useRef();
    const axisDate = useRef();
    const history = useHistory();
    const [wallInformation, setWallInformation] = useState({
        originalUser: Object.keys(profiledata).length ? profiledata.originalUser[0]._id : '',
        profileImg: Object.keys(profiledata).length ? profiledata.profileImg : '',
        wallImg: Object.keys(profiledata).length ? profiledata.wallImg : '',
        firstName: Object.keys(profiledata).length ? profiledata.firstName : '',
        lastName: Object.keys(profiledata).length ? profiledata.lastName : '',
        birthDate: Object.keys(profiledata).length ? moment(profiledata.birthDate).utc().format("YYYY-DD-MM") : '',
        deathDate: Object.keys(profiledata).length ? moment(profiledata.deathDate).utc().format("YYYY-DD-MM") : '',
        gender: Object.keys(profiledata).length ? profiledata.gender : '',
        wazeLocation: Object.keys(profiledata).length ? profiledata.wazeLocation : '',
        googleLocation: Object.keys(profiledata).length ? profiledata.googleLocation : '',
        description: Object.keys(profiledata).length ? profiledata.description : '',
        // gallery: picture,
    })

    const handleChangeValue = (e) => {
        setWallInformation({
            ...wallInformation,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        fetchuserprofiles()
    }, [])
    const fetchuserprofiles = async () => {
        const res = await axios.get(`/api/profile/getSingleProfileDetails/${id}`);
        setProfileData(res.data)
    }
    const onChangePicture = (e) => {
        if (e.target.files[0]) {
            console.log('picture: ', e.target.files);
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onChangeCover = (e) => {
        if (e.target.files[0]) {
            console.log('picture: ', e.target.files);
            setImage(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setCoverData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onChangeMultiplePicture = (e) => {
        setMultiFiles(e.target.files)
    }


    const handleChange = (e) => {
        setSelectedGender(e.target.value);
    };
    useEffect(() => {
        if (Object.keys(profiledata).length) {
            setWallInformation({
                originalUser: profiledata.originalUser[0]._id,
                profileImg: profiledata.profileImg,
                wallImg: profiledata.wallImg,
                firstName: profiledata.firstName,
                lastName: profiledata.lastName,
                birthDate: profiledata.birthDate,
                deathDate: profiledata.deathDate,
                gender: profiledata.gender,
                wazeLocation: profiledata.wazeLocation,
                googleLocation: profiledata.googleLocation,
                description: profiledata.description,
                lifeAxis: Object.keys(profiledata).length ? JSON.parse(profiledata.lifeAxis) : inputList,
            })
            setInputList(Object.keys(profiledata).length ? JSON.parse(profiledata.lifeAxis) : [
                { axisTitle: '', axisDate: '', axisDescription: '' },
            ])
        }
    }, [profiledata])
    console.log(profiledata, 'pro')
    console.log(wallInformation, 'wallInformation')
    // handle input change
    const handleInputChange = (e, index) => {
        console.log(e.target.value, index)
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([
            ...inputList,
            { axisTitle: '', axisDate: '', axisDescription: '' },
        ]);
    };
    const handleClick = async (e) => {
        console.log(id, 'id');
        e.preventDefault();

        try {
            const formdata = new FormData();
            formdata.append('profileImg', picture);
            formdata.append('_id', profiledata._id);
            formdata.append('id', profiledata.originalUser[0]._id);
            formdata.append('wallImg', image);
            formdata.append('firstName', wallInformation.firstName);
            formdata.append('originalUser', wallInformation.originalUser);
            formdata.append('lastName', wallInformation.lastName);
            formdata.append('birthDate', wallInformation.birthDate);
            formdata.append('deathDate', wallInformation.deathDate);
            formdata.append('gender', wallInformation.gender);
            formdata.append('wazeLocation', wallInformation.wazeLocation);
            formdata.append('googleLocation', wallInformation.googleLocation);
            formdata.append('description', wallInformation.description);
            formdata.append('lifeAxis', JSON.stringify(inputList));
            for (let i = 0; i < multiFiles.length; i++) {
                formdata.append('multiplefiles', multiFiles[i]);

            }
            // const config = {
            //   headers: {
            //     'content-type': 'multipart/form-data'
            //   }
            // }
            console.log(formdata, 'formdata')
            fetch('https://api.lifecloud-qr.com/api/profile/updateProfile', {
                method: 'PUT',
                body: formdata,
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    console.log(res);
                    if (res) {
                        setMessage('Profile updated successfully!')
                        setOpen(true)
                    }
                });
            // let res = await axios.post('api/profile/createProfile', formdata);
            // console.log('res', res)
            // history.push('/login');
        } catch (err) {
            console.log(err);
            setMessage('Something went wrong!')
            setOpen(true)
        }
    };
    const handleClose = () => {
        setOpen(false)
        setMessage('')
    }
    return (
        <div className="profile-creation-container">
            <Topbar />
            <div className="profile-creation">
                <div className="loginWrapper">
                    <div className="loginLeft">
                        <h3 className="profile-creation-title">ערוך פרופיל</h3>
                    </div>
                    <div className="profile-images">
                        <div className="register_profile_image"></div>
                        {/* <div className="profile-image-container">
              <img
                className="profile-image"
                src={
                    !imgData &&
                    'https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png'
                }
                alt=""
              />
            </div> */}
                        <div className="profile-image-container">
                            <img
                                className="profile-image"
                                src={imgData ? imgData : `http://localhost:8800/${wallInformation.profileImg}`
                                }
                                alt=""
                            ></img>
                            <input
                                className="custom-file-input"
                                type="file"
                                name="profileImg"
                                onChange={onChangePicture}
                            />
                        </div>
                        <div className="profile-image-container">
                            <img
                                className="profile-image"
                                src={coverData ? coverData : `http://localhost:8800/${wallInformation.wallImg}`}
                                alt=""
                            ></img>
                            <input
                                className="custom-file-input-cover"
                                type="file"
                                onChange={onChangeCover}
                                name="profileImg"
                            />
                        </div>
                    </div>
                    <div className="loginRight">
                        <div className="RegBox">
                            <form className="profile-creation-box" onSubmit={handleClick}>
                                <div className="names-container">
                                    <input
                                        placeholder="* שם פרטי"
                                        value={wallInformation.firstName}
                                        ref={firstName}
                                        onChange={handleChangeValue}
                                        name='firstName'
                                        className="nameInput"
                                    />
                                    <input
                                        placeholder="* שם משפחה"
                                        value={wallInformation.lastName}
                                        ref={lastName}
                                        onChange={handleChangeValue}
                                        name='lastName'
                                        className="nameInput"
                                    />
                                </div>
                                <div className="names-container">
                                    <input
                                        placeholder="* תאריך לידה"
                                        required
                                        type="date"
                                        ref={birthDate}
                                        onChange={handleChangeValue}
                                        name='birthDate'
                                        value={moment(wallInformation.birthDate).format("YYYY-MM-DD")}
                                        className="nameInput"

                                    />
                                    <input
                                        placeholder="* תאריך פטירה"
                                        required
                                        type="date"
                                        onChange={handleChangeValue}
                                        value={moment(wallInformation.deathDate).utc().format("YYYY-MM-DD")}
                                        name='deathDate'
                                        ref={deathDate}
                                        className="nameInput"
                                    />
                                </div>
                                <div className="radio-container">
                                    <h3>מין</h3>
                                    <div className="radio-input-container">
                                        <input
                                            type="radio"
                                            value="male"
                                            id="male"
                                            onChange={handleChangeValue}
                                            name="gender"
                                            className="radio"
                                        />
                                        <label
                                            htmlFor="male"
                                            className={`${wallInformation.gender === 'male' && 'active'
                                                } input-label`}
                                        >
                                            ז
                                        </label>
                                    </div>
                                    <div className="radio-input-container">
                                        <input
                                            type="radio"
                                            value="female"
                                            id="female"
                                            onChange={handleChangeValue}
                                            name="gender"
                                            className="radio"
                                        />
                                        <label
                                            htmlFor="female"
                                            className={`${wallInformation.gender === 'female' && 'active'
                                                } input-label`}
                                        >
                                            נ
                                        </label>
                                    </div>
                                </div>
                                <div className="location-container">
                                    <h1>* מיקום הקבר</h1>
                                    <div className="location-semicontainer">
                                        <div className="names-container">
                                            <input
                                                placeholder="* Add waze navigation"
                                                required
                                                ref={wazeLocation}
                                                onChange={handleChangeValue}
                                                value={wallInformation.wazeLocation}
                                                name='wazeLocation'
                                                className="nameInput"
                                            />
                                            <input
                                                placeholder="* Add google map location"
                                                required
                                                ref={googleLocation}
                                                onChange={handleChangeValue}
                                                value={wallInformation.googleLocation}
                                                name='googleLocation'
                                                className="nameInput"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="location-container">
                                    <h1>* העלאת תמונות לגלריה</h1>
                                    <div>
                                        <div className="names-container">
                                            <div className="register_profile_image">
                                                <input
                                                    id="profilePic"
                                                    type="file"
                                                    name="multiplefiles"
                                                    multiple
                                                    onChange={onChangeMultiplePicture}
                                                />
                                            </div>
                                            {/* <div className="previewProfilePic">
                                                <img
                                                    className="playerProfilePic_home_tile"
                                                    src={imgData}
                                                    alt=""
                                                />
                                            </div> */}
                                        </div>
                                    </div>{' '}
                                </div>
                                <input
                                    placeholder="* + על הנפטר"
                                    ref={description}
                                    onChange={handleChangeValue}
                                    value={wallInformation.description}
                                    name='description'
                                    className="nameInput description"
                                />
                                <div>
                                    <h1 style={{ textAlign: 'center' }}>ציר חיים</h1>
                                    {inputList.map((x, i) => {
                                        return (
                                            <div className="box" key={i}>
                                                <div className="inner-box">
                                                    <input
                                                        name="axisTitle"
                                                        placeholder="* כותרת"
                                                        value={x.axisTitle}
                                                        onChange={(e) => handleInputChange(e, i)}
                                                        className="axis-input"
                                                    />
                                                    <input
                                                        name="axisDate"
                                                        placeholder="* תאריך"
                                                        value={x.axisDate}
                                                        onChange={(e) => handleInputChange(e, i)}
                                                        className="axis-input"
                                                    />
                                                    <input
                                                        name="axisDescription"
                                                        placeholder="* טקסט"
                                                        value={x.axisDescription}
                                                        onChange={(e) => handleInputChange(e, i)}
                                                        className="axis-description"
                                                    />
                                                    <div className="btn-box">
                                                        {inputList.length !== 1 && (
                                                            <p
                                                                className="delete-btn"
                                                                onClick={() => handleRemoveClick(i)}
                                                            >
                                                                -הסר
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                {inputList.length - 1 === i && (
                                                    <div className="add-btn" onClick={handleAddClick}>
                                                        <div className="inner-btn">
                                                            <div className="line-1"></div>
                                                            <div className="line-2"></div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <button className="create-btn" type="submit">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <SnackBar open={open} handleClose={handleClose} message={message} />
            </div>
        </div>
    );
}
