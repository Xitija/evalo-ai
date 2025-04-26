import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAPIContext } from "../context/APIContext";

// Define the shape of the meeting data
interface Meeting {
  id: string;
  date: string;
  time: string;
  name: string;
  interviewer_name: string;
  meet_link: string;
  status: string;
  role: string;
}

// Custom hook to fetch meetings
export const useMeetings = () => {
  const { apiBaseUrl } = useAPIContext();

  return useQuery<Meeting[], Error>({
    queryKey: ["meetings"],
    queryFn: async () => {
      const response = await axios.get(`${apiBaseUrl}/meetings`);
      console.log("API Response:", response.data); // Log the full API response for debugging
      return response.data.meetings || []; // Extract the meetings array
    },
  });
};