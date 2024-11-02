const UNKNOWN_ERROR_MESSAGE = "알 수 없는 에러가 발생했습니다.";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  return UNKNOWN_ERROR_MESSAGE;
};
