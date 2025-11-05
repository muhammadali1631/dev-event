import { toast, ToastContainer } from "react-toastify"

const DeleteEvent = ({
  title,
  id,
  setShow,
}: {
  title: string
  id: string
  setShow: (show: boolean) => void
}) => {
    const DeleteEvnet = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${id}`, {
                headers: {"x-api-key": process.env.NEXT_PUBLIC_API_KEY!},
                method: 'DELETE',
                cache: "no-store" 
            });
            const data = await response.json();
            setShow(false);
        }
        catch (error) {
            console.error('Error deleting event:', error);
            toast.error('Failed to delete event.');}
    }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
          />
      <div className="w-[350px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl shadow-xl p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Are you sure you want to delete <span className="font-medium text-red-500">{title}</span>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
            onClick={() => DeleteEvnet()}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-colors"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteEvent
