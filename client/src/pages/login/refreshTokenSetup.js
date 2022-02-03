
export const refreshTokenSetup = (response) => {
    let refreshTiming = (response.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
        const newAuthRes = await response.reloudAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
        console.log('newAuthRes', newAuthRes)
        // saveUserToken(newAuthRes.access_token)
        console.log('new auth toekn', newAuthRes.id_token);


        setTimeout(refreshToken, refreshTiming);
    }

    setTimeout(refreshToken, refreshTiming);
}