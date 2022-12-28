import Axios from "axios";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { IFileProvider } from "@jbouduin/holidays-lib";

export class FileProvider implements IFileProvider {

  //#region Private properties ------------------------------------------------
  private readonly assetsPath: string;
  private axios: AxiosInstance;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(host: string, assetsPath: string, options: AxiosRequestConfig = {}) {
    this.assetsPath = assetsPath;
    const config = options;
    config.baseURL = host;
    this.axios = Axios.create(config);
  }
  //#endregion

  //#region IFileProvider methods ---------------------------------------------
  public loadConfiguration(rootHierarchy: string): Promise<string> {
    const fileName = `${this.assetsPath}/configurations/${rootHierarchy}.json`;
    return this.axios
      .get(fileName)
      .then((response: AxiosResponse<string, any>) => JSON.stringify(response.data));
  }

  public loadHierarchies(): Promise<string> {
    const fileName = `${this.assetsPath}/configurations.json`;
    return this.axios
      .get(fileName)
      .then((response: AxiosResponse<string, any>) => JSON.stringify(response.data));
  }

  public loadHierarchyTranslations(language?: string): Promise<string> {
    const fileName = language ?
      `${this.assetsPath}/translations/hierarchy.${language}.json` :
      `${this.assetsPath}/translations/hierarchy.json`;
    return this.axios
      .get(fileName)
      .then((response: AxiosResponse<string, any>) => JSON.stringify(response.data));
  }

  public loadHolidayTranslations(language?: string): Promise<string> {
    const fileName = language ?
      `${this.assetsPath}/translations/holiday.${language}.json` :
      `${this.assetsPath}/translations/holiday.json`;
    return this.axios
      .get(fileName)
      .then((response: AxiosResponse<string, any>) => JSON.stringify(response.data));
  }

  public loadLanguages(): Promise<string> {
    const fileName = `${this.assetsPath}/languages.json`;
    return this.axios
      .get(fileName)
      .then((response: AxiosResponse<string, any>) => JSON.stringify(response.data));
  }
  //#endregion
}