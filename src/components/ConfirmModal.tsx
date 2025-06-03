import React from "react";

interface ConfirmModalProps {
  show: boolean;
  title: string;
  message: string;
  loading?: boolean;
  onCancel: () => void;
  onPrimary: () => void;
  onSecondary?: () => void;
  primaryText?: string;
  secondaryText?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  title,
  message,
  loading = false,
  onCancel,
  onPrimary,
  onSecondary,
  primaryText = "Aceptar",
  secondaryText = "Secundario",
  primaryColor = "danger",
  secondaryColor = "warning",
}) => {
  if (!show) return null;
  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex={-1}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
              ></button>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={onCancel}
                disabled={loading}
              >
                Cancelar
              </button>
              {onSecondary && (
                <button
                  className={`btn btn-${secondaryColor}`}
                  onClick={onSecondary}
                  disabled={loading}
                >
                  {secondaryText}
                </button>
              )}
              <button
                className={`btn btn-${primaryColor}`}
                onClick={onPrimary}
                disabled={loading}
              >
                {primaryText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};
