import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { set } from "zod";

// Define Card Interface
export interface Card {
  title: string;
  description: string;
  role: "ADMIN" | "USER";
  created_date: Date;
}

// Define the Context Type
interface CardContextType {
  cards: Card[];
  addCard: (newCard: Card) => void;
  adminLength: number;
  userLength: number;
  newTagList: string[];
}

// Create Context
const CardContext = createContext<CardContextType | undefined>(undefined);

// Key for localStorage
const STORAGE_KEY = "cards";

// Initial Card Data (Modify Later)
const initialCards: Card[] = [
  {
    title: "ADMIN-2",
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
    role: "ADMIN",
    created_date: new Date("2025-01-21"),
  },
  {
    title: "MEMO-2",
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
    role: "USER",
    created_date: new Date("2025-01-23"),
  },
  {
    title: "MEMO-1",
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
    role: "USER",
    created_date: new Date("2025-01-22"),
  },
  {
    title: "ADMIN-1",
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
    role: "ADMIN",
    created_date: new Date("2025-01-20"),
  },
];

// Provider Component
export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<Card[]>(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (storedData) {
      const data = JSON.parse(storedData);
      data.map((c: Card) => {
        c.created_date = new Date(c.created_date);
      });
      return data; // Load existing data
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCards)); // Store initial cards on first run
      return initialCards; // Set initial state
    }
  });

  const [adminLength, setAdminLength] = useState<number>(0);
  const [userLength, setUserLength] = useState<number>(0);

  const [newTagList, setNewTagList] = useState<string[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const existingCards = JSON.parse(storedData);

      // 🛠 Ensure initialCards exist even if localStorage was cleared manually
      const mergedCards = [
        ...initialCards.filter(
          (initial) =>
            !existingCards.some((card: Card) => card.title === initial.title)
        ),
        ...existingCards,
      ];
      mergedCards.map((c: Card) => {
        c.created_date = new Date(c.created_date);
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedCards)); // ✅ Save merged data
      setCards(mergedCards);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));

    const adminCount = cards.filter((card) => card.role === "ADMIN").length;
    const userCount = cards.filter((card) => card.role === "USER").length;

    setAdminLength(adminCount);
    setUserLength(userCount);
  }, [cards]);

  // Function to add a new card
  const addCard = (newCard: Card) => {
    setCards((prevCards) => [...prevCards, newCard]);
    setNewTagList((prev) => [...prev, newCard.title]);
  };

  return (
    <CardContext.Provider
      value={{ cards, addCard, adminLength, userLength, newTagList }}
    >
      {children}
    </CardContext.Provider>
  );
};

// Hook to Use Context
export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return context;
};
