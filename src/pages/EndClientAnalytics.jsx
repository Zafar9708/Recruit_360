import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, UserCheck, Building2, Briefcase, 
  Download, ArrowUpRight, Clock, Search,
  Filter, CheckCircle2, AlertCircle, TrendingUp
} from 'lucide-react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

import EndClientSidebar from '../components/EndClientSidebar';

export default function BusinessAnalyticsPage() {

  // Hiring Flow Data
  const hiringFlow = [
    12,18,15,22,30,28,20,25,35,42,
    38,45,50,48,55,60,52,58,65,70,
    68,75,80,72,85,90,88,95,100,92
  ];

  // Convert to chart format
  const chartData = hiringFlow.map((val, i) => ({
    day: i + 1,
    applications: val
  }));

  return (
    <div className="flex h-screen bg-[#FDFDFD] text-slate-900 font-sans overflow-hidden">

      <EndClientSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* HEADER */}
        <header className="h-16 bg-white flex items-center justify-between px-8 shrink-0 sticky top-0 z-50 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full" />
            <h1 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Hiring Intelligence
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 border-r border-slate-100 pr-4">
              <Clock size={14} /> Updated 2m ago
            </div>

            <button className="text-xs font-bold text-blue-600 flex items-center gap-2">
              <Download size={14} /> Export CSV
            </button>
          </div>
        </header>

        <main className="p-8 max-w-[1200px] mx-auto w-full space-y-10">

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <KpiBlock label="Total Hires" value="124" sub="Last 30 days" />
            <KpiBlock label="Active Candidates" value="2,840" sub="+12% inflow" />
            <KpiBlock label="Avg. Time to Hire" value="18 Days" sub="-2 days improvement" />
            <KpiBlock label="Vendor Efficiency" value="92%" sub="Quality of hire" />
          </div>

          {/* ✅ REAL LINE GRAPH */}
          <section className="space-y-6">

            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight">Candidate Flow</h2>
                <p className="text-xs text-slate-400 font-medium">
                  Daily volume of applications across all active vendors
                </p>
              </div>

              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                Day 1 — Day 30
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 h-[260px]">

              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>

                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

                  <XAxis 
                    dataKey="day"
                    tick={{ fontSize: 10 }}
                    stroke="#94a3b8"
                  />

                  <YAxis 
                    tick={{ fontSize: 10 }}
                    stroke="#94a3b8"
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="applications"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />

                </LineChart>
              </ResponsiveContainer>

            </div>

          </section>

          {/* VENDOR + PIPELINE */}
          <div className="grid lg:grid-cols-2 gap-10">

            {/* Vendors */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Building2 size={16} className="text-slate-400"/> 
                Top Performing Vendors
              </h3>

              <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase">
                        Vendor Name
                      </th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase text-right">
                        Candidates
                      </th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase text-right">
                        Success
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-50">
                    <VendorRow name="Global Talent Corp" count="450" success="94%" />
                    <VendorRow name="Elite Staffing Solutions" count="320" success="88%" />
                    <VendorRow name="TechBridge Partners" count="210" success="91%" />
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pipeline */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Briefcase size={16} className="text-slate-400"/> 
                Pipeline Status
              </h3>

              <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-6">
                <StatusProgress label="Initial Screening" value="1,240" pct="w-[85%]" />
                <StatusProgress label="Technical Interview" value="420" pct="w-[40%]" />
                <StatusProgress label="Final Selection" value="124" pct="w-[15%]" />
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function KpiBlock({ label, value, sub }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <h4 className="text-2xl font-black text-slate-900 tracking-tight">
        {value}
      </h4>
      <p className="text-[10px] font-semibold text-emerald-500">
        {sub}
      </p>
    </div>
  );
}

function VendorRow({ name, count, success }) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 text-xs font-bold text-slate-700">
        {name}
      </td>
      <td className="px-6 py-4 text-xs font-semibold text-slate-500 text-right">
        {count}
      </td>
      <td className="px-6 py-4 text-xs font-bold text-blue-600 text-right">
        {success}
      </td>
    </tr>
  );
}

function StatusProgress({ label, value, pct }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-900">{value}</span>
      </div>

      <div className="h-1 bg-slate-50 rounded-full">
        <div className={`h-full ${pct} bg-blue-600 rounded-full`} />
      </div>
    </div>
  );
}
