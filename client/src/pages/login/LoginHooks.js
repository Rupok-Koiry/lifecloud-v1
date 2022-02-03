import React from 'react'
import { useGoogleLogin } from 'react-google-login';

import { refreshTokenSetup } from './refreshTokenSetup'

const clientSecret = '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'
const clientId = '139022099323-nfmas84vfr9dg7bdguqtm6a8gfb9tdt5.apps.googleusercontent.com';
function LoginHooks() {
    const onSuccess = (response) => {
        console.log(response.profileObj)
        refreshTokenSetup(response)
    }
    const onFailure = (response) => {
        console.log(response)
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline',
    });

    return (
        <button onClick={signIn} className='sign-in-button'>
            <span>Sign in with Google</span>
        </button>
    )
}

export default LoginHooks