import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  Globe, 
  Smartphone, 
  LogOut, 
  RefreshCw, 
  ChevronRight,
  TrendingUp,
  Activity,
  AlertCircle,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [visits, setVisits] = useState([]);
  const [stats, setStats] = useState({ total: 0, today: 0, unique: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      // Fetch Stats
      const statsRes = await fetch(`${apiUrl}/api/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const statsData = await statsRes.json();
      if (statsRes.ok) setStats(statsData);

      // Fetch Visits
      const visitsRes = await fetch(`${apiUrl}/api/visits`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const visitsData = await visitsRes.json();
      
      if (visitsRes.ok && Array.isArray(visitsData)) {
        setVisits(visitsData.map(v => ({
          ...v,
          timestamp: v.timestamp ? new Date(v.timestamp) : new Date()
        })));
      }

      setIsLoading(false);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const getDeviceIcon = (userAgent) => {
    if (!userAgent) return <Globe className="w-4 h-4" />;
    if (/mobile/i.test(userAgent)) return <Smartphone className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-background text-white p-6 font-sans selection:bg-primary/30">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,#00f0ff,transparent)] pointer-events-none" />
      <div className="fixed inset-0 opacity-10 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-8 relative">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-primary/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary/70 font-mono text-[10px] uppercase tracking-[0.3em]">System Live</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-primary/40 bg-clip-text text-transparent">
              TELEMETRY DASHBOARD
            </h1>
            <p className="text-primary/50 font-mono text-xs uppercase tracking-widest mt-2 flex items-center gap-2">
              <Globe className="w-3 h-3" /> // Monitoring Portfolio Traffic via Local SQL
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchData}
              className="p-2 bg-secondary/50 border border-primary/10 rounded-lg hover:bg-primary/10 transition-all group"
              title="Refresh Data"
            >
              <RefreshCw className={`w-5 h-5 text-primary/70 group-hover:text-primary transition-all ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-5 py-2.5 rounded-xl border border-red-500/20 transition-all font-bold text-sm tracking-tight"
            >
              <LogOut className="w-4 h-4" /> DISCONNECT
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Transmissions', value: stats.total, icon: Activity, color: 'from-primary/20 to-transparent', textColor: 'text-primary' },
            { label: 'Today\'s Pulse', value: stats.today, icon: TrendingUp, color: 'from-green-500/20 to-transparent', textColor: 'text-green-400' },
            { label: 'Unique Entries', value: stats.unique, icon: Users, color: 'from-purple-500/20 to-transparent', textColor: 'text-purple-400' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-secondary/20 backdrop-blur-xl border border-primary/10 p-8 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-all`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
                <stat.icon className="w-16 h-16" />
              </div>
              <div className="relative z-10">
                <p className="text-primary/50 font-mono text-[10px] uppercase tracking-[0.2em] mb-4">{stat.label}</p>
                <h3 className={`text-5xl font-black ${stat.textColor} tracking-tighter`}>
                  {stat.value.toLocaleString()}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-secondary/10 backdrop-blur-md border border-primary/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-primary/10 flex items-center justify-between bg-white/5">
              <h2 className="flex items-center gap-3 font-bold text-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                Detailed Access Logs
              </h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[10px] font-mono text-primary/40 uppercase tracking-widest">
                  Live Stream Active
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-primary/5 text-primary/70 text-[10px] font-mono uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-5">Timestamp</th>
                    <th className="px-8 py-5">Origin</th>
                    <th className="px-8 py-5">Environment</th>
                    <th className="px-8 py-5">Endpoint</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  <AnimatePresence>
                    {isLoading ? (
                      <tr>
                        <td colSpan="4" className="px-8 py-24 text-center">
                          <div className="flex flex-col items-center gap-4 text-primary/30">
                            <RefreshCw className="w-10 h-10 animate-spin" />
                            <p className="font-mono text-xs uppercase tracking-widest italic">Synchronizing Neural Data Buffers...</p>
                          </div>
                        </td>
                      </tr>
                    ) : visits.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-8 py-24 text-center">
                          <p className="text-primary/30 font-mono text-sm italic uppercase tracking-widest">
                            // No Telemetry Data Detected in SQL Database
                          </p>
                        </td>
                      </tr>
                    ) : (
                      visits.map((visit) => (
                        <motion.tr 
                          key={visit.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-primary/5 transition-all group"
                        >
                          <td className="px-8 py-5">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                                {visit.timestamp?.toLocaleTimeString()}
                              </span>
                              <span className="text-[10px] text-primary/40 font-mono uppercase tracking-tighter">
                                {visit.timestamp?.toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2 text-xs font-mono text-primary/80">
                              <Globe className="w-3.5 h-3.5 text-primary/40" />
                              {visit.referrer === 'direct' ? (
                                <span className="text-primary/50 italic font-normal">DIRECT_LINK</span>
                              ) : (
                                <span className="max-w-[150px] truncate" title={visit.referrer}>{visit.referrer}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3 text-xs">
                              <div className="p-2 bg-primary/5 rounded-lg border border-primary/10 group-hover:bg-primary/10 transition-colors">
                                {getDeviceIcon(visit.userAgent)}
                              </div>
                              <span className="text-primary/70 font-mono text-[10px] max-w-[180px] truncate opacity-60 group-hover:opacity-100 transition-opacity" title={visit.userAgent}>
                                {visit.userAgent ? visit.userAgent.split(')')[0].replace('Mozilla/5.0 (', '') : 'UNKNOWN_ENV'}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[9px] font-bold font-mono rounded border border-green-500/20">
                                GET
                              </span>
                              <span className="text-xs font-mono text-white/70 bg-white/5 px-2 py-1 rounded">{visit.page}</span>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar / Quick Tips */}
          <div className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-3xl">
              <h3 className="text-primary font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> System Health
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'Database Status', status: 'Optimal', color: 'text-green-400' },
                  { label: 'Telemetry Engine', status: 'Active', color: 'text-green-400' },
                  { label: 'Email Alerts', status: 'Ready', color: 'text-primary' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-between text-[11px] font-mono border-b border-primary/5 pb-2">
                    <span className="text-white/50">{item.label}</span>
                    <span className={item.color}>{item.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-secondary/10 border border-primary/10 p-6 rounded-3xl backdrop-blur-md">
              <p className="text-[10px] font-mono text-primary/40 uppercase tracking-[0.2em] mb-4 text-center">
                Security Protocol Active
              </p>
              <div className="flex justify-center py-4">
                <div className="p-6 rounded-full bg-primary/5 border-2 border-dashed border-primary/20 animate-spin-slow">
                  <Lock className="w-10 h-10 text-primary opacity-30" />
                </div>
              </div>
              <p className="text-[11px] text-center text-primary/60 font-medium px-4">
                All visitor data is encrypted and stored locally in your SQL database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
