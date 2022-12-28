/**
 * The file provider will fetch the files with the definitions.
 * The provider is passed as input parameter when creating a calculator instance
 */
export interface IFileProvider {
  /**
   * This method should load the json file with the holiday definition for a hierarchy
   *
   * @param rootHierarchy the name of the root hierarchy. Mostly, but not limitied to ISO country codes
   * @example 'de', 'en'
   */
  loadConfiguration(rootHierarchy: string): Promise<string>;

  /**
   * Loads the json file with the hiararchy tree
   */
  loadHierarchies(): Promise<string>;

  /**
   * Load the json with translations for the hierarchy tree
   *
   * @param language Optional: the language. It is up to the one implementing the interface how the undefined value will be handled.
   */
  loadHierarchyTranslations(language?: string): Promise<string>;

  /**
   * Load the json with the translations for the holidays
   * @param language Optional: the language. It is up to the one implementing the interface how the undefined value will be handled.
   */
  loadHolidayTranslations(language?: string): Promise<string>;

  /**
   * Loads the supported languages
   */
  loadLanguages(): Promise<string>;
}
