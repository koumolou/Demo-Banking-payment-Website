import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { transfer } from "../services/wallet.js";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Context/Authcontext.jsx";

const Transfer = () => {
    const { refreshBalance } = useContext(AuthContext);
    const [amount, setAmount] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");
    const [toast, setToast] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        const numericAmount = Number(amount);

        if (numericAmount <= 0) {
            setError("Enter an amount above 0");
        } else {
            setLoading(true);

            try {
                await transfer({
                    amount: numericAmount,
                    receiver_email: email,
                });
                refreshBalance();
                setToast({
                    message: "Transaction successful",
                    type: "success",
                });

                setAmount("");
                setEmail("");
            } catch (error) {
                setToast({
                    message:
                        error.response?.data?.message || "Transaction failed",
                    type: "error",
                });
            } finally {
                setLoading(false);
            }
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
        <div className="p-8 max-w-4xl mx-auto my-10 ">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Transfer</h1>
                <p className="text-sm text-gray-400 mt-1">
                    Send Money To Family and Friends
                </p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-xl shadow p-8 max-w-md mx-auto ">
                {/* Icon */}
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">💳</span>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        type="number"
                        label="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount e.g 100"
                        required
                    />
                    <Input
                        type="email"
                        label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Input Recipient Email"
                        required
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Transfer Now"
                        )}
                    </Button>

                    {err && (
                        <div className="text-center text-xs text-white bg-red-500 p-2.5 rounded-lg">
                            {err}
                        </div>
                    )}

                    <Link
                        to="/dashboard"
                        className="text-center text-sm text-blue-600 hover:underline mt-2"
                    >
                        ← Back to Dashboard
                    </Link>
                </form>
            </div>

            {/* Toast */}
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

export default Transfer;
