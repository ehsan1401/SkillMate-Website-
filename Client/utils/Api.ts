const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL ;


export const API = {
  auth: {
    login: `${BACKEND_BASE_URL}/auth/login`,
    register: `${BACKEND_BASE_URL}/auth/register`,
  },
  user : {
    info : `${BACKEND_BASE_URL}/users/protected`,
    Upload_avatar : `${BACKEND_BASE_URL}/users/upload-avatar`,
    getUserInfo: (id?: number) => `${BACKEND_BASE_URL}/user-info/${id}`,
    UpdateUserInfo : (id?: number) => `${BACKEND_BASE_URL}/user-info/InfoUpdate/${id}`,
    updateUsername : () => `${BACKEND_BASE_URL}/users/update-Username`
  }
};


// http://localhost:4000/ users/protected
//http://localhost:4000/users/upload-avatar