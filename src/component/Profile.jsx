import React from "react";
import { useState, useEffect } from "react";
import { changepassword, updateusername, getuserprofile } from "../API";
import { StrengthBar, ValidatePassword, PasswordField } from "./chatAuth";
export function Button({ text, className, style, buttonDisabled }) {
  // console.log(buttonDisabled);
  return (
    <button
      style={{ ...style, background: buttonDisabled && "rgb(181 178 3 / 94%)" }}
      className={className}
      disabled={buttonDisabled}
    >
      {text}
    </button>
  );
}
export default function Profile({ setToasts }) {
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [passwordFormOpened, setPasswordFormOpened] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [userFormOpened, setUserFormOpened] = useState(false);
  // const [passwordFormDisabled,setPasswordFormDisabled] = useState(false)
  const [userProfile, setUserProfile] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const username = JSON.parse(sessionStorage.getItem("token"))?.user_name;
  useEffect(() => {
    const intializeProfile = async (setToasts) => {
      const data = await getuserprofile(setToasts);
      setUserProfile(data);
    };
    intializeProfile(setToasts);
  }, []);
  const changePassword = async (e, setToasts, setButtonDisabled) => {
    e.preventDefault();
    setButtonDisabled(true);
    const formData = new FormData();
    formData.append("new_password1", passwordInput);
    formData.append("new_password2", confirmPasswordInput);
    console.log();
    const response = await changepassword(
      formData,
      setToasts,
      setButtonDisabled,
    );
    setPasswordFormOpened(false);
  };
  const updateUsername = async (e, setToasts, setButtonDisabled) => {
    e.preventDefault();
    setButtonDisabled(true);
    console.log("updating");
    const formData = new FormData();
    formData.append("username", usernameInput);
    const response = await updateusername(
      formData,
      setToasts,
      setButtonDisabled,
    );
    setUserFormOpened(false);
  };
  return (
    <>
      <main
        className="pt-20 pb-24 px-4 min-h-screen"
        style={{ overflowY: "scroll", height: "80vh" }}
      >
        <section className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full border-4 border-primary-container overflow-hidden bg-surface-container shadow-lg">
              <img
                alt="User Profile Avatar"
                className="w-full h-full object-cover"
                data-alt="A professional headshot of a creative professional woman with a warm smile, set against a soft, studio-lit neutral background. The lighting is bright and airy, reflecting a modern light-mode UI aesthetic. The color palette is composed of natural skin tones and subtle warm grays, punctuated by a crisp white shirt. The overall mood is energetic, youthful, and highly professional, fitting for a modern digital workspace."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYnnhpT5scabvfWc0kQ06uIaJBEFfTdJdpEtjlg028hl7UpJxDG0_lnGWD7oZHJ472PqBqww9x0eWY4MdFOZiaI73pBMbLsZIYGjOjh7sdJWulQpcQhpbrCFJq70CwSSrNDRPZZeE1OGbRPxN3sygd54YM2eMq0QU_v7qGG49boGdneVluDYYRgBpKm1PA9LMbvQ0Tb1MgOT7wMKt-Tj3azW2WbELT1m5GZheLKGzwIRiKYE6_B8BGzOtiR31ENLQQkCTxBhJ-SzOu"
              />
            </div>
          </div>
          <h1 className="font-display-sm text-display-sm text-on-background mb-1">
            {username}
          </h1>
        </section>

        <div
          style={{ marginBottom: "16px" }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-surface-container-lowest p-4 rounded-lg flex flex-col items-center border border-surface-container-high">
            <span className="font-title-md text-title-md text-primary">
              {userProfile?.room_count}
            </span>
            <span className="font-caption-xs text-caption-xs uppercase text-on-surface-variant">
              Contacts
            </span>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-lg flex flex-col items-center border border-surface-container-high">
            <span className="font-title-md text-title-md text-primary">
              {userProfile?.message_count}
            </span>
            <span className="font-caption-xs text-caption-xs uppercase text-on-surface-variant">
              Messages
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-stone-900 rounded-lg overflow-hidden border border-stone-100 dark:border-stone-800 shadow-sm mb-6">
          <div className="p-4 border-b border-stone-100 dark:border-stone-800 bg-surface-container-low">
            <h2 className="font-label-bold text-label-bold uppercase text-on-surface-variant tracking-widest">
              Account Settings
            </h2>
          </div>

          <button
            onClick={() =>
              userFormOpened
                ? setUserFormOpened(false)
                : setUserFormOpened(true)
            }
            className="w-full flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-left group"
          >
            <div className="flex items-center gap-4">
              <span
                className="material-symbols-outlined text-stone-400 group-hover:text-primary transition-colors"
                data-icon="person_edit"
              >
                person_edit
              </span>
              <div>
                <p className="font-body-md text-body-md text-on-surface">
                  Edit Username
                </p>
                <p className="font-caption-xs text-caption-xs text-on-surface-variant">
                  Update your username
                </p>
              </div>
            </div>
            <span
              className="material-symbols-outlined text-stone-300"
              data-icon="chevron_right"
            >
              chevron_right
            </span>
          </button>
          {userFormOpened && (
            <form
              onSubmit={(e) => {
                updateUsername(e, setToasts, setButtonDisabled);
              }}
              style={{ padding: "2rem" }}
              action=""
            >
              <input
                className="w-full mb-2 h-12 pl-12 pr-4 bg-surface-container-low border-none rounded-full focus:ring-2 focus:ring-primary-container text-body-md outline-none"
                type="text"
                value={usernameInput}
                placeholder="Enter New Username..."
                onChange={(e) => {
                  setUsernameInput(e.target.value);
                }}
                required
              />
              <Button
                style={{ padding: "10px", marginTop: "5px" }}
                className="rounded-full bg-primary-container text-black"
                text="Change"
                buttonDisabled={buttonDisabled}
              />
            </form>
          )}

          <button
            onClick={() =>
              passwordFormOpened
                ? setPasswordFormOpened(false)
                : setPasswordFormOpened(true)
            }
            className="w-full flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-left group border-t border-stone-50 dark:border-stone-800"
          >
            <div className="flex items-center gap-4">
              <span
                className="material-symbols-outlined text-stone-400 group-hover:text-primary transition-colors"
                data-icon="lock_reset"
              >
                lock_reset
              </span>
              <div>
                <p className="font-body-md text-body-md text-on-surface">
                  Change Password
                </p>
                <p className="font-caption-xs text-caption-xs text-on-surface-variant">
                  Secure your account with a new password
                </p>
              </div>
            </div>
            <span
              className="material-symbols-outlined text-stone-300"
              data-icon="chevron_right"
            >
              chevron_right
            </span>
          </button>
          {passwordFormOpened && (
            <form
              onSubmit={(e) => {
                changePassword(e, setToasts, setButtonDisabled);
              }}
              style={{
                padding: "2rem",
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
              action=""
            >
              <PasswordField
                value={passwordInput}
                placeholder="Enter New Password..."
                onChange={(e) => {
                  console.log(e.target.value);
                  setPasswordInput(e.target.value);
                }}
              />

              <PasswordField
                placeholder="Confirm New Password....."
                value={confirmPasswordInput}
                onChange={(e) => {
                  setConfirmPasswordInput(e.target.value);
                }}
              />
              <StrengthBar value={passwordInput} />
              <ValidatePassword
                password1={passwordInput}
                password2={confirmPasswordInput}
              />
              <Button
                style={{ padding: "10px", marginTop: "5px" }}
                className="rounded-full bg-primary-container text-black"
                text="  Change Password"
              />
              {/* <button
                style={{ padding: "10px", marginTop: "5px" }}
                className="rounded-full bg-primary-container text-black"
              >
              
              </button> */}
            </form>
          )}
        </div>
      </main>
    </>
  );
}
