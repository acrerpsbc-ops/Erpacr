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
  ArrowDown
} from 'lucide-react';
import { ModuleType } from '../../../App';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">Dashboard</h1>
            <p className="text-slate-600">Visão geral do negócio em tempo real</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Clock className="w-5 h-5" />
            <span>Última atualização: agora</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-6">
          {/* OS Abertas */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <Wrench className="w-8 h-8" />
              <div className="flex items-center gap-1 text-sm bg-orange-400/30 px-3 py-1 rounded-full">
                <ArrowUp className="w-4 h-4" />
                <span>12%</span>
              </div>
            </div>
            <p className="text-orange-100 text-sm mb-1">OS Abertas</p>
            <p className="text-4xl font-bold">28</p>
          </div>

          {/* Vendas Hoje */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <ShoppingCart className="w-8 h-8" />
              <div className="flex items-center gap-1 text-sm bg-green-400/30 px-3 py-1 rounded-full">
                <ArrowUp className="w-4 h-4" />
                <span>8%</span>
              </div>
            </div>
            <p className="text-green-100 text-sm mb-1">Vendas Hoje</p>
            <p className="text-4xl font-bold">R$ 12.4K</p>
          </div>

          {/* Caixa Atual */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <DollarSign className="w-8 h-8" />
              <div className="flex items-center gap-1 text-sm bg-blue-400/30 px-3 py-1 rounded-full">
                <ArrowUp className="w-4 h-4" />
                <span>15%</span>
              </div>
            </div>
            <p className="text-blue-100 text-sm mb-1">Caixa Atual</p>
            <p className="text-4xl font-bold">R$ 8.2K</p>
          </div>

          {/* Estoque Baixo */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <Package className="w-8 h-8" />
              <div className="flex items-center gap-1 text-sm bg-red-400/30 px-3 py-1 rounded-full">
                <AlertCircle className="w-4 h-4" />
                <span>Alerta</span>
              </div>
            </div>
            <p className="text-red-100 text-sm mb-1">Itens c/ Estoque Baixo</p>
            <p className="text-4xl font-bold">14</p>
          </div>
        </div>

        {/* Cards de Acesso Rápido */}
        <div>
          <h2 className="text-xl mb-4 text-slate-900">Acesso Rápido</h2>
          <div className="grid grid-cols-4 gap-4">
            <button
              onClick={() => onNavigate('pdv')}
              className="bg-white border-2 border-slate-200 hover:border-green-500 rounded-2xl p-6 
                       transition-all hover:shadow-lg group"
            >
              <ShoppingCart className="w-10 h-10 text-green-600 mb-3" />
              <p className="font-medium text-slate-900">Nova Venda</p>
              <p className="text-sm text-slate-500 mt-1">PDV Rápido</p>
            </button>

            <button
              onClick={() => onNavigate('os')}
              className="bg-white border-2 border-slate-200 hover:border-orange-500 rounded-2xl p-6 
                       transition-all hover:shadow-lg group"
            >
              <Wrench className="w-10 h-10 text-orange-600 mb-3" />
              <p className="font-medium text-slate-900">Nova OS</p>
              <p className="text-sm text-slate-500 mt-1">Ordem de Serviço</p>
            </button>

            <button
              onClick={() => onNavigate('estoque')}
              className="bg-white border-2 border-slate-200 hover:border-cyan-500 rounded-2xl p-6 
                       transition-all hover:shadow-lg group"
            >
              <Package className="w-10 h-10 text-cyan-600 mb-3" />
              <p className="font-medium text-slate-900">Estoque</p>
              <p className="text-sm text-slate-500 mt-1">Gerenciar</p>
            </button>

            <button
              onClick={() => onNavigate('crm')}
              className="bg-white border-2 border-slate-200 hover:border-pink-500 rounded-2xl p-6 
                       transition-all hover:shadow-lg group"
            >
              <Users className="w-10 h-10 text-pink-600 mb-3" />
              <p className="font-medium text-slate-900">Clientes</p>
              <p className="text-sm text-slate-500 mt-1">CRM</p>
            </button>
          </div>
        </div>

        {/* Gráfico e War Room */}
        <div className="grid grid-cols-3 gap-6">
          {/* Gráfico de Desempenho */}
          <div className="col-span-2 bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl text-slate-900 mb-1">Desempenho Semanal</h3>
                <p className="text-sm text-slate-500">Vendas e serviços dos últimos 7 dias</p>
              </div>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorServicos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Area type="monotone" dataKey="vendas" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVendas)" />
                <Area type="monotone" dataKey="servicos" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorServicos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* War Room - Status em Tempo Real */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
            <h3 className="text-xl text-slate-900 mb-4">War Room</h3>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border-l-4 border-slate-200 pl-4 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-900">{order.id}</span>
                    {order.status === 'concluido' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                    {order.status === 'em-reparo' && <Clock className="w-4 h-4 text-orange-500" />}
                    {order.status === 'aguardando' && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                  </div>
                  <p className="text-sm text-slate-700">{order.client}</p>
                  <p className="text-xs text-slate-500">{order.device}</p>
                  <p className="text-xs text-slate-400 mt-1">{order.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
