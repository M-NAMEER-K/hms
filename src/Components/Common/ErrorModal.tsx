import { IoClose } from "react-icons/io5";

interface ErrorModalProps {
    message:string;
    onClose:()=>void;
}

const ErrorModal = ({message,onClose}:ErrorModalProps)=>{

return(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="bg-white rounded-lg p-5 w-[350px] shadow-lg">

            <div className="flex justify-between items-center">

                <h2 className="text-red-500 font-semibold text-lg">
                    Error
                </h2>

                <button onClick={onClose}>
                    <IoClose size={22}/>
                </button>

            </div>


            <p className="mt-4 text-gray-600">
                {message}
            </p>


        </div>

    </div>
)

}

export default ErrorModal;