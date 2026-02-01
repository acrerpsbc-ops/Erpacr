import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Wrench,
  User,
  Smartphone,
  Calendar,
  DollarSign
} from 'lucide-react';

type OSStatus = 'aberta' | 'em-reparo' | 'aguardando-pecas' | 'concluida' | 'entregue';

interface OrdemServicoData {
  id: string;
  cliente: string;
  dispositivo: string;
  problema: string;
  status: OSStatus;
  tecnico: string;
  dataAbertura: string;
  previsao: string;
  valor: number;
}

const mockOrdens: OrdemServicoData[] = [
  {
    id: 'OS-2847',
    cliente: 'João Silva',
    dispositivo: 'iPhone 14 Pro - 256GB',
    problema: 'Troca de tela - Display quebrado',
    status: 'em-reparo',
    tecnico: 'Carlos Tech',
    dataAbertura: '31/01/2026',
    previsao: '02/02/2026',
    valor: 899.00
  },
  {
    id: 'OS-2846',
    cliente: 'Maria Santos',
    dispositivo: 'Samsung Galaxy S23 Ultra',
    problema: 'Bateria não carrega - Conector USB-C',
    status: 'aguardando-pecas',
    tecnico: 'Ana Costa',
    dataAbertura: '30/01/2026',
    previsao: '03/02/2026',
    valor: 349.00
  },
  {
    id: 'OS-2845',
    cliente: 'Carlos Souza',
    dispositivo: 'MacBook Air M2',
    problema: 'Limpeza técnica e troca de pasta térmica',
    status: 'concluida',
    tecnico: 'Pedro Lemos',
    dataAbertura: '29/01/2026',
    previsao: '31/01/2026',
    valor: 249.00
  },
  {
    id: 'OS-2844',
    cliente: 'Ana Costa',
    dispositivo: 'iPad Pro 12.9"',
    problema: 'Tela touch não responde em algumas áreas',
    status: 'em-reparo',
    tecnico: 'Carlos Tech',
    dataAbertura: '30/01/2026',
    previsao: '01/02/2026',
    valor: 1299.00
  },
  {
    id: 'OS-2843',
    cliente: 'Roberto Lima',
    dispositivo: 'Xiaomi 13 Pro',
    problema: 'Câmera traseira sem foco',
    status: 'aberta',
    tecnico: 'Não atribuído',
    dataAbertura: '31/01/2026',
    previsao: '05/02/2026',
    valor: 0
  },
];

const getStatusColor = (status: OSStatus) => {
  switch (status) {
    case 'aberta': return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'em-reparo': return 'bg-orange-100 text-orange-700 border-orange-300';
    case 'aguardando-pecas': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    case 'concluida': return 'bg-green-100 text-green-700 border-green-300';
    case 'entregue': return 'bg-slate-100 text-slate-700 border-slate-300';
  }
};

const getStatusIcon = (status: OSStatus) => {
  switch (status) {
    case 'aberta': return <AlertCircle className="w-4 h-4" />;
    case 'em-reparo': return <Wrench className="w-4 h-4" />;
    case 'aguardando-pecas': return <Clock className="w-4 h-4" />;
    case 'concluida': return <CheckCircle2 className="w-4 h-4" />;
    case 'entregue': return <CheckCircle2 className="w-4 h-4" />;
  }
};

const getStatusLabel = (status: OSStatus) => {
  switch (status) {
    case 'aberta': return 'Aberta';
    case 'em-reparo': return 'Em Reparo';
    case 'aguardando-pecas': return 'Aguardando Peças';
    case 'concluida': return 'Concluída';
    case 'entregue': return 'Entregue';
  }
};

export function OrdemServico() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<OSStatus | 'todas'>('todas');
  const [showNewOS, setShowNewOS] = useState(false);

  const filteredOrdens = mockOrdens.filter(ordem => {
    const matchesSearch = 
      ordem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ordem.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ordem.dispositivo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'todas' || ordem.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">Ordens de Serviço</h1>
            <p className="text-slate-600">Gestão completa de reparos técnicos</p>
          </div>
          <button 
            onClick={() => setShowNewOS(true)}
            className="flex items-center gap-3 bg-orange-600 text-white px-6 py-4 rounded-2xl
                     hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-6 h-6" />
            <span className="font-medium text-lg">Nova OS</span>
          </button>
        </div>
      </div>

      {/* Filters and Stats */}
      <div className="px-8 py-6 bg-white border-b border-slate-200">
        <div className="flex items-center gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por OS, cliente ou dispositivo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl
                       focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
            />
          </div>

          {/* Filter */}
          <button className="flex items-center gap-2 px-4 py-3 border border-slate-300 rounded-xl
                           hover:bg-slate-50 transition-all">
            <Filter className="w-5 h-5 text-slate-600" />
            <span>Filtros</span>
          </button>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2">
          {(['todas', 'aberta', 'em-reparo', 'aguardando-pecas', 'concluida'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedStatus === status
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {status === 'todas' ? 'Todas' : getStatusLabel(status)}
            </button>
          ))}
        </div>
      </div>

      {/* OS List */}
      <div className="p-8">
        <div className="space-y-4">
          {filteredOrdens.map((ordem) => (
            <div
              key={ordem.id}
              className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-6">
                {/* ID e Status */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-3">
                    <Wrench className="w-8 h-8 text-orange-600" />
                  </div>
                  <p className="text-center font-mono text-sm text-slate-600">{ordem.id}</p>
                </div>

                {/* Informações Principais */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl text-slate-900 mb-1">{ordem.dispositivo}</h3>
                      <p className="text-slate-600">{ordem.problema}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(ordem.status)}`}>
                      {getStatusIcon(ordem.status)}
                      <span className="font-medium">{getStatusLabel(ordem.status)}</span>
                    </div>
                  </div>

                  {/* Detalhes */}
                  <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500">Cliente</p>
                        <p className="text-sm font-medium text-slate-900">{ordem.cliente}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500">Técnico</p>
                        <p className="text-sm font-medium text-slate-900">{ordem.tecnico}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500">Previsão</p>
                        <p className="text-sm font-medium text-slate-900">{ordem.previsao}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500">Valor</p>
                        <p className="text-sm font-medium text-slate-900">
                          {ordem.valor > 0 ? `R$ ${ordem.valor.toFixed(2)}` : 'A orçar'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrdens.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-400">Nenhuma ordem de serviço encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}
