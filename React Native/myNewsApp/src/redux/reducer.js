const INITIAL_STATE = {
  proxyRedux: "http://192.168.1.42:8080",

  containerScreen: 'Home',
  phoneLanguage: 'eng',
  isComment: false,
  isUserProfile: false,

  tokenRedux: '',
  idRedux: 0,
  usernameRedux: '',
  emailRedux: '',
  languageRedux: '',
  aboutRedux: '',
  imagePathRedux: '',
  categoryIdRedux: 0,
  timeRedux: '',
  dateRedux: '',

  userProfileId: 0,
  userProfileUsername: '',
  userProfileAbout: '',
  userProfilePhoto: '',
  userProfileCategoryId: 0,
};

//-----

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CONTAINERSCREEN':
      return { ...state, containerScreen: action.payload };

    case 'SET_PHONELANGUAGE':
      return { ...state, phoneLanguage: action.payload };

    case 'SET_ISCOMMENT':
      return { ...state, isComment: action.payload };

    case 'SET_ISUSERPROFILE':
      return { ...state, isUserProfile: action.payload };

    case 'SET_ID':
      return { ...state, idRedux: action.payload };

    case 'SET_TOKEN':
      return { ...state, tokenRedux: action.payload };

    case 'SET_USERNAME':
      return { ...state, usernameRedux: action.payload };

    case 'SET_EMAIL':
      return { ...state, emailRedux: action.payload };

    case 'SET_LANGUAGE':
      return { ...state, languageRedux: action.payload };

    case 'SET_ABOUT':
      return { ...state, aboutRedux: action.payload };

    case 'SET_IMAGEPATH':
      return { ...state, imagePathRedux: action.payload };

    case 'SET_CATEGORYID':
      return { ...state, categoryIdRedux: action.payload };

    case 'SET_TIME':
      return { ...state, timeRedux: action.payload };

    case 'SET_DATE':
      return { ...state, dateRedux: action.payload };

    case 'SET_USERPROFILEID':
      return { ...state, userProfileId: action.payload };

    case 'SET_USERPROFILEUSERNAME':
      return { ...state, userProfileUsername: action.payload };

    case 'SET_USERPROFILEABOUT':
      return { ...state, userProfileAbout: action.payload };

    case 'SET_USERPROFILEPHOTO':
      return { ...state, userProfilePhoto: action.payload };

    case 'SET_USERPROFILECATEGORYID':
      return { ...state, userProfileCategoryId: action.payload };

    default:
      return state;
  }
};
