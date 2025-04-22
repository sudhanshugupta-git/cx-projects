import { useState, useEffect, use } from 'react';
import { AuthProvider, useAuth } from './AuthContext';

export default function useFormPublish({ formTitle, formDescription, questions }) {
  const [createdFormId, setCreatedFormId] = useState(null);
  const [onPublishTrigger, setOnPublishTrigger] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

const {userId} = useAuth();
  useEffect(() => {
    const submitForm = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/form/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formTitle, description: formDescription, user_id: userId }),
        });

        if (!res.ok) throw new Error('Failed to create form');
        const { form } = await res.json();
        const formId = form.id;
        setCreatedFormId(formId);

        for (const q of questions) {
          await fetch(`http://localhost:3000/api/form/input/${formId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: q.question, type: q.type }),
          });
        }

        console.log('✅ Form and questions saved successfully.');
        setShowPopup(true);

      } catch (err) {
        console.error('❌ Error submitting form:', err);
      }
    };

    if (isValidForm) {
      submitForm();
    }
  }, [isValidForm]);

  const handlePublish = () => {
    setOnPublishTrigger(true);
  };

  return {
    createdFormId,
    onPublishTrigger,
    setOnPublishTrigger,
    isValidForm,
    setIsValidForm,
    showPopup,
    setShowPopup,
    handlePublish,
  };
}
