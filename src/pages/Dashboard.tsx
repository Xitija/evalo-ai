
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Filter, Search, ArrowRight, Clock, Plus } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';

const Dashboard = () => {
  const [department, setDepartment] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Mock data for interviews
  const upcomingInterviews = [
    { id: 1, name: 'Alex Johnson', role: 'Senior Frontend Developer', department: 'Engineering', time: '2PM Today', status: 'upcoming' },
    { id: 2, name: 'Maria Garcia', role: 'Product Manager', department: 'Product', time: '4PM Today', status: 'upcoming' },
    { id: 3, name: 'Raj Patel', role: 'DevOps Engineer', department: 'Engineering', time: '10AM Tomorrow', status: 'upcoming' },
    { id: 4, name: 'Sarah Kim', role: 'UX Designer', department: 'Design', time: '1PM Tomorrow', status: 'upcoming' },
  ];
  
  const pastInterviews = [
    { id: 5, name: 'David Wilson', role: 'Backend Developer', department: 'Engineering', time: 'Yesterday', status: 'completed' },
    { id: 6, name: 'Emma Brown', role: 'Marketing Specialist', department: 'Marketing', time: '2 days ago', status: 'completed' },
    { id: 7, name: 'Michael Chen', role: 'Data Scientist', department: 'Data', time: '3 days ago', status: 'completed' },
    { id: 8, name: 'Olivia Taylor', role: 'HR Coordinator', department: 'Human Resources', time: '5 days ago', status: 'completed' },
  ];
  
  const draftInterviews = [
    { id: 9, name: 'James Smith', role: 'Sales Executive', department: 'Sales', time: 'Created 1 day ago', status: 'draft' },
    { id: 10, name: 'Position Open', role: 'Social Media Specialist', department: 'Marketing', time: 'Created 3 days ago', status: 'draft' },
  ];
  
  // Filter interviews based on department and search term
  const filterInterviews = (interviews: any[]) => {
    return interviews.filter(interview => {
      const departmentMatch = department === 'all' || interview.department.toLowerCase() === department.toLowerCase();
      const searchMatch = 
        interview.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        interview.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.department.toLowerCase().includes(searchTerm.toLowerCase());
      return departmentMatch && searchMatch;
    });
  };
  
  const filteredUpcoming = filterInterviews(upcomingInterviews);
  const filteredPast = filterInterviews(pastInterviews);
  const filteredDrafts = filterInterviews(draftInterviews);

  const InterviewCard = ({ interview }: { interview: any }) => {
    let actionButton;
    
    switch(interview.status) {
      case 'upcoming':
        actionButton = (
          <Button>
            Join Interview
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        );
        break;
      case 'completed':
        actionButton = (
          <Button variant="outline">
            View Report
          </Button>
        );
        break;
      case 'draft':
        actionButton = (
          <Button variant="outline">
            Continue Setup
          </Button>
        );
        break;
      default:
        actionButton = <Button>View Details</Button>;
    }
    
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-semibold">{interview.name}</CardTitle>
              <CardDescription className="text-base font-medium text-slate-700 mt-1">
                {interview.role}
              </CardDescription>
            </div>
            <Badge variant={interview.status === 'upcoming' ? 'default' : interview.status === 'completed' ? 'secondary' : 'outline'}>
              {interview.status === 'upcoming' ? 'Upcoming' : interview.status === 'completed' ? 'Completed' : 'Draft'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center text-muted-foreground">
              <div className="w-20">Department:</div>
              <span className="text-slate-700">{interview.department}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <div className="w-20">Time:</div>
              <div className="flex items-center text-slate-700">
                <Clock className="mr-1 h-4 w-4" />
                {interview.time}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link to={`/interviews/${interview.id}`} className="w-full">
            {actionButton}
          </Link>
        </CardFooter>
      </Card>
    );
  };

  return (
    <>
      <PageContainer className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Manage your interviews and view insights</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link to="/interviews/new">
                <Plus className="mr-1 h-4 w-4" />
                New Interview
              </Link>
            </Button>
            <Button variant="outline">
              <Calendar className="mr-1 h-4 w-4" />
              Schedule
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Card className="md:col-span-4 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg">Total Interviews</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-aisuccess-700">↑ 12% </span>
                from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-4 animate-fade-in delay-100">
            <CardHeader>
              <CardTitle className="text-lg">Average Score</CardTitle>
              <CardDescription>Across all candidates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">72%</div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 mt-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-4 animate-fade-in delay-200">
            <CardHeader>
              <CardTitle className="text-lg">Time Saved</CardTitle>
              <CardDescription>With AI assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">18.5 hrs</div>
              <p className="text-sm text-muted-foreground mt-1">
                This month across all interviews
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-auto flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search candidates, roles..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-full md:w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Department" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="data">Data</SelectItem>
              <SelectItem value="human resources">Human Resources</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="upcoming">
          <TabsList className="w-full md:w-auto grid grid-cols-3">
            <TabsTrigger value="upcoming">
              Upcoming
              {filteredUpcoming.length > 0 && (
                <Badge variant="secondary" className="ml-2">{filteredUpcoming.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="past">
              Past
              {filteredPast.length > 0 && (
                <Badge variant="secondary" className="ml-2">{filteredPast.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="drafts">
              Drafts
              {filteredDrafts.length > 0 && (
                <Badge variant="secondary" className="ml-2">{filteredDrafts.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            {filteredUpcoming.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUpcoming.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No upcoming interviews match your filters</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="mt-6">
            {filteredPast.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPast.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No past interviews match your filters</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="drafts" className="mt-6">
            {filteredDrafts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDrafts.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No draft interviews match your filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </PageContainer>
    </>
  );
};

export default Dashboard;
