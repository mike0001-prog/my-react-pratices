import React from "react";
import Message from "./Message";
import ChatRoom from "./ChatRoom";
import { useState, useEffect } from "react";
import { getRooms } from "../API";
export default function ChatBody({ openRoom }) {
  const [chatRooms, setChatRooms] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("token"));
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function intializeRooms() {
      const data = await getRooms();
      if (data) {
        setChatRooms(data);
      }
    }
    intializeRooms();
  }, []);
  const returnRoomTitle = (room, loggedInUser) => {
    // room.title == user?.user_name ? user?.user_name : room.title
    const loggedInUserId = loggedInUser.user;

    if (room.user_one == room.user_two) return "you";

    if (room.user_two == loggedInUserId) return room.user_one_name;

    if (room.user_one == loggedInUserId) return room.user_two_name;
  };
  return (
    <div
      className="pt-20 pb-24 px-4 min-h-screen"
      style={{ overflowY: "scroll", height: "80vh" }}
    >
      {/* <Message text="hi" time="12pm" />; */}
      <div className="mb-6">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            className="w-full h-12 pl-12 pr-4 bg-surface-container-low border-none rounded-full focus:ring-2 focus:ring-primary-container text-body-md outline-none"
            placeholder="Search conversations..."
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        {chatRooms.map(
          (room, id) =>
            returnRoomTitle(room, user)
              .toLowerCase()
              .startsWith(searchQuery) && (
              <ChatRoom
                key={id}
                id={room.uuid}
                title={returnRoomTitle(room, user)}
                onClick={(e) => {
                  openRoom(e, room.uuid, returnRoomTitle(room, user));
                }}
              />
            ),
        )}
        {chatRooms.length === 0 && "You have no firends yet"}
        {/* <ChatRoom
          id="177345b3-8669-4104-b0a9-45f8466f031e"
          title="kehinde oyeniyi2"
          openRoom={openRoom}
        /> */}

        {/* <ChatRoom title="kehinde oyeniyi" />
        <ChatRoom title="kehinde oyeniyi" />
        <ChatRoom title="kehinde oyeniyi" /> */}
      </div>
    </div>
  );
}
