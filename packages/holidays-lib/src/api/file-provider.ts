export interface IFileProvider {
  loadHierarchies(): Promise<string>;
  loadConfiguration(rootHierarchy: string): Promise<string>;
}
