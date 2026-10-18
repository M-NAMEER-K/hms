

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage,totalPages, onPageChange}:PaginationProps) => {

    if (totalPages <= 0) {
        return null;
    }

    return (
        <div className="w-full  flex justify-center items-center gap-2 p-2">

            {/* Previous Button */}
            <button disabled={currentPage === 0} onClick={() => onPageChange(currentPage - 1)} className="px-2 py-1 hover:bg-blue-500 hover:border-white hover:text-white  rounded text-blue-500 border border-blue-500" >
                Previous
            </button>


            {/* Page Numbers */}
            <span className="font-medium bg-blue-700 text-white rounded-lg px-2 py-1">
                 {currentPage + 1} / {totalPages}
            </span>


            {/* Next Button */}
            <button disabled={currentPage === totalPages - 1} onClick={() => onPageChange(currentPage + 1)} className="px-2 py-1 hover:bg-blue-500 hover:border-white hover:text-white  rounded text-blue-500 border border-blue-500">
                Next
            </button>

        </div>
    );
};

export default Pagination;