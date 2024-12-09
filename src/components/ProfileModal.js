import React, { useState } from "react";
import UserService from "../services/UserService"; // För att kunna göra API-anropen
import "../css/ProfileModal.css";

const ProfileModal = ({ isOpen, onClose }) => {
    const [view, setView] = useState("main");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Funktion för att uppdatera lösenord
    const handlePasswordChange = async (e) => {
        e.preventDefault();

        // Kontrollera om de nya lösenorden matchar
        if (newPassword !== confirmPassword) {
            setError("De nya lösenorden matchar inte.");
            return;
        }

        try {
            const username = localStorage.getItem('username'); // Hämta användarnamnet från localStorage
            // Skapa objekt för att skicka till backend
            const data = {
                username,
                currentPassword,
                newPassword,
            };

            // Anropa din service för att uppdatera lösenordet
            const response = await UserService.updatePassword(data);
            setSuccess(response);
            setError('');

            // Återställ fält efter framgång
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.message || 'Fel vid uppdatering av lösenord');
        }
    };

    // Funktion för att radera konto
    const handleDeleteAccount = async () => {
        try {
            const username = localStorage.getItem('username'); // Hämta användarnamnet från localStorage
            const response = await UserService.deleteUser(username);
            setSuccess(response);
            setError('');
            onClose(); // Stäng modalen efter borttagning av konto
        } catch (err) {
            setError(err.message || "Fel vid radering av konto");
        }
    };

    // Om modal inte är öppen, returnera null
    if (!isOpen) return null;

    let username = localStorage.getItem('username'); // Hämta användarnamnet från localStorage
    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>
                    ×
                </button>

                <h2>Profil</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                {view === "main" && (
                    <div>
                        <h3>Användarnamn: {username}</h3>
                        <button onClick={() => setView("changePassword")}>Byt lösenord</button>
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
                        <button onClick={handlePasswordChange}>Uppdatera lösenord</button>
                        <button onClick={() => setView("main")}>Tillbaka</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileModal;
