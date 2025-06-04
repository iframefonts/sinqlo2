
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface GenericPlaceholderPageProps {
  pageTitle: string;
}

const GenericPlaceholderPage: React.FC<GenericPlaceholderPageProps> = ({ pageTitle }) => {
  return (
    <div className="flex justify-center items-start py-12 min-h-[calc(100vh-20rem)]"> {/* Adjust min-height as needed */}
      <Card className="max-w-xl w-full p-8 text-center shadow-xl">
        <svg className="mx-auto h-16 w-16 text-brand-accent mb-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
          {pageTitle}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Content for the <span className="font-semibold">{pageTitle.toLowerCase()}</span> page is currently under construction. 
          Please check back soon!
        </p>
        <Button<typeof Link> 
            as={Link} 
            to="/" 
            variant="primary"
            size="lg"
        >
            Go to Homepage
        </Button>
      </Card>
    </div>
  );
};

export default GenericPlaceholderPage;
