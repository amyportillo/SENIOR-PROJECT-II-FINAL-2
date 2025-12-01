import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

// reusable popup modal component
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  // don't render anything if modal is closed
  if (!isOpen) return null;

  return (
    // dark overlay that covers whole screen, clicking it closes modal
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      {/* modal content box, clicking inside doesn't close it */}
      <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
