export default function PopupMessage({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg animate-fade-in-out text-lg font-semibold max-w-md w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-white text-xl hover:text-gray-200"
        >
          ✖
        </button>

        <div className="text-center p-4">"✅ Form published successfully! 🎉"</div>
      </div>
    </div>
  );
}
