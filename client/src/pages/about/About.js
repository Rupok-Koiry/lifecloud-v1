import React from 'react'
import './about.css'
import Footer from '../../components/footer/Footer'
import SocialFooter from '../../components/socialFooter/socialFooter'
import Topbar from '../../components/topbar/Topbar'
import whiteLogo from '../../assets/whiteLogo.png'

const About = () => {
    return (
        <>
            <Topbar />
            <div className='about-container'>
                <div className='top-about'>
                    <img src={whiteLogo} alt='' style={{ height: '12rem' }} />
                    <p>
                        Life Cloud נוצרה מתוך הבנה שיש להבדיל בין רשתות חברתיות ועמודי הזיכרון בהן ספר החיים של LIFE CLOUD הי
                        פלטפורמה נוחה להפעלה וידידותית למשתמש ,המאפשרת לנו להעלות, לאשר, לערו ,לאצור ולשתף את אותם רגעים עם , חברים .והדורות הבאי
                    </p>
                    <p>. בכל זמן נתון ומכל מקום בעולםמשפחה . מי אנחנו? אני, את, אתה וכולנו.
                    </p>
                </div>
                <div className='bottom-about'>
                    <p>
                        איבדתי את היקרה לי מכל. יותר מכל רציתי לחגוג את החיים שלה ואת״
                        המשותפים לנו יחד. שיהיה לי מקום מיוחד
                        ,שבו אני יכול להיזכר ולשת
                        ,בשביל הילדים, המשפחה, החברים, וגם בשבילי.
                        בכל פעם שחיפשתי באלבומי ישנים או ניסיתי לאתר סרט או תמונה אונליי ,זה .היה כמעט בלתי אפשר
                        מכא נולד Life Cloud ,כי בעולם הכל מתקדם של היום, שבו אתה יכול להגיע לאנשים בקצה השני של העולם בנגיעה על מסך, חייבת הייתה  דרך קלה ונוחה ״להעלות ולשמור את החוויות שלנו ולהמשי
                    </p>
                    <div style={{textAlign: 'center'}}>גלי שמחה</div>
                </div>
            </div>
            <SocialFooter backgroundColor='#F5FCFF' color='#6097bf' />
            <Footer />
        </>
    )
}
export default About