/**
 * An element in the hierarchy tree for which holidays can be defined
 */
export interface IHierarchy {

  /**
   * The identifier of the hierarchy.
   */
  code: string;

  /**
   * The full path of the hierarchy. This is the concatenation of the code with the codes of all parents. The separator used is '/'
   */
  fullPath: string;

  /**
   * The description of the hierarchy. If no translated value can be found, this one can be used
   */
  description: string;

  /**
   * An array of sub-hierarchies.
   */
  children: Array<IHierarchy> | undefined;
}
