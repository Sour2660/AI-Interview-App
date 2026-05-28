import React from 'react';
import { motion } from 'framer-motion';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-[2rem] bg-white shadow-2xl md:grid-cols-[1.1fr_1.4fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 px-10 py-12 text-white sm:px-14"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_25%)]" />
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/80">
              AI Interview SaaS
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">Practice interview questions the smart way.</h1>
            <p className="max-w-sm text-sm leading-6 text-white/80">
              Improve your preparation with tailored AI-driven interviews, polished progress flows, and a modern dashboard built for candidates.
            </p>
          </div>
          <div className="absolute bottom-8 right-8 hidden text-right text-xs text-white/60 sm:block">
            <p className="font-semibold">Built for teams and candidates</p>
            <p>Responsive UI, smooth interactions, and modern auth pages.</p>
          </div>
        </motion.div>

        <div className="flex items-center justify-center p-10 sm:p-14">
          <div className="w-full max-w-md space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
