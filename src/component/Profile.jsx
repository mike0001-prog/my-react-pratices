import React from "react";

export default function Profile() {
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
            <button className="absolute bottom-0 right-0 bg-primary-container text-on-primary-container p-2 rounded-full shadow-md active:scale-90 transition-transform flex items-center justify-center">
              <span
                className="material-symbols-outlined text-lg"
                data-icon="edit"
              >
                edit
              </span>
            </button>
          </div>
          <h1 className="font-display-sm text-display-sm text-on-background mb-1">
            Alex Rivera
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-center max-w-xs">
            Product Designer &amp; Coffee Enthusiast. Building the future of
            real-time communication at ChatMe.
          </p>
        </section>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-surface-container-lowest p-4 rounded-lg flex flex-col items-center border border-surface-container-high">
            <span className="font-title-md text-title-md text-primary">
              124
            </span>
            <span className="font-caption-xs text-caption-xs uppercase text-on-surface-variant">
              Contacts
            </span>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-lg flex flex-col items-center border border-surface-container-high">
            <span className="font-title-md text-title-md text-primary">
              1.2k
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

          <button className="w-full flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-left group">
            <div className="flex items-center gap-4">
              <span
                className="material-symbols-outlined text-stone-400 group-hover:text-primary transition-colors"
                data-icon="person_edit"
              >
                person_edit
              </span>
              <div>
                <p className="font-body-md text-body-md text-on-surface">
                  Edit Profile
                </p>
                <p className="font-caption-xs text-caption-xs text-on-surface-variant">
                  Update your photo, name, and bio
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

          <button className="w-full flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-left group border-t border-stone-50 dark:border-stone-800">
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

          <button className="w-full flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-left group border-t border-stone-50 dark:border-stone-800">
            <div className="flex items-center gap-4">
              <span
                className="material-symbols-outlined text-stone-400 group-hover:text-primary transition-colors"
                data-icon="shield_lock"
              >
                shield_lock
              </span>
              <div>
                <p className="font-body-md text-body-md text-on-surface">
                  Privacy Settings
                </p>
                <p className="font-caption-xs text-caption-xs text-on-surface-variant">
                  Manage your data and visibility
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
        </div>

        <div className="bg-white dark:bg-stone-900 rounded-lg overflow-hidden border border-stone-100 dark:border-stone-800 shadow-sm">
          <button className="w-full flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-left group">
            <div className="flex items-center gap-4">
              <span
                className="material-symbols-outlined text-stone-400 group-hover:text-primary transition-colors"
                data-icon="notifications"
              >
                notifications
              </span>
              <p className="font-body-md text-body-md text-on-surface">
                Notifications
              </p>
            </div>
            <div className="w-10 h-5 bg-surface-container-high rounded-full relative">
              <div className="absolute right-1 top-1 w-3 h-3 bg-primary-container rounded-full"></div>
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-left group border-t border-stone-50 dark:border-stone-800 text-error">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined" data-icon="logout">
                logout
              </span>
              <p className="font-body-md text-body-md">Logout</p>
            </div>
          </button>
        </div>
      </main>
    </>
  );
}
