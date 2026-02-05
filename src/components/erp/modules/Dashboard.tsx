import { 
  ShoppingCart, 
  Wrench, 
  DollarSign, 
  Package, 
  TrendingUp, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  ArrowUp,
  ArrowDown,
  Zap
} from 'lucide-react';
import { ModuleType } from '../../../App';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../ThemeContext';

interface DashboardProps {
  onNavigate: (module: ModuleType) => void;
}

const salesData = [
  { name: 'Seg', vendas: 4200, servicos: 2400 },
  { name: 'Ter', vendas: 3800, servicos: 2800 },
  { name: 'Qua', vendas: 5200, servicos: 3200 },
  { name: 'Qui', vendas: 4600, servicos: 2900 },
  { name: 'Sex', vendas: 6800, servicos: 4100 },
  { name: 'Sáb', vendas: 7200, servicos: 3800 },
  { name: 'Dom', vendas: 3400, servicos: 1900 },
];

const recentOrders = [
  { id: 'OS-2847', client: 'João Silva', device: 'iPhone 14 Pro', status: 'em-reparo', time: '2h atrás' },
  { id: 'OS-2846', client: 'Maria Santos', device: 'Samsung S23', status: 'aguardando', time: '3h atrás' },
  { id: 'OS-2845', client: 'Carlos Souza', device: 'MacBook Air', status: 'concluido', time: '5h atrás' },
  { id: 'OS-2844', client: 'Ana Costa', device: 'iPad Pro', status: 'em-reparo', time: '6h atrás' },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  const { theme } = useTheme();

  const kpis = [
    { 
      id: 'os',
      title: 'OS Abertas', 
      value: '28', 
      change: '+12%', 
      positive: true, 
      icon: Wrench,
      gradient: 'from-orange-500 to-orange-600',
      color: '#f97316'
    },
    { 
      id: 'vendas',
      title: 'Vendas Hoje', 
      value: 'R$ 12.4K', 
      change: '+8%', 
      positive: true, 
      icon: ShoppingCart,
      gradient: 'from-green-500 to-green-600',
      color: '#10b981'
    },
    { 
      id: 'caixa',
      title: 'Caixa Atual', 
      value: 'R$ 8.2K', 
      change: '+15%', 
      positive: true, 
      icon: DollarSign,
      gradient: 'from-blue-500 to-blue-600',
      color: '#3b82f6'
    },
    { 
      id: 'estoque',
      title: 'Estoque Baixo', 
      value: '12', 
      change: '-4', 
      positive: false, 
      icon: Package,
      gradient: 'from-red-500 to-red-600',
      color: '#ef4444'
    },
  ];

  return (
    <div 
      className="h-full overflow-y-auto"
      style={{ background: 'var(--content-bg)' }}
    >
      {/* Header - Adaptável por tema */}
      <div 
        className={`border-b px-8 py-6 ${theme === 'modern' ? 'glass-card' : ''}`}
        style={{ 
          background: theme === 'modern' 
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
            : 'var(--card-bg)',
          borderColor: 'var(--card-border)'
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 
              className="mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              {theme === 'modern' && '✨ '}Dashboard{theme === 'dark' && ' Pro'}
            </h1>
            <p style={{ color: 'var(--foreground)', opacity: 0.7 }}>
              Visão geral do negócio em tempo real
            </p>
          </div>
          <div className="flex items-center gap-3" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
            <Clock className="w-5 h-5" />
            <span className="text-sm">Última atualização: agora</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* KPIs - Diferentes por tema */}
        <div className={`grid gap-6 ${theme === 'dark' ? 'grid-cols-2' : 'grid-cols-4'}`}>
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            
            // MODERN PREMIUM - Gradientes vibrantes
            if (theme === 'modern') {
              return (
                <div 
                  key={kpi.id}
                  className={`bg-gradient-to-br ${kpi.gradient} rounded-3xl p-6 text-white shadow-xl animate-card hover:scale-105 cursor-pointer`}
                  style={{ transition: 'var(--transition)' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div 
                      className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full ${
                        kpi.positive ? 'bg-white/20' : 'bg-black/20'
                      }`}
                    >
                      {kpi.positive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      <span>{kpi.change}</span>
                    </div>
                  </div>
                  <p className="text-sm opacity-90 mb-1">{kpi.title}</p>
                  <p className="text-4xl font-bold">{kpi.value}</p>
                </div>
              );
            }
            
            // MINIMALIST CLEAN - Cards brancos flat
            if (theme === 'minimalist') {
              return (
                <div 
                  key={kpi.id}
                  className="bg-white rounded-xl p-6 border animate-card hover:shadow-md cursor-pointer"
                  style={{ 
                    borderColor: 'var(--card-border)',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'var(--transition)'
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ 
                        background: kpi.color + '15',
                        color: kpi.color
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span 
                      className={`text-sm font-medium ${kpi.positive ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {kpi.change}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-2">{kpi.title}</p>
                  <p className="text-3xl font-semibold text-neutral-900">{kpi.value}</p>
                </div>
              );
            }
            
            // DARK PRO - Cards dark com neon border
            if (theme === 'dark') {
              return (
                <div 
                  key={kpi.id}
                  className="rounded-2xl p-6 border animate-card hover:border-opacity-100 cursor-pointer relative group"
                  style={{ 
                    background: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                    boxShadow: 'var(--card-shadow)',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = kpi.color;
                    e.currentTarget.style.boxShadow = `0 0 30px ${kpi.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--card-border)';
                    e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                  }}
                >
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at top left, ${kpi.color}10, transparent 70%)`,
                      pointerEvents: 'none'
                    }}
                  />
                  
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center relative"
                      style={{ 
                        background: `linear-gradient(135deg, ${kpi.color}30, ${kpi.color}20)`,
                        boxShadow: `0 0 20px ${kpi.color}30`
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: kpi.color }} />
                    </div>
                    <div 
                      className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg ${
                        kpi.positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {kpi.positive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      <span className="font-semibold">{kpi.change}</span>
                    </div>
                  </div>
                  <p className="text-sm mb-2 relative z-10" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                    {kpi.title}
                  </p>
                  <p 
                    className="text-4xl font-bold relative z-10" 
                    style={{ color: 'var(--foreground)' }}
                  >
                    {kpi.value}
                  </p>
                </div>
              );
            }
            
            return null;
          })}
        </div>

        {/* Gráfico e Atividades */}
        <div className={`grid gap-6 ${theme === 'dark' ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {/* Gráfico de Vendas */}
          <div 
            className={`${theme === 'dark' ? 'col-span-1' : 'col-span-2'} rounded-3xl p-6 animate-card`}
            style={{ 
              background: 'var(--card-bg)',
              border: theme === 'minimalist' ? '1px solid var(--card-border)' : 'none',
              boxShadow: theme === 'dark' ? 'var(--card-shadow)' : 'var(--shadow-md)',
              backdropFilter: theme === 'modern' ? 'blur(var(--card-blur))' : 'none'
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 style={{ color: 'var(--foreground)' }}>Performance Semanal</h3>
                <p className="text-sm mt-1" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                  Vendas vs Serviços
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#3b82f6' }}></div>
                  <span className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.7 }}>Vendas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#8b5cf6' }}></div>
                  <span className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.7 }}>Serviços</span>
                </div>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorServicos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#262626' : '#e2e8f0'} />
                <XAxis 
                  dataKey="name" 
                  stroke={theme === 'dark' ? '#737373' : '#64748b'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke={theme === 'dark' ? '#737373' : '#64748b'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: theme === 'dark' ? '#171717' : '#ffffff',
                    border: theme === 'dark' ? '1px solid #262626' : '1px solid #e2e8f0',
                    borderRadius: '12px',
                    color: theme === 'dark' ? '#fafafa' : '#0a0a0a'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="vendas" 
                  stroke="#3b82f6" 
                  strokeWidth={theme === 'modern' ? 3 : 2}
                  fillOpacity={1} 
                  fill="url(#colorVendas)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="servicos" 
                  stroke="#8b5cf6" 
                  strokeWidth={theme === 'modern' ? 3 : 2}
                  fillOpacity={1} 
                  fill="url(#colorServicos)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Atividades Recentes */}
          {theme !== 'dark' && (
            <div 
              className="rounded-3xl p-6 animate-card"
              style={{ 
                background: 'var(--card-bg)',
                border: theme === 'minimalist' ? '1px solid var(--card-border)' : 'none',
                boxShadow: theme === 'dark' ? 'var(--card-shadow)' : 'var(--shadow-md)',
                backdropFilter: theme === 'modern' ? 'blur(var(--card-blur))' : 'none'
              }}
            >
              <h3 className="mb-6" style={{ color: 'var(--foreground)' }}>Ordens Recentes</h3>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div 
                    key={order.id}
                    className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                    style={{ borderColor: 'var(--card-border)' }}
                  >
                    <div 
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        order.status === 'concluido' ? 'bg-success/20' :
                        order.status === 'em-reparo' ? 'bg-primary/20' :
                        'bg-warning/20'
                      }`}
                    >
                      {order.status === 'concluido' ? (
                        <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--success)' }} />
                      ) : order.status === 'em-reparo' ? (
                        <Wrench className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                      ) : (
                        <Clock className="w-5 h-5" style={{ color: 'var(--warning)' }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate" style={{ color: 'var(--foreground)' }}>
                        {order.id}
                      </p>
                      <p className="text-xs truncate" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                        {order.client} • {order.device}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--foreground)', opacity: 0.5 }}>
                        {order.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ações Rápidas */}
        <div 
          className="rounded-3xl p-6 animate-card"
          style={{ 
            background: theme === 'modern' 
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
              : 'var(--card-bg)',
            border: theme === 'minimalist' ? '1px solid var(--card-border)' : 'none',
            boxShadow: theme === 'dark' ? 'var(--card-shadow)' : 'var(--shadow-md)',
            backdropFilter: theme === 'modern' ? 'blur(var(--card-blur))' : 'none'
          }}
        >
          <h3 className="mb-6" style={{ color: 'var(--foreground)' }}>
            {theme === 'modern' && '⚡ '}Ações Rápidas
          </h3>
          <div className="grid grid-cols-5 gap-4">
            {[
              { icon: ShoppingCart, label: 'Novo PDV', module: 'pdv' as ModuleType },
              { icon: Wrench, label: 'Nova OS', module: 'os' as ModuleType },
              { icon: Package, label: 'Produtos', module: 'produtos' as ModuleType },
              { icon: Users, label: 'Clientes', module: 'crm' as ModuleType },
              { icon: DollarSign, label: 'Financeiro', module: 'financeiro' as ModuleType },
            ].map((action, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(action.module)}
                className="btn-primary p-6 rounded-2xl flex flex-col items-center gap-3 group"
              >
                <action.icon className="w-8 h-8" />
                <span className="text-sm font-semibold">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
