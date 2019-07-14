const initState = {
    authError: null,
    signUpError: null
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
        default:
            return state;
    }
}

export default authReducer