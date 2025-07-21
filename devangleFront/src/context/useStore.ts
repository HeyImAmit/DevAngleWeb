import { useContext } from "react";
import { StoreContext } from "./StoreContext";
import type { StoreContextValue } from "./StoreContext";

const useStore = (): StoreContextValue => useContext(StoreContext);

export default useStore;
