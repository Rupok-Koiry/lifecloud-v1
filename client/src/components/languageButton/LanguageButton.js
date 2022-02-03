import React, { useState, useContext } from 'react'
import LanguageContext from '../../context/LanguageContext'
import US from '../../assets/US.png'
import Israel from '../../assets/Israel.png'

const LanguageButton = () => {
    const { language, setLanguage } = useContext(LanguageContext)
    return (
        <div style={{ marginLeft: '18px', display: 'flex', alignItems: 'center' }}>
            <img alt='' src={Israel} onClick={() => [setLanguage('heb'), localStorage.setItem('lang', 'heb'), window.location.reload()]} style={{ height: '20px', borderRadius: '5px', width: '30px', marginRight: '10px', cursor: 'pointer' }}></img>
            <img alt='' src={US} onClick={() => [setLanguage('EN'), localStorage.setItem('lang', 'EN'), window.location.reload()]} style={{ height: '20px', borderRadius: '5px', width: '30px', cursor: 'pointer' }}></img>
        </div >
    )
}
export default LanguageButton