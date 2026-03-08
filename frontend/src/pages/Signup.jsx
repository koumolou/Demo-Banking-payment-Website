import { useContext, useState, useEffect } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { AuthContext } from "../Context/Authcontext";
import AuthLayout from "../layout/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../layout/Navbar";

const Signup = () => {
    const { registerUser, loading, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [toast, setToast] = useState(null);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            await registerUser({ name, email, password });
            setToast({
                message: "Account created successfully",
                type: "success",
            });
        } catch (err) {
            setToast({
                message:
                    error.response?.data?.message || "Unable to create account",
                type: "error",
            });
        }
    };

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                if (toast.type === "success") {
                    navigate("/dashboard", { replace: true });
                }
                setToast(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [toast, navigate]);
    return (
        <>
            <Navbar />
            <AuthLayout logo="" title="Signup To Get Started">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Input Your Username"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        type="email"
                        placeholder="Input Your Email"
                        label="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder="Input Your Password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button type="submit" disabled={loading}>
                        {loading ? (
                            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            "SignIn Now"
                        )}
                    </Button>
                    {toast && (
                        <div
                            className={`fixed top-15 right-5 px-4 py-3 rounded-lg shadow-lg text-white text-sm transition-all
                        ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
                        >
                            {toast.message}
                        </div>
                    )}
                </form>
            </AuthLayout>
        </>
    );
};

export default Signup;
