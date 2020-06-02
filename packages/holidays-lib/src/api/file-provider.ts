export interface IFileProvider {
  loadConfiguration(rootHierarchy: string): Promise<string>;
  loadHierarchies(): Promise<string>;
  loadHierarchyTranslations(language?: string): Promise<string>;
  loadHolidayTranslations(language?: string): Promise<string>;
  loadLanguages(): Promise<string>;
}
