const initState = {
    authError: null,
    signUpError: null,
    signUpProviderError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('login error')
            return {
                ...state,
                authError: 'Login Failed! Please try again'
            }
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout success')
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('signup success')
            return {
                ...state,
                signUpError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error')
            return {
                ...state,
                signUpError: action.err.message
            }
        case 'SIGNUP_PROVIDER_SUCCESS':
            console.log('signup provider success')
            return {
                ...state,
                signUpProviderError: null
            }
        case 'SIGNUP_PROVIDER_ERROR':
            console.log('signup provider error')
            return {
                ...state,
                signUpProviderError: action.err.message
            }
        default:
            return state;
    }
}

export default authReducer