import React from "react";
import { connectRoom } from "../API";
export function UserCard({ username, id }) {
  async function connect(e) {
    const sender_id = JSON.parse(sessionStorage.getItem("token"))?.user;
    const reciever_id = e.target.dataset.id;
    console.log(reciever_id);
    const formData = new FormData();
    formData.append("user_one", sender_id);
    formData.append("user_two", reciever_id);
    const response = await connectRoom(formData);
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
      <button
        onClick={connect}
        data-id={id}
        className="px-3 py-1.5 rounded-full border border-primary text-primary font-label-bold text-xs hover:bg-primary hover:text-white transition-colors"
      >
        Connect
      </button>
    </div>
  );
}
