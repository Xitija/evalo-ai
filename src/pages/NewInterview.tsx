
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  CalendarIcon, 
  Clock,
  Upload,
  FileText,
  Save,
  Calendar,
  ArrowRight,
  Plus,
  X
} from 'lucide-react';
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from '@/lib/utils';
import PageContainer from '@/components/layout/PageContainer';

// Form schema
const interviewFormSchema = z.object({
  jobTitle: z.string().min(2, { message: "Job title must be at least 2 characters." }),
  department: z.string({ required_error: "Please select a department." }),
  jobDescription: z.string().min(10, { message: "Please provide a job description." }),
  experienceRequired: z.string(),
  candidateName: z.string().min(2, { message: "Candidate name must be at least 2 characters." }),
  candidateEmail: z.string().email({ message: "Please enter a valid email address." }),
  interviewDate: z.date({ required_error: "Please select a date." }),
  interviewDuration: z.string({ required_error: "Please select an interview duration." }),
  requiredSkills: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

type InterviewFormValues = z.infer<typeof interviewFormSchema>;

const skills = [
  { id: "javascript", label: "JavaScript" },
  { id: "react", label: "React" },
  { id: "node", label: "Node.js" },
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "csharp", label: "C#" },
  { id: "sql", label: "SQL" },
  { id: "communication", label: "Communication Skills" },
  { id: "problemsolving", label: "Problem Solving" },
  { id: "teamwork", label: "Teamwork" },
];

const NewInterview = () => {
  const [customSkill, setCustomSkill] = useState("");
  const [customSkills, setCustomSkills] = useState<string[]>([]);

  const form = useForm<InterviewFormValues>({
    resolver: zodResolver(interviewFormSchema),
    defaultValues: {
      jobTitle: "",
      department: "",
      jobDescription: "",
      experienceRequired: "1-3",
      candidateName: "",
      candidateEmail: "",
      interviewDuration: "30",
      requiredSkills: [],
      notes: "",
    },
  });

  function onSubmit(data: InterviewFormValues) {
    console.log(data);
    
    toast({
      title: "Interview Setup Saved",
      description: "Your interview has been scheduled successfully.",
    });
    
    // In a real app, redirect to dashboard or new interview page
  }

  function onSaveAsDraft() {
    const values = form.getValues();
    console.log("Saving draft:", values);
    
    toast({
      title: "Draft Saved",
      description: "Your interview setup has been saved as a draft.",
    });
  }

  const addCustomSkill = () => {
    if (customSkill.trim() !== "" && !customSkills.includes(customSkill.trim())) {
      setCustomSkills([...customSkills, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  const removeCustomSkill = (skill: string) => {
    setCustomSkills(customSkills.filter(s => s !== skill));
  };

  return (
    <PageContainer className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Interview</h1>
        <p className="text-muted-foreground">Set up a new interview and configure all details</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Senior Frontend Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department*</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="data">Data</SelectItem>
                          <SelectItem value="human resources">Human Resources</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description*</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter the job description with key responsibilities and requirements..." 
                        className="min-h-32" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experienceRequired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Required</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Years of experience" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-7">5-7 years</SelectItem>
                        <SelectItem value="7+">7+ years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Candidate Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="candidateName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Candidate Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name of the candidate" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="candidateEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Candidate Email*</FormLabel>
                      <FormControl>
                        <Input placeholder="candidate@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-md border border-dashed flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="text-center md:text-left">
                  <h3 className="font-medium">Upload Candidate Resume</h3>
                  <p className="text-sm text-muted-foreground">PDF, DOCX or TXT files up to 5MB</p>
                </div>
                <Button variant="outline" type="button" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Choose File
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Interview Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="interviewDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Interview Date*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interviewDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration*</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="90">1.5 hours</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  A calendar invitation will be sent to the candidate once the interview is scheduled.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Evaluation Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormItem>
                <FormLabel>Required Skills</FormLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={skill.id} 
                        onCheckedChange={(checked) => {
                          const currentSkills = form.getValues("requiredSkills") || [];
                          if (checked) {
                            form.setValue("requiredSkills", [...currentSkills, skill.label]);
                          } else {
                            form.setValue(
                              "requiredSkills",
                              currentSkills.filter((value) => value !== skill.label)
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={skill.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {skill.label}
                      </label>
                    </div>
                  ))}
                </div>
              </FormItem>

              <div className="flex flex-col gap-4">
                <FormLabel>Add Custom Skills</FormLabel>
                <div className="flex gap-2">
                  <Input 
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    placeholder="Enter a custom skill"
                    className="flex-1"
                  />
                  <Button type="button" onClick={addCustomSkill}>
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
                
                {customSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {customSkills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full"
                      >
                        <span className="text-sm">{skill}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5" 
                          onClick={() => removeCustomSkill(skill)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any specific topics to cover or questions to ask..." 
                        className="min-h-20" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Our AI will generate additional questions based on the skills and job description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button 
              type="button" 
              variant="outline" 
              className="gap-2" 
              onClick={onSaveAsDraft}
            >
              <Save className="h-4 w-4" />
              Save as Draft
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="ghost" asChild>
                <Link to="/dashboard">Cancel</Link>
              </Button>
              <Button type="submit" className="gap-2">
                Start Interview
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </PageContainer>
  );
};

export default NewInterview;
