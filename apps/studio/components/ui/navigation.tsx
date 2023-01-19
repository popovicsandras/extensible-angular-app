import List from "@mui/material/List";

import AltRouteIcon from '@mui/icons-material/AltRoute';
import TableChartIcon from '@mui/icons-material/TableChart';
import WidgetsIcon from '@mui/icons-material/Widgets';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';

import NavSection from "components/ui/nav-section";
import { useContext, useMemo } from "react";
import NavItem from "components/ui/nav-item";
import { ConfigurationStoreContext } from "./config-context";

export default function Navigation({select}: {select: (uuid: string) => void}) {
  const state = useContext(ConfigurationStoreContext);

  const components = useMemo(() => {
    return Object.values(state.extensions)
      .filter(extension => extension.type === 'component')
      .map(component => ({
        name: component.options.title as string,
        label: '/' + component.options.route as string,
        icon: component.options.icon as string,
        uuid: component.uuid as string
      }));
  }, [state.extensions]);

  const widgets = useMemo(() => {
    return Object.values(state.extensions)
      .filter(extension => extension.type === 'widget')
      .map(widget => ({
        name: widget.options.title as string,
        uuid: widget.uuid as string
      }));
  }, [state.extensions]);

  const plugins = useMemo(() => {
    return Object.values(state.extensions)
      .filter(extension => extension.type === 'plugin')
      .map(plugin => ({
        name: plugin.options.title as string,
        uuid: plugin.uuid as string
      }));
  }, [state.extensions]);

  const { latestAdded, selected, template } = state;

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
      <NavItem blink={latestAdded} name="Template" icon={TableChartIcon} uuid={template?.uuid} current={selected} onClick={select} />
      <NavSection blink={latestAdded} name="Routes" icon={AltRouteIcon} items={components} current={selected} onClick={select} />
      <NavSection blink={latestAdded} name="Widgets" icon={WidgetsIcon} items={widgets} current={selected} onClick={select} />
      <NavSection blink={latestAdded} name="Plugins" icon={SettingsInputComponentIcon} items={plugins} current={selected} onClick={select} />
    </List>
  );
}
