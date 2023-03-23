import { useCallback, useReducer } from "react";
import { Package } from "server/store";
import { configurationReducer, getInitialState, PersistedConfigurationState } from "./configuration.reducer";
import { createComponentConfig } from "./extension-types/component";
import { ExtensionConfiguration, TemplateConfiguration } from "./extension-types/interfaces";
import { createTemplateConfig } from "./extension-types/template";

const extensionFactoryMap = {
  template: createTemplateConfig,
  component: createComponentConfig
};

const initialState = getInitialState();

export default function useConfiguration() {
  const [state, dispatch] = useReducer(configurationReducer, initialState);

  const add = (pkg: Package) => {
    const extension = extensionFactoryMap[pkg.type](pkg);
    dispatch({ type: "add", payload: extension });
  };

  const update = (config: Partial<ExtensionConfiguration> | Partial<TemplateConfiguration>) => {
    dispatch({ type: "update", payload: config });
  };

  const select = (uuid: string) => {
    dispatch({ type: "select", payload: uuid });
  };

  const reset = useCallback((data: PersistedConfigurationState) => {
    dispatch({ type: "reset", payload: data });
  }, [dispatch]);

  return {
    state,
    add,
    update,
    select,
    reset
  }
}
