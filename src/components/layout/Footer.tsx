
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-border py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl text-primary mb-4">
                HireZen<span className="text-aipurple-600">AI</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Revolutionize your hiring process with AI-driven interview assistance.
              Make better hiring decisions with real-time insights and objective evaluations.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HireZenAI. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
