export interface ExtensionConfig {
  template: TemplateConfig;
  components: ComponentConfig[];
  widgets: WidgetConfig[];
  plugins: PluginConfig[];
}

export type TemplateConfig = RemoteConfig<{
  title: string;
}>;

export type ComponentConfig = RemoteConfig<{
  protected: boolean;
  route: string;
  title: string;
  icon?: string;
}>;

export type WidgetConfig = RemoteConfig<{
  title: string;
  slot: string;
}>;

export type PluginConfig = RemoteConfig<{
  title: string;
}>;

export interface RemoteConfig<T extends { [key: string]: any; }> {
  uuid: string;
  displayName: string;
  remoteName: string;
  exposedModule: string;
  componentName: string;
  standalone?: boolean;
  options: T;
}
