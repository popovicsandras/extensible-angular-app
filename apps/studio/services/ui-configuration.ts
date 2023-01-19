import { ExtensionConfig } from "@extensible-angular-app/sdk";
import { Package } from "server/store";
import { createComponentConfig } from "./extension-types/component";
import { type TemplateConfiguration, type ExtensionConfiguration, ExtensionMenuItem } from "./extension-types/interfaces";
import { createPluginConfig } from "./extension-types/plugin";
import { createTemplateConfig } from "./extension-types/template";
import { createWidgetConfig } from "./extension-types/widget";

export class UIConfiguration {
  private template: TemplateConfiguration;
  private config: ExtensionConfiguration[] = [];
  private _config: ExtensionConfig;

  parse(config: ExtensionConfig) {
    this._config = config;
  }

  getTemplate(): ExtensionMenuItem {
    return {
      uuid: this.template?.uuid as string,
      name: this.template?.displayName
    }
  }

  getComponents(): ExtensionMenuItem[] {
    return this.config.filter((c) => c.type === 'component')
      .map(component => ({
        name: component.options.title as string,
        label: '/' + component.options.route as string,
        icon: component.options.icon as string,
        uuid: component.uuid as string
      }));
  }

  getWidgets(): ExtensionMenuItem[] {
    return this.config.filter((c) => c.type === 'widget')
      .map(widget => ({
        name: widget.displayName,
        uuid: widget.uuid as string
      }));
  }

  getPlugins(): ExtensionMenuItem[] {
    return this.config.filter((c) => c.type === 'plugin')
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
    } else if (pkg.type === 'widget') {
      newExtension = createWidgetConfig(pkg);
    } else if (pkg.type === 'plugin') {
      newExtension = createPluginConfig(pkg);
    }

    this.config.push(newExtension);

    return newExtension;
  }
}
