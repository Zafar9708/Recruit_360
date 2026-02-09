import { motion } from 'framer-motion';
import { 
  Users, Briefcase, TrendingUp, UserCheck, DollarSign, Award, Plus, 
  ChevronRight, ArrowUpRight, Search, Filter
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useNavigate } from 'react-router-dom';
import VendorSidebar from '../components/VendorSidebar';

export default function VendorDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Candidates', value: '142', change: '+12%', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Shortlisted', value: '58', change: '+8%', icon: UserCheck, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { label: 'Active Jobs', value: '34', change: '+2', icon: Briefcase, color: 'text-violet-600', bgColor: 'bg-violet-50' },
    { label: 'Approx. Revenue', value: '$45,000', change: '+24%', icon: DollarSign, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  ];

  const placementData = [
    { month: 'Jan', placements: 8 }, { month: 'Feb', placements: 12 },
    { month: 'Mar', placements: 15 }, { month: 'Apr', placements: 18 },
    { month: 'May', placements: 22 }, { month: 'Jun', placements: 25 },
  ];

  const topCandidates = [
    { name: 'Sarah Johnson', role: 'Senior Developer', placements: 5, rating: 4.8 },
    { name: 'Mike Chen', role: 'Data Scientist', placements: 4, rating: 4.7 },
    { name: 'Emily Davis', role: 'UI/UX Designer', placements: 3, rating: 4.9 },
    { name: 'David Kumar', role: 'DevOps Engineer', placements: 4, rating: 4.6 },
  ];

  const activeClients = [
    { name: 'TechCorp', openPositions: 8, placements: 15 },
    { name: 'InnovateLabs', openPositions: 5, placements: 12 },
    { name: 'CloudSystems', openPositions: 3, placements: 8 },
    { name: 'DataVision', openPositions: 6, placements: 10 },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <VendorSidebar />
      
      <main className="flex-1 overflow-hidden">
        {/* Top Professional Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Vendor Dashboard
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Welcome back, <span className="text-blue-600">{localStorage.getItem('userName') || 'Partner'}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden xl:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Quick search..." 
                  className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-64 transition-all"
                />
              </div>
              <button
                onClick={() => navigate('/vendor/benchlist')}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-blue-600 transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add to Benchlist
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          
          {/* Stats Grid - Cleaner, Minimalist Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 ${stat.bgColor} rounded-lg`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="flex items-center text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {stat.change} <ArrowUpRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
              </div>
            ))}
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Chart Area - 2/3 Width */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Placement Performance</h3>
                  <p className="text-sm text-slate-500">Analytics for the current half-year</p>
                </div>
                <select className="text-sm border-slate-200 rounded-lg focus:ring-blue-500 font-medium">
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={placementData}>
                    <defs>
                      <linearGradient id="colorPlacements" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                    />
                    <Area type="monotone" dataKey="placements" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorPlacements)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Candidates - 1/3 Width */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">Top Performers</h3>
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-5">
                {topCandidates.map((candidate, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-sm font-bold text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{candidate.name}</p>
                        <p className="text-xs text-slate-500">{candidate.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-900">{candidate.placements} P</p>
                      <p className="text-[10px] text-blue-600 font-bold">★ {candidate.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 text-sm font-bold text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                View All Talent
              </button>
            </div>
          </div>

          {/* Active Clients - High Contrast Table Look */}
          <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Partner Partnerships</h3>
              <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View All Clients</button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
              {activeClients.map((client, i) => (
                <div key={i} className="p-8 hover:bg-slate-50 transition-colors cursor-pointer">
                  <h4 className="font-bold text-slate-900 mb-4">{client.name}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500 font-medium">Open Roles</span>
                      <span className="text-sm font-bold text-slate-900">{client.openPositions}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full" style={{width: `${(client.openPositions/10)*100}%`}} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500 font-medium">Total Placements</span>
                      <span className="text-sm font-bold text-blue-600">{client.placements}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}