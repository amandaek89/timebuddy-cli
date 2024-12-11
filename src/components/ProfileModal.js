import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import UserService from "../services/UserService";
import "../css/ProfileModal.css";
import {FaTimes} from "react-icons/fa";

// Funktion för att hämta användarnamn från token
const getUsernameFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return "Okänd användare";

    try {
        const decoded = jwtDecode(token);
        return decoded.sub || "Okänd användare"; // Använd 'sub' för användarnamnet om det finns
    } catch (err) {
        console.error("Fel vid avkodning av token:", err);
        return "Okänd användare";
    }
};

const ProfileModal = ({ isOpen, onClose }) => {
    const [view, setView] = useState("main");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");

    // Hämta användarnamn när modalen öppnas
    useEffect(() => {
        if (isOpen) {
            setUsername(getUsernameFromToken());
        }
    }, [isOpen]);

    const resetMessages = () => {
        setError("");
        setSuccess("");
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        resetMessages();

        if (newPassword !== confirmPassword) {
            setError("De nya lösenorden matchar inte.");
            return;
        }

        try {
            const username = getUsernameFromToken();
            if (username === "Okänd användare") {
                throw new Error("Kunde inte hitta användarnamn i token.");
            }

            const response = await UserService.updatePassword({
                username,
                currentPassword,
                newPassword,
            });

            setSuccess("Lösenordet har uppdaterats.");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError(err.message || "Fel vid uppdatering av lösenord.");
        }
    };

    const handleDeleteAccount = async () => {
        resetMessages();

        try {
            const username = getUsernameFromToken();
            if (username === "Okänd användare") {
                throw new Error("Kunde inte hitta användarnamn i token.");
            }

            await UserService.deleteUser(username);
            setSuccess("Kontot har raderats.");
            onClose(); // Stänger modalen
        } catch (err) {
            setError(err.message || "Fel vid radering av konto.");
        }
    };

    // Om modal inte är öppen, returnera null
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button
                    className="icon-button-profile close-button"
                    onClick={onClose}
                    aria-label="Stäng"
                >
                    <FaTimes/>
                </button>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                {view === "main" && (
                    <div>
                        <h3>Användarnamn: {username}</h3>
                        <button
                            onClick={() => {
                                resetMessages();
                                setView("changePassword");
                            }}
                        >
                            Byt lösenord
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => {
                                if (window.confirm("Är du säker på att du vill ta bort ditt konto?")) {
                                    handleDeleteAccount().then(r => console.log(r));
                                }
                            }}
                        >
                            Radera konto
                        </button>
                    </div>
                )}

                {view === "changePassword" && (
                    <div>
                        <h3>Byt lösenord</h3>
                        <form onSubmit={handlePasswordChange}>
                            <input
                                type="password"
                                placeholder="Nuvarande lösenord"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Nytt lösenord"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Bekräfta nytt lösenord"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Uppdatera lösenord</button>
                        </form>
                        <button
                            onClick={() => {
                                resetMessages();
                                setView("main");
                            }}
                        >
                            Tillbaka
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileModal;
