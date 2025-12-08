import { API } from "@/utils/Api";
import { UserInfo } from "./type";

export type UploadStatus = {
  avatar?: boolean | "skip";
  generalInfo?: boolean | "skip";
  gender?: boolean | "skip";
  skills?: boolean | "skip";
};

export async function UploadUserProfileData(
  userData: UserInfo,
  userId: number,
  onStep?: (step: string, status: boolean | "skip") => void
) {
  const UploadProcess: UploadStatus = {};

  const userAvatar: File | undefined | string = userData?.profileImage;
  if (userAvatar instanceof File) {
    const formData = new FormData();
    formData.append("file", userAvatar);
    console.log("userAvatar converted to formdata");

    const response = await fetch(API.user.Upload_avatar, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const success = response.ok;
    UploadProcess.avatar = success;
    if (onStep) onStep("avatar", success);
  } else {
    console.log("No file selected or avatar is not a File, skipping upload");
    UploadProcess.avatar = "skip";
    if (onStep) onStep("avatar", "skip");
  }

  if (userData.Gender) {
    const response = await fetch(API.user.setUserGender(userId), {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Gender: userData.Gender }),
    });

    const success = response.ok;
    UploadProcess.gender = success;
    if (onStep) onStep("gender", success);
  } else {
    console.log("Gender not provided, skipping");
    UploadProcess.gender = "skip";
    if (onStep) onStep("gender", "skip");
  }
  const generalInfoPayload: any = {};
  const fields = [
    "jobTitle",
    "dateofbirth",
    "bio",
    "learning_skills",
    "phone",
    "resume",
    "skills",
    "social",
    "headerImage",
    "Location",
    "Education",
    "workExperience",
  ];

  for (const key of fields) {
    const value = userData[key as keyof UserInfo];
    if (value !== undefined && value !== null) {
      generalInfoPayload[key] = value;
    }
  }

  if (Object.keys(generalInfoPayload).length > 0) {
    const response = await fetch(API.user.UserInfoProfile(userId), {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(generalInfoPayload),
    });

    const success = response.ok;
    UploadProcess.generalInfo = success;
    if (onStep) onStep("generalInfo", success);
  } else {
    console.log("No general info to update, skipping");
    UploadProcess.generalInfo = "skip";
    if (onStep) onStep("generalInfo", "skip");
  }

  return UploadProcess;
}
