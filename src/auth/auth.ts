import { log } from "node:console";
import { GetAPIURLFromAction } from "./apimapping";
import { getAuthorizeTokenText } from "./authUtills";

const authAPI = () => {
    let baseURL:string = "http://localhost:9000/";
    let PackageName: string = "";
    let loginuserDetailsData: any = {};
    let accessToken: any | null = null;
    let displayLanguage = "en";
    const inititateAPI = (APIURL: string, PACKAGE_NAME: string) => {
        // baseURL = new URL("http://localhost:9000");
      };
      const setDisplayLanguage = (code: string): void => {
        displayLanguage = code;
      };
      const loginUserDetails = ({
        role,
        user,
        workingDate,
      }: {
        role?: string;
        user?: { id?: string };
        workingDate?: string;
      }) => {
        loginuserDetailsData = {
          USERNAME: user?.id ?? "", // Ensure USERNAME is always a string
          USERROLE: role ?? "", // Ensure USERROLE is always a string
          THROUGH_CHANNEL: "E_CBS",
          WORKING_DATE: workingDate ?? "",
        };
      };
      
      const setToken = (argaccessToken:any) => {
        accessToken = argaccessToken;
      };
      const removeToken = () => {
        accessToken = null;
      };
      const getToken = () => {
        return accessToken;
      };
      let localbaseURL:any = baseURL;
      const internalFetcherPreLogin = async (
        url: string,
        payload: any,
        header: any = {},
        timeout: number | null = null,
        controller: AbortController = new AbortController()
      ): Promise<any> => {
        if (baseURL === null) {
            return {
              status: "999",
              message: "API not inititated",
              messageDetails: "",
              data: [],
            };
          }
          try {
          let apiurl = GetAPIURLFromAction(url, PackageName);
          if (!Boolean(timeout)) {
            timeout = 120000;
          }
          const APIRequestFormat = JSON.stringify({
            ACTION: "",
            DISPLAY_LANGUAGE: displayLanguage,
            LOGINUSERDETAILS: {
              USERNAME: payload.USER_ID ?? loginuserDetailsData?.USERNAME ?? "",
              USERROLE: loginuserDetailsData?.USERROLE ?? "role",
              THROUGH_CHANNEL: "E_CBS",
              WORKING_DATE: loginuserDetailsData?.WORKING_DATE ?? "",
            },
            ...payload,
          });
           let Request;
            Request = APIRequestFormat;
            let response = await fetchWithTimeout(
                new URL(apiurl, localbaseURL).href,
                {
                  method: "POST",
                  headers: {
                    DISPLAY_LANGUAGE: displayLanguage,
                    ...header,
                    "Content-Type": "application/json",
                     Authorization: getAuthorizeTokenText(
                      accessToken?.access_token,
                      accessToken?.token_type
                    ),
                    USER_ID: loginuserDetailsData?.USERNAME,
                  },
                  body: Request,
                  timeout: timeout,
                  controller: controller,
                }
              );
              //@ts-ignore
              if (String(response.status) >= "200"||String(response.status) >= "300") {
                console.log("status 200>>");
                
                //@ts-ignore
                let data = await response.json();
                console.log(data,"data");
                
                //  if (Array.isArray(data?.RESPONSE)) {
                //   data = data?.RESPONSE[0];
                // }
                return {
                  status: data?.STATUS??"0", // Hardcoded status
                  message: data?.MESSAGE??"Success", // Hardcoded message
                  data: data?.RESPONSE?? [], // Empty array or predefined data
                  messageDetails: "Operation successful", // Hardcoded details
                  responseType: "STATIC", // Hardcoded type
                  access_token: null, // Null since we are overriding everything
                };
                //@ts-ignore
              } else if (String(response.status) >= "400"||String(response.status) >= "500") {
               

                return {
                  status: "999",
                  message: await GetStatusMessage(response),
                  data: [],
                  messageDetails: GetDetailsMessage(
                    //@ts-ignore
                    response.status,
                    //@ts-ignore
                    response?.statusText ?? "",
                    new URL(apiurl, baseURL).href
                  ),
                };
              }} catch (e) {
                return {
                  status: "999",
                  data: [],
                  message: String(e),
                  messageDetails: "",
                };
              }
          
      }
      const waitForToken = (key: string) => {
        return new Promise((res) => {
            if (localStorage.getItem(key) === null) res("no data set yet");
            const intervalId = setInterval(() => {
                const localVal = localStorage.getItem(key);

                if (localVal !== "refreshing") {
                  clearInterval(intervalId);
                  localStorage.removeItem(key);
                  res("ok");
                }
            }, 200);
     
        })
      }
      const internalFetcher = async (
        url: string,
        payload: any,
        header: any = {},
        timeout: number | null = null,
        controller: AbortController = new AbortController()
      ): Promise<any> => {
        
        if (baseURL === null) {
          return {
            status: "999",
            message: "API not inititated",
            messageDetails: "",
            data: [],
          };
        }
        try {
          //*** Set Api Url */
          let apiurl = GetAPIURLFromAction(url, PackageName);
    
          if (!Boolean(timeout)) {
            timeout = 120000;
          }
    
          let localbaseURL = baseURL;
          
        
          await waitForToken("token_status");
          const SaveRequest = JSON.stringify({
            ACTION: "",
            DISPLAY_LANGUAGE: displayLanguage,
            LOGINUSERDETAILS: loginuserDetailsData,
            ...payload,
          });
          let Request;
            Request = SaveRequest;
          
         
          let response:any = await fetchWithTimeout(
            new URL(apiurl, localbaseURL).href,
            {
              method: "POST",
              headers: {
                DISPLAY_LANGUAGE: displayLanguage,
                ...header,
                "Content-Type": "application/json",
                 Authorization: getAuthorizeTokenText(
                  accessToken?.access_token,
                  accessToken?.token_type
                ),
                USER_ID: loginuserDetailsData?.USERNAME,
              },
              body: Request,
              timeout: timeout,
              controller: controller,
            }
          );
    
          if (String(response.status) === "200") {
            if (response.headers.get("Content-Type") === "application/pdf") {
              let data = await response.blob();
              return {
                status: "0",
                message: "",
                data,
                messageDetails: "",
                isPrimaryKeyError: false,
              };
            } else {
              let data = await response.json();
             if (Array.isArray(data)) {
                data = data[0];
              }
              return {
                status: String(data.STATUS),
                message: data?.MESSAGE ?? "",
                data:
                data?.RESPONSE ?? [],
                messageDetails: data?.RESPONSEMESSAGE ?? "",
                isPrimaryKeyError:
                  String(data.STATUS) === "0"
                    ? false
                    : (data?.RESPONSEMESSAGE ?? "").indexOf(
                        "ORA-00001: unique constraint"
                      ) >= 0
                    ? true
                    : false,
              };
            }
          } else if (String(response.status) === "401" && url !== "LOGOUTUSER") {
            //@ts-ignore
            if (typeof window.__logout === "function") {
              //@ts-ignore
              window.__logout();
            }
            return {
              status: "999",
              message: await GetStatusMessage(response),
              data: [],
              messageDetails: GetDetailsMessage(
                response.status,
                response?.statusText ?? "",
                new URL(apiurl, baseURL).href
              ),
            };
          } else {
            return {
              status: "999",
              message: await GetStatusMessage(response),
              data: [],
              messageDetails: GetDetailsMessage(
                response.status,
                response?.statusText ?? "",
                new URL(apiurl, baseURL).href
              ),
            };
          }
        } catch (e) {
          return {
            status: "999",
            data: [],
            message: String(e),
            messageDetails: "",
          };
        }
      };
      const fetchWithTimeout = async (resource:any, options?: any) => {
        const { timeout = 90000, controller = new AbortController() } = options;
        const id = setTimeout(() => controller.abort(), timeout);
    let response;
    await fetch(resource, {
      ...options,
      signal: controller.signal,
    })
      .then((res) => {
        clearTimeout(id);
        response = res;
      })
      .catch((err) => {
        clearTimeout(id);
        if (err.name === "AbortError") {
          throw "Timeout : Your request has been timed out or has been cancelled by the user.";
        } else {
          throw err;
        }
      });
    //clearTimeout(id);
    return response;
      }
      const GetStatusMessage = async (response:any) => {
        let responsedata = await response?.json();
        console.log(responsedata,"responsedata");
        
        if (response.status === 403 && process.env.NODE_ENV !== "production") {
            return "'????? ???? ??? ?? ???? ????' ???, ?? ???? ???? ??! ????? ... ?? ??? ?????? ??????? ??? ?? ?????? ??, ??????? ?? ????? ????? ???? ???? ??!";
          }
          else if (Boolean(responsedata)) {
            let message = responsedata
              ? responsedata?.MESSAGE
              : "";
            if (Boolean(message)) {
              return message;
            } else {
              return "Something went to wrong ! Please try after some time.";
            }
          } 
          else {
            return "Something went to wrong ! Please try after some time.";
          }
      }
      const GetDetailsMessage = (status:any, statusMessage:any, url:any) => {
        if (status === 404 && process.env.NODE_ENV !== "production") {
            return (
              "API URL : " +
              url +
              (Boolean(statusMessage) ? " Status Message :" + statusMessage : "")
            );
          }
          return ""
      }

  return {
    inititateAPI,
    internalFetcher,
    loginUserDetails,
    internalFetcherPreLogin,
    setToken,
    removeToken,
    getToken,
    setDisplayLanguage,
  };
};

export const AuthSDK = authAPI();
