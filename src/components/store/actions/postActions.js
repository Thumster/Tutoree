export const createPost = (post) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const uid = getState().firebase.auth.uid;
        firestore.collection('posts').add({
            ...post,
            uid: uid,
            createdAt: new Date().toString()
        }).then(() => {
            dispatch({type: 'CREATE_POST', post});
        }).catch((err) => {
            dispatch({type: 'CREATE_POST_ERROR', err})
        })
        
    }
};