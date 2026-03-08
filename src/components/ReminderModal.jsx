import { Target, X } from "lucide-react";

function ReminderModal({ isOpen, onClose, onLogNow }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-fadeIn"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-800 p-8 sm:p-10 animate-scaleUp overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3 transform transition-transform hover:rotate-0">
                        <Target className="w-10 h-10 text-white" />
                    </div>

                    <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white mb-3">
                        Progress Check!
                    </h2>

                    <p className="text-slate-600 dark:text-slate-400 font-medium text-lg leading-relaxed mb-8">
                        It's time to log your weekly progress. Keep your streak alive!
                    </p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={onLogNow}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            Log Weekly Progress
                        </button>

                        <button
                            onClick={onClose}
                            className="w-full py-4 text-slate-500 dark:text-slate-400 font-bold hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

export default ReminderModal;
