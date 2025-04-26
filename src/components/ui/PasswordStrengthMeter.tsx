import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PasswordStrengthMeterProps {
  password: string;
}

type StrengthLevel = 'empty' | 'weak' | 'medium' | 'strong' | 'veryStrong';

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  const [strength, setStrength] = useState<StrengthLevel>('empty');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!password) {
      setStrength('empty');
      setMessage('');
      return;
    }

    // Define criteria
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    // Calculate score
    let score = 0;
    if (hasLowerCase) score++;
    if (hasUpperCase) score++;
    if (hasNumber) score++;
    if (hasSpecialChar) score++;
    if (isLongEnough) score++;

    // Determine strength level and message
    if (password.length < 1) {
      setStrength('empty');
      setMessage('');
    } else if (score <= 2) {
      setStrength('weak');
      setMessage('Weak: Add numbers, symbols, and capital letters');
    } else if (score === 3) {
      setStrength('medium');
      setMessage('Medium: Try adding more character types');
    } else if (score === 4) {
      setStrength('strong');
      setMessage('Strong: Your password is secure');
    } else {
      setStrength('veryStrong');
      setMessage('Very strong: Excellent password!');
    }
  }, [password]);

  const strengthColors = {
    empty: 'bg-gray-200',
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
    veryStrong: 'bg-green-600'
  };

  const strengthWidth = {
    empty: '0%',
    weak: '25%',
    medium: '50%',
    strong: '75%',
    veryStrong: '100%'
  };

  if (strength === 'empty') return null;

  return (
    <div className="mt-2 mb-4">
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: strengthWidth[strength] }}
          transition={{ duration: 0.3 }}
          className={`h-full ${strengthColors[strength]}`}
        />
      </div>
      <p className="text-xs mt-1 text-gray-600">{message}</p>
    </div>
  );
};

export default PasswordStrengthMeter;