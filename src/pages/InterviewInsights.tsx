
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ResponsiveRadar } from '@nivo/radar';
import { 
  Download, 
  Share, 
  CheckCircle, 
  XCircle, 
  MessageSquare,
  ThumbsUp,
  FileText,
  User
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';

const InterviewInsights = () => {
  // Mock data
  const candidateName = "Alex Johnson";
  const jobTitle = "Senior Frontend Developer";
  const date = "April 24, 2025";
  const duration = "28 minutes";
  
  const skillData = [
    { skill: "React", value: 80 },
    { skill: "JavaScript", value: 85 },
    { skill: "TypeScript", value: 70 },
    { skill: "CSS/UI", value: 75 },
    { skill: "Testing", value: 65 },
    { skill: "Problem Solving", value: 80 },
    { skill: "Communication", value: 90 },
  ];
  
  const formattedSkillData = skillData.map(item => ({
    skill: item.skill,
    [candidateName]: item.value,
    averageCandidate: Math.floor(Math.random() * 30) + 50, // Random value between 50-80
  }));
  
  const keyHighlights = [
    "Strong experience with React hooks and state management solutions",
    "Successfully led a large-scale refactoring project that improved performance",
    "Excellent communicator with clear technical explanations",
    "Demonstrated problem-solving with relevant examples",
  ];
  
  const improvementAreas = [
    "Limited experience with modern testing frameworks",
    "Could expand knowledge on accessibility best practices",
  ];
  
  const quotes = [
    {
      text: "I led a project to refactor our legacy components to use hooks. It reduced our bundle size by about 15% and made the code much more readable.",
      timestamp: "08:22",
    },
    {
      text: "For more complex state, I've used Redux but lately I've been favoring React Query for server state and Zustand for client state.",
      timestamp: "12:47",
    },
  ];
  
  const overallScore = 82;
  
  const handleShare = () => {
    toast({
      title: "Link copied to clipboard",
      description: "Now you can share it with your team members.",
    });
  };
  
  const handleReject = () => {
    toast({
      title: "Candidate rejected",
      description: "A rejection email template has been prepared for review.",
    });
  };
  
  const handleShortlist = () => {
    toast({
      title: "Candidate shortlisted",
      description: "Alex Johnson has been added to your shortlist.",
    });
  };
  
  return (
    <PageContainer className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interview Insights</h1>
          <p className="text-muted-foreground flex items-center gap-1">
            <User className="h-4 w-4" />
            {candidateName} • {jobTitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleShare}>
            <Share className="h-4 w-4" />
            Share with Team
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="destructive" className="gap-2" onClick={handleReject}>
                  <XCircle className="h-4 w-4" />
                  Reject
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Send rejection notification
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button className="gap-2" onClick={handleShortlist}>
            <CheckCircle className="h-4 w-4" />
            Shortlist
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="md:col-span-8 space-y-6">
          {/* Skills Radar Chart */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Skills Assessment</CardTitle>
              <CardDescription>Comparison with average candidates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveRadar
                  data={formattedSkillData}
                  keys={[candidateName, 'averageCandidate']}
                  indexBy="skill"
                  maxValue={100}
                  margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                  borderWidth={2}
                  gridLabelOffset={36}
                  dotSize={10}
                  dotColor={{ theme: 'background' }}
                  dotBorderWidth={2}
                  colors={['#0EA5E9', '#D1D5DB']}
                  blendMode="multiply"
                  motionConfig="gentle"
                  legends={[
                    {
                      anchor: 'top-left',
                      direction: 'column',
                      translateX: -50,
                      translateY: -40,
                      itemWidth: 80,
                      itemHeight: 20,
                      itemTextColor: '#333',
                      symbolSize: 12,
                      symbolShape: 'circle',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemTextColor: '#000'
                          }
                        }
                      ]
                    }
                  ]}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Key Highlights */}
          <Card className="animate-fade-in delay-100">
            <CardHeader>
              <CardTitle>Key Highlights</CardTitle>
              <CardDescription>Strengths identified during the interview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {keyHighlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <CheckCircle className="h-5 w-5 text-aisuccess-500 flex-shrink-0 mt-0.5" />
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <CardTitle className="text-base mb-2">Areas for Improvement</CardTitle>
              <div className="space-y-3">
                {improvementAreas.map((area, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <XCircle className="h-5 w-5 text-aierror-500 flex-shrink-0 mt-0.5" />
                    <p>{area}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Notable Quotes */}
          <Card className="animate-fade-in delay-200">
            <CardHeader>
              <CardTitle>Candidate Quotes</CardTitle>
              <CardDescription>Notable statements from the interview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quotes.map((quote, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-md border border-slate-100">
                    <div className="flex gap-2 items-start">
                      <MessageSquare className="h-5 w-5 text-aiblue-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="italic">"{quote.text}"</p>
                        <p className="text-sm text-muted-foreground mt-1">Timestamp: {quote.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link to="/interviews/1/transcript">
                  <FileText className="mr-2 h-4 w-4" />
                  View Full Transcript
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Right Column */}
        <div className="md:col-span-4 space-y-6">
          {/* Overall Score */}
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle>Overall Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center py-4">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{overallScore}%</span>
                  </div>
                  <svg className="w-32 h-32" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#E2E8F0" 
                      strokeWidth="10" 
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#0EA5E9" 
                      strokeWidth="10" 
                      strokeDasharray={`${overallScore * 2.51} 251`}
                      strokeDashoffset="0" 
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
                
                <div className="mt-2 mb-4 text-center">
                  <Badge className="text-white bg-aisuccess-500">Highly Recommended</Badge>
                </div>
                
                <div className="text-center mt-2">
                  <p className="text-sm text-muted-foreground">
                    This candidate scored higher than 85% of applicants for this role
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Interview Details */}
          <Card className="animate-fade-in delay-100">
            <CardHeader className="pb-2">
              <CardTitle>Interview Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Role:</span>
                  <span className="font-medium">{jobTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium">Engineering</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interviewer:</span>
                  <span className="font-medium">Julie Parker</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Communication Analysis */}
          <Card className="animate-fade-in delay-200">
            <CardHeader className="pb-2">
              <CardTitle>Communication Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Clarity</span>
                    <span className="font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Technical Accuracy</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Conciseness</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Engagement</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* AI Recommendation */}
          <Card className="animate-fade-in delay-300 border-primary bg-primary/5">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-primary" />
                <CardTitle>AI Recommendation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">
                This candidate demonstrates strong technical skills in React and front-end development, 
                with particular strengths in state management and performance optimization. 
                Their communication is excellent, articulating complex concepts clearly.
              </p>
              <p className="mt-2 text-slate-700">
                <strong>Recommended next steps:</strong> Move to the next interview round focusing on 
                system design and practical coding challenges.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default InterviewInsights;
