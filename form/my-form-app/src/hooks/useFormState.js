import { useState } from 'react';

export default function useFormState() {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  return {
    formTitle,
    setFormTitle,
    formDescription,
    setFormDescription,
    questions,
    setQuestions,
  };
}
