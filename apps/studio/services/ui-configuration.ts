import { ExtensionConfig } from "@extensible-angular-app/sdk";
import { Package } from "server/store";
import { createComponentConfig } from "./extension-types/component";
import {
  type ExtensionConfiguration,
  type TemplateConfiguration,
  type ComponentConfiguration,
  type WidgetConfiguration,
  type PluginConfiguration,
  type ExtensionMenuItem
} from "./extension-types/interfaces";
import { createPluginConfig } from "./extension-types/plugin";
import { createTemplateConfig } from "./extension-types/template";
import { createWidgetConfig } from "./extension-types/widget";
import { RJSFSchema } from "@rjsf/utils";

export class UIConfiguration {
  private template: Partial<TemplateConfiguration>;
  private components: {[key: string]: Partial<ComponentConfiguration>} = {};
  private widgets: {[key: string]: Partial<WidgetConfiguration>} = {};
  private plugins: {[key: string]: Partial<PluginConfiguration>} = {};

  #_config: ExtensionConfig;

  parse(config: ExtensionConfig) {
    this.#_config = config;
  }

  getTemplate(): ExtensionMenuItem {
    return {
      uuid: this.template?.uuid as string,
      name: this.template?.displayName
    }
  }

  getComponents(): ExtensionMenuItem[] {
    return Object.values(this.components)
      .map(component => ({
        name: component.options.title as string,
        label: '/' + component.options.route as string,
        icon: component.options.icon as string,
        uuid: component.uuid as string
      }));
  }

  getWidgets(): ExtensionMenuItem[] {
    return Object.values(this.widgets)
      .map(widget => ({
        name: widget.displayName,
        uuid: widget.uuid as string
      }));
  }

  getPlugins(): ExtensionMenuItem[] {
    return Object.values(this.plugins)
    .map(plugin => ({
      name: plugin.displayName,
      uuid: plugin.uuid as string
    }));
  }

  add(pkg: Package) {
    let newExtension;

    if (pkg.type === 'template') {
      this.template = createTemplateConfig(pkg);
      return this.template;
    } else if (pkg.type === 'component') {
      newExtension = createComponentConfig(pkg);
      this.components[newExtension.uuid] = newExtension;
    } else if (pkg.type === 'widget') {
      newExtension = createWidgetConfig(pkg);
      this.widgets[newExtension.uuid] = newExtension;
    } else if (pkg.type === 'plugin') {
      newExtension = createPluginConfig(pkg);
      this.plugins[newExtension.uuid] = newExtension;
    }

    return newExtension.uuid;
  }

  getExtensionConfig(uuid: string): Partial<ExtensionConfiguration> | Partial<TemplateConfiguration> {
    const config = this.components[uuid] || this.widgets[uuid] || this.plugins[uuid] || this.template;

    if (!config) {
      throw new Error(`Extension with uuid ${uuid} not found`);
    }

    return {
      displayName: config.package.displayName,
      remoteName: config.package.scope + '/' + config.package.package,
      exposedModule: config.package.exposedModules[0].moduleName,
      componentName: config.package.exposedModules[0].componentName,
      standalone: config.package.standalone,
      options: config.options,
      package: config.package
    }
  }

  getExtensionSchema(uuid: string): RJSFSchema {
    const config = this.components[uuid] || this.widgets[uuid] || this.plugins[uuid] || this.template;

    if (!config) {
      throw new Error(`Extension with uuid ${uuid} not found`);
    }

    delete config.package.schema.$schema;
    return {
      type: "object",
      properties: {
        displayName: {type: "string"},
        remoteName: {type: "string"},
        exposedModule: {type: "string"},
        componentName: {type: "string"},
        standalone: {type: "boolean"},
        options: {
          ...config.package.schema
        }
      }
    }
  }

  updateExtensionConfig(uuid: string, options?: Record<string, unknown>) {
    const extension = this.components[uuid] || this.widgets[uuid] || this.plugins[uuid] || this.template;

    if (!extension) {
      throw new Error(`Extension with uuid ${uuid} not found`);
    }

    extension.options = options;
  }
}
