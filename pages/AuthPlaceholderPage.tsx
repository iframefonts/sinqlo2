
import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const AuthPlaceholderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get('action');
  const plan = searchParams.get('plan');
  const error = searchParams.get('error');

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="max-w-md w-full p-8 text-center">
        <h1 className="text-3xl font-bold text-brand-primary mb-6">Authentication</h1>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <p className="text-lg text-gray-700 mb-4">
          This is a placeholder page for user authentication.
        </p>
        
        {action && (
          <p className="text-md text-gray-600">
            Requested action: <span className="font-semibold">{action}</span>
          </p>
        )}
        {plan && (
          <p className="text-md text-gray-600">
            Selected plan: <span className="font-semibold">{plan}</span>
          </p>
        )}

        <div className="mt-8 space-y-4">
            <p className="text-sm text-gray-500">
                In a real application, you would see a signup or login form here.
            </p>
            <Button<typeof Link> 
                as={Link} 
                to="/" 
                variant="primary"
                className="w-full"
            >
                Go to Homepage
            </Button>
            <Button<typeof Link> 
                as={Link} 
                to="/pricing" 
                variant="outline"
                className="w-full"
            >
                Back to Pricing
            </Button>
        </div>
      </Card>
    </div>
  );
};

export default AuthPlaceholderPage;
