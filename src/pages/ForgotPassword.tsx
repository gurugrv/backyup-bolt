import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import FormInput from '../components/ui/FormInput';
import useAuth from '../hooks/useAuth';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword = () => {
  const { resetPassword, loading, error } = useAuth();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ForgotPasswordFormData>();
  
  const onSubmit = async (data: ForgotPasswordFormData) => {
    const success = await resetPassword(data.email);
    if (success) {
      setIsEmailSent(true);
      setUserEmail(data.email);
    }
  };

  if (isEmailSent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-2xl shadow-lg"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
          <p className="mt-2 text-gray-600">
            We've sent a password reset link to<br /><strong>{userEmail}</strong>
          </p>
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or{' '}
              <button 
                onClick={() => setIsEmailSent(false)}
                className="text-indigo-600 font-medium hover:text-indigo-500"
              >
                try another email
              </button>
            </p>
          </div>
          <div className="mt-6">
            <Link to="/signin" className="text-indigo-600 font-medium flex items-center justify-center hover:text-indigo-500">
              <ArrowLeft size={16} className="mr-1" />
              Back to sign in
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-8 rounded-2xl shadow-lg"
    >
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Reset your password</h1>
        <p className="mt-2 text-gray-600">We'll email you a link to reset your password</p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-3 bg-red-50 text-red-800 rounded-md text-sm"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          id="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          icon={<Mail size={18} />}
          error={errors.email?.message}
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please enter a valid email address',
            }
          })}
        />

        <div className="mt-6">
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            isLoading={loading}
          >
            Send Reset Link
          </Button>
        </div>

        <div className="mt-4 text-center">
          <Link 
            to="/signin" 
            className="text-indigo-600 font-medium flex items-center justify-center hover:text-indigo-500"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to sign in
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default ForgotPassword;