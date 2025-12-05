
type ImageTypes = "Avatar" | "Header"

function getSoftRandomColor(): string {
  const r = Math.floor(150 + Math.random() * 105);
  const g = Math.floor(150 + Math.random() * 105);
  const b = Math.floor(150 + Math.random() * 105);

  return `${r.toString(16)}${g.toString(16)}${b.toString(16)}`.padStart(6, "0");
}


function getRandomAvatar(gender?: "male" | "female") {
  const seed = Math.floor(Math.random() * 1000000);
  const backgroundColor = getSoftRandomColor();

  const genderParams = gender === "male" ? "&facialHair=beard" : "&facialHair=none";

  return `https://api.dicebear.com/7.x/miniavs/svg?seed=${seed}&backgroundColor=${backgroundColor}${genderParams}`;
}

export function imageUrl(path: string | undefined , ImageType? : ImageTypes) {
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (!path) {
    if(ImageType === "Header"){
      if(!isDarkMode) return "/Images/DarkHeaderDashboard.jpg"
      return "/Images/HeaderDashboard.jpg"
    }
    return getRandomAvatar("male");
  }

  const base = process.env.NEXT_PUBLIC_API_URL || "";
  if (path === "undefined") {
    if(ImageType === "Header"){
      if(!isDarkMode) return "/Images/DarkHeaderDashboard.jpg"
      return "/Images/HeaderDashboard.jpg"
    }
    return getRandomAvatar("male");
  }
  if (!base) {
    if(ImageType === "Header"){
      if(!isDarkMode) return "/Images/DarkHeaderDashboard.jpg"
      return "/Images/HeaderDashboard.jpg"
    }
    return getRandomAvatar("male");
  }

  return `${base}${path.startsWith("/") ? path : "/" + path}`;
}

