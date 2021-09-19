import utilsFunction from "src/utils/utilsFunction/utilsFunction";
import axios from "axios";

const sampleData = {
  "OrderId": 317,
  "LabId": "TESTING014",
  "PatientName": "KONG K M",
  "Sex": "M",
  "Age": "33Y",
  "Id": "A1234566",
  "RefNumber": "W321E4SSLD249ZKKAW",
  "SMS": "+852-56223614",
  "ReferringDate": "2021-01-12T20:13:28.53",
  "ReportStatus": "C",
  "PrintStatus": "Y",
  "Items": [
      "SARS-CoV-2 RT-PCR Test"
  ],
  "OrderReports": [
      {
          "DownloadPath": "https://onco.phasescientific.com:444/LIS-WebAPI-UAT/api/File/LabReport?LabReportID=5jM",
          "CreateDateTime": "2021-01-12T20:50:14"
      }
  ]
};

class LISHandler {
  private token: string;
  private defaultHeader: any;
  constructor(
    private email: string,
    private password: string,
    private host: string,
    private companyCode: string,
  ) {

  }

  async refreshToken() {
    const url = `${this.host}/token`;
    const {email, password} = this;

    const params = new URLSearchParams();
    const paramObj = {email, password, grant_type: "password"};
    utilsFunction.paramsAppendByObj(params, paramObj);

    const result = await axios.post(url, params);
    const token = utilsFunction.getObjKeyPath(result, ["data", "access_token"], null);
    this.token = token;
    this.defaultHeader = {
      Authorization: `Bearer ${token}`,
    };
    return token;
  }

  async getReportDataByIdAndRefNumber(id: string, refNumber: string) {
    const params = new URLSearchParams();
    // testing
    const paramObj = {ID: sampleData.Id, refNumber: sampleData.RefNumber};
    utilsFunction.paramsAppendByObj(params, paramObj);

    const url = `${this.host}/LabReportSearch`;
    const result = await axios.get(url, {headers: this.defaultHeader, params: params})
    const data = utilsFunction.getObjKeyPath(result, ["data", "results"], []);
    if (data.length === 0) {return null; }
    return data[0];
  }

  async getReportByIdAndRefNumber(id: string, refNumber: string) {
    const reportData = await this.getReportDataByIdAndRefNumber(id, refNumber);
    const reportUrl = reportData?.OrderReports[0]?.DownloadPath;
    if (!reportUrl) {return null; }
    return await this.viewReportByReportUrl(reportUrl);
  }

  async viewReportByReportUrl(url: string) {
    const result = await axios.get(url, {headers: this.defaultHeader});
    return result.data;
  }

  async getReport(id: string, name: string, page: number, pageSize: number, reverse: boolean) {
    const params = new URLSearchParams();
    const paramObj = {ID: id, PatientName: name, CurrentPage: page, PageSize: pageSize};
    utilsFunction.paramsAppendByObj(params, paramObj);

    const url = `${this.host}/LabReportSearch`;
    const result = await axios.get(url, {headers: this.defaultHeader, params: params})
    const data = utilsFunction.getObjKeyPath(result, ["data"], []);
    if (reverse) {data.results.reverse(); }

    return this.getRenameData(data);
  }

  getRenameData(data: any) {
    const useData: any = {};
    useData.totalPage = data.total_pages;
    useData.page = data.current_page;
    useData.pageSize = data.items_per_page;
    useData.data = data.results;
    return useData;
  }
}

export default LISHandler;
