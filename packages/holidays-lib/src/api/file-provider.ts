export interface IFileProvider {
  loadConfiguration(rootHierarchy: string): Promise<string>;
  loadHierarchies(): Promise<string>;
  loadLanguages(): Promise<string>;
}
