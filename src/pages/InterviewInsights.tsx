import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const MeetingAnalysis = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.get(`https://evaloai-backend-production.up.railway.app/meeting/${id}/analysis`, {
          headers: {
            'accept': 'application/json',
          }
        });
        setAnalysis(response.data.analysis);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // Extract and display the error message from the response
          setError(err.response.data.errors || "Analysis data not found.");
        } else {
          setError("An error occurred while fetching the analysis. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnalysis();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-pink-600 to-red-500">
        <div className="text-4xl font-bold text-white animate-bounce">Loading analysis...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-xl font-semibold px-4">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-white to-pink-100 py-10">
      <motion.div 
        className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-indigo-50 to-pink-100 shadow-xl rounded-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold text-center mb-10 text-indigo-700">Meeting Analysis</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InfoCard title="Questions Asked" value={analysis?.ques_count} icon={<FaQuestionCircle className="text-indigo-500 text-4xl" />} />
          <InfoCard title="Correct Answers" value={analysis?.correct_ans_count} icon={<FaCheckCircle className="text-green-500 text-4xl" />} />
          <InfoCard title="Wrong Answers" value={analysis?.wrong_ans_count} icon={<FaTimesCircle className="text-red-500 text-4xl" />} />
          <ProgressCard title="Technical Knowledge" value={analysis?.tech_knowledge} max={10} color="bg-green-500" />
          <ProgressCard title="Overall Fit" value={analysis?.overall_fit} max={10} color="bg-blue-500" />
        </div>

        <div className="mt-12">
          <TextSection title="AI Feedback" text={analysis?.ai_feedback} />
          <TextSection title="What Went Well" text={analysis?.what_went_well} />
          <TextSection title="Areas to Improve" text={analysis?.area_to_improve} />
        </div>
      </motion.div>
    </div>
  );
};

const InfoCard = ({ title, value, icon }) => (
  <div className="flex items-center p-6 bg-gradient-to-br from-indigo-50 to-pink-100 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
    <div className="mr-4">
      {icon}
    </div>
    <div>
      <div className="text-xl font-semibold text-gray-700">{title}</div>
      <div className="text-3xl font-extrabold">{value}</div>
    </div>
  </div>
);

const ProgressCard = ({ title, value, max, color }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-pink-100 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="text-xl font-semibold text-gray-700 mb-2">{title}</div>
      <div className="w-full bg-gray-300 rounded-full h-4 mb-2">
        <div 
          className={`${color} h-4 rounded-full`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-right text-sm text-gray-600">{value}/{max}</div>
    </div>
  );
};

const TextSection = ({ title, text }) => (
  <motion.div 
    className="bg-indigo-50 p-6 mt-6 rounded-xl shadow-inner"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <h2 className="text-2xl font-bold text-indigo-700 mb-4">{title}</h2>
    <p className="text-gray-800 whitespace-pre-line">{text}</p>
  </motion.div>
);

export default MeetingAnalysis;
