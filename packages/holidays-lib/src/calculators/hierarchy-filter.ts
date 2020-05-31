import { IBaseHoliday, IConfiguration } from '../configuration';

export interface IHierarchyFilter {
  filterConfigurationByHierarchy(
    configuration: IConfiguration,
    hierarchy: string,
    deep: boolean): Array<IBaseHoliday<any>>;
}

export class HierarchyFilter implements IHierarchyFilter {

  // <editor-fold desc='Constructor & Co°'>
  public constructor() { }
  // </editor-fold>

  // <editor-fold desc='IHierarchyFilter interface methods'>
  public filterConfigurationByHierarchy(
    configuration: IConfiguration,
    hierarchy: string,
    deep: boolean): Array<IBaseHoliday<any>> {

    let result: Array<IBaseHoliday<any>>;
    const pathElements = hierarchy.split('/');
    const currentRoot = pathElements.shift();
    if (currentRoot === configuration.hierarchy) {
      result = configuration.holidays;
      if (pathElements.length === 0) {
        if (deep) {
          configuration.subConfigurations.forEach( (sub: IConfiguration) =>
            result = result.concat(this.filterConfigurationByHierarchy(sub, sub.hierarchy, true)));
        }
      } else {
        const subConfiguration = configuration.subConfigurations.filter(sub => sub.hierarchy === pathElements[0]);
        if (subConfiguration.length > 0) {
          result = result.concat(this.filterConfigurationByHierarchy(subConfiguration[0], pathElements.join('/'), deep));
        }
      }
    } else {
      result = new Array<IBaseHoliday<any>>();
    }

    // if (pathElements.length === 1) {
    //   if (pathElements[0] === configuration.hierarchy) {
    //     result = configuration.holidays;
    //     if (deep) {
    //
    //     }
    //   } else {
    //     result = new Array<IBaseHoliday<any>>();
    //   }
    // } else if (pathElements.length > 1) {
    //   const sub = configuration.subConfigurations.filter(sub => sub.hierarchy === pathElements[1]);
    //   result = new Array<IBaseHoliday<any>>();
    //   if (pathElements.filter( (element: string) => element === configuration.hierarchy).length === 1) {
    //     result = result.concat(configuration.holidays);
    //   }
    //   if (sub.length > 0) {
    //
    //     result = result.concat(this.filterConfigurationByHierarchy(sub[0], sub[0].hierarchy, deep));
    //   }
    //
    // } else {
    //   result = new Array<IBaseHoliday<any>>();
    // }

    return result;
  }
  // </editor-fold>
}
