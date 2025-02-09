import { useCard } from "@/context/cardContext";

import React from "react";

interface Props {
  onSave: () => void;
  role: "ADMIN" | "USER";
}

const CreatingCard: React.FC<Props> = ({ onSave, role }) => {
  const { addCard, adminLength, userLength } = useCard(); // Get addCard function from context

  const title =
    role === "ADMIN" ? `ADMIN-${adminLength + 1}` : `MEMO-${userLength + 1}`; // Generate title based on role
  const [description, setDescription] = React.useState<string>(""); // State for description
  return (
    <div className="w-[347px] h-[198px] bg-white rounded-xl p-4 grid-cols-[1fr_3fr] grid gap-8">
      <div className="flex flex-col items-center justify-between gap-2">
        <div className="flex flex-col items-start gap-2 self-start">
          <h2 className="text-black opacity-50 font-semibold text-[15px] text-nowrap">
            {title}
          </h2>
          <div
            className={
              "text-xs font-semibold text-white py-[5px] px-[10px] rounded-2xl " +
              (role == "ADMIN" ? "bg-[#FF6C6F]" : "bg-[#62AEFF]")
            }
          >
            {role.toUpperCase()}
          </div>
        </div>
        <button
          onClick={() => {
            onSave();
            addCard({ title, description, role, created_date: new Date() }); // Add new card to context
          }}
          className="bg-white text-black font-semibold text-xs underline justify-self-end cursor-pointer"
        >
          SAVE
        </button>
      </div>
      <textarea
        name="test"
        id="test"
        placeholder="Type something ..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        className="bg-[#D4D4D8] opacity-30 rounded-xl p-2.5 text-black text-[10px] focus:outline-none "
      ></textarea>
    </div>
  );
};

export default CreatingCard;
