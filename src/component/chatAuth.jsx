import { useState, useRef } from "react";
import { Signup, Login, connectWebSocket } from "../API";
import { ToastContainer } from "./Toast";
const tokens = {
  surface: "#fefae5",
  surfaceContainerLow: "#f8f4df",
  surfaceContainerHighest: "#e6e3ce",
  primaryContainer: "#f9f506",
  onPrimaryContainer: "#716f00",
  secondary: "#006e0e",
  onSurface: "#1d1c10",
  onSurfaceVariant: "#494832",
  outline: "#cbc8ab",
  outlineVariant: "#e6e3ce",
  error: "#ba1a1a",
  cardBorder: "#f2eeda",
};

// ─── Shared sub-components ────────────────────────────────────────────────────

function InputField({
  icon,
  type = "text",
  placeholder,
  autoComplete,
  rightSlot,
  onChange,
  value,
}) {
  return (
    <div style={{ position: "relative" }}>
      {icon && (
        <span
          className="material-symbols-outlined"
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 20,
            color: tokens.onSurfaceVariant,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        style={{
          width: "100%",
          height: 52,
          borderRadius: 9999,
          background: tokens.surfaceContainerLow,
          border: `2px solid transparent`,
          outline: "none",
          fontSize: 16,
          lineHeight: "24px",
          fontWeight: 500,
          color: tokens.onSurface,
          paddingLeft: icon ? 48 : 16,
          paddingRight: rightSlot ? 48 : 16,

          transition: "border-color 0.15s ease",
        }}
        value={value}
        onFocus={(e) => (e.target.style.borderColor = tokens.primaryContainer)}
        onBlur={(e) => (e.target.style.borderColor = "transparent")}
        required
      />
      {rightSlot}
    </div>
  );
}

export function PasswordField({
  id,
  placeholder,
  autoComplete,
  onChange,
  value,
}) {
  const [visible, setVisible] = useState(false);
  return (
    <InputField
      icon="lock"
      type={visible ? "text" : "password"}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={onChange}
      value={value}
      rightSlot={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
            color: tokens.onSurfaceVariant,
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
            {visible ? "visibility_off" : "visibility"}
          </span>
        </button>
      }
    />
  );
}

function FieldLabel({ children }) {
  return (
    <label
      style={{
        display: "block",
        marginBottom: 8,
        fontSize: 12,
        lineHeight: "16px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: tokens.onSurfaceVariant,
      }}
    >
      {children}
    </label>
  );
}

function FieldGroup({ label, children, style }) {
  return (
    <div style={{ marginBottom: 16, ...style }}>
      {label && <FieldLabel>{label}</FieldLabel>}
      {children}
    </div>
  );
}

function PrimaryButton({ isDisabled, type, children, icon }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      disabled={isDisabled}
      type={type}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className="primary-btn-chat"
      style={{
        background: isDisabled
          ? "rgb(181 178 3 / 94%)"
          : tokens.primaryContainer,
        color: tokens.onSurface,
        opacity: pressed ? 0.85 : 1,
        transform: pressed ? "scale(0.97)" : "scale(1)",
      }}
    >
      {icon && (
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
          {icon}
        </span>
      )}
      {isDisabled ? "Submitting..." : children}
    </button>
  );
}

function GhostButton({ children }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        width: "100%",
        height: 52,
        borderRadius: 9999,
        background: hovered ? tokens.surfaceContainerLow : "transparent",
        border: `2px solid ${tokens.outlineVariant}`,
        color: tokens.onSurface,
        fontSize: 16,
        fontWeight: 600,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        fontFamily: "'Spline Sans', sans-serif",
        transition: "background 0.15s ease, transform 0.1s ease",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        boxSizing: "border-box",
      }}
    >
      {children}
    </button>
  );
}

function Checkbox({ label }) {
  const [checked, setChecked] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        marginBottom: 20,
      }}
    >
      <button
        type="button"
        onClick={() => setChecked((c) => !c)}
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          flexShrink: 0,
          marginTop: 2,
          border: `2px solid ${checked ? tokens.primaryContainer : tokens.outline}`,
          background: checked ? tokens.primaryContainer : "transparent",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s, border-color 0.15s",
        }}
      >
        {checked && (
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 14, color: tokens.onPrimaryContainer }}
          >
            check
          </span>
        )}
      </button>
      <span
        style={{ fontSize: 14, lineHeight: "20px", color: tokens.onSurface }}
      >
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        margin: "12px 0",
      }}
    >
      <div style={{ flex: 1, height: 1, background: tokens.outlineVariant }} />
      <span
        style={{
          fontSize: 10,
          lineHeight: "12px",
          fontWeight: 700,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: tokens.onSurfaceVariant,
        }}
      >
        or
      </span>
      <div style={{ flex: 1, height: 1, background: tokens.outlineVariant }} />
    </div>
  );
}

const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    style={{ flexShrink: 0 }}
  >
    <path
      d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      fill="#4285F4"
    />
    <path
      d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      fill="#34A853"
    />
    <path
      d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"
      fill="#EA4335"
    />
  </svg>
);

function LogoBadge({ icon }) {
  return (
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 20,
        background: tokens.primaryContainer,
        boxShadow: "0 4px 24px rgba(249,245,6,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
      }}
    >
      <span
        className="material-symbols-outlined"
        style={{ fontSize: 32, color: tokens.onSurface }}
      >
        {icon}
      </span>
    </div>
  );
}

function SwitchLink({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 700,
        color: tokens.onSurface,
        fontFamily: "'Spline Sans', sans-serif",
        padding: 0,
        marginLeft: 4,
        textDecoration: "underline",
      }}
    >
      {children}
    </button>
  );
}

function AuthCard({ children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        background: "#fff",
        borderRadius: 24,
        border: `1px solid ${tokens.cardBorder}`,
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        padding: "28px 24px",
        width: "100%",
        maxWidth: 384,
        boxSizing: "border-box",
      }}
    >
      {children}
    </form>
  );
}

// ─── Password strength ────────────────────────────────────────────────────────
function getStrength(val) {
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  return score;
}
export function ValidatePassword({ password1, password2 }) {
  const condition = password1 === password2;
  if (!(password1 && password2)) return null;
  if (condition) return null;
  return (
    <div
      style={{
        color: tokens.error,
        marginTop: 4,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}
    >
      password input are not the same
    </div>
  );
}

export function StrengthBar({ value }) {
  const score = value ? getStrength(value) : 0;
  const cls = score <= 1 ? "weak" : score <= 2 ? "medium" : "strong";
  const color =
    cls === "weak"
      ? tokens.error
      : cls === "medium"
        ? "#f9a506"
        : tokens.secondary;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", gap: 4 }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 9999,
              background: i < score ? color : tokens.outlineVariant,
              transition: "background 0.25s",
            }}
          />
        ))}
      </div>
      {value.length > 0 && (
        <p
          style={{
            marginTop: 4,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color,
          }}
        >
          {labels[score] || "password must be more than 8 characters"}
        </p>
      )}
    </div>
  );
}

// ─── Sign In panel ────────────────────────────────────────────────────────────
function SignInPanel({ onSwitch, setIsLoggedIn, setToasts, websocket }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  async function login(e, url) {
    console.log("logging in");
    e.preventDefault();
    const data = JSON.stringify({ username: username, password: password });
    console.log(data);
    setIsDisabled(true);
    const response = await Login(url, data, setToasts, setIsDisabled);
    console.log(response);

    if (!response) return;

    setTimeout(() => {
      sessionStorage.setItem("token", JSON.stringify(response));
      setIsLoggedIn(true);
      const token = JSON.parse(sessionStorage.getItem("token")).key;
      websocket.current = connectWebSocket(token);
    }, 1500);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <LogoBadge icon="chat_bubble" />
        <h1
          style={{
            fontSize: 20,
            lineHeight: "28px",
            fontWeight: 700,
            color: tokens.onSurface,
            marginBottom: 4,
            margin: "0 0 4px",
          }}
        >
          Welcome back
        </h1>
        <p
          style={{
            fontSize: 14,
            color: tokens.onSurfaceVariant,
            textAlign: "center",
            margin: 0,
          }}
        >
          Sign in to continue your conversations
        </p>
      </div>

      <AuthCard
        onSubmit={(e) => {
          login(e, "http://127.0.0.1:8000/main/login/");
        }}
      >
        <FieldGroup label="Username">
          <InputField
            value={username}
            icon="account_circle"
            type="text"
            placeholder="username"
            // autoComplete="email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </FieldGroup>

        <FieldGroup label="Password">
          <PasswordField
            placeholder="Your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FieldGroup>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 20,
            marginTop: -8,
          }}
        >
          <a
            href="#"
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: tokens.onPrimaryContainer,
              textDecoration: "none",
            }}
          >
            Forgot password?
          </a>
        </div>

        {/* <Checkbox label="Remember me for 30 days" /> */}

        <PrimaryButton isDisabled={isDisabled} type="submit" icon="login">
          Sign in
        </PrimaryButton>
      </AuthCard>

      <p
        style={{
          fontSize: 14,
          color: tokens.onSurfaceVariant,
          marginTop: 24,
          textAlign: "center",
        }}
      >
        Don't have an account?
        <SwitchLink onClick={onSwitch}>Create one</SwitchLink>
      </p>
    </div>
  );
}

// ─── Sign Up panel ────────────────────────────────────────────────────────────
function SignUpPanel({ onSwitch, setToasts }) {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [username, setUsername] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const [email, setEmail] = useState("");
  // const [msg, setMsg] = useState("");

  async function signup(e, url) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password2", password2);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    setIsDisabled(true);
    const data = await Signup(url, formData, setToasts, setIsDisabled);
    if (!data) return;
    setIsDisabled(false);
    setPassword("");
    setUsername("");
    setEmail("");
    setPassword2("");
  }
  //    const []
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <LogoBadge icon="person_add" />
        <h1
          style={{
            fontSize: 20,
            lineHeight: "28px",
            fontWeight: 700,
            color: tokens.onSurface,
            margin: "0 0 4px",
          }}
        >
          Create account
        </h1>
        <p
          style={{
            fontSize: 14,
            color: tokens.onSurfaceVariant,
            textAlign: "center",
            margin: 0,
          }}
        >
          Join ChatMe and start connecting
        </p>
      </div>

      <AuthCard
        onSubmit={(e) => {
          signup(e, "http://127.0.0.1:8000/main/signup/");
        }}
      >
        {/* Name row */}
        {/* <div style={{ flex: 1 }}> */}

        <FieldLabel>User name</FieldLabel>
        <input
          type="text"
          placeholder="Rivera"
          autoComplete="family-name"
          className="chat-form-input"
          value={username}
          style={{
            width: "100%",
            height: 52,
            borderRadius: 9999,
            background: tokens.surfaceContainerLow,
            color: tokens.onSurface,
            paddingLeft: 16,
            paddingRight: 16,
          }}
          onFocus={(e) =>
            (e.target.style.borderColor = tokens.primaryContainer)
          }
          onBlur={(e) => (e.target.style.borderColor = "transparent")}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        {/* </div> */}

        <FieldGroup label="Email">
          <InputField
            icon="mail"
            type="email"
            value={email}
            placeholder="you@example.com"
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FieldGroup>

        <FieldGroup label="Password" style={{ marginBottom: 8 }}>
          <PasswordField
            placeholder="Create a password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <StrengthBar value={password} />
        </FieldGroup>

        <FieldGroup label="Confirm password">
          <PasswordField
            placeholder="Repeat your password"
            autoComplete="new-password"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          />
        </FieldGroup>
        <ValidatePassword password1={password} password2={password2} />
        <PrimaryButton isDisabled={isDisabled} type="submit" icon="person_add">
          Create account
        </PrimaryButton>
      </AuthCard>

      <p
        style={{
          fontSize: 14,
          color: tokens.onSurfaceVariant,
          marginTop: 24,
          textAlign: "center",
        }}
      >
        Already have an account?
        <SwitchLink onClick={onSwitch}>Sign in</SwitchLink>
      </p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ChatMeAuth({ setIsLoggedIn, setToasts, websocket }) {
  const [panel, setPanel] = useState("signin"); // "signin" | "signup"
  const isSignup = panel === "signup";

  return (
    <>
      {/* Fonts */}

      {/* Root */}
      <div
        style={{
          height: "100dvh",
          background: tokens.surface,
          fontFamily: "'Spline Sans', sans-serif",
          position: "relative",
          overflow: "scroll",
        }}
      >
        {/* Decorative blobs */}
        <div
          className="blob"
          style={{
            background: tokens.primaryContainer,
            top: isSignup ? "auto" : -100,
            bottom: isSignup ? -80 : "auto",
            right: isSignup ? "auto" : -100,
            left: isSignup ? -80 : "auto",
            transition: "all 0.6s ease",
          }}
        />
        <div
          className="blob"
          style={{
            zIndex: 0,
            width: 340,
            height: 340,
            background: "#8bfc7d",
            top: isSignup ? -60 : "auto",
            bottom: isSignup ? "auto" : 100,
            right: isSignup ? -60 : "auto",
            left: isSignup ? "auto" : -70,
            transition: "all 0.6s ease",
          }}
        />

        {/* Header */}
        <header className="chat-auth-header">
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: tokens.onSurface,
            }}
          >
            ChatMe
          </span>
          <a
            href="#"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: tokens.onSurfaceVariant,
              textDecoration: "none",
              padding: "8px 12px",
              borderRadius: 9999,
            }}
          >
            Need help?
          </a>
        </header>

        {/* Sliding viewport */}
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              width: "200%",
              transform: isSignup ? "translateX(-50%)" : "translateX(0)",
              transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
              willChange: "transform",
            }}
          >
            {/* Sign In */}
            <div
              style={{
                width: "50%",
                minHeight: "100dvh",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "80px 24px 40px",
              }}
            >
              <SignInPanel
                setIsLoggedIn={setIsLoggedIn}
                onSwitch={() => setPanel("signup")}
                setToasts={setToasts}
                websocket={websocket}
              />
            </div>

            {/* Sign Up */}
            <div
              style={{
                width: "50%",
                minHeight: "100dvh",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // padding: "80px 24px 40px",
              }}
            >
              <SignUpPanel
                onSwitch={() => setPanel("signin")}
                setToasts={setToasts}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
