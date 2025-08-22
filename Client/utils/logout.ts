

export function logout() {
  const Token = localStorage.getItem('Token');
  if(Token){
    localStorage.removeItem('Token');
    window.location.href = '/Login';
  }
}
