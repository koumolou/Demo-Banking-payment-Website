import { useState, useEffect } from "react";
import { transactions as wallettransactions } from "../services/wallet.js";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");

    useEffect(() => {
        const fetchdata = async () => {
            setError("");
            setLoading(true);
            try {
                const balance = await wallettransactions();
                setTransactions(balance);
            } catch (error) {
                setError(error.response.data.error);
            } finally {
                setLoading(false);
            }
        };

        fetchdata();
    }, []);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    Transactions
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                    Your full transaction history
                </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-gray-800">
                        All Transactions
                    </h3>
                    <span className="text-xs text-gray-400">
                        {transactions.length} total
                    </span>
                </div>
                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : err ? (
                    <p className="text-sm text-red-500">{err}</p>
                ) : transactions.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-4xl mb-3">📭</p>
                        <p className="text-sm text-gray-400">
                            No transactions yet.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Desktop table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-gray-400 border-b">
                                        <th className="pb-3">Date</th>
                                        <th className="pb-3">Type</th>
                                        <th className="pb-3">Amount</th>
                                        <th className="pb-3">Status</th>
                                        <th className="pb-3">Reference</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((tx) => (
                                        <tr
                                            key={tx.id}
                                            className="border-b last:border-0 hover:bg-slate-50"
                                        >
                                            <td className="py-3 text-gray-500">
                                                {new Date(
                                                    tx.created_at,
                                                ).toLocaleDateString()}{" "}
                                                <span className="text-xs text-gray-400">
                                                    {tx.created_at.slice(
                                                        11,
                                                        16,
                                                    )}
                                                </span>
                                            </td>
                                            <td className="py-3">
                                                <span
                                                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                        tx.type === "transfer"
                                                            ? "bg-red-100 text-red-600"
                                                            : tx.type ===
                                                                "credit"
                                                              ? "bg-green-100 text-green-600"
                                                              : "bg-blue-100 text-blue-600"
                                                    }`}
                                                >
                                                    {tx.type === "transfer"
                                                        ? "Sent"
                                                        : tx.type === "credit"
                                                          ? "Received"
                                                          : "Top Up"}
                                                </span>
                                            </td>
                                            <td
                                                className={`py-3 font-medium ${tx.type === "transfer" ? "text-red-500" : "text-green-500"}`}
                                            >
                                                {tx.type === "transfer"
                                                    ? "-"
                                                    : "+"}
                                                ${tx.amount}
                                            </td>
                                            <td className="py-3">
                                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                                                    {tx.status ?? "success"}
                                                </span>
                                            </td>
                                            <td className="py-3 text-gray-400 text-xs">
                                                {tx.reference}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile cards */}
                        <div className="md:hidden flex flex-col gap-3">
                            {transactions.slice(0, 7).map((tx) => (
                                <div
                                    key={tx.id}
                                    className="p-4 rounded-lg bg-slate-50 flex flex-col gap-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                                    tx.type === "transfer"
                                                        ? "bg-red-100 text-red-600"
                                                        : tx.type === "credit"
                                                          ? "bg-green-100 text-green-600"
                                                          : "bg-blue-100 text-blue-600"
                                                }`}
                                            >
                                                {tx.type === "transfer"
                                                    ? "↑"
                                                    : tx.type === "credit"
                                                      ? "↓"
                                                      : "+"}
                                            </div>
                                            <span
                                                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                                    tx.type === "transfer"
                                                        ? "bg-red-100 text-red-600"
                                                        : tx.type === "credit"
                                                          ? "bg-green-100 text-green-600"
                                                          : "bg-blue-100 text-blue-600"
                                                }`}
                                            >
                                                {tx.type === "transfer"
                                                    ? "Sent"
                                                    : tx.type === "credit"
                                                      ? "Received"
                                                      : "Top Up"}
                                            </span>
                                        </div>
                                        <p
                                            className={`font-bold text-sm ${tx.type === "transfer" ? "text-red-500" : "text-green-500"}`}
                                        >
                                            {tx.type === "transfer" ? "-" : "+"}
                                            ${tx.amount}
                                        </p>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span>
                                            {new Date(
                                                tx.created_at,
                                            ).toLocaleDateString()}{" "}
                                            {tx.created_at.slice(11, 16)}
                                        </span>
                                        <span>{tx.reference}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Transactions;
