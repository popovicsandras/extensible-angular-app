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
  remoteName: string;
  exposedModule: string;
  componentName: string;
  standalone: boolean;
  options?: Record<string, unknown>;
  package: Package;
}

export interface TemplateConfiguration extends GenericExtensionConfiguration { type: "template" }
export interface ComponentConfiguration extends GenericExtensionConfiguration { type: "component" }

export type ExtensionConfiguration = ComponentConfiguration;
