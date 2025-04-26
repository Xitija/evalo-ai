
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Users, LayoutDashboard, FileText } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header transparent={true} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="md:w-1/2 space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-800">
                Interview Smarter with<br />
                <span className="text-primary">AI-Powered</span> Insights
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-lg">
                Transform your hiring process with real-time AI assistance that provides 
                objective evaluations, suggests questions, and helps you make better hiring decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-aiorange-500 hover:bg-aiorange-600">
                  <Link to="/dashboard">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link to="/">
                    Watch Demo
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 animate-fade-in delay-200">
              <div className="relative">
                <div className="w-full h-[400px] bg-aiblue-100 rounded-2xl shadow-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-aiblue-50 to-aipurple-50 opacity-50"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
                    alt="Woman interviewing remotely"
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-slate-100">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-aisuccess-500 rounded-full"></div>
                    <span>AI Assistant active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Proof */}
      <section className="py-10 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-slate-400">
            <span className="text-sm font-medium">TRUSTED BY LEADING COMPANIES</span>
            <span className="font-semibold text-lg">Zomato</span>
            <span className="font-semibold text-lg">Uber</span>
            <span className="font-semibold text-lg">Microsoft</span>
            <span className="font-semibold text-lg">Adobe</span>
            <span className="font-semibold text-lg">Atlassian</span>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hire Smarter with AI
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our AI interview assistant provides real-time suggestions, objective evaluations, 
              and helps you focus on what matters most - finding the right talent.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8 text-aipurple-500" />,
                title: "Real-Time AI Feedback",
                description: "Get instant insights during interviews with AI-generated question suggestions and candidate evaluations."
              },
              {
                icon: <LayoutDashboard className="h-8 w-8 text-aiblue-500" />,
                title: "One Dashboard for All Roles",
                description: "Manage interviews for all departments and positions from a single, intuitive dashboard."
              },
              {
                icon: <FileText className="h-8 w-8 text-aiorange-500" />,
                title: "Comprehensive Reports",
                description: "Generate detailed candidate assessments with skill evaluations, communication metrics, and recommendations."
              }
            ].map((feature, index) => (
              <Card key={index} className="animate-fade-in border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it Works */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              HireZenAI seamlessly integrates into your existing hiring workflow, 
              making interviews more effective and decisions more objective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6 order-2 md:order-1">
              {[
                {
                  step: "1",
                  title: "Set Up Your Interview",
                  description: "Define the job role, required skills, and upload relevant questions or use our AI-generated ones."
                },
                {
                  step: "2",
                  title: "Conduct the Interview",
                  description: "Use our platform during the interview to receive real-time guidance and question suggestions."
                },
                {
                  step: "3",
                  title: "Review AI Insights",
                  description: "Get comprehensive feedback on candidate performance with objective metrics and skill assessments."
                },
                {
                  step: "4",
                  title: "Make Better Hiring Decisions",
                  description: "Use data-driven insights to compare candidates and select the best fit for your team."
                }
              ].map((step, index) => (
                <div key={index} className="flex gap-4 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-aiblue-100 flex items-center justify-center text-aiblue-700 font-semibold">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative order-1 md:order-2 animate-fade-in delay-200">
              <div className="w-full h-[500px] bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80" 
                  alt="Product interface mockup" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Don't just take our word for it. See how HireZenAI has helped 
              companies improve their hiring outcomes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "We've reduced our time-to-hire by 40% while making better quality hires. The AI insights have been game-changing for our recruitment team.",
                name: "Sarah Johnson",
                title: "Head of Talent Acquisition, Zomato",
                avatar: "SJ"
              },
              {
                quote: "The real-time question suggestions helped our interviewers dig deeper into technical skills. We're now much more confident in our hiring decisions.",
                name: "Michael Chen",
                title: "Engineering Director, Atlassian",
                avatar: "MC"
              },
              {
                quote: "HireZenAI brought consistency to our interview process across departments. The objective skill assessments eliminated much of our previous bias.",
                name: "Priya Sharma",
                title: "HR Manager, Adobe",
                avatar: "PS"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="animate-fade-in border-slate-100">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-aiblue-100 text-aiblue-700 flex items-center justify-center text-lg font-medium">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-base">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.title}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose the plan that fits your organization's needs.
              All plans include our core AI interview assistance features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$49",
                description: "Perfect for small teams or individual recruiters",
                features: [
                  "5 active interview setups",
                  "Basic AI interview assistance",
                  "Interview transcription",
                  "Basic candidate reports",
                  "Email support"
                ]
              },
              {
                name: "Professional",
                price: "$99",
                description: "For growing teams with regular hiring needs",
                features: [
                  "20 active interview setups",
                  "Advanced AI question suggestions",
                  "Skill gap analysis",
                  "Candidate comparison tools",
                  "Priority support",
                  "Custom evaluation criteria"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For organizations with complex hiring needs",
                features: [
                  "Unlimited interview setups",
                  "Advanced analytics dashboard",
                  "ATS integration",
                  "Custom branding",
                  "Dedicated account manager",
                  "Team training & onboarding",
                  "SLA & premium support"
                ]
              }
            ].map((plan, index) => (
              <Card 
                key={index} 
                className={`animate-fade-in relative ${plan.popular ? 'border-2 border-primary shadow-md' : 'border-slate-100'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-slate-500">/month</span>}
                  </div>
                  <CardDescription className="text-base mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Separator className="mb-4" />
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-aisuccess-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-aiblue-500 to-aipurple-600 text-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies using HireZenAI to make better hiring decisions.
            Start your free trial today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50">
              <Link to="/dashboard">
                Get Started Free
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="/">
                Schedule a Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Landing;
