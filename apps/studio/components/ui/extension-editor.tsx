import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import { ConfigContext } from "components/ui/config-context";

const uiSchema = {
  displayName: {"ui:widget": "hidden"},
  remoteName: {"ui:widget": "hidden"},
  exposedModule: {"ui:widget": "hidden"},
  componentName: {"ui:widget": "hidden"},
  standalone: {"ui:widget": "hidden"},
  "ui:submitButtonOptions": {
    submitText: "Update"
  }
};

interface ExtensionEditorProps {
  uuid: string;
  update: Dispatch<SetStateAction<number>>
}

export default function ExtensionEditor ({uuid, update}: ExtensionEditorProps) {
  const config = useContext(ConfigContext);
  console.log(config);
  const [extensionConfig, setExtensionConfig] = useState(null);
  const [extensionSchema, setExtensionSchema] = useState(null);

  useEffect(() => {
    setExtensionConfig(config.getExtensionConfig(uuid));
    setExtensionSchema(config.getExtensionSchema(uuid));
  }, [uuid, config]);

  const triggerUpdate = (form) => {
    console.log(form);
    config.updateExtensionConfig(uuid, form.formData.options);
    setTimeout(() => update((value) => value + 1), 10);
  }

  if (!extensionConfig || !extensionSchema) return null;

  return (
    <Card sx={{ flex: '1 0 auto', overflow: 'auto' }} >
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
            onSubmit={triggerUpdate}
            formData={extensionConfig}
          />
      </CardContent>
    </Card>
  );
}
