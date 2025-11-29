import React from 'react';
import '../css/confirm-modal.css';
import { FaExclamationTriangle, FaExclamationCircle, FaInfoCircle, FaTimes, FaCheck } from 'react-icons/fa';

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "¿Estás seguro?",
    message = "Esta acción no se puede deshacer.",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    type = "danger"
}) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target.className === 'confirm-modal-overlay') {
            onClose();
        }
    };

    return (
        <div className="confirm-modal-overlay" onClick={handleOverlayClick}>
            <div className="confirm-modal-container">
                <div className={`confirm-modal-icon ${type}`}>
                    {type === 'danger' && <FaExclamationTriangle />}
                    {type === 'warning' && <FaExclamationCircle />}
                    {type === 'info' && <FaInfoCircle />}
                </div>

                <div className="confirm-modal-content">
                    <h3 className="confirm-modal-title">{title}</h3>
                    <p className="confirm-modal-message">{message}</p>
                </div>

                <div className="confirm-modal-actions">
                    <button
                        className="confirm-modal-btn btn-cancel"
                        onClick={onClose}
                    >
                        <FaTimes />
                        {cancelText}
                    </button>
                    <button
                        className={`confirm-modal-btn btn-confirm ${type}`}
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        <FaCheck />
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
