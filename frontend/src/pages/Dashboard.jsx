import { AuthContext } from "../Context/Authcontext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router";
import Button from "../components/ui/Button";
import {
    balance as walletbalance,
    transactions as wallettransactions,
} from "../services/wallet.js";

function Dashboard() {
    const { user, balance } = useContext(AuthContext);
    const [balancee, setBalance] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoad(true);
            try {
                const [bcheck, tcheck] = await Promise.all([
                    walletbalance(),
                    wallettransactions(),
                ]);

                setBalance(bcheck);
                setTransactions(tcheck);
            } catch (error) {
                console.log(error.response?.data?.error);
            } finally {
                setLoad(false);
            }
        };

        fetchData();
    }, []);

    if (load)
        return (
            <div className="w-10 h-10 border-4 border-blue-500  flex items-center justify-center mx-auto my-10 border-t-transparent rounded-full animate-spin"></div>
        );

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    Welcome back, {user?.name} 👋
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                    {new Date().toDateString()}
                </p>
            </div>

            {/* Balance Card */}
            <div className="bg-blue-600 text-white rounded-xl p-6 shadow mb-6">
                <p className="text-sm text-blue-200 mb-1">Total Balance</p>
                <h2 className="text-4xl font-bold mb-4">
                    ${balance?.balance ?? "0.00"}
                </h2>
                <div className="flex gap-3">
                    <Link to="/dashboard/topup">
                        <Button variant="secondary">Top Up</Button>
                    </Link>
                    <Link to="/dashboard/transfer">
                        <Button variant="secondary">Transfer</Button>
                    </Link>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">
                        Recent Transactions
                    </h3>
                    <Link
                        to="/dashboard/transactions"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        View All
                    </Link>
                </div>

                {transactions.length === 0 ? (
                    <p className="text-sm text-gray-400">
                        No transactions yet.
                    </p>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-400 border-b">
                                <th className="pb-2">Date</th>
                                <th className="pb-2">Type</th>
                                <th className="pb-2">Amount</th>
                                <th className="pb-2">Status</th>
                                <th className="pb-2">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.slice(0, 5).map((tx, index) => (
                                <tr
                                    key={index}
                                    className="border-0 last:border-0 hover:bg-slate-50"
                                >
                                    <td className="py-3 text-gray-500">
                                        {new Date(
                                            tx.created_at,
                                        ).toLocaleDateString()}
                                    </td>
                                    {/* Type badge */}
                                    <td className="py-3">
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
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
                                    </td>

                                    {/* Amount */}
                                    <td
                                        className={`py-3 font-medium ${
                                            tx.type === "transfer"
                                                ? "text-red-500"
                                                : "text-green-500"
                                        }`}
                                    >
                                        {tx.type === "transfer" ? "-" : "+"}$
                                        {tx.amount}
                                    </td>
                                    <td className="py-3">
                                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                                            {tx.status ?? "success"}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                                            {tx.created_at.slice(0, 16) ??
                                                "success"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
