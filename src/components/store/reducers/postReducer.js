const initState = {
  posts: [
    {
      photoUrl: "",
      title: "1",
      profile_name: "jack",
      price: "1",
      location: "east",
      description: "hi my name is bla bla"
    },
    {
      photoUrl: "",
      title: "2",
      profile_name: "john",
      price: "2",
      location: "north",
      description: "i am teaching bla bla bla"
    },
    {
      photoUrl: "",
      title: "3",
      profile_name: "jesus",
      price: "3",
      location: "south",
      description: "hi im fake"
    },
    {
      photoUrl: "",
      title: "4",
      profile_name: "god",
      price: "4",
      location: "west",
      description: "so am i"
    }
    // {photoUrl:'',title:'5',profile_name:'mary',price:'5',location:'central',description:'me too!'}
    // {photoUrl:'',title:'6',profile_name:'abraham',price:'6',location:'east'}
  ]
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_POST':
      console.log('created post', action.post)
  }
  return state;
};

export default postReducer;
