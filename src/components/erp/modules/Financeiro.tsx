import { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  CreditCard,
  Banknote,
  AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const cashFlowData = [
  { month: 'Jan', receitas: 45000, despesas: 28000 },
  { month: 'Fev', receitas: 52000, despesas: 31000 },
  { month: 'Mar', receitas: 48000, despesas: 29000 },
  { month: 'Abr', receitas: 61000, despesas: 35000 },
  { month: 'Mai', receitas: 55000, despesas: 32000 },
  { month: 'Jun', receitas: 67000, despesas: 38000 },
];

const paymentMethodsData = [
  { name: 'PIX', value: 45, color: '#3b82f6' },
  { name: 'Cartão', value: 35, color: '#8b5cf6' },
  { name: 'Dinheiro', value: 20, color: '#10b981' },
];

const contasReceber = [
  { id: 'CR-1245', cliente: 'João Silva', valor: 899.00, vencimento: '05/02/2026', status: 'pendente' },
  { id: 'CR-1244', cliente: 'Maria Santos', valor: 349.00, vencimento: '02/02/2026', status: 'vencido' },
  { id: 'CR-1243', cliente: 'Carlos Souza', valor: 1299.00, vencimento: '10/02/2026', status: 'pendente' },
];

const contasPagar = [
  { id: 'CP-8821', fornecedor: 'DistribCell Ltda', valor: 12500.00, vencimento: '08/02/2026', status: 'pendente' },
  { id: 'CP-8820', fornecedor: 'TechParts Brasil', valor: 8400.00, vencimento: '01/02/2026', status: 'vencido' },
  { id: 'CP-8819', fornecedor: 'Energia Elétrica', valor: 1250.00, vencimento: '15/02/2026', status: 'pendente' },
];

export function Financeiro() {
  const [selectedPeriod, setSelectedPeriod] = useState('mensal');

  const totalReceitas = cashFlowData.reduce((sum, item) => sum + item.receitas, 0);
  const totalDespesas = cashFlowData.reduce((sum, item) => sum + item.despesas, 0);
  const saldo = totalReceitas - totalDespesas;

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">Financeiro</h1>
            <p className="text-slate-600">Controle completo de receitas, despesas e fluxo de caixa</p>
          </div>
          <div className="flex items-center gap-3">
            <button className={`px-4 py-2 rounded-lg ${selectedPeriod === 'mensal' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                    onClick={() => setSelectedPeriod('mensal')}>
              Mensal
            </button>
            <button className={`px-4 py-2 rounded-lg ${selectedPeriod === 'anual' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                    onClick={() => setSelectedPeriod('anual')}>
              Anual
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* KPIs Financeiros */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-slate-600 mb-1">Receitas</p>
            <p className="text-3xl text-slate-900 mb-2">R$ {(totalReceitas / 1000).toFixed(1)}K</p>
            <p className="text-xs text-green-600">+12% vs mês anterior</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                <ArrowDownRight className="w-6 h-6 text-red-600" />
              </div>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-sm text-slate-600 mb-1">Despesas</p>
            <p className="text-3xl text-slate-900 mb-2">R$ {(totalDespesas / 1000).toFixed(1)}K</p>
            <p className="text-xs text-red-600">+5% vs mês anterior</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-6 shadow-xl text-white">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8" />
              <div className="w-3 h-3 bg-emerald-300 rounded-full animate-pulse"></div>
            </div>
            <p className="text-emerald-100 text-sm mb-1">Saldo</p>
            <p className="text-4xl font-bold">R$ {(saldo / 1000).toFixed(1)}K</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Inadimplência</p>
            <p className="text-3xl text-slate-900 mb-2">R$ 2.1K</p>
            <p className="text-xs text-yellow-600">3 contas vencidas</p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-3 gap-6">
          {/* Fluxo de Caixa */}
          <div className="col-span-2 bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
            <h3 className="text-xl text-slate-900 mb-6">Fluxo de Caixa</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="receitas" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="despesas" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Formas de Pagamento */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
            <h3 className="text-xl text-slate-900 mb-6">Formas de Pagamento</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={paymentMethodsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentMethodsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {paymentMethodsData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contas a Receber e Pagar */}
        <div className="grid grid-cols-2 gap-6">
          {/* Contas a Receber */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-slate-900">Contas a Receber</h3>
              <ArrowUpRight className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-3">
              {contasReceber.map((conta) => (
                <div key={conta.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{conta.cliente}</p>
                    <p className="text-xs text-slate-500">{conta.id} • Venc: {conta.vencimento}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-green-600">R$ {conta.valor.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      conta.status === 'vencido' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {conta.status === 'vencido' ? 'Vencido' : 'Pendente'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contas a Pagar */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-slate-900">Contas a Pagar</h3>
              <ArrowDownRight className="w-5 h-5 text-red-600" />
            </div>
            <div className="space-y-3">
              {contasPagar.map((conta) => (
                <div key={conta.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{conta.fornecedor}</p>
                    <p className="text-xs text-slate-500">{conta.id} • Venc: {conta.vencimento}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-red-600">R$ {conta.valor.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      conta.status === 'vencido' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {conta.status === 'vencido' ? 'Vencido' : 'Pendente'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
