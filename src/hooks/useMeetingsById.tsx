import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAPIContext } from "../context/APIContext";

// Define the shape of the meeting data
interface MeetingDetails {
  id: number;
  date: string;
  time: string;
  name: string;
  interviewer_name: string;
  meet_link: string;
  role: string;
  job_desc: string;
  experience: string;
  skills: string;
  status: string;
  is_review_ready: boolean;
  audio: string | null;
  transcript: string;
  expected_questions: string;
  confidence: number | null;
  clarity: number | null;
  ques_count: number | null;
  correct_ans_count: number | null;
  wrong_ans_count: number | null;
  tech_knowledge: number | null;
  overall_fit: number | null;
  what_went_well: string | null;
  area_to_improve: string | null;
  ai_feedback: string | null;
  speech_patterns: string | null;
}

interface MeetingResponse {
  status: number;
  meeting: MeetingDetails;
  model_config: {
    from_attributes: boolean;
  };
}

// Custom hook to fetch meeting details by ID
export const useMeetingsById = (id: string | number) => {
  const { apiBaseUrl } = useAPIContext();

  return useQuery<MeetingResponse, Error>({
    queryKey: ["meeting", id],
    queryFn: async () => {
      const response = await axios.get(`${apiBaseUrl}/meeting/${id}`);
      console.log("API Response:", response.data); // Log the full API response for debugging
      return response.data; // Return the full response
    },
    enabled: !!id, // Only fetch if ID is provided
  });
};