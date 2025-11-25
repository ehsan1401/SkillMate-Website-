function getSoftRandomColor(): string {
  const r = Math.floor(150 + Math.random() * 105);
  const g = Math.floor(150 + Math.random() * 105);
  const b = Math.floor(150 + Math.random() * 105);

  return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function getRandomAvatar(gender?: "male" | "female") {
  const seed = Math.floor(Math.random() * 1000000);
  const backgroundColor = getSoftRandomColor();

  const genderParams = gender === "male" ? "&facialHair=beard" : "&facialHair=none";

  return `https://api.dicebear.com/7.x/miniavs/svg?seed=${seed}&backgroundColor=${backgroundColor}${genderParams}`;
}

export function imageUrl(path: string) {
  if (!path) {
    return getRandomAvatar("male");
  }
  const base = process.env.NEXT_PUBLIC_API_URL || "";
  return `${base}${path}`;
}
