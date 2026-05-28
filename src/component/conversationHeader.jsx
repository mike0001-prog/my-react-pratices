import { useState, useRef, useEffect } from "react";
function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-[#078816] text-xs font-medium ml-11 pb-4">
      <span className="italic">Typing</span>
      <div className="flex gap-1">
        <div className="size-1 bg-[#078816] rounded-full animate-bounce"></div>
        <div className="size-1 bg-[#078816] rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="size-1 bg-[#078816] rounded-full animate-bounce [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
}
export default function ConversationHeader({
  user,
  closeRoom,
  onDeleteConversation,
  userState,
}) {
  // ── add these inside your existing component ──────────────────────────────
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onOutsideClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    }
    function onEscape(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    if (menuOpen) {
      document.addEventListener("mousedown", onOutsideClick);
      document.addEventListener("keydown", onEscape);
    }
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, [menuOpen]);
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @keyframes dropdown-in {
          from { opacity: 0; transform: scale(0.95) translateY(-4px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>

      <header className="h-20 bg-white dark:bg-[#1a1a0d] border-b border-[#e5e5e0] dark:border-[#3d3c2a] flex items-center justify-between px-6 shrink-0">
        {/* Left — back + avatar + name */}
        <div className="flex items-center gap-4">
          <button
            onClick={closeRoom}
            className="size-10 rounded-full flex items-center justify-center hover:bg-[#f5f5f0] dark:hover:bg-[#2e2d1a] transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
            data-alt="user-profile"
          />
          <div>
            <h3 className="font-bold text-lg">{user}</h3>
            <div
              style={{ paddingBottom: "1rem" }}
              className="text-xs text-[#078816] font-medium"
            >
              {userState === "typing" ? <TypingIndicator /> : "Online"}
            </div>
          </div>
        </div>

        {/* Right — divider + more button + dropdown */}
        <div className="flex items-center gap-2">
          <div className="w-px h-6 bg-[#e5e5e0] dark:bg-[#3d3c2a] mx-2" />

          {/* Dropdown anchor */}
          <div className="relative" ref={menuRef}>
            {/* Trigger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={menuOpen}
              aria-label="More options"
              className={`size-10 rounded-full flex items-center justify-center transition-colors ${
                menuOpen
                  ? "bg-[#f5f5f0] dark:bg-[#2e2d1a]"
                  : "hover:bg-[#f5f5f0] dark:hover:bg-[#2e2d1a]"
              }`}
            >
              <span className="material-symbols-outlined">more_vert</span>
            </button>

            {/* Menu */}
            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#1a1a0d] border border-[#e5e5e0] dark:border-[#3d3c2a] rounded-2xl overflow-hidden z-50"
                style={{
                  boxShadow:
                    "0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
                  animation:
                    "dropdown-in 0.15s cubic-bezier(0.22,1,0.36,1) both",
                }}
              >
                <button
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    onDeleteConversation?.();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-left text-[#ba1a1a] hover:bg-[#fff5f5] dark:hover:bg-[#2a1010] transition-colors"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 20 }}
                  >
                    delete
                  </span>
                  Delete conversation
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
