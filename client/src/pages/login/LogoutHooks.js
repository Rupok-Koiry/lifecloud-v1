import React from 'react'
import { useGoogleLogout } from 'react-google-login'

const clientId = '139022099323-nfmas84vfr9dg7bdguqtm6a8gfb9tdt5.apps.googleusercontent.com';

function LogoutHooks() {
    const onLogoutSuccess = (res) => {
        console.log('logged out')
    }

    const onFailure = () => {
        console.log('logout failed')
    }

    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure,
    });

    return (
        <button onClick={signOut} className='sign-out-button'>
            <span>Sign out</span>
        </button>
    )
}