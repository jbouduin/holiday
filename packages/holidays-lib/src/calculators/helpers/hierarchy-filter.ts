import { IConfiguration } from '../../configuration';
import { FilteredHoliday } from './filtered-holiday';

export interface IHierarchyFilter {
  filterConfigurationByHierarchy(
    configuration: IConfiguration,
    hierarchy: string,
    deep: boolean): Array<FilteredHoliday<any>>;
}

export class HierarchyFilter implements IHierarchyFilter {

  //#region Constructor & Co°
  public constructor() { }
  //#endregion

  //#region IHierarchyFilter interface methods
  public filterConfigurationByHierarchy(
    configuration: IConfiguration,
    hierarchy: string,
    deep: boolean): Array<FilteredHoliday<any>> {
    return this.internalFilter(configuration, hierarchy, '', deep);
  }
  //#endregion

  //#region private methods
  private internalFilter(
    configuration: IConfiguration,
    hierarchy: string,
    parentFullpath: string,
    deep: boolean): Array<FilteredHoliday<any>> {

    let result: Array<FilteredHoliday<any>>;
    const pathElements = hierarchy.split('/');
    const currentRoot = pathElements.shift();
    const fullPath = parentFullpath ? parentFullpath + '/' + configuration.hierarchy : configuration.hierarchy;
    if (currentRoot === configuration.hierarchy) {
      result = configuration.holidays.map(holiday => new FilteredHoliday(configuration.hierarchy, fullPath, holiday));
      if (pathElements.length === 0) {
        if (deep) {
          configuration.subConfigurations.forEach( (sub: IConfiguration) =>
            result = result.concat(this.internalFilter(sub, sub.hierarchy, fullPath, true)));
        }
      } else {
        const subConfiguration = configuration.subConfigurations.filter(sub => sub.hierarchy === pathElements[0]);
        if (subConfiguration.length > 0) {
          result = result.concat(this.internalFilter(subConfiguration[0], pathElements.join('/'), fullPath, deep));
        }
      }
    } else {
      result = new Array<FilteredHoliday<any>>();
    }

    return result;
}
  //#endregion
}
