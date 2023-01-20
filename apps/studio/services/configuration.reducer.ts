import { ExtensionConfiguration, TemplateConfiguration } from "./extension-types/interfaces";

export interface PersistedConfigurationState {
  title: string;
  uuid: string;
  template: Partial<TemplateConfiguration> | null;
  extensions: {[key: string]: Partial<ExtensionConfiguration>};
}

interface ResetAction {
  type: "reset";
  payload: PersistedConfigurationState
}

interface AddAction {
  type: "add";
  payload: Partial<ExtensionConfiguration> | Partial<TemplateConfiguration>;
}

interface UpdateAction {
  type: "update";
  payload: Partial<ExtensionConfiguration> | Partial<TemplateConfiguration>;
}

interface SelectAction {
  type: "select";
  payload: string;
}

export interface ConfigurationState extends PersistedConfigurationState {
  selected: string | null;
  latestAdded: string | null;
}

export const getInitialState = (data?: PersistedConfigurationState): ConfigurationState => ({
  title: data?.title ?? null,
  uuid: data?.uuid ?? null,
  selected: null,
  latestAdded: null,
  template: data?.template ?? null,
  extensions: data?.extensions ?? {}
});

export const configurationReducer = (state: ConfigurationState, action: AddAction | SelectAction | UpdateAction | ResetAction) => {
  switch (action.type) {
    case 'reset': {
      return getInitialState(action.payload);
    } break;

    case 'add': {
      const { type } = action.payload;
      if (type === 'template') {
        return {
          ...state,
          selected: action.payload.uuid,
          latestAdded: action.payload.uuid,
          template: action.payload
        };
      }
      return {
        ...state,
        selected: action.payload.uuid,
        latestAdded: action.payload.uuid,
        extensions: {
          ...state.extensions,
          [action.payload.uuid]: action.payload
        }
      };
    } break;

    // Template needs to be taken care of separately
    case "update": {
      const { type } = action.payload;
      if (type === 'template') {
        return {
          ...state,
          template: {
            ...state.template,
            options: {
              ...state.template.options,
              ...action.payload
            }
          }
        };
      }

      return {
        ...state,
        extensions: {
          ...state.extensions,
          [action.payload.uuid]: {
            ...state.extensions[action.payload.uuid],
            options: {
              // ...state.extensions[action.payload.uuid].options,
              ...action.payload.options
            }
          }
        }
      };
    } break;

    case "select": {
      return {
        ...state,
        selected: action.payload
      };
    } break;

    default:
      return state;
  }
};
