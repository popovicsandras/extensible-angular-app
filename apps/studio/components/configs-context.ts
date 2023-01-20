import { createContext } from "react";

export interface ConfigContextType {
  configs: {
    title: string;
    uuid: string;
    url: string;
  }[];
}

export const ConfigContext = createContext<ConfigContextType>(null);
