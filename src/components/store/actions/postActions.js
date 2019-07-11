export const createPost = (post) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('posts').add({
            ...post,
            authorName: 'Bryan Thum',
            authorId: '123',
            createdAt: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_POST', post});
        }).catch((err) => {
            dispatch({type: 'CREATE_POST_ERROR', err})
        })
        
    }
};