import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  helper?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, helper, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label 
            htmlFor={props.id} 
            className="block mb-1.5 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              w-full px-4 py-2.5 rounded-md border 
              ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} 
              ${icon ? 'pl-10' : ''}
              focus:ring-2 focus:ring-opacity-50 outline-none transition-colors
              bg-white text-gray-900 text-base
              ${className}
            `}
            {...props}
          />
        </div>
        
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-sm text-red-600"
          >
            {error}
          </motion.p>
        ) : helper ? (
          <p className="mt-1.5 text-sm text-gray-500">{helper}</p>
        ) : null}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;