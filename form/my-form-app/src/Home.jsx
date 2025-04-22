import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import FormEditor from "./components/FormEditor";
import FormPreview from "./components/FormPreview";
import PopupMessage from "./components/PopupMessage";

export default function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [createdFormId, setCreatedFormId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [onPublishTrigger, setOnPublishTrigger] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handlePublish = () => {
    if (!isValidForm) return;

    // Dummy simulate form ID creation
    const id = Date.now();
    setCreatedFormId(id);
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 pt-24 p-4">
      <Navbar
        handlePublish={handlePublish}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        previewEnabled={!!createdFormId}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
      />

      {showPopup && (
        <PopupMessage
          message="✅ Form published successfully!"
          onClose={() => setShowPopup(false)}
        />
      )}

      {!isLoggedIn ? (
        <div className="text-center text-xl text-gray-600 mt-10">
          Please <strong>Login</strong> or <strong>Signup</strong> to create your form.
        </div>
      ) : showPreview ? (
        <FormPreview
          formTitle={formTitle}
          formDescription={formDescription}
          questions={questions}
          formId={createdFormId}
        />
      ) : (
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
        />
      )}
    </div>
  );
}
