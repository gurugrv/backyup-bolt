import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail } from 'lucide-react';
import Button from '../components/ui/Button';

const EmailConfirmation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-8 rounded-2xl shadow-lg"
    >
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-6">
          <Mail className="h-8 w-8 text-indigo-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>
        <p className="mt-2 text-gray-600">
          We've sent a verification link to your email address.<br />
          Please check your inbox and click the link to verify your account.
        </p>

        <div className="mt-8 space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-1">What to do next?</h3>
            <ol className="list-decimal text-left pl-5 text-sm text-blue-700 space-y-1">
              <li>Check your email inbox</li>
              <li>Look for an email from SecureAuth</li>
              <li>Click the verification link in the email</li>
              <li>If you don't see the email, check your spam folder</li>
            </ol>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-4">
              Didn't receive the email? Check your spam folder or try signing in to trigger a new verification email.
            </p>
            <Button variant="outline" fullWidth>
              Resend Verification Email
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <Link 
            to="/signin" 
            className="text-indigo-600 font-medium flex items-center justify-center hover:text-indigo-500"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to sign in
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailConfirmation;