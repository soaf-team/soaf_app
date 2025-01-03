import { axiosBase } from "apis";
import { transformDiaryKey } from "models";
import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "constants";

const DEFAULT_DIARY = {
  id: "",
  authorId: "",
  title: "",
  content: "",
  rating: null,
  isPublic: false,
  photos: [],
  emotions: [],
  date: "",
};

const getDiaryDetail = async (id: string) => {
  const response = await axiosBase.get(`diary/${id}`);
  return response.data?.data;
};

export const useDiaryDetailQuery = (id: string) => {
  const {
    data: diary = DEFAULT_DIARY,
    isLoading,
    isError,
  } = useSuspenseQuery({
    queryKey: [QUERY_KEY.diaryDetail, id],
    queryFn: () => getDiaryDetail(id),
  });

  const transformedDiary = transformDiaryKey(diary);

  return { diary: transformedDiary, isLoading, isError };
};
