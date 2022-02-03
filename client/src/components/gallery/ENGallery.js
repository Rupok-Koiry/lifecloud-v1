import React, { useState } from 'react'
import '../../pages/profile/profiledetails.css'
import { Link } from 'react-router-dom'
export const ENGallery = ({ profiledata, id }) => {
    return <>
        <h1 className="gallery-title">Gallery</h1>
        <div className="imgs-container">
            {profiledata.gallery.slice(0, 4).map((img, index) => {
                return (
                    <>
                        {index === 3 ?
                            <Link to={`/gallery/${id}`}>
                                <div className='gallery-img last-image' style={{ backgroundImage: `http://localhost:8800:/${img}`, width: '250px', height: '250px' }}>
                                    +
                                </div>
                            </Link>
                            :
                            <div className='gallery-img'>
                                <img className="image-gallery-section" src={`${img ? `http://localhost:8800:/${img}` : 'https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg'}`} alt="" />
                            </div>
                        }
                    </>
                )
            })}
        </div>
    </>
}
