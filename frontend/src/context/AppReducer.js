export const AppReducer = (state, action) => {
  switch (action.type) {
    // case "REGISTER_START":
    //   return {
    //     user: null,
    //     isFetching: true,
    //     error: false,
    //   };

    // case "REGISTER_SUCCESS":
    //   return {
    //     user: action.payload,
    //     isFetching: false,
    //     error: false,
    //   };

    // case "REGISTER_FAILED":
    //   return {
    //     user: null,
    //     isFetching: false,
    //     error: true,
    //   };

    case "LOGIN_START":
      return {
        user: null,
        isFetching: false,
        error: false,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "LOGIN_FAILED":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        user: null,
      };

    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user, //spreading the orevious state
          following: [...state.user.following, action.payload],
          // followers: [...state.user.followers, action.payload],
        },
        // ...state.user
      };

    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter((userId) => {
            return userId !== action.payload;
          }),
          // followers: state.user.followers.filter((follower) => {
          //   return follower.userId !== action.payload;
          // }),
        },
      };

    default:
      return state;
  }
};
