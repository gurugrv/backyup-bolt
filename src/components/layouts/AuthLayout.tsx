import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HardDrive } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 text-white flex-col justify-center items-center p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md text-center"
        >
          <HardDrive size={64} className="mx-auto mb-8" />
          <h1 className="text-4xl font-bold mb-6">BackYup</h1>
          <p className="text-xl opacity-80 mb-8">
            Secure, automated backups for your important files.
            Keep your data safe and accessible.
          </p>
          <div className="space-y-4 text-left bg-blue-700/30 p-6 rounded-xl">
            <p className="flex items-start">
              <span className="inline-block w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm">✓</span>
              <span>Automated backup scheduling</span>
            </p>
            <p className="flex items-start">
              <span className="inline-block w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm">✓</span>
              <span>End-to-end encryption</span>
            </p>
            <p className="flex items-start">
              <span className="inline-block w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm">✓</span>
              <span>Cross-platform compatibility</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;