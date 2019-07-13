export const createPost = (post) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('posts').add({
            ...post,
            authorId: '1234567890',
            authorName: 'Bryan Thum',
            photoUrl: 'https://lh6.googleusercontent.com/-is2PHQln-Fg/AAAAAAAAAAI/AAAAAAAAWUo/TD-1UroF0Mw/photo.jpg',
            createdAt: new Date().toString()
        }).then(() => {
            dispatch({type: 'CREATE_POST', post});
        }).catch((err) => {
            dispatch({type: 'CREATE_POST_ERROR', err})
        })
        
    }
};