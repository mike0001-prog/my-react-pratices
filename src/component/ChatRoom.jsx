import React from "react";

export default function ChatRoom({ id, title, onClick }) {
  return (
    <div
      data-id={id}
      onClick={onClick}
      className="flex items-center gap-4 p-4 hover:bg-stone-50 transition-colors rounded-2xl active:scale-95"
    >
      <div className="relative w-14 h-14 flex-shrink-0">
        <img
          alt="Jordan Smith"
          className="w-full h-full object-cover rounded-full"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS9DWtwF3Muj-uaEDR1DkAUL4MhRvMs5uKqzfl7lm-WBWcIHpmy8TGtp2mM4h2_dtzt6m0YUD_6sg0sSdeoZZZpau33nQlZWRPIHa-NZaJ8Uu_mtpvpJyRnII9fluS_NXnSQ3hvFaDpIBcOpzwU1ik611_oQH2PdGfkxYecrFD0RzPY8x0SeFnAhF8rVdK7Eu8LQCDeu7HYy7XdKPZG-aF9lWWx8f0e8jSr5D6u-I4yKg0b3Y0iRcHMDi9J80eEuXXfXgqkhcxs6Hw"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-0.5">
          <h3 className="text-body-md font-bold text-stone-900 truncate">
            {title}
          </h3>
          <span className="text-caption-xs text-on-surface-variant uppercase tracking-wider">
            15m ago
          </span>
        </div>
        {/* <p className="text-body-sm text-on-surface-variant truncate">
          I'll send over the updated project brief in about an hour.
        </p> */}
      </div>
    </div>
  );
}
