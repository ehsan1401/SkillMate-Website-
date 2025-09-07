

export function logout() {
  const Token = sessionStorage.getItem('Token');
  if(Token){
    sessionStorage.removeItem('Token');
    window.location.href = '/Login';
  }
}
