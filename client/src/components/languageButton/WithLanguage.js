import React, { useState } from 'react'
import LanguageContext from '../../context/LanguageContext';
function WithLanguage({ children }) {
    const [language, setLanguage] = useState("");
    return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}
export default WithLanguage