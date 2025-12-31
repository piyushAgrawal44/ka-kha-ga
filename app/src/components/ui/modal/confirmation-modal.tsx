import { X, AlertTriangle } from "lucide-react";
import Button from "../button/button";

interface Props {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<Props> = ({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onClose,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>

        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-6">{description}</p>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>

          <Button
            loading={loading}
            disabled={loading}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
