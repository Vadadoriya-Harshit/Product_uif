import { AuthSDK } from "./auth";


export const verifyUserandPassword = async (reqData: any) => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcherPreLogin("LOGIN", reqData);
    if (status === "0") {
      return data;
    } else {
      throw new Error(message);
    }
};
export const createNewUser = async (reqData: any) => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcherPreLogin("REGISTER", reqData);
    console.log(status,"status");
    
    if (status === "0") {
      return data;
    } else {
      throw new Error(message);
    }
};
export const forgotPassword = async (reqData: any) => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcherPreLogin("FORGOTPASSWORD", reqData);
    console.log(status,"status");
    
    if (status === "0") {
      return data;
    } else {
      throw new Error(message);
    }
};