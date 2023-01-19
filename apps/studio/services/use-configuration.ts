import { useReducer } from "react";
import { Package } from "server/store";
import { configurationReducer } from "./configuration.reducer";
import { createComponentConfig } from "./extension-types/component";
import { ExtensionConfiguration, TemplateConfiguration } from "./extension-types/interfaces";
import { createPluginConfig } from "./extension-types/plugin";
import { createTemplateConfig } from "./extension-types/template";
import { createWidgetConfig } from "./extension-types/widget";

const extensionFactoryMap = {
  template: createTemplateConfig,
  component: createComponentConfig,
  widget: createWidgetConfig,
  plugin: createPluginConfig
};

const initialState = {
  selected: null,
  latestAdded: null,
  loaded: false,
  template: null,
  extensions: {}
};

export default function useConfiguration() {
  const [state, dispatch] = useReducer(configurationReducer, initialState as typeof initialState);

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

  return {
    state,
    add,
    update,
    select
  }
}
