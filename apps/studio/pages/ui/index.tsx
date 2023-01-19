import Grid from "@mui/material/Grid";
import WebIcon from '@mui/icons-material/Web';
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import AltRouteIcon from '@mui/icons-material/AltRoute';
import TableChartIcon from '@mui/icons-material/TableChart';
import WidgetsIcon from '@mui/icons-material/Widgets';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';

import NavSection from "components/ui/nav-section";
import ExtensionSelector from "components/ui/extension-selector";
import { getExtensions } from "server/get-extensions";
import { Package } from "server/store";
import { UIConfiguration } from "services/ui-configuration";
import { ExtensionConfig } from "@extensible-angular-app/sdk";
import { useEffect, useMemo, useState } from "react";
import NavItem from "components/ui/nav-item";

const config: ExtensionConfig = {
  "template":   {
    "displayName": "Sirius Template",
    "remoteName": "@extensible-angular-app/custom-template",
    "exposedModule": "./Template",
    "componentName": "AppTemplateComponent",
    "uuid": "1",
    "options": {
      "title": "Workspace"
    }
  },
  "widgets": [],
  "components": [
    {
      "displayName": "File browser",
      "remoteName": "@extensible-angular-app/content",
      "exposedModule": "./Files",
      "componentName": "FilesModule",
      "uuid": "2",
      "options": {
        "protected": true,
        "route": "files",
        "title": "Files",
        "icon": "view_list"
      }
    },
    {
      "displayName": "Process browser",
      "remoteName": "@extensible-angular-app/process",
      "exposedModule": "./Processes",
      "componentName": "ProcessComponent",
      "uuid": "3",
      "standalone": true,
      "options": {
        "protected": true,
        "route": "processes",
        "title": "Processes",
        "icon": "blur_circular"
      }
    }
  ],
  "plugins": []
};

export default function Applications({pkgs}: {pkgs: Package[]}) {
  const configuration = useMemo(() => new UIConfiguration(), [])

  useEffect(() => {
    configuration.parse(config);
  }, [configuration]);

  const [componentsOpened, setComponentsOpened] = useState(false);
  const [widgetsOpened, setWidgetsOpened] = useState(false);
  const [pluginsOpened, setPluginsOpened] = useState(false);

  const [extension, setExtension] = useState<string | null>(null);
  const [newlyAddedExtensionUuid, setNewlyAddedExtensionUuid] = useState<string | null>(null);
  const [template, setTemplate] = useState(configuration.getTemplate());
  const [components, setComponents] = useState(configuration.getComponents());
  const [widgets, setWidgets] = useState(configuration.getWidgets());
  const [plugins, setPlugins] = useState(configuration.getPlugins());

  const onExtensionSelection = (pkg: Package) => {
    const newExtension = configuration.add(pkg);

    if (pkg.type === 'template') {
      setTemplate(configuration.getTemplate());
    } else if (pkg.type === 'component') {
      setComponents(configuration.getComponents());
      setComponentsOpened(true);
    } else if (pkg.type === 'widget') {
      setWidgets(configuration.getWidgets());
      setWidgetsOpened(true);
    } else if (pkg.type === 'plugin') {
      setPlugins(configuration.getPlugins());
      setPluginsOpened(true);
    }

    setNewlyAddedExtensionUuid(newExtension.uuid);
    setExtension(newExtension.uuid);
  }

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>

      <Grid item xs={12} sx={{ mb: -2.25, position: 'sticky', top: '50px', backgroundColor: '#fafafb', paddingBottom: '24px' }}>
        <div css={{display: 'flex', gap: '12px'}}>
          <WebIcon sx={{ fontSize: 40 }} />
          <Typography variant="h4" css={{ lineHeight: '40px'}}>UI Designer</Typography>
        </div>
      </Grid>

      <Grid item sx={{display: 'flex', gap: '12px', width: '100%', minHeight: 'calc(100vh - 160px)', maxHeight: 'calc(100vh - 160px)'}}>
        <Card sx={{ minWidth: 275, overflow: 'auto' }} >
          <CardContent>
            <ExtensionSelector packages={pkgs} onClick={onExtensionSelection} />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
              <NavItem blink={newlyAddedExtensionUuid} name="Template" icon={TableChartIcon} uuid={template.uuid} />
              <NavSection blink={newlyAddedExtensionUuid} open={componentsOpened} setOpen={setComponentsOpened} name="Routes" icon={AltRouteIcon} items={components} />
              <NavSection blink={newlyAddedExtensionUuid} open={widgetsOpened} setOpen={setWidgetsOpened} name="Widgets" icon={WidgetsIcon} items={widgets} />
              <NavSection blink={newlyAddedExtensionUuid} open={pluginsOpened} setOpen={setPluginsOpened} name="Plugins" icon={SettingsInputComponentIcon} items={plugins} />
            </List>
          </CardContent>
        </Card>
        {extension && <Card sx={{ flex: '1 0 auto' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
          </CardContent>
        </Card>}
      </Grid>
    </Grid>
  );
}

export function getServerSideProps() {
  return getExtensions();
}
