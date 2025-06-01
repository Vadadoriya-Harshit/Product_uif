import { log } from "console";

export const ActionWiseAPIConfiguration:any = {
  LOGIN: {
      url: "AUTH/LOGIN",
      packageName: "",
  },
  REGISTER: {
    url: "AUTH/REGISTER",
    packageName: "",
},
FORGOTPASSWORD: {
  url: "AUTH/FORGOTPASSWORD",
  packageName: "",
},

  VERIFYOTP: {
      url: "authenticationServiceAPI/POSTLOGIN/VERIFYOTP",
      packageName: "",
  },
  };
  
  export const GetAPIURLFromAction = (action:any, pname:any) => {
    let UrlData = ActionWiseAPIConfiguration[action];
    
    let url = action;
    let PackageName = pname;
    if (Boolean(UrlData)) {
      if (Boolean(UrlData?.url)) {
        url = UrlData?.url;
      }
      PackageName = UrlData?.packageName ?? PackageName;
    }
    let apiurl = Boolean(PackageName)
      ? "./" +
        PackageName +
        (url.startsWith("./")
          ? url.substring(1)
          : url.startsWith("/")
          ? url
          : "/" + url)
      : url.startsWith(".")
      ? url
      : url.startsWith("/")
      ? "." + url
      : "./" + url;
    //console.log(apiurl);
    return apiurl;
  };