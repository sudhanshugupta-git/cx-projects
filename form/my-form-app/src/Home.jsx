import React, { useState, useEffect } from 'react';
import FormEditor from './components/FormEditor';
import FormPreview from './components/FormPreview';
import PopupMessage from './components/PopupMessage';
import { useAuth } from './hooks/AuthContext';
import useFormState from './hooks/useFormState';
import useFormPublish from './hooks/useFormPublish';

export default function Home() {
  const { isLoggedIn } = useAuth();

  const {
    formTitle,
    setFormTitle,
    formDescription,
    setFormDescription,
    questions,
    setQuestions,
  } = useFormState();

  const {
    createdFormId,
    onPublishTrigger,
    setOnPublishTrigger,
    isValidForm,
    setIsValidForm,
    showPopup,
    setShowPopup,
    handlePublish,
  } = useFormPublish({ formTitle, formDescription, questions });


  // useEffect(() => {
  //   const savedForm = localStorage.getItem('form');
  //   if (savedForm) {
  //     const parsed = JSON.parse(savedForm);
  //     setFormTitle(parsed.title || '');
  //     setFormDescription(parsed.description || '');
  //     setQuestions(parsed.questions || []);
  //   }
  // }, []);

  // useEffect(() => {
  //   const data = { title: formTitle, description: formDescription, questions };
  //   localStorage.setItem('form', JSON.stringify(data));
  // }, [formTitle, formDescription, questions]);



  // useEffect(() => {
  //   if (isValidForm) {
  //     console.log('📤 Published Form:', { title: formTitle, description: formDescription, questions });
  //     setShowPopup(true);
  //     // setTimeout(() => setShowPopup(false), 5000);
  //     // Reset
  //     setIsValidForm(false); 
  //     setFormTitle('');
  //     setFormDescription('');
  //     setQuestions([]);
  //     // localStorage.removeItem('form');  // commented as u are not using it now
  //   }
  // }, [isValidForm]);


  // useEffect(()=>{
  //   console.log(isLoggedIn);
  // }, [isLoggedIn])

  // const handlePublish = () => {
  //   setOnPublishTrigger(true);
  // };


  // useEffect(() => {
  //   const submitForm = async () => {
  //     try {
  //       const formResponse = await fetch('http://localhost:3000/api/form', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           name: formTitle,
  //           description: formDescription,
  //         }),
  //       });

  //       if (!formResponse.ok) throw new Error('Failed to create form');

  //       const { form } = await formResponse.json();
  //       const formId = form.id;
  //       setCreatedFormId(formId);

  //       for (const q of questions) {
  //         await fetch(`http://localhost:3000/api/form/input/${formId}`, {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             question: q.question,
  //             type: q.type,
  //             // options: q.options ?? [],
  //           }),
  //         });
  //       }

  //       console.log('✅ Form and questions saved successfully.');

  //       setShowPopup(true);

  //       // Reset form
  //       // setIsValidForm(false);
  //       // setFormTitle('');
  //       // setFormDescription('');
  //       // setQuestions([]);

  //     } catch (error) {
  //       console.error('❌ Error submitting form:', error);
  //     }
  //   };

  //   if (isValidForm) {
  //     console.log('📤 Publishing Form:', { title: formTitle, description: formDescription, questions });
  //     submitForm();
  //   }
  // }, [isValidForm]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 pt-24 p-4">

      {showPopup && (
        <PopupMessage
          message="✅ Form published successfully!"
          onClose={() => setShowPopup(false)}
        />
      )}

      {isLoggedIn ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FormEditor
            formTitle={formTitle}
            setFormTitle={setFormTitle}
            formDescription={formDescription}
            setFormDescription={setFormDescription}
            questions={questions}
            setQuestions={setQuestions}
            onPublishTrigger={onPublishTrigger}
            setOnPublishTrigger={setOnPublishTrigger}
            setIsValidForm={setIsValidForm}
            handlePublish={handlePublish}
          />


          <FormPreview
            formTitle={formTitle}
            formDescription={formDescription}
            questions={questions}
            formId={createdFormId}
          />

        </div>
      ) : (
        <div className="text-center text-lg text-gray-600 mt-10">
          Please <span className="font-semibold">Login</span> first.
        </div>
      )}
    </div>
  );

}
