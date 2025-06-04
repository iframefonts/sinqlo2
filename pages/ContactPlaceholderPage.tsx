
import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';


const ContactPlaceholderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get('reason');
  const subject = reason ? `Inquiry: ${reason.charAt(0).toUpperCase() + reason.slice(1)} Plan` : "General Inquiry";

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="max-w-lg w-full p-8">
        <h1 className="text-3xl font-bold text-brand-primary mb-6 text-center">Contact Us</h1>
        
        <p className="text-lg text-gray-700 mb-6 text-center">
          This is a placeholder for our contact form.
        </p>
        
        <form className="space-y-6">
            <Input 
                label="Your Name"
                type="text"
                name="name"
                placeholder="Jane Doe"
                required
            />
            <Input 
                label="Your Email"
                type="email"
                name="email"
                placeholder="jane.doe@example.com"
                required
            />
            <Input 
                label="Subject"
                type="text"
                name="subject"
                defaultValue={subject}
                required
            />
            <Textarea
                label="Your Message"
                name="message"
                rows={5}
                placeholder="How can we help you?"
                required
            />
            <Button 
                type="submit"
                variant="primary"
                className="w-full"
                onClick={(e) => {
                    e.preventDefault();
                    alert('Form submitted (placeholder). In a real app, this would send data.');
                }}
            >
                Send Message
            </Button>
        </form>

        <div className="mt-8 text-center">
            <Button<typeof Link> 
                as={Link} 
                to="/" 
                variant="link"
            >
                Go to Homepage
            </Button>
        </div>
      </Card>
    </div>
  );
};

export default ContactPlaceholderPage;
