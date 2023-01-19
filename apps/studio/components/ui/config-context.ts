import { createContext } from "react";
import { ConfigurationState } from "services/configuration.reducer";

export const ConfigurationStoreContext = createContext<ConfigurationState>(null);
