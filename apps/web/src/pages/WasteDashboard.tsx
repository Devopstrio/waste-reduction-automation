import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { 
  Recycle, 
  Trash2, 
  Activity,
  ArrowUpRight,
  TrendingDown,
  Clock,
  Database,
  Cpu,
  ChevronRight,
  CheckCircle,
  Zap,
  Leaf,
  DollarSign
} from 'lucide-react';

const savingsData = [
  { name: 'Mon', savings: 120, carbon: 45 },
  { name: 'Tue', savings: 145, carbon: 52 },
  { name: 'Wed', savings: 310, carbon: 88 },
  { name: 'Thu', savings: 160, carbon: 58 },
  { name: 'Fri', savings: 130, carbon: 48 },
  { name: 'Sat', savings: 80, carbon: 30 },
  { name: 'Sun', savings: 120, carbon: 42 },
];

const KPI_CARDS = [
  { title: 'Waste Resources', value: '142', trend: '-12%', color: 'amber', icon: Trash2 },
  { title: 'Potential Savings', value: '$12,450', trend: '+$2K', color: 'emerald', icon: DollarSign },
  { title: 'Efficiency Score', value: '84.6%', trend: '+2.4%', color: 'emerald', icon: CheckCircle },
  { title: 'CO2e Reduction', value: '425kg', trend: '+45kg', color: 'emerald', icon: Leaf },
];

const WasteDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Waste Reduction Hub</h1>
          <p className="text-slate-400">Enterprise-grade cloud resource optimization, waste detection, and automated remediation.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-slate-800">
            Export Waste Audit
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-emerald-600/20">
            Execute Remediation Scan
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-emerald-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-emerald-400`} />
              </div>
              <div className={`text-xs font-medium ${card.color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Savings vs Carbon */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Optimization Impact (Savings vs Carbon)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={savingsData}>
                <defs>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="savings" stroke="#10b981" fill="url(#colorSavings)" name="Savings ($)" />
                <Area type="monotone" dataKey="carbon" stroke="#fbbf24" fill="none" name="CO2e Reduction (kg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Waste Distribution */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Waste Type Distribution</h3>
          <div className="flex-1 space-y-6">
            {[
              { label: 'Idle Compute (EC2/EKS)', score: 45, color: 'bg-emerald-500', status: 'HIGH' },
              { label: 'Unused Storage (EBS)', score: 32, color: 'bg-emerald-500', status: 'MEDIUM' },
              { label: 'Zombie Load Balancers', score: 15, color: 'bg-amber-500', status: 'LOW' },
              { label: 'Overprovisioned DBs', score: 8, color: 'bg-amber-500', status: 'LOW' },
            ].map((node) => (
              <div key={node.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{node.label}</span>
                  <span className="text-slate-400 font-bold">{node.score}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${node.color}`} style={{ width: `${node.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex gap-3">
            <Zap className="text-emerald-400 shrink-0" size={18} />
            <p className="text-xs text-slate-400">Remediation Insight: <span className="text-emerald-400 font-bold">$1,240 additional savings</span> possible by automating the shutdown of <span className="text-amber-400 font-bold">Sandbox</span> environments after 6 PM.</p>
          </div>
        </div>
      </div>

      {/* Waste Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Detected Waste Items</h3>
          <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">View Policy Violations</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Resource ID / Type</th>
                <th className="px-6 py-4 font-semibold">Waste Issue</th>
                <th className="px-6 py-4 font-semibold">Est. Savings</th>
                <th className="px-6 py-4 font-semibold">Util Score</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { id: 'i-0a2b3c4d', type: 'EC2', issue: 'IDLE_COMPUTE', savings: '$420/mo', util: '2.1%', status: 'PENDING' },
                { id: 'vol-9z8y7x6w', type: 'EBS', issue: 'UNUSED_STORAGE', savings: '$85/mo', util: '0.0%', status: 'REMEDIATED' },
                { id: 'alb-1k2j3h4g', type: 'ALB', issue: 'ZOMBIE_RESOURCE', savings: '$35/mo', util: '0.0%', status: 'PENDING' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-200">{row.id}</span>
                      <span className="text-xs text-slate-500">{row.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">{row.issue}</td>
                  <td className="px-6 py-4 text-sm text-emerald-400 font-bold">{row.savings}</td>
                  <td className="px-6 py-4 text-sm text-amber-400 font-bold">{row.util}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                      row.status === 'REMEDIATED' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 
                      'text-amber-400 border-amber-500/20 bg-amber-500/10'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-emerald-400 hover:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                      Remediate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WasteDashboard;
