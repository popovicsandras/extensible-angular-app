import { ExtensionConfiguration, TemplateConfiguration } from "./extension-types/interfaces";

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

export interface ConfigurationState {
  selected: string | null;
  latestAdded: string | null;
  loaded: boolean;
  template: Partial<TemplateConfiguration> | null;
  extensions: {[key: string]: Partial<ExtensionConfiguration>};
}

export const configurationReducer = (state: ConfigurationState, action: AddAction | SelectAction | UpdateAction) => {
  switch (action.type) {
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
