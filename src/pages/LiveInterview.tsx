import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
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
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { 
  Clock, 
  Mic, 
  MicOff,
  ThumbsUp,
  ThumbsDown,
  CheckCircle,
  Save,
  ChevronRight,
  Download,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LiveInterview = () => {
  const [isRecording, setIsRecording] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [notes, setNotes] = useState('');
  const [transcriptLines, setTranscriptLines] = useState<{ speaker: string; text: string; timestamp: string }[]>([]);
  const navigate = useNavigate();
  
  // Mock interview data
  const candidateName = "Alex Johnson";
  const jobTitle = "Senior Frontend Developer";
  const interviewDuration = 30 * 60; // 30 minutes in seconds
  
  const suggestedQuestions = [
    "Can you describe your experience with React hooks and functional components?",
    "How do you approach state management in large applications?",
    "Tell me about a challenging technical problem you solved recently.",
    "How do you ensure your code is maintainable and scalable?",
    "What strategies do you use for optimizing frontend performance?",
    "How do you test your React components?",
    "Can you explain your understanding of accessibility in web applications?",
    "How do you keep up with the latest frontend developments?",
  ];
  
  const skillMeters = [
    { name: "React", value: 75 },
    { name: "JavaScript", value: 82 },
    { name: "Problem Solving", value: 68 },
    { name: "Communication", value: 88 },
  ];

  // Mock transcript generation
  useEffect(() => {
    const mockTranscript = [
      { speaker: "Interviewer", text: "Thanks for joining us today. Can you tell me a bit about your experience with React?", timestamp: "00:00:15" },
      { speaker: "Candidate", text: "I've been working with React for about 4 years now. I started at a startup where I built their customer dashboard from scratch using React and Redux.", timestamp: "00:00:22" },
      { speaker: "Interviewer", text: "That's great. What about hooks? Have you migrated from class components to functional components with hooks?", timestamp: "00:01:05" },
      { speaker: "Candidate", text: "Yes, absolutely. In my current role, I led a project to refactor our legacy components to use hooks. It reduced our bundle size by about 15% and made the code much more readable.", timestamp: "00:01:12" },
      { speaker: "Interviewer", text: "How do you approach state management in large React applications?", timestamp: "00:02:30" },
      { speaker: "Candidate", text: "It depends on the complexity. For simpler apps, Context API and useState can be sufficient. For more complex state, I've used Redux but lately I've been favoring React Query for server state and Zustand for client state.", timestamp: "00:02:38" },
    ];
    
    const timer = setTimeout(() => {
      setTranscriptLines(mockTranscript);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setElapsedTime(prev => {
          if (prev < interviewDuration) {
            return prev + 1;
          }
          return prev;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording, interviewDuration]);

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handleToggleRecording = () => {
    setIsRecording(prev => !prev);
    
    if (isRecording) {
      toast({
        title: "Recording paused",
        description: "The interview recording has been paused.",
      });
    } else {
      toast({
        title: "Recording resumed",
        description: "The interview recording has been resumed.",
      });
    }
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
    navigate('/interview-insights/1');
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
              <h1 className="font-bold text-lg">{candidateName}</h1>
              <p className="text-sm text-muted-foreground">{jobTitle}</p>
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
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant={isRecording ? "default" : "outline"}
                    size="sm"
                    onClick={handleToggleRecording}
                  >
                    {isRecording ? (
                      <Mic className="h-4 w-4 mr-1" />
                    ) : (
                      <MicOff className="h-4 w-4 mr-1" />
                    )}
                    {isRecording ? "Recording" : "Paused"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isRecording ? "Pause recording" : "Resume recording"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <X className="h-4 w-4 mr-1" />
                  End Interview
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>End this interview?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will stop the recording and take you to the interview insights. You can't undo this action.
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
        {/* Left Panel - Transcription */}
        <div className="w-full md:w-1/2 bg-white p-4 flex flex-col h-full overflow-hidden">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-lg">Live Transcription</h2>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Save Transcript
            </Button>
          </div>
          
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {transcriptLines.map((line, index) => (
                <div key={index} className="space-y-1 animate-fade-in">
                  <div className="flex justify-between">
                    <span className={`font-medium ${line.speaker === "Interviewer" ? "text-aiblue-700" : "text-aipurple-700"}`}>
                      {line.speaker}
                    </span>
                    <span className="text-xs text-slate-400">
                      {line.timestamp}
                    </span>
                  </div>
                  <p className="text-slate-700">{line.text}</p>
                </div>
              ))}
              
              {isRecording && (
                <div className="flex items-center gap-2 text-slate-500 animate-pulse">
                  <div className="w-2 h-2 bg-aisuccess-500 rounded-full"></div>
                  <span>Recording...</span>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        
        {/* Right Panel - AI Assistant */}
        <div className="w-full md:w-1/2 h-full overflow-y-auto">
          <div className="grid grid-cols-1 gap-6 p-4">
            {/* AI Suggestions */}
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
                    <div className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Good question
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Not relevant
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
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
            
            {/* Skill Meters */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Skill Assessment</CardTitle>
                <CardDescription>Real-time analysis based on answers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillMeters.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="font-medium">{skill.value}%</span>
                      </div>
                      <Progress value={skill.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Highlighted Points */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Highlighted Points</CardTitle>
                <CardDescription>Key insights from the conversation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-aisuccess-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Strong experience with React hooks and functional components</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-aisuccess-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Successfully led refactoring project that improved performance</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-aisuccess-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Good knowledge of modern state management approaches</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Notes */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Add private notes about the candidate..." 
                  className="min-h-32"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <Button variant="outline" size="sm" className="mt-3" onClick={() => toast({ title: "Notes saved" })}>
                  <Save className="h-4 w-4 mr-1" />
                  Save Notes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveInterview;
