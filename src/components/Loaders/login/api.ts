import { log } from "console";
import { AuthSDK } from "../../../auth/auth";
import { AuthContext } from "../../../context/AuthContext";

export const loginFn = async (reqData:any) => {
  
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcherPreLogin("LOGIN", reqData);
    if (status === "0") {
      console.log("status  set",data);
     
      return data;
    } else {
      throw new Error(message);

      
    //   throw DefaultErrorObject(message, messageDetails);
    }
  };