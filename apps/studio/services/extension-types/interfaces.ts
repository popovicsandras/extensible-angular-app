import { Package } from "server/store";

export interface ExtensionMenuItem{
  uuid: string;
  icon?: string;
  name: string;
  label?: string;
}

interface GenericExtensionConfiguration {
  uuid: string;
  displayName: string;
  // remoteName: string; --> package.scope + '/' + package.name
  // exposedModule: string; --> one from package.exposedModules
  // componentName: string; --> one from package.exposedModules
  options?: Record<string, unknown>;
  package: Package;
}

export interface ComponentConfiguration extends GenericExtensionConfiguration { type: "component" }
export interface TemplateConfiguration extends GenericExtensionConfiguration { type: "template" }
export interface WidgetConfiguration extends GenericExtensionConfiguration { type: "widget" }
export interface PluginConfiguration extends GenericExtensionConfiguration { type: "plugin" }

export type ExtensionConfiguration = ComponentConfiguration | WidgetConfiguration | PluginConfiguration;
