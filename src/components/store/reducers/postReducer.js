import { defaultCipherList } from "constants";

// const initState = {
//   posts: [
//     {
//       photoUrl: "",
//       title: "1",
//       profile_name: "jack",
//       price: "1",
//       location: "east",
//       description: "hi my name is bla bla"
//     },
//     {
//       photoUrl: "",
//       title: "2",
//       profile_name: "john",
//       price: "2",
//       location: "north",
//       description: "i am teaching bla bla bla"
//     },
//     {
//       photoUrl: "",
//       title: "3",
//       profile_name: "3",
//       price: "3",
//       location: "south",
//       description: "1"
//     },
//     {
//       photoUrl: "",
//       title: "4",
//       profile_name: "1",
//       price: "4",
//       location: "west",
//       description: "so am i"
//     }
//   ]
// };

const postReducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_POST':
      console.log('created post', action.post);
      return state;
    case 'CREATE_POST_ERROR':
      console.log('create post error', action.err);
      return state;
    default:
      return state;
  }
}

export default postReducer;
