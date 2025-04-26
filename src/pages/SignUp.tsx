import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, KeyRound, Mail, Eye, EyeOff, Check, X } from 'lucide-react';
import Button from '../components/ui/Button';
import FormInput from '../components/ui/FormInput';
import PasswordStrengthMeter from '../components/ui/PasswordStrengthMeter';
import useAuth from '../hooks/useAuth';

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const { signUp, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<SignUpFormData>();
  
  const password = watch('password', '');
  
  const onSubmit = async (data: SignUpFormData) => {
    await signUp(data.email, data.password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Password requirement checks
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const renderRequirement = (met: boolean, text: string) => (
    <div className="flex items-center space-x-2 text-sm">
      {met ? (
        <Check size={14} className="text-green-500" />
      ) : (
        <X size={14} className="text-gray-400" />
      )}
      <span className={met ? 'text-green-700' : 'text-gray-500'}>{text}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-8 rounded-2xl shadow-lg"
    >
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
        <p className="mt-2 text-gray-600">Sign up to get started with SecureAuth</p>
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
          label="Email"
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

        <div className="space-y-2">
          <div className="relative">
            <FormInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Create a secure password"
              icon={<KeyRound size={18} />}
              error={errors.password?.message}
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                  message: 'Password must include uppercase, lowercase, number and special character',
                }
              })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-10 text-gray-500 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-2">Password requirements:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {renderRequirement(hasMinLength, 'At least 8 characters')}
              {renderRequirement(hasUpperCase, 'One uppercase letter')}
              {renderRequirement(hasLowerCase, 'One lowercase letter')}
              {renderRequirement(hasNumber, 'One number')}
              {renderRequirement(hasSpecialChar, 'One special character')}
            </div>
          </div>
          
          <PasswordStrengthMeter password={password} />
        </div>

        <div className="relative">
          <FormInput
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            placeholder="Confirm your password"
            icon={<KeyRound size={18} />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-10 text-gray-500 focus:outline-none"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="mt-6">
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            isLoading={loading}
          >
            Create Account
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="text-indigo-600 font-medium hover:text-indigo-500 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUp;