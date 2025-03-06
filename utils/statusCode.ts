export const isFailedRequestStatus = (status: number): boolean => {
  return status >= 400 && status < 600;
};

export const isUnauthorizedStatus = (status: number): boolean => {
  return status === 401;
};
