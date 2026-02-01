import { useState } from 'react';
import { Users, Search, Star, Phone, Mail, MapPin, TrendingUp, UserPlus } from 'lucide-react';

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  totalCompras: number;
  ultimaCompra: string;
  frequencia: number;
  segmento: 'vip' | 'ativo' | 'novo' | 'inativo';
}

const mockClientes: Cliente[] = [
  { id: 'CLI-0945', nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 98765-4321', cidade: 'São Paulo', totalCompras: 8945.00, ultimaCompra: '25/01/2026', frequencia: 12, segmento: 'vip' },
  { id: 'CLI-0876', nome: 'Maria Santos', email: 'maria@email.com', telefone: '(11) 97654-3210', cidade: 'São Paulo', totalCompras: 4567.00, ultimaCompra: '28/01/2026', frequencia: 8, segmento: 'ativo' },
  { id: 'CLI-1203', nome: 'Carlos Souza', email: 'carlos@email.com', telefone: '(11) 96543-2109', cidade: 'Campinas', totalCompras: 1299.00, ultimaCompra: '30/01/2026', frequencia: 3, segmento: 'novo' },
  { id: 'CLI-0234', nome: 'Ana Costa', email: 'ana@email.com', telefone: '(11) 95432-1098', cidade: 'Santos', totalCompras: 6234.00, ultimaCompra: '15/01/2026', frequencia: 15, segmento: 'vip' },
  { id: 'CLI-0567', nome: 'Roberto Lima', email: 'roberto@email.com', telefone: '(11) 94321-0987', cidade: 'São Paulo', totalCompras: 789.00, ultimaCompra: '10/11/2025', frequencia: 2, segmento: 'inativo' },
];

const getSegmentoColor = (segmento: string) => {
  switch (segmento) {
    case 'vip': return 'bg-purple-100 text-purple-700 border-purple-300';
    case 'ativo': return 'bg-green-100 text-green-700 border-green-300';
    case 'novo': return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'inativo': return 'bg-slate-100 text-slate-700 border-slate-300';
    default: return 'bg-slate-100 text-slate-700 border-slate-300';
  }
};

const getSegmentoLabel = (segmento: string) => {
  switch (segmento) {
    case 'vip': return 'VIP';
    case 'ativo': return 'Ativo';
    case 'novo': return 'Novo';
    case 'inativo': return 'Inativo';
    default: return segmento;
  }
};

export function CRM() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegmento, setSelectedSegmento] = useState<string>('todos');

  const filteredClientes = mockClientes.filter(cliente => {
    const matchesSearch = 
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSegmento = selectedSegmento === 'todos' || cliente.segmento === selectedSegmento;
    
    return matchesSearch && matchesSegmento;
  });

  const totalClientes = mockClientes.length;
  const clientesVIP = mockClientes.filter(c => c.segmento === 'vip').length;
  const ticketMedio = mockClientes.reduce((sum, c) => sum + c.totalCompras, 0) / totalClientes;

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">CRM & Clientes</h1>
            <p className="text-slate-600">Gestão de relacionamento e base de clientes</p>
          </div>
          <button className="flex items-center gap-3 bg-pink-600 text-white px-6 py-4 rounded-2xl
                           hover:bg-pink-700 transition-all shadow-lg">
            <UserPlus className="w-6 h-6" />
            <span className="font-medium text-lg">Novo Cliente</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="p-8 border-b border-slate-200 bg-white">
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white">
            <Users className="w-8 h-8 mb-3" />
            <p className="text-pink-100 text-sm mb-1">Total de Clientes</p>
            <p className="text-3xl font-bold">{totalClientes}</p>
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-2xl p-6">
            <Star className="w-8 h-8 text-purple-600 mb-3" />
            <p className="text-slate-600 text-sm mb-1">Clientes VIP</p>
            <p className="text-3xl font-bold text-purple-600">{clientesVIP}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
            <TrendingUp className="w-8 h-8 text-slate-600 mb-3" />
            <p className="text-slate-600 text-sm mb-1">Ticket Médio</p>
            <p className="text-2xl font-bold text-slate-900">R$ {ticketMedio.toFixed(2)}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
            <Users className="w-8 h-8 text-slate-600 mb-3" />
            <p className="text-slate-600 text-sm mb-1">Novos (30 dias)</p>
            <p className="text-3xl font-bold text-slate-900">8</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-8 py-6 bg-white border-b border-slate-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl
                       focus:outline-none focus:border-pink-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Segmento Filter */}
        <div className="flex gap-2">
          {(['todos', 'vip', 'ativo', 'novo', 'inativo'] as const).map((segmento) => (
            <button
              key={segmento}
              onClick={() => setSelectedSegmento(segmento)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedSegmento === segmento
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {segmento === 'todos' ? 'Todos' : getSegmentoLabel(segmento)}
            </button>
          ))}
        </div>
      </div>

      {/* Clientes List */}
      <div className="p-8">
        <div className="grid grid-cols-2 gap-6">
          {filteredClientes.map((cliente) => (
            <div
              key={cliente.id}
              className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                    {cliente.nome.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">{cliente.nome}</h3>
                    <p className="text-sm text-slate-500">{cliente.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSegmentoColor(cliente.segmento)}`}>
                  {getSegmentoLabel(cliente.segmento)}
                </span>
              </div>

              {/* Informações de Contato */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span>{cliente.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="w-4 h-4" />
                  <span>{cliente.telefone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>{cliente.cidade}</span>
                </div>
              </div>

              {/* Métricas RFM */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Última Compra</p>
                  <p className="text-sm font-medium text-slate-900">{cliente.ultimaCompra}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Frequência</p>
                  <p className="text-sm font-medium text-slate-900">{cliente.frequencia} pedidos</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Total Gasto</p>
                  <p className="text-sm font-medium text-pink-600">R$ {cliente.totalCompras.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredClientes.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-400">Nenhum cliente encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
