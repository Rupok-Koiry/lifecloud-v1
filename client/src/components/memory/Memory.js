import React, { onClick, useEffect, useState } from 'react'
import './memory-page.css'
import BottomLeftCloud from '../../assets/bottom-left-cloud.png'
import TopRightCloud from '../../assets/top-right-cloud.png'
import Rectangle6 from '../../assets/Rectangle6.png'
import heart from '../../assets/heart.png';
import instagram from '../../assets/instagram.png';
import facebook from '../../assets/facebook.png';
import Arrow1 from '../../assets/Arrow1.png';
import moment from 'moment'
import LanguageContext from '../../context/LanguageContext';

const Memory = ({ data, close, handleLike, onhandleChangeComment, handleComment, commenting, setCommenting, handleDelete, handleDellMemory }) => {
    const [language, setLanguage] = useState(LanguageContext.language);

    const isUserAdmin = true
    return (
        <div className="memory-page">
            <div className='single-memory-content-container'>
                <div className='single-memory-subcontainer'>
                    <h1 className='single-memory-title'>Raz Cohen | 12.3.22</h1>  {/* add the title prome profiledata memory with the memory index */}
                    <img src={`http://localhost:8800/${data.file}`} alt='' className='single-memory-img'></img>
                    <div className="icons-container">
                        <div className="memory-heart-container">
                            <div className="heart-div">
                                <img
                                    style={{ cursor: 'pointer' }}
                                    className="heart-icon"
                                    src={heart}
                                    alt=""
                                    onClick={() => handleLike(data)}
                                ></img>
                                {data.likes.length}
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
                                />
                            </div>
                        </div>
                    </div>
                    <p className='single-memory-text'>{Memory.text || 'lorem ipsum'}</p>
                    <div className='comments-container'>
                        <h2>Comments</h2>
                        {data.comments.map((comment, index) => {
                            return (
                                <div className='comment-container'>
                                    <span className='comment-subcontainer'>
                                        <img src={`http://localhost:8800/${data.file}`} alt='' className='comment-img' />
                                        <p>{moment(comment.date).utc().format("YYYY-DD-MM")}</p>
                                        |
                                        <p>{`${data.firstName} ${data.lastName}`}</p>
                                        |
                                        {/* <p>{comment.uploaderName}:</p> */}
                                        <p>{comment.text}</p>
                                    </span>
                                    <span style={{ cursor: 'pointer' }} onClick={() => handleDelete(comment, data._id)}>delete -</span>
                                </div>
                            )
                        })}
                        <div className='action-btns-container'>
                            <div onClick={() => setCommenting(!commenting)} style={{ cursor: 'pointer' }} className={!commenting && 'comment-btn'}> Comment... </div>
                            {commenting ?
                                <input onChange={onhandleChangeComment} placeholder='write comment' style={{
                                    width: '99%',
                                    height: '25px',
                                    border: '1px solid #abc9db',
                                    borderRadius: '10px'
                                }} />
                                :
                                ''
                            }

                            <div className='action-btns'>
                                <div className='action-btn' onClick={() => handleComment(data)} style={{ cursor: 'pointer' }}>Publish</div>
                                <div className='action-btn' onClick={() => setCommenting(!commenting)} style={{ cursor: 'pointer' }}>Cancel</div>
                            </div>
                            {isUserAdmin &&
                                <div className='dlt-comment-btn' onClick={() => handleDellMemory(data)} style={{ cursor: 'pointer' }}>Delete Memory</div>
                            }
                        </div>
                    </div>
                </div>
                <h1 onClick={close} className='close-btn'>Back <img alt='' src={Arrow1}></img></h1>
            </div>
            <img alt='' src={TopRightCloud} className='top-cloud'></img>
            <img src={BottomLeftCloud} className='bottom-cloud' alt=''></img>
        </div>
    )
}

export default Memory