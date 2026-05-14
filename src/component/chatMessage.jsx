export default function ChatMessage({ text, time, is_sender }) {
  return (
    <div
      className={`flex items-end gap-3 px-4 ${is_sender && "flex-row-reverse ml-auto"} `}
    >
      <div className="flex flex-col items-end gap-1">
        <div className="bg-primary p-4 rounded-xl rounded-br-none shadow-sm text-black">
          <p className="text-sm leading-relaxed">{text}</p>
        </div>
        <div className="flex items-center gap-1 mr-1">
          <span className="text-[10px] text-[#8c8b5f]">{time}</span>
        </div>
      </div>
    </div>
  );
}
