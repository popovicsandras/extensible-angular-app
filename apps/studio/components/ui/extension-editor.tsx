import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext, useMemo } from "react";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import { ConfigurationStoreContext } from "components/ui/config-context";
import { RJSFSchema } from "@rjsf/utils";
import { ExtensionConfiguration, TemplateConfiguration } from "services/extension-types/interfaces";

const uiSchema = {
  uuid: {"ui:widget": "hidden"},
  displayName: {"ui:widget": "hidden"},
  remoteName: {"ui:widget": "hidden"},
  exposedModule: {"ui:widget": "hidden"},
  componentName: {"ui:widget": "hidden"},
  standalone: {"ui:widget": "hidden"},
  "ui:submitButtonOptions": {
    "norender": true,
    submitText: "Update"
  },
  "options": {
    "position": {
      "ui:widget": "radio"
    },
    "floatingSideBar": {
      "ui:widget": "radio"
    }
  }
};

interface ExtensionEditorProps {
  uuid: string;
  update: (config: Partial<ExtensionConfiguration> | Partial<TemplateConfiguration>) => void
}

export default function ExtensionEditor ({uuid, update}: ExtensionEditorProps) {
  const state = useContext(ConfigurationStoreContext)

  const extensionConfig = useMemo(() => {
    let config;
    if (state.template?.uuid === uuid) {
      config =  state.template;
    } else {
      config = state.extensions[uuid];
    }

    if (!config) {
      throw new Error(`Extension with uuid ${uuid} not found`);
    }

    return {
      uuid: config.uuid,
      displayName: config.package.displayName,
      remoteName: config.package.scope + '/' + config.package.package,
      exposedModule: config.package.exposedModules[0].moduleName,
      componentName: config.package.exposedModules[0].componentName,
      standalone: config.package.standalone,
      options: config.options,
      package: config.package
    }
  }, [state, uuid]);

  const extensionSchema: RJSFSchema = useMemo(() => {
    if (!extensionConfig) return null;

    return {
      type: "object",
      properties: {
        uuid: {type: "string"},
        displayName: {type: "string"},
        remoteName: {type: "string"},
        exposedModule: {type: "string"},
        componentName: {type: "string"},
        standalone: {type: "boolean"},
        options: {
          ...extensionConfig.package.schema
        }
      }
    }
  }, [extensionConfig]);

  if (!extensionConfig || !extensionSchema) return null;

  return (
    <Card sx={{ flex: '1 0 auto', overflow: 'auto', maxWidth: 'calc(100% - 400px)' }} >
      <CardContent>
        <Typography variant="h3">
          {extensionConfig.displayName}
        </Typography>
        <Typography color="text.secondary">
          {extensionConfig.package.scope}/{extensionConfig.package.package}@{extensionConfig.package.version}
        </Typography>
        <Form
            schema={extensionSchema}
            uiSchema={uiSchema}
            validator={validator}
            liveValidate={true}
            showErrorList={false}
            onChange={(form) => update(form.formData)}
            formData={extensionConfig}
          />
      </CardContent>
    </Card>
  );
}
