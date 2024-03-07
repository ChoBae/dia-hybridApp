import mapTagToPurpose from "../../utils/mapTagToPurpose";
import axios from "axios";
export const getQuestionList = async (category: string) => {
  const categoryValues = category
  .split(",")
  .map((tag) => mapTagToPurpose(tag))
  .join(",");
  console.log(`여기로 와야함 ${process.env.NEXT_PUBLIC_SERVER_URL}`, categoryValues);
  const res = await axios.get(
    // `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/v0/interview/questions?categoryValues=${categoryValues}`,
    // `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/interview/questions?categoryValues=${categoryValues}`,
    // `${process.env.NEXT_PUBLIC_API_PATH}/api/v0/interview/questions?categoryValues=backend`,
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/interview/questions?categoryValues=backend`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  console.log('res', res);
  // const data = await res.json();
  // return data.data.pageData
};
