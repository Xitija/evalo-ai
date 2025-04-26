import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { Clock, ChevronRight, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ASSEMBLY_AI_API_KEY = import.meta.env.VITE_ASSEMBLY_AI_API_KEY; // Replace with your actual API key
const TRANSCRIPTION_INTERVAL = 60000; // 30 seconds in milliseconds
const SUGGESTION_API_URL = `${import.meta.env.VITE_API_BASE_URL}/suggestions`; // Your suggestion API endpoint

const LiveInterview = () => {
  const [meetingId, setMeetingId] = useState(null);
  const { id } = useParams();
  const [isStarted, setIsStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const [meetingDetails, setMeetingDetails] = useState<any>(null);
  const [questionSets, setQuestionSets] = useState<any[]>([]);
  const [transcription, setTranscription] = useState<string>('');

  const interviewDuration = 30 * 60; // 30 minutes in seconds
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const isRecordingRef = useRef(false);
  const suggestionUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);

  const fetchMeetingDetails = useCallback(async (meetingId: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/meeting/${meetingId}`);
      setMeetingDetails(response.data);
      const questions = response.data.meeting.expected_questions
      setQuestionSets(questions);
    } catch (error: any) {
      console.error('Error fetching meeting details:', error);
      toast({
        title: "Failed to load meeting",
        description: "Please check the meeting link or try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchSuggestedQuestions = useCallback(async (currentTranscript: string) => {
    if (meetingDetails?.meeting && isStarted) { // Only fetch if interview is started
      try {
        const response = await axios.post(SUGGESTION_API_URL, {
          id: meetingDetails.meeting.id,
          role: meetingDetails.meeting.role,
          job_desc: meetingDetails.meeting.job_desc,
          experience: meetingDetails.meeting.experience,
          skills: meetingDetails.meeting.skills,
          transcript: currentTranscript,
        });
        if (response.data && Array.isArray(response.data.expected_questions)) {
          // Update the suggestedQuestions state with the new suggestions
          setSuggestedQuestions(prevQuestions => [
            ...prevQuestions,
            ...response.data.expected_questions,
          ]);
        } else {
          console.warn('Invalid format for suggested questions:', response.data);
        }
      } catch (error: any) {
        console.error('Error fetching suggested questions:', error);
        toast({
          title: "Failed to get suggestions",
          description: "Could not fetch suggested questions.",
          variant: "default",
        });
      }
    }
  }, [meetingDetails, isStarted, toast]);

  const stopRecording = useCallback(async () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    isRecordingRef.current = false;
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    // Send any remaining audio as final if the interview was started
    if (audioChunksRef.current.length > 0 && isStarted) {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      await sendToAssemblyAI(audioBlob, true);
      audioChunksRef.current = [];
    }
  }, [isStarted, toast]);

  useEffect(() => {
    if (id) {
      setMeetingId(id);
      fetchMeetingDetails(id);
    }

    return () => {
      stopRecording();
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      if (suggestionUpdateIntervalRef.current) {
        clearInterval(suggestionUpdateIntervalRef.current);
      }
    };
  }, [id, fetchMeetingDetails, stopRecording]);

  // Timer effect and start/stop recording
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStarted) {
      timer = setInterval(() => {
        setElapsedTime(prev => {
          if (prev < interviewDuration) {
            return prev + 1;
          }
          return prev;
        });
      }, 1000);
      startRecording();
      suggestionUpdateIntervalRef.current = setInterval(() => {
        if (transcription) {
          fetchSuggestedQuestions(transcription);
        }
      }, 60000); // Update suggestions every 60 seconds (adjust as needed)
    } else {
      if (timer) clearInterval(timer);
      stopRecording();
      if (suggestionUpdateIntervalRef.current) {
        clearInterval(suggestionUpdateIntervalRef.current);
        suggestionUpdateIntervalRef.current = null;
      }
    }

    return () => {
      if (timer) clearInterval(timer);
      if (suggestionUpdateIntervalRef.current) {
        clearInterval(suggestionUpdateIntervalRef.current);
      }
    };
  }, [isStarted, transcription, fetchSuggestedQuestions, stopRecording]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      isRecordingRef.current = true;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        if (audioChunksRef.current.length > 0 && isStarted) { // Only send if interview is still ongoing
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          await sendToAssemblyAI(audioBlob);
          audioChunksRef.current = [];
        }
      };

      mediaRecorder.start();

      intervalIdRef.current = setInterval(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording' && isStarted) {
          mediaRecorderRef.current.stop();
          mediaRecorderRef.current.start();
        }
      }, TRANSCRIPTION_INTERVAL);
    } catch (error: any) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording failed to start",
        description: "Please ensure microphone access is granted.",
        variant: "destructive",
      });
    }
  }, [isStarted, toast]);


  const sendToAssemblyAI = useCallback(async (audioBlob: Blob, isFinal: boolean = false) => {
    if (!ASSEMBLY_AI_API_KEY || ASSEMBLY_AI_API_KEY === 'YOUR_ASSEMBLY_AI_API_KEY') {
      console.warn('AssemblyAI API key is not set.');
      toast({
        title: "Transcription disabled",
        description: "Please set your AssemblyAI API key to enable transcription.",
        variant: "default", // Ensure your toast component supports "warning"
      });
      return;
    }

    if (!isStarted && !isFinal) {
      return; // Do not send API calls if the interview has stopped and it's not the final send
    }

    try {
      // Step 1: Upload audio
      const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: { authorization: ASSEMBLY_AI_API_KEY },
        body: audioBlob,
      });

      const { upload_url } = await uploadResponse.json();
      console.log('Uploaded audio URL:', upload_url);

      // Step 2: Request transcription
      const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: {
          authorization: ASSEMBLY_AI_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ audio_url: upload_url }),
      });

      const transcriptData = await transcriptResponse.json();
      console.log('Transcription requested with ID:', transcriptData.id);

      // Step 3: Polling for result (with modifications for interval and final)
      let completedTranscript = null;
      while (!completedTranscript && !isFinal && isStarted) { // Check if interview is still started
        const pollingResponse = await fetch(
          `https://api.assemblyai.com/v2/transcript/${transcriptData.id}`,
          {
            headers: { authorization: ASSEMBLY_AI_API_KEY },
          }
        );
        const pollingData = await pollingResponse.json();
        if (pollingData.status === 'completed') {
          completedTranscript = pollingData.text;
          console.log('Partial Transcript:', completedTranscript);
          setTranscription(prev => prev + (prev ? ' ' : '') + completedTranscript);
          fetchSuggestedQuestions(completedTranscript); // Call your backend API
          break; // Break after getting a completed partial transcript for this interval
        } else if (pollingData.status === 'failed') {
          console.error('Transcription failed:', pollingData.error);
          break;
        }
        await new Promise((res) => setTimeout(res, 3000));
      }

      // For the final transcript
      if (isFinal && transcriptData.id) {
        let finalTranscript = null;
        while (!finalTranscript) {
          const finalPollingResponse = await fetch(
            `https://api.assemblyai.com/v2/transcript/${transcriptData.id}`,
            {
              headers: { authorization: ASSEMBLY_AI_API_KEY },
            }
          );
          const finalPollingData = await finalPollingResponse.json();
          if (finalPollingData.status === 'completed') {
            finalTranscript = finalPollingData.text;
            console.log('Final Transcript:', finalTranscript);
            setTranscription(prev => prev + (prev ? ' ' : '') + finalTranscript);
            fetchSuggestedQuestions(finalTranscript); // Send the final full transcript
            toast({
              title: "Transcription complete",
              description: "The interview audio has been transcribed.",
            });
            break;
          } else if (finalPollingData.status === 'failed') {
            console.error('Final transcription failed:', finalPollingData.error);
            toast({
              title: "Transcription failed",
              description: "Failed to transcribe the interview audio.",
              variant: "destructive",
            });
            break;
          }
          await new Promise((res) => setTimeout(res, 3000));
        }
      }
    } catch (error: any) {
      console.error('Error sending audio to AssemblyAI:', error);
      toast({
        title: "Transcription error",
        description: "An error occurred while sending audio for transcription.",
        variant: "destructive",
      });
    }
  }, [ASSEMBLY_AI_API_KEY, id, isStarted, fetchSuggestedQuestions, toast]);

  const handleStartInterview = () => {
    setIsStarted(true);
    setTranscription(''); // Clear any previous transcription
    setSuggestedQuestions([]); // Clear any previous suggestions
    toast({
      title: "Interview started",
      description: "The interview timer and recording have begun.",
    });
  };

  const handleNextQuestion = () => {
    if (questionIndex < suggestedQuestions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(prev => prev - 1);
    }
  };

  const handleEndInterview = () => {
    setIsStarted(false); // This will trigger the stopRecording effect
    if (suggestionUpdateIntervalRef.current) {
      clearInterval(suggestionUpdateIntervalRef.current);
      suggestionUpdateIntervalRef.current = null;
    }
    navigate(`/interview-insights/${id}`);
  };

  const remainingTime = interviewDuration - elapsedTime;
  const timeRemainingPercent = (remainingTime / interviewDuration) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col h-full">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 py-3 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h1 className="font-bold text-lg">{meetingDetails?.meeting?.name}</h1>
              <p className="text-sm text-muted-foreground">{meetingDetails?.meeting?.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{formatTime(elapsedTime)} / {formatTime(interviewDuration)}</span>
              </div>
              <Progress
                value={timeRemainingPercent}
                className={`h-1.5 w-32 ${remainingTime < 300 ? "bg-aiorange-500" : ""}`}
              />
            </div>

            {!isStarted && (
              <Button variant="default" size="sm" onClick={handleStartInterview}>
                Start Interview
              </Button>
            )}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={!isStarted}>
                  <X className="h-4 w-4 mr-1" />
                  End Interview
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>End this interview?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will stop the interview and the recording. You will be taken to the interview insights. You can't undo this action.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleEndInterview}>
                    End Interview
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel - Questions */}
        <div className="w-full md:w-1/2 bg-white p-4 flex flex-col h-full overflow-hidden">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-lg">Interview Questions</h2>
          </div>
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {questionSets.length > 0 ? (
                questionSets.map((question, index) => (
                  <div key={index} className="space-y-1 animate-fade-in">
                    <p className="text-slate-700">{question}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground">Loading questions...</p>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Right Panel - AI Assistant */}
        <div className="w-full md:w-1/2 h-full overflow-y-auto">
          <div className="grid grid-cols-1 gap-6 p-4">
            <Card className="border-aipurple-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="bg-aipurple-100 p-1 rounded">AI</span> Suggested Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-aipurple-50 border border-aipurple-100 p-3 rounded-md">
                    <p className="font-medium">{suggestedQuestions[questionIndex]}</p>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousQuestion}
                      disabled={questionIndex === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextQuestion}
                      disabled={questionIndex === suggestedQuestions.length - 1}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveInterview;