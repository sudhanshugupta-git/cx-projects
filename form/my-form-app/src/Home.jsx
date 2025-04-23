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
    setIsValidForm,
    showPopup,
    setShowPopup,
    handlePublish,
    isPublished
  } = useFormPublish({ formTitle, formDescription, questions });



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
            isPublished = {isPublished}
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
