export const createPost = (post) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const uid = getState().firebase.auth.uid;
        firestore.collection('posts').add({
            ...post,
            uid: uid,
            name: profile.name,
            email: profile.email,
            photoURL: profile.photoURL,
            createdAt: new Date().toString()
        }).then(() => {
            dispatch({type: 'CREATE_POST', post});
        }).catch((err) => {
            dispatch({type: 'CREATE_POST_ERROR', err})
        })
        
    }
};

//CREATE AN ACTION THAT TAKES THE PROFILE FROM DATABASE AND PASSES IT TO COMPONENT
// const profile = firestore.collection('users').doc(this.post.uid).get().then((doc) => {
//     if (doc) {
//       console.log("Document data:", doc.data());
//     } else {
//       console.log("No such document!");
//     }
//   }).catch((err) => {
//     console.log("Error getting document:", err);
//   })