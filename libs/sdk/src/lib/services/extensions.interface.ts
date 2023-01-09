export interface ExtensionConfig {
  template: TemplateConfig;
  components: ComponentConfig[];
}

export type TemplateConfig = RemoteConfig<{
  title: string;
}>;

export type ComponentConfig = RemoteConfig<{
  protected: boolean;
  route: string;
  title: string;
}>;

export interface RemoteConfig<T extends { [key: string]: any; }> {
  displayName: string;
  remoteName: string;
  exposedModule: string;
  componentName: string;
  standalone: boolean;
  options: T;
}
