import { IoClose } from "react-icons/io5";

export interface ApiError {
  id: number;
  status?: number;
  message: string;
}

interface ErrorModalProps {
  errors: ApiError[];
  onClose: () => void;
}

const ErrorModal = ({ errors, onClose }: ErrorModalProps) => {
    
  if (errors.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[70%] max-h-[80vh] h-[45vh] md:h-[40vh] flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center border-b p-2">
          <h2 className="text-lg font-semibold text-red-600">
            Errors ({errors.length})
          </h2>

          <button
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full p-1"
          >
            <IoClose size={22} />
          </button>
        </div>

        {/* Body */}
      <div className="flex-1 overflow-y-auto p-1">

          {errors.map((error) => (
            <div
              key={error.id}
              className="border border-red-200 rounded-lg p-2 bg-red-50"
            >
             

              {error.status && (
                <div className="text-sm text-gray-600 ">
                  Status Code : {error.status}
                </div>
              )}

              <div className="text-sm text-gray-700 ">
                {error.message}
              </div>
            </div>
          ))}

        </div>

        {/* Footer */}
        <div className="border-t p-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ErrorModal;