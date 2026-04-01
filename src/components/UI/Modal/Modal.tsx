import "./Modal.css";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  };
  
  function Modal({ isOpen, onClose, children }: Props) {
    if (!isOpen) return null;
  
    return (
      <div className="modal__overlay" onClick={onClose}>
        <div
          className="modal"
          onClick={(e) => e.stopPropagation()} 
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      </div>
    );
  }
  
  export default Modal;