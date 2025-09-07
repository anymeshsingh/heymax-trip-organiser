import { IoPencil, IoTrash } from 'react-icons/io5';

interface TripMenuModalProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const TripMenuModal: React.FC<TripMenuModalProps> = ({
  visible,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 ease-out"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl shadow-xl animate-slide-up">
        {/* Handle indicator */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>
        
        <div className="p-6 pb-8">
          <div className="space-y-3">
            <button
              className="w-full p-4 text-left text-foreground-light hover:bg-gray-50 rounded-xl transition-colors flex items-center"
              onClick={onEdit}
            >
              <IoPencil size={20} className="mr-4 text-primary-light" />
              <span className="font-medium">Edit Trip</span>
            </button>
            
            <button
              className="w-full p-4 text-left text-error-foreground hover:bg-red-50 rounded-xl transition-colors flex items-center"
              onClick={onDelete}
            >
              <IoTrash size={20} className="mr-4 text-error-foreground" />
              <span className="font-medium">Delete Trip</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
