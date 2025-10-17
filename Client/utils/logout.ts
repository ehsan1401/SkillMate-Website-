



export function logout() {
  if (typeof window === "undefined") return;

  const Token = sessionStorage.getItem("Token");
  if (Token) {
    sessionStorage.removeItem("Token");
    window.location.reload();
    window.location.href = "/Login";
  }
}
