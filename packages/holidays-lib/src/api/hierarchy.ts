export interface IHierarchy {
  code: string;
  description: string;
  children: Array<IHierarchy> | undefined;
}
