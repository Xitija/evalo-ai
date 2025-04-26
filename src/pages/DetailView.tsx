
import React, { useState } from 'react';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Download,
  Clock,
  Calendar,
  FileText, 
  Edit, 
  User,
  CheckCircle,
  ArrowRight,
  Mail
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PageContainer from '@/components/layout/PageContainer';

const DetailView = () => {
  const [currentTab, setCurrentTab] = useState('overview');
  
  // Mock data
  const interviewData = {
    id: 1,
    candidateName: "Alex Johnson",
    jobTitle: "Senior Frontend Developer",
    department: "Engineering",
    status: "upcoming", // upcoming, completed, draft
    date: "April 26, 2025",
    time: "2:00 PM - 3:00 PM",
    duration: "60 minutes",
    interviewer: "Julie Parker",
    skills: ["React", "JavaScript", "TypeScript", "CSS", "Testing", "Problem Solving"],
    jobDescription: `We are looking for a Senior Frontend Developer with strong experience in React and modern JavaScript. The ideal candidate will have experience building complex, responsive web applications and collaborating with cross-functional teams.

Responsibilities:
- Develop and maintain complex React applications
- Write clean, efficient, and reusable code
- Collaborate with designers and backend developers
- Optimize applications for maximum performance
- Implement and maintain quality standards`,
    candidateNotes: "Alex has 6 years of experience working with React and has led frontend teams at two startups. Previously worked at Adobe on their Creative Cloud web apps.",
    resumeUrl: "#"
  };
  
  const handleSendReminder = () => {
    toast({
      title: "Reminder sent",
      description: "A calendar invitation has been sent to the candidate and interviewer.",
    });
  };

  return (
    <PageContainer className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Interview Details</h1>
          <p className="text-muted-foreground flex items-center gap-1">
            <User className="h-4 w-4" />
            {interviewData.candidateName} • {interviewData.jobTitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {interviewData.status === 'upcoming' && (
            <Button asChild>
              <Link to="/interview/live/1">
                Start Interview
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          {interviewData.status === 'completed' && (
            <Button asChild variant="outline">
              <Link to="/interview-insights/1">
                View Report
              </Link>
            </Button>
          )}
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/interviews/edit/1">
              <Edit className="h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Interview Summary</CardTitle>
                <Badge 
                  variant={
                    interviewData.status === 'upcoming' ? 'default' : 
                    interviewData.status === 'completed' ? 'secondary' : 
                    'outline'
                  }
                >
                  {interviewData.status === 'upcoming' ? 'Upcoming' : 
                   interviewData.status === 'completed' ? 'Completed' : 'Draft'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Job Title</span>
                  <span className="font-medium">{interviewData.jobTitle}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Department</span>
                  <span className="font-medium">{interviewData.department}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{interviewData.date}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Time</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{interviewData.time}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="font-medium">{interviewData.duration}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Interviewer</span>
                  <span className="font-medium">{interviewData.interviewer}</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {interviewData.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {interviewData.status === 'upcoming' && (
                <div className="flex justify-between items-center w-full">
                  <Button variant="outline" className="gap-2" onClick={handleSendReminder}>
                    <Mail className="h-4 w-4" />
                    Send Reminder
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Add to Calendar
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
          
          <Tabs defaultValue="job" className="animate-fade-in delay-100">
            <TabsList>
              <TabsTrigger value="job">Job Description</TabsTrigger>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="questions">Interview Questions</TabsTrigger>
            </TabsList>
            <TabsContent value="job" className="space-y-4 mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="whitespace-pre-line">{interviewData.jobDescription}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="candidate" className="space-y-4 mt-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {interviewData.candidateName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{interviewData.candidateName}</h3>
                      <p className="text-muted-foreground">Applying for {interviewData.jobTitle}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p>{interviewData.candidateNotes}</p>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-md border border-dashed flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-slate-400" />
                      <span className="font-medium">resume_alex_johnson.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="questions" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">AI-Generated Questions</CardTitle>
                  <CardDescription>
                    Based on the job description and required skills
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-slate-50 p-3 rounded-md border">
                    <p className="font-medium">1. Can you describe your experience with React hooks and functional components?</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md border">
                    <p className="font-medium">2. How do you approach state management in large React applications?</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md border">
                    <p className="font-medium">3. Can you walk me through how you'd optimize a React application for performance?</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md border">
                    <p className="font-medium">4. How do you test your React components? What tools do you use?</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md border">
                    <p className="font-medium">5. Can you explain your experience with TypeScript in a React project?</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Customize Questions
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Evaluation Criteria</CardTitle>
                  <CardDescription>
                    These areas will be assessed during the interview
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {interviewData.skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span>{skill}</span>
                        <span className="text-muted-foreground">Required</span>
                      </div>
                      <Progress value={100} className="h-1.5" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Candidate Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center py-2">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {interviewData.candidateName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg text-center">{interviewData.candidateName}</h3>
                <p className="text-muted-foreground text-center mb-2">{interviewData.jobTitle}</p>
                <Button variant="outline" size="sm" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Candidate
                </Button>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Experience</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between">
                      <p className="font-medium">Senior Developer</p>
                      <span className="text-sm text-muted-foreground">2022 - Present</span>
                    </div>
                    <p className="text-sm text-muted-foreground">TechCorp Inc.</p>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <p className="font-medium">Frontend Developer</p>
                      <span className="text-sm text-muted-foreground">2019 - 2022</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Adobe</p>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <p className="font-medium">Junior Developer</p>
                      <span className="text-sm text-muted-foreground">2017 - 2019</span>
                    </div>
                    <p className="text-sm text-muted-foreground">StartupX</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Education</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">B.S. Computer Science</p>
                    <p className="text-sm text-muted-foreground">Stanford University, 2017</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Skills Claimed</h3>
                <div className="flex flex-wrap gap-2">
                  {[...interviewData.skills, "Redux", "GraphQL", "Webpack", "Jest"].map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link to={interviewData.resumeUrl}>
                  <FileText className="mr-2 h-4 w-4" />
                  View Full Resume
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="animate-fade-in delay-100">
            <CardHeader>
              <CardTitle>Preparation Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-aisuccess-500 flex-shrink-0 mt-0.5" />
                  <p>Review candidate resume</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-aisuccess-500 flex-shrink-0 mt-0.5" />
                  <p>Configure interview questions</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-aisuccess-500 flex-shrink-0 mt-0.5" />
                  <p>Set up evaluation criteria</p>
                </div>
                {interviewData.status === 'upcoming' && (
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 border-2 border-muted rounded flex-shrink-0 mt-0.5" />
                    <p>Test audio/video before interview</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default DetailView;
