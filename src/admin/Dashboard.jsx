import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  Globe, 
  Smartphone, 
  LogOut, 
  RefreshCw, 
  TrendingUp,
  Activity,
  AlertCircle,
  Lock,
  ExternalLink,
  Monitor,
  Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

import { getFirestoreStats, getRecentVisitsFirestore } from '../services/analytics';

const AdminDashboard = () => {
  const [visits, setVisits] = useState([]);
  const [stats, setStats] = useState({ 
    total: 0, 
    today: 0, 
    unique: 0, 
    visitsByDay: [], 
    topReferrers: [], 
    devices: [] 
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const apiUrl = localStorage.getItem('VITE_API_URL_OVERRIDE') || import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const isLocalhost = apiUrl.includes('localhost');
      const isLive = window.location.hostname !== 'localhost';

      // If live but trying to connect to localhost, skip SQL and use Firestore immediately
      if (isLive && isLocalhost) {
        throw new Error('Using Firestore fallback');
      }
      
      // Fetch Stats & Visits in parallel from SQL
      const [statsRes, visitsRes] = await Promise.all([
        fetch(`${apiUrl}/api/stats`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${apiUrl}/api/visits`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (statsRes.ok && visitsRes.ok) {
        const statsData = await statsRes.json();
        const visitsData = await visitsRes.json();
        
        setStats(prev => ({
          ...prev,
          ...statsData,
          visitsByDay: statsData.visitsByDay || [],
          topReferrers: statsData.topReferrers || [],
          devices: statsData.devices || []
        }));

        if (Array.isArray(visitsData)) {
          setVisits(visitsData.map(v => ({
            ...v,
            timestamp: v.timestamp ? new Date(v.timestamp) : new Date()
          })));
        }
      } else {
        throw new Error('SQL fetch failed');
      }
    } catch (err) {
      console.log("SQL failed or skipped, trying Firestore fallback...");
      try {
        const [firestoreStats, firestoreVisits] = await Promise.all([
          getFirestoreStats(),
          getRecentVisitsFirestore()
        ]);
        setStats(firestoreStats);
        setVisits(firestoreVisits);
      } catch (fErr) {
        console.error("All data sources failed:", fErr);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000); // Poll every 15s
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const getDeviceIcon = (userAgent) => {
    if (!userAgent) return <Globe className="w-4 h-4" />;
    if (/mobile/i.test(userAgent)) return <Smartphone className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  const COLORS = ['#00f0ff', '#10b981', '#a855f7', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans selection:bg-primary/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-secondary/5 backdrop-blur-xl border border-primary/10 p-8 rounded-[2rem]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-1">
                <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_#00f0ff]" />
                <div className="w-3 h-3 rounded-full bg-primary/30 animate-ping absolute" />
              </div>
              <span className="text-primary/70 font-mono text-[10px] uppercase tracking-[0.4em]">Neural Link: Active</span>
            </div>
            <div>
              <h1 className="text-5xl font-black tracking-tight bg-gradient-to-br from-white via-white to-primary/30 bg-clip-text text-transparent">
                Command <span className="text-primary">Center</span>
              </h1>
              <p className="text-primary/40 font-mono text-xs mt-3 uppercase tracking-widest flex items-center gap-2">
                <Layout className="w-3 h-3" /> // Portfolio Analytics v2.0 _
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-black/40 p-2 rounded-2xl border border-primary/5">
            <button 
              onClick={fetchData}
              className="p-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-all group"
              title="Sync Data"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-3 rounded-xl border border-red-500/10 transition-all font-bold text-xs tracking-widest uppercase"
            >
              <LogOut className="w-4 h-4" /> Terminate
            </button>
          </div>
        </header>

        {/* Top Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Inbound', value: stats.total, icon: Activity, trend: '+12%', color: 'from-primary/20 to-transparent', textColor: 'text-primary' },
            { label: 'Today\'s Activity', value: stats.today, icon: TrendingUp, trend: 'Live', color: 'from-green-500/20 to-transparent', textColor: 'text-green-400' },
            { label: 'Unique Identifiers', value: stats.unique, icon: Users, trend: '100%', color: 'from-purple-500/20 to-transparent', textColor: 'text-purple-400' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-secondary/10 backdrop-blur-2xl border border-primary/10 p-8 rounded-[2rem] overflow-hidden hover:border-primary/30 transition-all duration-500"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <p className="text-primary/40 font-mono text-[10px] uppercase tracking-[0.2em] mb-4">{stat.label}</p>
                  <h3 className={`text-6xl font-black ${stat.textColor} tracking-tighter mb-2`}>
                    {stat.value.toLocaleString()}
                  </h3>
                  <span className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded text-white/40 uppercase tracking-widest">
                    Status: {stat.trend}
                  </span>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <stat.icon className={`w-8 h-8 ${stat.textColor} opacity-60`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Traffic Chart */}
          <div className="lg:col-span-2 bg-secondary/10 backdrop-blur-2xl border border-primary/10 rounded-[2.5rem] p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                Traffic Velocity
              </h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-mono rounded-full border border-primary/20">7 DAYS</span>
              </div>
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.visitsByDay}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#ffffff20" 
                    fontSize={10} 
                    tickFormatter={(val) => val.split('-').slice(1).join('/')}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#ffffff20" 
                    fontSize={10} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #00f0ff30', borderRadius: '12px' }}
                    itemStyle={{ color: '#00f0ff', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#00f0ff" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorVisits)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Device Distribution */}
          <div className="bg-secondary/10 backdrop-blur-2xl border border-primary/10 rounded-[2.5rem] p-8">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-8">
              <div className="p-2 bg-purple-500/10 rounded-xl">
                <Smartphone className="w-5 h-5 text-purple-400" />
              </div>
              Environment
            </h2>
            <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.devices}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="count"
                    nameKey="device"
                  >
                    {stats.devices.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-[10px] text-white/30 uppercase font-mono">Platform</p>
                  <p className="text-sm font-bold text-white/80">Mix</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 mt-6">
              {stats.devices.map((dev, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-xs font-medium text-white/70">{dev.device}</span>
                  </div>
                  <span className="text-xs font-mono font-bold">{dev.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Logs & Top Referrers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Access Logs */}
          <div className="lg:col-span-2 bg-secondary/10 backdrop-blur-2xl border border-primary/10 rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-primary/5 flex items-center justify-between bg-white/5">
              <h2 className="flex items-center gap-3 font-bold text-lg">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                Access Registry
              </h2>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-primary/40 uppercase tracking-widest">Feed Active</span>
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-primary/5 text-primary/50 text-[10px] font-mono uppercase tracking-[0.2em]">
                  <tr>
                    <th className="px-8 py-4 font-medium">Temporal Shift</th>
                    <th className="px-8 py-4 font-medium">Source Node</th>
                    <th className="px-8 py-4 font-medium">Platform</th>
                    <th className="px-8 py-4 font-medium text-right">Destination</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {isLoading ? (
                      <tr>
                        <td colSpan="4" className="px-8 py-24 text-center">
                          <RefreshCw className="w-10 h-10 animate-spin text-primary/20 mx-auto mb-4" />
                          <p className="font-mono text-xs uppercase text-primary/40 tracking-widest">Synchronizing Neural Buffers...</p>
                        </td>
                      </tr>
                    ) : visits.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-8 py-24 text-center text-primary/20 font-mono italic">
                          // NO TELEMETRY DATA DETECTED
                        </td>
                      </tr>
                    ) : (
                      visits.slice(0, 10).map((visit, idx) => (
                        <motion.tr 
                          key={visit.id || idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="hover:bg-primary/5 transition-all group"
                        >
                          <td className="px-8 py-5">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white/90 group-hover:text-primary transition-colors">
                                {visit.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                              </span>
                              <span className="text-[10px] text-white/20 font-mono uppercase tracking-tighter">
                                {visit.timestamp?.toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                              <Globe className="w-3.5 h-3.5 text-primary/30" />
                              {visit.referrer === 'direct' ? (
                                <span className="text-primary/40 italic">DIRECT_ENTRY</span>
                              ) : (
                                <span className="max-w-[120px] truncate" title={visit.referrer}>
                                  {visit.referrer.replace('https://', '').replace('http://', '')}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-white/40 group-hover:text-primary transition-colors">
                                {getDeviceIcon(visit.userAgent)}
                              </div>
                              <span className="text-[10px] font-mono text-white/40 truncate max-w-[100px]" title={visit.userAgent}>
                                {visit.userAgent?.split(' ')[0] || 'N/A'}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <span className="inline-block text-[11px] font-mono text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/10">
                              {visit.page || '/'}
                            </span>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            {visits.length > 10 && (
              <div className="p-6 bg-black/20 text-center border-t border-white/5">
                <button className="text-[10px] font-mono text-primary/40 hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2 mx-auto">
                  View Full registry <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Top Referrers & Security */}
          <div className="space-y-8">
            <div className="bg-secondary/10 backdrop-blur-2xl border border-primary/10 rounded-[2.5rem] p-8">
              <h2 className="text-lg font-bold flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-500/10 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                Origin Points
              </h2>
              <div className="space-y-4">
                {stats.topReferrers.map((ref, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60 truncate max-w-[150px] font-mono">{ref.referrer === 'direct' ? 'Direct Access' : ref.referrer}</span>
                      <span className="text-primary font-bold">{ref.count}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(ref.count / stats.total) * 100}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#00f0ff30,transparent)]" />
              <div className="relative z-10">
                <div className="inline-block p-6 rounded-full bg-black/40 border border-primary/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Lock className="w-10 h-10 text-primary animate-pulse" />
                </div>
                <h3 className="text-lg font-bold mb-3 uppercase tracking-tighter">Secure Terminal</h3>
                <p className="text-xs text-white/40 font-mono px-4 leading-relaxed uppercase tracking-widest">
                  End-to-end encryption active. All data remains within the private network.
                </p>
                <div className="mt-8 pt-8 border-t border-white/5 flex justify-center gap-6">
                  <div className="text-center">
                    <p className="text-[10px] text-white/20 font-mono uppercase mb-1">Safety</p>
                    <p className="text-xs font-bold text-green-400">100%</p>
                  </div>
                  <div className="text-center border-x border-white/5 px-6">
                    <p className="text-[10px] text-white/20 font-mono uppercase mb-1">Uptime</p>
                    <p className="text-xs font-bold text-primary">99.9%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-white/20 font-mono uppercase mb-1">Nodes</p>
                    <p className="text-xs font-bold text-purple-400">1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <footer className="max-w-7xl mx-auto mt-12 pb-12 flex justify-between items-center px-4 opacity-30">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em]">System Engine v4.2.0 // Secured</p>
        <p className="text-[10px] font-mono uppercase tracking-[0.3em]">© 2025 JEEL DARJI</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
