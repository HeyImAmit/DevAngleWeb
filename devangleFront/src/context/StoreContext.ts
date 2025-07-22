import { createContext } from "react";

export interface BlogData {
  tags: string[];
  title: string;
  content: string;
}

export interface Post {
  id: number;
  title: string;
  tags: string[];
  content: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
    avatarUrl: string;
  };
}

export interface StoreContextValue {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  createNewBlog: (data: BlogData) => Promise<Post>; 
}

const DEFAULT_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const StoreContext = createContext<StoreContextValue>({
  url: DEFAULT_URL,
  setUrl: () => {}, // no-op
  createNewBlog: async () => {
    throw new Error("createNewBlog not implemented");
  },
});
