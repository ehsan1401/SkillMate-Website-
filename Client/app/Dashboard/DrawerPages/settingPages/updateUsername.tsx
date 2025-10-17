import { useModal } from "@/Components/context/ModalContext/ModalContext";

import { useState } from "react";
import { useAlert } from "@/Components/elements/Alert/AlertContext";
import { updateUsername } from "../page/action";
import { UserType } from "../page/type";
import { MaterialSymbolsPerson } from "@/Icons/UserIcon";

function ChangeUsernameModal({
  initialUsername,
  onConfirm,
  onCancel,
}: {
  initialUsername?: string;
  onConfirm: (username: string) => void;
  onCancel: () => void;
}) {
  const [username, setUsername] = useState(initialUsername || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const onlyLetters = /^[a-zA-Z]*$/;
    if (onlyLetters.test(value)) setUsername(value);
  };

  return (
    <div>
        <div className="py-8" style={{fontFamily:"vazir"}}>
            <input
                type="text"
                value={username}
                onChange={handleChange}
                maxLength={20}
                placeholder="Enter new username"
                className="border p-2 rounded w-full"
            />
        </div>

        <div className="flex justify-end gap-2 mt-2">
        <button
            className="px-3 py-1  bg-blue-500 text-neutral-100 hover:bg-blue-600 transition-all duration-300 rounded-md w-full"
            onClick={() => onConfirm(username)}
            style={{fontFamily:"vazir"}}
        >
            Confirm
        </button>
        </div>
    </div>
  );
}

export default function UpdateUsername({ user }: { user: UserType }) {
  const { showModal } = useModal();
  const { showAlert } = useAlert();
  const [newUsername, setNewUsername] = useState<string>("");

  const handleOk = async (username: string) => {
    if (username.length < 3) {
      showAlert("Username must be at least 3 characters long.", "error");
      return;
    }

    try {
      const updatedUser = await updateUsername(user.email, username);
      showAlert("Username updated successfully!", "success");
      setNewUsername(""); // optional: clear parent state
      console.log("Updated user:", updatedUser);
    } catch (err) {
      console.error(err);
      showAlert("Failed to update username. Try again.", "error");
    }
  };

  return (
    <div className="w-full h-[100%]">
        <div className="h-auto relative">
          <p className="text-neutral-800 dark:text-neutral-200 pt-4 pl-3 text-xl font-bold flex">
            <span className="pt-[3px] px-2 text-3xl text-neutral-700 dark:text-neutral-200" ><MaterialSymbolsPerson/></span>
            <span className="pt-[7px]">Change Username</span>
          </p>
          <span className="absolute top-4 right-3">
            <button
              className="px-3 py-2 text-neutral-100 rounded-md bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all duration-150"
              onClick={() =>
                showModal(
                  <ChangeUsernameModal
                    initialUsername={newUsername}
                    onCancel={() => console.log("Modal closed")}
                    onConfirm={(username) => handleOk(username)}
                  />,
                  `Change Your Username - ${user.userName || ""}`,
                    undefined,
                    undefined,
                    700,
                    ({ hideModal }) => [
                        <button 
                            key="cancel" 
                            onClick={hideModal}
                            className="w-full bg-neutral-200 text-neutral-900 hover:bg-neutral-300 transition-all duration-300 py-1 rounded-md"
                            style={{fontFamily:"vazir"}}
                        >
                        Cancel
                        </button>,
                    ]
                )
              }
            >
              Change
            </button>
          </span>
        </div>
    </div>
  );
}
