"use client";

import Card from "@/components/Card";
import CreatingCard from "@/components/CreatingCard";
import { useAuth } from "@/context/authContext";
import { Card as CardInterface, useCard } from "@/context/cardContext";
import { motion } from "motion/react";
import React, { useEffect } from "react";

const Home: React.FC = () => {
  const [creating, setCreating] = React.useState<boolean>(false);
  // const role: "user" | "admin" = "admin";
  const { cards, newTagList } = useCard();
  const [filteredCard, setFilteredCard] = React.useState<CardInterface[]>([]);
  const { role } = useAuth();
  useEffect(() => {
    const sortCard =
      role == "USER"
        ? cards
            .filter((c) => c.role == "USER")
            .sort((a, b) => {
              return a.created_date > b.created_date ? 1 : -1;
            })
        : [...cards].sort((a, b) => {
            return a.created_date > b.created_date ? -1 : 1;
          });
    setFilteredCard(sortCard);
  }, [cards]);

  return (
    <div className="flex flex-col items-center gap-2 justify-start mt-20 mb-8">
      <h3 className="font-bold text-6xl my-8">
        Memo Card{filteredCard.length > 1 ? "s" : ""}
        <span className="ms-2 text-xl">
          ({filteredCard.length}
          {creating ? " + 1" : ""})
        </span>
      </h3>
      <div className="flex flex-col gap-4 laptop:grid laptop:grid-cols-3">
        {filteredCard.map((f, i) => {
          return (
            <Card
              key={i}
              title={f.title}
              description={f.description}
              role={f.role}
              hasTag={newTagList.includes(f.title)}
            />
          );
        })}
        {creating ? (
          <CreatingCard
            onSave={() => {
              setCreating(false);
            }}
            role={role || "ADMIN"}
          />
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCreating(true);
            }}
            className="text-black text-6xl w-[347px] h-[198px] bg-white rounded-xl cursor-pointer"
          >
            +
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Home;
