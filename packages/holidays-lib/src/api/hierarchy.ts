export interface IHierarchy {
  code: string;
  fullPath: string;
  description: string;
  children: Array<IHierarchy> | undefined;
}
