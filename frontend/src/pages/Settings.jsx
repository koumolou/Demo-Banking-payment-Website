import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { updateProfile, changePassword } from "../services/auth.js";
import { useState, useEffect } from "react";

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [confimedPassword, setConfirmedPassword] = useState("");
    const [error, setError] = useState("");
    const [toast, setToast] = useState(null);

    const auth = async (e) => {
        e.preventDefault();
        setError("");
        if (password2 !== confimedPassword) {
            setError("Password Mismatch");
        } else {
            setLoading(true);
            try {
                const newp = await changePassword({
                    current_password: password1,
                    password: password2,
                    password_confirmation: confimedPassword,
                });
                setToast({
                    message: "Password changed successfully",
                    type: "success",
                });
            } catch (error) {
                setToast({
                    message:
                        error.response?.data?.message || "Failed to change",
                    type: "error",
                });
            } finally {
                setLoading(false);
            }
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading1(true);
        setError("");

        try {
            const setnew = await updateProfile({ name, email });

            setToast({
                message: "Profile updated successfully",
                type: "success",
            });
        } catch (error) {
            setToast({
                message: error.response?.data?.message || "Failed to change",
                type: "error",
            });
        } finally {
            setLoading1(false);
        }
    };

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [toast]);
    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                <p className="text-sm text-gray-400 mt-1">
                    Manage your profile and security
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Update Profile */}
                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-lg">👤</span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">
                                Update Profile
                            </h3>
                            <p className="text-xs text-gray-400">
                                Change your name and email
                            </p>
                        </div>
                    </div>

                    <form className="flex flex-col gap-4" onSubmit={submit}>
                        <Input
                            type="text"
                            label="Full Name"
                            placeholder="Input new username"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            type="email"
                            label="Email Address"
                            placeholder="Input new email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading1 ? (
                                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Save changes"
                            )}
                        </Button>
                    </form>
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-lg">🔒</span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">
                                Change Password
                            </h3>
                            <p className="text-xs text-gray-400">
                                Keep your account secure
                            </p>
                        </div>
                    </div>

                    <form className="flex flex-col gap-4" onSubmit={auth}>
                        <Input
                            type="password"
                            label="Current Password"
                            placeholder="Enter current password"
                            required
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                        />
                        <Input
                            type="password"
                            label="New Password"
                            placeholder="Enter new password"
                            required
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                        <Input
                            type="password"
                            label="Confirm New Password"
                            placeholder="Confirm new password"
                            value={confimedPassword}
                            onChange={(e) =>
                                setConfirmedPassword(e.target.value)
                            }
                            required
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Update password"
                            )}
                        </Button>
                        {error}
                    </form>
                </div>
            </div>

            {toast && (
                <div
                    className={`fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white text-sm transition-all
                        ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
                >
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default Settings;
