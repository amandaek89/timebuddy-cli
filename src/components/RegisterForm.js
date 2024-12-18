import React, { useState } from "react";
import { register } from "../services/AuthenticationService";
import { FaTimes } from "react-icons/fa"; // Importera kryss-ikonen
import "../css/ModalForm.css"; // Antag att dessa CSS-filer är rätt konfigurerade
import "../css/TodoModal.css";

const RegisterForm = ({ onClose }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const success = await register(username, password);
            if (success) {
                alert("Du är nu registrerad. Logga in för att fortsätta.");
                onClose(); // Stänger modalen när registreringen lyckas
            } else {
                alert("Registrering misslyckades.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registrering misslyckades på grund av ett serverfel.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Modal header */}
                <div className="modal-header">
                    <h2 className="modal-title">Registrera</h2>
                    <button
                        className="icon-button close-button-update"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <label>
                        <span className="form-label">Användarnamn</span>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </label>
                    <label>
                        <span className="form-label">Lösenord</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </label>
                    <div className="modal-buttons">
                        <button
                            type="submit"
                            className="action-button save-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Registrerar..." : "Registrera"}
                        </button>
                        <button
                            type="button"
                            className="action-button cancel-button"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
