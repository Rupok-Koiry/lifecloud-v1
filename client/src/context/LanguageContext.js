import React from 'react'

const LanguageContext = React.createContext({
    language: "heb",
    setLanguage: () => { }
})

export default LanguageContext