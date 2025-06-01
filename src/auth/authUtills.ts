export const getAuthorizeTokenText = (
  accessToken?: string,
  tokenType: string = "Bearer"
): string => {
  if (!accessToken) {
    return "";
  }
  return `${tokenType} ${accessToken}`;
};
