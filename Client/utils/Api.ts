const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL ;


export const API = {
  auth: {
    login: `${BACKEND_BASE_URL}/auth/login`,
    register: `${BACKEND_BASE_URL}/auth/register`,
  },
  user : {
    info : `${BACKEND_BASE_URL}/users/protected`
  }
};


// http://localhost:4000/ users/protected