import { axiosBase } from "./axios";

type Props = {
  userId: string;
  deviceToken: string;
  deviceType: "ios" | "android";
};

export const postFCMToken = async ({
  userId,
  deviceToken,
  deviceType,
}: Props) => {
  const response = await axiosBase.post("/push/token", {
    userId,
    deviceToken,
    deviceType,
  });
  return response.data;
};
