import React from 'react'
import './social-footer.css'
import rightCloud from '../../assets/rightCloud.png'
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'

const ENSocialFooter = ({links, backgroundColor, color}) => {
    return (
        <div className="social-footer" style={{backgroundColor: backgroundColor, color: color}}>
            <h1>Follow us</h1>
            <div className="icons-container social-footer-icons">
                <div className="facebook-container social-footer-facebook">
                    <div className="heart-div social-footer-icon">
                        <img
                            className="heart-icon"
                            src={facebook}
                            alt=""
                        ></img>
                    </div>
                </div>
                <div className="instagram-container">
                    <div className="heart-div social-footer-icon">
                        <img
                            className="heart-icon"
                            src={instagram}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <img src={rightCloud} alt='' className='right-bottom-cloud'></img>
        </div >
    )
}

export default ENSocialFooter