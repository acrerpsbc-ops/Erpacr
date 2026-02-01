import { useState } from 'react';
import { Truck, MapPin, Clock, CheckCircle2, Package, Navigation } from 'lucide-react';

interface Entrega {
  id: string;
  cliente: string;
  endereco: string;
  status: 'pendente' | 'em-rota' | 'entregue' | 'cancelada';
  entregador: string;
  horario: string;
  items: number;
  valor: number;
}

const mockEntregas: Entrega[] = [
  { id: 'ENT-4521', cliente: 'João Silva', endereco: 'Av. Paulista, 1578 - São Paulo', status: 'em-rota', entregador: 'Roberto Moto', horario: '14:30', items: 2, valor: 899.00 },
  { id: 'ENT-4520', cliente: 'Maria Santos', endereco: 'Rua Augusta, 234 - São Paulo', status: 'pendente', entregador: 'Não atribuído', horario: '15:00', items: 1, valor: 349.00 },
  { id: 'ENT-4519', cliente: 'Carlos Souza', endereco: 'Rua da Consolação, 567 - São Paulo', status: 'entregue', entregador: 'Roberto Moto', horario: '13:45', items: 1, valor: 249.00 },
  { id: 'ENT-4518', cliente: 'Ana Costa', endereco: 'Av. Faria Lima, 890 - São Paulo', status: 'em-rota', entregador: 'Pedro Bike', horario: '14:15', items: 3, valor: 1299.00 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pendente': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    case 'em-rota': return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'entregue': return 'bg-green-100 text-green-700 border-green-300';
    case 'cancelada': return 'bg-red-100 text-red-700 border-red-300';
    default: return 'bg-slate-100 text-slate-700 border-slate-300';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pendente': return <Clock className="w-4 h-4" />;
    case 'em-rota': return <Navigation className="w-4 h-4" />;
    case 'entregue': return <CheckCircle2 className="w-4 h-4" />;
    case 'cancelada': return <Package className="w-4 h-4" />;
    default: return <Package className="w-4 h-4" />;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pendente': return 'Pendente';
    case 'em-rota': return 'Em Rota';
    case 'entregue': return 'Entregue';
    case 'cancelada': return 'Cancelada';
    default: return status;
  }
};

export function Logistica() {
  const [selectedStatus, setSelectedStatus] = useState<string>('todas');

  const filteredEntregas = mockEntregas.filter(entrega => {
    return selectedStatus === 'todas' || entrega.status === selectedStatus;
  });

  const totalEntregas = mockEntregas.length;
  const emRota = mockEntregas.filter(e => e.status === 'em-rota').length;
  const entregues = mockEntregas.filter(e => e.status === 'entregue').length;

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">Logística & Delivery</h1>
            <p className="text-slate-600">Controle de entregas e rastreamento em tempo real</p>
          </div>
          <button className="flex items-center gap-3 bg-purple-600 text-white px-6 py-4 rounded-2xl
                           hover:bg-purple-700 transition-all shadow-lg">
            <Truck className="w-6 h-6" />
            <span className="font-medium text-lg">Nova Entrega</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="p-8 border-b border-slate-200 bg-white">
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <Truck className="w-8 h-8 mb-3" />
            <p className="text-purple-100 text-sm mb-1">Total Hoje</p>
            <p className="text-3xl font-bold">{totalEntregas}</p>
          </div>

          <div className="bg-white border-2 border-blue-200 rounded-2xl p-6">
            <Navigation className="w-8 h-8 text-blue-600 mb-3" />
            <p className="text-slate-600 text-sm mb-1">Em Rota</p>
            <p className="text-3xl font-bold text-blue-600">{emRota}</p>
          </div>

          <div className="bg-white border-2 border-green-200 rounded-2xl p-6">
            <CheckCircle2 className="w-8 h-8 text-green-600 mb-3" />
            <p className="text-slate-600 text-sm mb-1">Entregues</p>
            <p className="text-3xl font-bold text-green-600">{entregues}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
            <Clock className="w-8 h-8 text-slate-600 mb-3" />
            <p className="text-slate-600 text-sm mb-1">Tempo Médio</p>
            <p className="text-3xl font-bold text-slate-900">35min</p>
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="px-8 py-6 bg-white border-b border-slate-200">
        <div className="flex gap-2">
          {(['todas', 'pendente', 'em-rota', 'entregue'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedStatus === status
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {status === 'todas' ? 'Todas' : getStatusLabel(status)}
            </button>
          ))}
        </div>
      </div>

      {/* Entregas List & Map */}
      <div className="p-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Lista de Entregas */}
          <div className="col-span-2 space-y-4">
            {filteredEntregas.map((entrega) => (
              <div
                key={entrega.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-6">
                  {/* Ícone */}
                  <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Truck className="w-7 h-7 text-purple-600" />
                  </div>

                  {/* Informações */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-medium text-slate-900 mb-1">{entrega.cliente}</h3>
                        <p className="text-sm text-slate-600 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {entrega.endereco}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(entrega.status)}`}>
                        {getStatusIcon(entrega.status)}
                        {getStatusLabel(entrega.status)}
                      </span>
                    </div>

                    {/* Detalhes */}
                    <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-200">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">ID</p>
                        <p className="text-sm font-mono font-medium text-slate-900">{entrega.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Entregador</p>
                        <p className="text-sm font-medium text-slate-900">{entrega.entregador}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Horário</p>
                        <p className="text-sm font-medium text-slate-900">{entrega.horario}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Valor</p>
                        <p className="text-sm font-medium text-purple-600">R$ {entrega.valor.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mapa Placeholder */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200 h-fit sticky top-8">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Mapa de Entregas</h3>
            <div className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-slate-200">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400">Rastreamento em Tempo Real</p>
                <p className="text-sm text-slate-300 mt-2">Integração com Maps</p>
              </div>
            </div>

            {/* Entregadores Ativos */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-slate-700 mb-3">Entregadores Ativos</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
                    RM
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Roberto Moto</p>
                    <p className="text-xs text-slate-500">2 entregas em rota</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    PB
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Pedro Bike</p>
                    <p className="text-xs text-slate-500">1 entrega em rota</p>
                  </div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
