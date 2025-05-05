export default function FormPreview({ formTitle, formDescription, questions }) {
  return (
    <>
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-green-200">
        <h2 className="text-xl font-semibold text-green-700 mb-3 text-center">📋 Live Preview</h2>
        <h3 className="text-lg font-bold mb-1">{formTitle || 'Untitled Form'}</h3>
        <p className="mb-4 text-gray-600">{formDescription}</p>

        {questions.map((q, i) => (
          <div key={i} className="mb-4">
            <p className="font-medium text-gray-700">{q.question}</p>
            {q.type === 'short_answer' ? (
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            ) : (
              q.options.map((opt, j) => (
                <label key={j} className="block mt-1 text-gray-600">
                  <input
                    type="checkbox"
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))
            )}
          </div>
        ))}
      </div>
    </>
  );
}
