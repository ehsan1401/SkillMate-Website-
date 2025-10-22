



export function logout() {
  if (typeof window === "undefined") return;

  const Token = localStorage.getItem("Token");
  if (Token) {
    localStorage.removeItem("Token");
    window.location.reload();
    window.location.href = "/Login";
  }
}
