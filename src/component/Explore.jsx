import React from "react";
import { UserCard } from "./userCard";
import { getusers } from "../API";
import { useState, useEffect } from "react";

export default function Explore({ setToasts, openroom }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async (setToasts) => {
      const response = await getusers(setToasts);
      if (!response) return;
      setUsers(response);
    };
    getUsers(setToasts);
  }, []);
  return (
    <main
      className="pt-20 pb-24 px-4 min-h-screen"
      style={{ overflowY: "scroll", height: "80vh" }}
    >
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
        <div className="mb-6">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              className="w-full h-12 pl-12 pr-4 bg-surface-container-low border-none rounded-full focus:ring-2 focus:ring-primary-container text-body-md outline-none"
              placeholder="Search for people..."
              type="text"
            />
          </div>
        </div>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-display-sm font-display-sm text-on-surface">
              Connect for More fun
            </h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-stone-100 divide-y divide-stone-50 overflow-hidden">
            {users.map((user, id) => (
              <UserCard
                key={id}
                username={user.username}
                id={user.id}
                setToasts={setToasts}
                openroom={openroom}
              />
            ))}
            {/* <UserCard username="kay" id={1} /> */}
          </div>
        </section>
      </div>
    </main>
  );
}
