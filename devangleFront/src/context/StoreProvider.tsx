import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { StoreContext } from "./StoreContext";

const DEFAULT_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [url, setUrl] = useState<string>(DEFAULT_URL);

  useEffect(() => {
    axios.defaults.baseURL = url;
  }, [url]);

  const createNewBlog = async (payload: {
    tags: string[];
    title: string;
    content: string;
  }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) throw new Error("No auth token found");

      const response = await fetch(`${DEFAULT_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("Blog created:", data);
      return data;
    } catch (error) {
      console.error("Error creating blog post:", error);
      throw error;
    }
  };

  const contextValue = useMemo(() => ({ url, setUrl, createNewBlog }), [url]);

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
