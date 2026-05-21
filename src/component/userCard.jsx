import React from "react";
import { connectRoom } from "../API";
import { useState } from "react";
// import { Button } from "./Profile";
export function UserCard({ username, id, setToasts, openroom }) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [roomDetails, setRoomDetails] = useState({});
  async function connect(e) {
    setButtonDisabled(true);
    const sender_id = JSON.parse(sessionStorage.getItem("token"))?.user;
    const reciever_id = e.target.dataset.id;
    console.log(reciever_id);
    const formData = new FormData();
    formData.append("user_one", sender_id);
    formData.append("user_two", reciever_id);
    const response = await connectRoom(formData, setButtonDisabled, setToasts);
    if (!response) return;
    setTimeout(() => {
      const { uuid, user_two_name } = response;
      setRoomDetails({ uuid, user_two_name });
      setIsConnected(true);
    }, 700);
  }
  return (
    <div className="flex items-center justify-between p-4 hover:bg-stone-50 transition-colors group">
      <div className="flex items-center gap-3">
        <img
          className="w-12 h-12 rounded-full object-cover"
          data-alt="David Wilson"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn9YRC0LmhdgDZz0SuqUUWLwBn2ECusPawsbaxA7FpRgre6T1AD3j3wP4RH5OkQiayncBDbSuSZShaNg4rmejY7q96TSVUzQVNs9DmeychTI18H-EKGJpPfu43kuqvXSfFJpQvUlZli1xXY2E_a5Onz_jwvzFWpvaNggP68VXxwzmOjtzTImbswUipbJ4U6B2nzscXSo61MCm1e0xAKUvIJsHWB0zKMmCmvgYGGhzFAlAgFKT5dp3C_IWG7zGJq8yTdO_PK8VfhkUI"
        />
        <div>
          <h4 className="font-title-md text-body-md text-on-surface">
            {username}
          </h4>
        </div>
      </div>
      {!isConnected ? (
        <button
          disabled={buttonDisabled}
          onClick={connect}
          data-id={id}
          className={`rounded-full bg-primary-container text-black font-label-bold text-xs hover:bg-primary hover:text-white transition-colors`}
          style={{
            padding: "10px",
            background: `${buttonDisabled && "rgb(181 178 3 / 94%)"}`,
          }}
        >
          Connect
        </button>
      ) : (
        // style={{ padding: "10px", marginTop: "5px" }}
        //         className="rounded-full bg-primary-container text-black"
        // px-3 py-1.5 rounded-full border border-primary text-primary font-label-bold text-xs hover:bg-primary hover:text-white transition-colors
        <button
          onClick={(e) => {
            openroom(e, roomDetails.uuid, roomDetails.user_two);
          }}
          data-id={id}
          style={{ padding: "10px" }}
          className="rounded-full bg-primary-container text-black font-label-bold text-xs hover:bg-primary hover:text-white transition-colors"
        >
          Send Message
        </button>
      )}
    </div>
  );
}
