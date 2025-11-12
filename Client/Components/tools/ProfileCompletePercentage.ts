type userValue = {
    email: boolean;
    phone: boolean;
    profileImageUrl: boolean;
    ShowInSearch: boolean;
    dateofbirth: boolean;
    bio: boolean;
    social: boolean;
    skills: boolean;
    learning_skills: boolean;
    resume: boolean;
};

type ProfileCompletionResult = {
  Percentage: number;
  NotCompleted: { key: string; value: boolean }[];
  Completed: { key: string; value: boolean }[];
};

export function ProfileCompletePercentage(userValues: userValue): ProfileCompletionResult {
  const keyMap: Record<keyof userValue, string> = {
    email: "Email Address",
    phone: "Phone Number",
    profileImageUrl: "Profile Image",
    ShowInSearch: "Visible in Search",
    dateofbirth: "Date of Birth",
    bio: "Biography",
    social: "Social Links",
    skills: "Skills",
    learning_skills: "Learning Skills",
    resume: "Resume",
  };

  const entries = Object.entries(userValues) as [keyof userValue, boolean][];

  const NotCompleted = entries
    .filter(([_, value]) => !value)
    .map(([key, value]) => ({ key: keyMap[key], value }));

  const Completed = entries
    .filter(([_, value]) => value)
    .map(([key, value]) => ({ key: keyMap[key], value }));

  const Percentage = ((entries.length - NotCompleted.length) / entries.length) * 100;

  return { Percentage, NotCompleted, Completed };
}
