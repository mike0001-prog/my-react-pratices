import { useState, useEffect, useRef } from "react";

// ─── Design tokens (ChatMe system) ───────────────────────────────────────────
const tokens = {
  surface: "#fefae5",
  surfaceContainerLow: "#f8f4df",
  surfaceContainerHigh: "#ece9d4",
  primaryContainer: "#f9f506",
  onPrimaryContainer: "#716f00",
  onSurface: "#1d1c10",
  onSurfaceVariant: "#494832",
  outlineVariant: "#e6e3ce",
  secondary: "#006e0e",
  error: "#ba1a1a",
};

// ─── Per-variant config ───────────────────────────────────────────────────────
const VARIANTS = {
  success: {
    bg: "#f0fdf0",
    border: "#006e0e",
    iconBg: "#006e0e",
    iconColor: "#fff",
    textColor: "#002201",
    labelColor: "#006e0e",
    icon: "check_circle",
    label: "Success",
    progressBg: "#006e0e",
  },
  error: {
    bg: "#fff5f5",
    border: "#ba1a1a",
    iconBg: "#ba1a1a",
    iconColor: "#fff",
    textColor: "#410002",
    labelColor: "#ba1a1a",
    icon: "error",
    label: "Error",
    progressBg: "#ba1a1a",
  },
};

// ─── Keyframe injection (once) ────────────────────────────────────────────────
const KEYFRAMES = `

  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24;
    font-size: 24px; line-height: 1;
    display: inline-flex; align-items: center; justify-content: center;
    user-select: none;
  }

  /* Slide in from top */
  @keyframes cm-slide-in {
    from { transform: translateY(-24px); opacity: 0; }
    to   { transform: translateY(0);     opacity: 1; }
  }

  /* Slide out to top */
  @keyframes cm-slide-out {
    from { transform: translateY(0);     opacity: 1; }
    to   { transform: translateY(-24px); opacity: 0; }
  }

  /* Icon pop */
  @keyframes cm-icon-pop {
    0%   { transform: scale(0.4); opacity: 0; }
    60%  { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1);   opacity: 1; }
  }

  /* Checkmark draw (success) */
  @keyframes cm-check-draw {
    from { stroke-dashoffset: 40; }
    to   { stroke-dashoffset: 0;  }
  }

  /* Error shake */
  @keyframes cm-shake {
    0%, 100% { transform: translateX(0); }
    20%      { transform: translateX(-5px); }
    40%      { transform: translateX(5px); }
    60%      { transform: translateX(-4px); }
    80%      { transform: translateX(4px); }
  }

  /* Progress bar drain */
  @keyframes cm-progress {
    from { transform: scaleX(1); }
    to   { transform: scaleX(0); }
  }

  /* Pulse ring (success) */
  @keyframes cm-pulse {
    0%   { transform: scale(1);   opacity: 0.5; }
    100% { transform: scale(1.8); opacity: 0;   }
  }

  /* Ripple (error) */
  @keyframes cm-ripple {
    0%   { transform: scale(0.8); opacity: 0.6; }
    100% { transform: scale(1.6); opacity: 0;   }
  }
`;

let injected = false;
function injectStyles() {
  if (injected) return;
  const el = document.createElement("style");
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
  injected = true;
}

// ─── Animated icon ────────────────────────────────────────────────────────────
function AnimatedIcon({ variant, playing }) {
  const cfg = VARIANTS[variant];
  const isSuccess = variant === "success";

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      {playing && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `2px solid ${cfg.iconBg}`,
            animation: `${isSuccess ? "cm-pulse" : "cm-ripple"} 0.7s ease-out 0.25s both`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Icon badge */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: cfg.iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: playing
            ? `cm-icon-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.05s both${
                !isSuccess ? ", cm-shake 0.4s ease 0.5s both" : ""
              }`
            : "none",
          flexShrink: 0,
        }}
      >
        {isSuccess ? (
          // SVG checkmark with draw animation
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <polyline
              points="4,11 8,15 16,6"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="40"
              style={{
                strokeDashoffset: playing ? undefined : 40,
                animation: playing
                  ? "cm-check-draw 0.35s ease 0.4s both"
                  : "none",
              }}
            />
          </svg>
        ) : (
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 20, color: cfg.iconColor }}
          >
            priority_high
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Progress bar (auto-dismiss timer) ───────────────────────────────────────
function ProgressBar({ duration, variant, playing }) {
  const cfg = VARIANTS[variant];
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        borderRadius: "0 0 16px 16px",
        background: tokens.outlineVariant,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          background: cfg.progressBg,
          transformOrigin: "left center",
          animation: playing
            ? `cm-progress ${duration}ms linear 0.15s both`
            : "none",
        }}
      />
    </div>
  );
}

// ─── Core Toast component ─────────────────────────────────────────────────────
/**
 * Props:
 *   variant   : "success" | "error"
 *   title     : string
 *   message   : string
 *   duration  : number (ms, default 4000 — set 0 to disable auto-dismiss)
 *   onDismiss : () => void
 *   visible   : boolean
 */
export function Toast({
  variant = "success",
  title,
  message,
  duration = 4000,
  onDismiss,
  visible = true,
}) {
  useEffect(() => {
    injectStyles();
  }, []);

  const [exiting, setExiting] = useState(false);
  const timerRef = useRef(null);

  // Auto-dismiss
  useEffect(() => {
    if (!visible || duration === 0) return;
    timerRef.current = setTimeout(() => dismiss(), duration);
    return () => clearTimeout(timerRef.current);
  }, [visible, duration]);

  function dismiss() {
    setExiting(true);
    setTimeout(() => {
      setExiting(false);
      onDismiss?.();
    }, 280);
  }

  if (!visible && !exiting) return null;

  const cfg = VARIANTS[variant];

  return (
    <div
      style={{
        fontFamily: "'Spline Sans', sans-serif",
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        background: cfg.bg,
        border: `1.5px solid ${cfg.border}`,
        borderRadius: 16,
        padding: "14px 16px 20px",
        boxShadow: `0 4px 24px ${cfg.border}22`,
        overflow: "hidden",
        animation: exiting
          ? "cm-slide-out 0.28s cubic-bezier(0.4,0,1,1) both"
          : "cm-slide-in 0.35s cubic-bezier(0.22,1,0.36,1) both",
        maxWidth: 420,
        width: "100%",
      }}
    >
      <AnimatedIcon variant={variant} playing={!exiting} />

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: "0 0 2px",
            fontSize: 12,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: cfg.labelColor,
          }}
        >
          {title || cfg.label}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: 500,
            color: cfg.textColor,
          }}
        >
          {message}
        </p>
      </div>

      {/* Dismiss button */}
      <button
        type="button"
        onClick={dismiss}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 4,
          borderRadius: 8,
          flexShrink: 0,
          color: cfg.labelColor,
          display: "flex",
          alignItems: "center",
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
          close
        </span>
      </button>

      {/* Timer progress bar */}
      {duration > 0 && (
        <ProgressBar duration={duration} variant={variant} playing={!exiting} />
      )}
    </div>
  );
}

// ─── Toast container (stacked, top-right) ────────────────────────────────────
/**
 * Manages a queue of toasts.
 *
 * Usage:
 *   const ref = useRef();
 *   <ToastContainer ref={ref} />
 *   ref.current.add({ variant: "success", message: "Saved!" });
 */
export function ToastContainer({ position = "top-right", toasts, setToasts }) {
  // Expose .add() via a global ref trick for convenience
  useEffect(() => {
    window.__chatmeToast = (opts) => {
      const id = Date.now() + Math.random();
      console.log(toasts);
      setToasts((t) => [...t, { id, ...opts }]);
    };
    return () => {
      delete window.__chatmeToast;
    };
  }, []);

  function remove(id) {
    setToasts((t) => t.filter((x) => x.id !== id));
  }

  const posStyles = {
    "top-right": { top: 80, right: 16 },
    "top-left": { top: 80, left: 16 },
    "bottom-right": { bottom: 80, right: 16 },
    "bottom-left": { bottom: 80, left: 16 },
    "top-center": { top: 80, left: "50%", transform: "translateX(-50%)" },
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        maxWidth: 420,
        width: "calc(100% - 32px)",
        pointerEvents: "none",
        ...posStyles[position],
      }}
    >
      {toasts.map((t) => (
        <div key={t.id} style={{ pointerEvents: "all" }}>
          <Toast
            visible
            variant={t.variant}
            title={t.title}
            message={t.message}
            duration={t.duration ?? 4000}
            onDismiss={() => remove(t.id)}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Inline Banner variant ────────────────────────────────────────────────────
/**
 * Sits inside a form or card, not floating.
 * Same tokens, no shadow, slightly flatter.
 */

// ─── Demo / preview ───────────────────────────────────────────────────────────
