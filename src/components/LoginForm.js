import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { login } from "../services/AuthenticationService";
import "../css/ModalForm.css"; // Antag att dessa CSS-filer är rätt konfigurerade
import "../css/TodoModal.css";

const LoginModal = ({ navigate, onClose }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const token = await login(username, password);
            if (token) {
                navigate("/startpage"); // Navigera när inloggningen lyckas
                onClose(); // Stänger modalen efter lyckad inloggning
            } else {
                alert("Sign in failed. Check username or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed due to a server issue.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Modal header */}
                <div className="modal-header">
                    <h2 className="modal-title">Login</h2>
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
                        <span className="form-label">Username</span>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </label>
                    <label>
                        <span className="form-label">Password</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </label>
                    <div className="modal-buttons">
                        <button
                            type="submit"
                            className="action-button save-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Logging in..." : "Sign in"}
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

export default LoginModal;
