import { useState } from 'react';
import { TrendingUp, Search, Filter, DollarSign, Package, User, Calendar, FileText, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Venda {
  id: string;
  cliente: string;
  data: string;
  items: number;
  valor: number;
  pagamento: string;
  status: 'concluida' | 'pendente' | 'cancelada';
  vendedor: string;
}

const mockVendas: Venda[] = [
  { id: 'VND-2047', cliente: 'João Silva', data: '01/02/2026 14:32', items: 3, valor: 1247.00, pagamento: 'PIX', status: 'concluida', vendedor: 'Ana Costa' },
  { id: 'VND-2046', cliente: 'Maria Santos', data: '01/02/2026 13:15', items: 1, valor: 349.00, pagamento: 'Cartão', status: 'concluida', vendedor: 'Carlos Tech' },
  { id: 'VND-2045', cliente: 'Pedro Oliveira', data: '01/02/2026 12:45', items: 5, valor: 2890.00, pagamento: 'PIX', status: 'concluida', vendedor: 'Ana Costa' },
  { id: 'VND-2044', cliente: 'Juliana Costa', data: '01/02/2026 11:20', items: 2, valor: 598.00, pagamento: 'Dinheiro', status: 'concluida', vendedor: 'Carlos Tech' },
  { id: 'VND-2043', cliente: 'Roberto Lima', data: '01/02/2026 10:05', items: 1, valor: 129.00, pagamento: 'PIX', status: 'concluida', vendedor: 'Ana Costa' },
  { id: 'VND-2042', cliente: 'Fernanda Souza', data: '31/01/2026 18:50', items: 4, valor: 1567.00, pagamento: 'Cartão', status: 'concluida', vendedor: 'Carlos Tech' },
];

const vendasPorDia = [
  { dia: '26/Jan', vendas: 8, valor: 4200 },
  { dia: '27/Jan', vendas: 12, valor: 6800 },
  { dia: '28/Jan', vendas: 10, valor: 5400 },
  { dia: '29/Jan', vendas: 15, valor: 8200 },
  { dia: '30/Jan', vendas: 11, valor: 6100 },
  { dia: '31/Jan', vendas: 18, valor: 9800 },
  { dia: '01/Fev', vendas: 6, valor: 5213 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'concluida': return 'bg-green-100 text-green-700 border-green-300';
    case 'pendente': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    case 'cancelada': return 'bg-red-100 text-red-700 border-red-300';
    default: return 'bg-slate-100 text-slate-700 border-slate-300';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'concluida': return 'Concluída';
    case 'pendente': return 'Pendente';
    case 'cancelada': return 'Cancelada';
    default: return status;
  }
};

export function Vendas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('hoje');

  const filteredVendas = mockVendas.filter(venda =>
    venda.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venda.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalVendas = mockVendas.length;
  const totalValor = mockVendas.reduce((sum, v) => sum + v.valor, 0);
  const ticketMedio = totalValor / totalVendas;

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">Vendas</h1>
            <p className="text-slate-600">Gestão completa de vendas e relatórios</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all">
              <Download className="w-5 h-5" />
              <span>Exportar</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg">
              <FileText className="w-5 h-5" />
              <span>Novo Orçamento</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-8 border-b border-slate-200 bg-white">
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <TrendingUp className="w-8 h-8 mb-3" />
            <p className="text-blue-100 text-sm mb-1">Total de Vendas</p>
            <p className="text-3xl font-bold">{totalVendas}</p>
            <p className="text-sm text-blue-200 mt-2">Hoje</p>
          </div>

          <div className="bg-white border-2 border-green-200 rounded-2xl p-6">
            <DollarSign className="w-8 h-8 text-green-600 mb-3" />
            <p className="text-slate-600 text-sm mb-1">Faturamento</p>
            <p className="text-3xl font-bold text-green-600">R$ {totalValor.toFixed(2)}</p>
            <p className="text-sm text-green-600 mt-2">+12% vs ontem</p>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
            <Package className="w-8 h-8 text-slate-600 mb-3" />
            <p className="text-slate-600 text-sm mb-1">Ticket Médio</p>
            <p className="text-2xl font-bold text-slate-900">R$ {ticketMedio.toFixed(2)}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
            <User className="w-8 h-8 text-slate-600 mb-3" />
            <p className="text-slate-600 text-sm mb-1">Itens Vendidos</p>
            <p className="text-3xl font-bold text-slate-900">{mockVendas.reduce((sum, v) => sum + v.items, 0)}</p>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="p-8 border-b border-slate-200 bg-white">
        <div className="grid grid-cols-2 gap-6">
          {/* Gráfico de Vendas */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Vendas dos Últimos 7 Dias</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={vendasPorDia}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="dia" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="vendas" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Faturamento */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Faturamento dos Últimos 7 Dias</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={vendasPorDia}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="dia" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="valor" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="px-8 py-6 bg-white border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar vendas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl
                       focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex gap-2">
            {(['hoje', 'semana', 'mes'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {period === 'hoje' ? 'Hoje' : period === 'semana' ? 'Esta Semana' : 'Este Mês'}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50">
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      {/* Lista de Vendas */}
      <div className="p-8">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">ID Venda</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">Cliente</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">Data/Hora</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-slate-700">Itens</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-700">Valor</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-slate-700">Pagamento</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">Vendedor</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredVendas.map((venda) => (
                <tr key={venda.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-mono font-medium text-blue-600">{venda.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{venda.cliente}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{venda.data}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-slate-900">{venda.items}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-semibold text-green-600 text-lg">R$ {venda.valor.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {venda.pagamento}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {venda.vendedor}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(venda.status)}`}>
                      {getStatusLabel(venda.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
