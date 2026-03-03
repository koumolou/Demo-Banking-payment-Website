const AuthLayout = ({ children, logo, title }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
                {/* Branding */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-600">
                        💳 BankApp
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                        personal banking
                    </p>
                </div>

                <h4 className="text-center font-medium text-gray-700 mb-6">
                    {title}
                </h4>

                {logo && (
                    <div className="mb-6 flex justify-center">
                        <img src={logo} alt="Logo" className="h-12" />
                    </div>
                )}

                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
