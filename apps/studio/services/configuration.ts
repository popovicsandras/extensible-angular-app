import { ComponentConfig, ExtensionConfig, TemplateConfig } from "@extensible-angular-app/sdk";
import { Package } from "server/store";
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';

const customConfig: Config = {
  dictionaries: [adjectives, colors, animals],
  separator: '-',
  length: 2,
};

export class Configuration {
  constructor(private config: ExtensionConfig) {}

  getTemplate() {
    return {
      uuid: this.config.template?.uuid,
      title: this.config.template?.displayName
    }
  }

  getComponents() {
    return this.config.components.map(component => ({
      name: component.options.title,
      label: '/' + component.options.route,
      icon: component.options.icon,
      uuid: component.uuid
    }));
  }

  getWidgets() {
    return this.config.widgets.map(widget => ({
      name: widget.options.title,
      uuid: widget.uuid
    }));
  }

  getPlugins() {
    return this.config.plugins.map(plugin => ({
      name: plugin.options.title,
      uuid: plugin.uuid
    }));
  }

  add(pkg: Package) {
    const uuid = this.getRandomId();
    const name = uniqueNamesGenerator(customConfig);
    let newExtension;

    if (pkg.type === 'template') {
      newExtension = this.config.template = {
        uuid,
        displayName: pkg.name,
        remoteName: pkg.scope + '/' + pkg.name
      } as TemplateConfig;
    }

    if (pkg.type === 'component') {
      newExtension = this.config.components.push({
        uuid,
        displayName: pkg.name,
        remoteName: pkg.scope + '/' + pkg.name,
        options: {
          title: `<${pkg.name}>`,
          route: name,
        }
      } as ComponentConfig);
    }

    return newExtension;
  }

  getRandomId(): string {
    const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
    return uint32.toString(16);
  }
}
