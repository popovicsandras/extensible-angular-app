import { createContext } from "react";
import { UIConfiguration } from "services/ui-configuration";

export const ConfigContext = createContext<UIConfiguration>(null);
