import React from 'react';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';

export default function ForbiddenPage({ onOpenLogin, onBackToApp }) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-slate-100">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-red-500/10 text-red-400 rounded-3xl flex items-center justify-center mx-auto border border-red-500/20 shadow-2xl">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-mono font-semibold tracking-wide uppercase">
            403 Forbidden
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-3">Access Denied</h1>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            You do not have administrator permissions to view this analytics dashboard. Every request is verified on the backend.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={onOpenLogin}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
          >
            <Lock className="w-4 h-4" />
            <span>Admin Sign In</span>
          </button>
          <button
            onClick={onBackToApp}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl text-sm transition-all flex items-center justify-center gap-2 border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Note.ly</span>
          </button>
        </div>
      </div>
    </div>
  );
}
