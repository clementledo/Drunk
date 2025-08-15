import {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

// Hook pour détecter l'état du clavier
export const useKeyboard = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardVisible(true);
        setKeyboardHeight(e.endCoordinates.height);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  return {keyboardVisible, keyboardHeight};
};

// Hook pour la validation de formulaire
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouchedFields] = useState({});

  const setValue = (field, value) => {
    setValues(prev => ({...prev, [field]: value}));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: null}));
    }
  };

  const setTouched = (field) => {
    setTouchedFields(prev => ({...prev, [field]: true}));
  };

  const validate = () => {
    const newErrors = {};
    
    Object.keys(validationRules).forEach(field => {
      const rules = validationRules[field];
      const value = values[field];

      for (const rule of rules) {
        if (rule.required && (!value || value.trim() === '')) {
          newErrors[field] = rule.message || `${field} est requis`;
          break;
        }
        
        if (rule.minLength && value && value.length < rule.minLength) {
          newErrors[field] = rule.message || `${field} doit contenir au moins ${rule.minLength} caractères`;
          break;
        }
        
        if (rule.pattern && value && !rule.pattern.test(value)) {
          newErrors[field] = rule.message || `${field} n'est pas valide`;
          break;
        }
        
        if (rule.custom && value && !rule.custom(value)) {
          newErrors[field] = rule.message || `${field} n'est pas valide`;
          break;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouchedFields({});
  };

  return {
    values,
    errors,
    touched,
    setValue,
    setTouched,
    validate,
    reset,
    isValid: Object.keys(errors).length === 0,
  };
};
