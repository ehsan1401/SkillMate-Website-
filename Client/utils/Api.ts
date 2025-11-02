
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL ;


export const API = {
  base:{
    backend : `${BACKEND_BASE_URL}`
  },
  auth: {
    login: `${BACKEND_BASE_URL}/auth/login`,
    register: `${BACKEND_BASE_URL}/auth/SignUp`,
    logout : `${BACKEND_BASE_URL}/auth/Logout`
  },
  user : {
    info : `${BACKEND_BASE_URL}/users/protected`,
    Upload_avatar : `${BACKEND_BASE_URL}/users/upload-avatar`,
    createUserInfo : ()=>`${BACKEND_BASE_URL}/user-info/create-UserInfo`,
    getUserInfo: (id?: number) => `${BACKEND_BASE_URL}/user-info/${id}`,
    UpdateUserInfo : (id?: number) => `${BACKEND_BASE_URL}/user-info/InfoUpdate/${id}`,
    updateUsername : () => `${BACKEND_BASE_URL}/users/update-Username`
  }
};


// http://localhost:4000/users/protected
//http://localhost:4000/users/upload-avatar