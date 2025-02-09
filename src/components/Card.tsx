import React from "react";

interface Props {
  title: string;
  description: string;
  role: "USER" | "ADMIN";
  hasTag: boolean;
}

const Card: React.FC<Props> = ({ title, description, role, hasTag }) => {
  return (
    <div className="w-[347px] h-[198px] bg-white rounded-xl p-4 grid-cols-[1fr_3fr] grid relative gap-8">
      {hasTag && (
        <div className="rounded-[15px] py-2.5 px-3 bg-[#8C6CFF] text-white text-xs font-semibold absolute -right-2.5 -top-4.5">
          NEW
        </div>
      )}
      <div className="flex flex-col items-start justify-start gap-2">
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
      <p className="text-[10px] font-light text-black leading-5">
        {description}
      </p>
    </div>
  );
};

export default Card;
