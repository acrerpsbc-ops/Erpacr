import { useState, useRef } from 'react';
import { 
  User, 
  Search, 
  Plus, 
  X,
  Smartphone,
  Laptop,
  Tablet,
  Gamepad2,
  Tv,
  ChevronRight,
  Sparkles,
  BookOpen,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Battery,
  Volume2,
  Monitor,
  Wifi,
  Camera,
  Fingerprint,
  Save,
  Trash2,
  Check,
  FileText,
  Clock,
  DollarSign,
  Zap,
  Settings,
  MoreHorizontal,
  Edit3
} from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface NovaOrdemServicoProps {
  onClose: () => void;
  onSave: () => void;
}

const tiposEquipamento = [
  { id: 'smartphone', name: 'Smartphone', icon: Smartphone },
  { id: 'notebook', name: 'Notebook', icon: Laptop },
  { id: 'tablet', name: 'Tablet', icon: Tablet },
  { id: 'console', name: 'Console', icon: Gamepad2 },
  { id: 'smart-tv', name: 'Smart TV', icon: Tv },
];

const acessorios = ['Carregador', 'Capa', 'Fone de Ouvido'];

const checklistItems = [
  { id: 'carga', label: 'Carga', icon: Battery },
  { id: 'som', label: 'Som', icon: Volume2 },
  { id: 'tela', label: 'Tela', icon: Monitor },
];

export function NovaOrdemServico({ onClose, onSave }: NovaOrdemServicoProps) {
  const { theme } = useTheme();
  
  // Estados do formulário
  const [clienteSelecionado, setClienteSelecionado] = useState<any>({
    nome: 'Ana Paula Souza',
    telefone: '(11) 99876-5432',
    email: 'ana.souza@email.com',
    foto: 'figma:asset/8f84a27d450c0700a1409ce3676071f9ef9fdfc1.png'
  });
  const [tipoEquipamento, setTipoEquipamento] = useState('smartphone');
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [cor, setCor] = useState('');
  const [serial, setSerial] = useState('');
  const [acessoriosSelecionados, setAcessoriosSelecionados] = useState<string[]>([]);
  const [defeitoRelatado, setDefeitoRelatado] = useState('');
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({
    carga: true,
    som: true,
    tela: true
  });
  const [tipoAtendimento, setTipoAtendimento] = useState('garantia');
  const [observacoes, setObservacoes] = useState('');
  
  // Estados de modais
  const [showIAAssistant, setShowIAAssistant] = useState(false);
  const [showCatalogo, setShowCatalogo] = useState(false);
  const [showSeguranca, setShowSeguranca] = useState(false);
  const [showSucesso, setShowSucesso] = useState(false);

  const equipamentosScrollRef = useRef<HTMLDivElement>(null);

  const toggleAcessorio = (acessorio: string) => {
    setAcessoriosSelecionados(prev =>
      prev.includes(acessorio)
        ? prev.filter(a => a !== acessorio)
        : [...prev, acessorio]
    );
  };

  const toggleChecklist = (id: string) => {
    setChecklistState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const calcularProgresso = () => {
    let total = 0;
    let preenchido = 0;

    if (clienteSelecionado) preenchido++;
    total++;

    if (tipoEquipamento && modelo && marca) preenchido++;
    total++;

    if (defeitoRelatado) preenchido++;
    total++;

    return Math.round((preenchido / total) * 100);
  };

  const handleEfetivar = () => {
    setShowSucesso(true);
  };

  const progresso = calcularProgresso();

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ background: theme === 'dark' ? '#0a0a0a' : '#f1f5f9' }}
    >
      {/* Container Principal */}
      <div className="h-full overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-6">
          {/* Grid: Formulário + Passaporte */}
          <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 340px' }}>
            
            {/* ========================================
                COLUNA ESQUERDA: FORMULÁRIO
                ======================================== */}
            <div 
              className="rounded-3xl p-8 space-y-6"
              style={{
                background: theme === 'dark' ? '#171717' : '#ffffff',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: theme === 'dark' ? '#262626' : '#e2e8f0' }}>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: '#1e40af' }}
                  >
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold" style={{ color: theme === 'dark' ? '#fafafa' : '#1e293b' }}>
                    Nova Ordem de Serviço
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                  style={{ background: theme === 'dark' ? '#262626' : '#f1f5f9' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* SEÇÃO: Cliente */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" style={{ color: '#3b82f6' }} />
                  <h3 className="font-semibold" style={{ color: theme === 'dark' ? '#fafafa' : '#1e293b' }}>Cliente</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#dbeafe', color: '#1e40af' }}>
                    OBRIGATÓRIO
                  </span>
                </div>

                {clienteSelecionado ? (
                  <div 
                    className="flex items-center justify-between p-4 rounded-2xl border"
                    style={{ 
                      background: theme === 'dark' ? '#262626' : '#f8fafc',
                      borderColor: theme === 'dark' ? '#404040' : '#e2e8f0'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200">
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                          AP
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: theme === 'dark' ? '#fafafa' : '#1e293b' }}>
                          {clienteSelecionado.nome}
                        </p>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#a3a3a3' : '#64748b' }}>
                          {clienteSelecionado.telefone} • {clienteSelecionado.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setClienteSelecionado(null)}
                      className="w-8 h-8 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <Search 
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" 
                        style={{ color: '#94a3b8' }}
                      />
                      <input
                        type="text"
                        placeholder="Buscar nome, CPF, telefone..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border"
                        style={{
                          background: theme === 'dark' ? '#262626' : '#ffffff',
                          borderColor: theme === 'dark' ? '#404040' : '#cbd5e1',
                          color: theme === 'dark' ? '#fafafa' : '#1e293b'
                        }}
                      />
                    </div>
                    <button
                      className="px-4 py-3 rounded-xl flex items-center gap-2 font-medium"
                      style={{ background: '#3b82f6', color: 'white' }}
                      onClick={() => setClienteSelecionado({ nome: 'Ana Paula Souza', telefone: '(11) 99876-5432', email: 'ana.souza@email.com' })}
                    >
                      <Plus className="w-5 h-5" />
                      Novo Cliente
                    </button>
                  </div>
                )}
              </div>

              {/* SEÇÃO: Equipamento */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" style={{ color: '#8b5cf6' }} />
                  <h3 className="font-semibold" style={{ color: theme === 'dark' ? '#fafafa' : '#1e293b' }}>Equipamento</h3>
                </div>

                {/* Seletor de Tipo - Horizontal com Seta */}
                <div className="relative">
                  <div 
                    ref={equipamentosScrollRef}
                    className="flex gap-3 overflow-x-auto scrollbar-hide"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {tiposEquipamento.map((tipo) => {
                      const Icon = tipo.icon;
                      const isActive = tipoEquipamento === tipo.id;
                      return (
                        <button
                          key={tipo.id}
                          onClick={() => setTipoEquipamento(tipo.id)}
                          className="flex-shrink-0 w-24 h-24 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all"
                          style={isActive ? {
                            background: '#dbeafe',
                            borderColor: '#3b82f6',
                            color: '#1e40af'
                          } : {
                            background: theme === 'dark' ? '#262626' : '#f8fafc',
                            borderColor: theme === 'dark' ? '#404040' : '#e2e8f0',
                            color: theme === 'dark' ? '#a3a3a3' : '#64748b'
                          }}
                        >
                          <Icon className="w-7 h-7" />
                          <span className="text-xs font-medium">{tipo.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: theme === 'dark' ? '#262626' : '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  >
                    <ChevronRight className="w-5 h-5" style={{ color: theme === 'dark' ? '#fafafa' : '#64748b' }} />
                  </button>
                </div>

                {/* Inputs Inline */}
                <div className="grid grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Modelo"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border text-sm"
                    style={{
                      background: theme === 'dark' ? '#262626' : '#ffffff',
                      borderColor: theme === 'dark' ? '#404040' : '#cbd5e1',
                      color: theme === 'dark' ? '#fafafa' : '#1e293b'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Marca"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border text-sm"
                    style={{
                      background: theme === 'dark' ? '#262626' : '#ffffff',
                      borderColor: theme === 'dark' ? '#404040' : '#cbd5e1',
                      color: theme === 'dark' ? '#fafafa' : '#1e293b'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Cor"
                    value={cor}
                    onChange={(e) => setCor(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border text-sm"
                    style={{
                      background: theme === 'dark' ? '#262626' : '#ffffff',
                      borderColor: theme === 'dark' ? '#404040' : '#cbd5e1',
                      color: theme === 'dark' ? '#fafafa' : '#1e293b'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Serial"
                    value={serial}
                    onChange={(e) => setSerial(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border text-sm"
                    style={{
                      background: theme === 'dark' ? '#262626' : '#ffffff',
                      borderColor: theme === 'dark' ? '#404040' : '#cbd5e1',
                      color: theme === 'dark' ? '#fafafa' : '#1e293b'
                    }}
                  />
                </div>

                {/* Acessórios Inline */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium mr-2" style={{ color: theme === 'dark' ? '#a3a3a3' : '#64748b' }}>
                    Acessórios:
                  </span>
                  {acessorios.map((acessorio) => (
                    <button
                      key={acessorio}
                      onClick={() => toggleAcessorio(acessorio)}
                      className="px-3 py-1.5 rounded-full text-sm border transition-all"
                      style={acessoriosSelecionados.includes(acessorio) ? {
                        background: '#dbeafe',
                        borderColor: '#3b82f6',
                        color: '#1e40af'
                      } : {
                        background: theme === 'dark' ? '#262626' : '#f8fafc',
                        borderColor: theme === 'dark' ? '#404040' : '#e2e8f0',
                        color: theme === 'dark' ? '#a3a3a3' : '#64748b'
                      }}
                    >
                      {acessorio}
                    </button>
                  ))}
                  <button
                    className="w-7 h-7 rounded-full flex items-center justify-center border"
                    style={{
                      background: theme === 'dark' ? '#262626' : '#f8fafc',
                      borderColor: theme === 'dark' ? '#404040' : '#e2e8f0'
                    }}
                  >
                    <MoreHorizontal className="w-4 h-4" style={{ color: theme === 'dark' ? '#a3a3a3' : '#64748b' }} />
                  </button>
                </div>
              </div>

              {/* SEÇÃO: Diagnóstico */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" style={{ color: '#f59e0b' }} />
                  <h3 className="font-semibold" style={{ color: theme === 'dark' ? '#fafafa' : '#1e293b' }}>Diagnóstico</h3>
                </div>

                {/* Botões de Ação */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowIAAssistant(true)}
                    className="px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium"
                    style={{ background: '#3b82f6', color: 'white' }}
                  >
                    <Sparkles className="w-4 h-4" />
                    IA Assistant
                  </button>
                  <button
                    onClick={() => setShowCatalogo(true)}
                    className="px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium border"
                    style={{
                      background: theme === 'dark' ? '#262626' : '#ffffff',
                      borderColor: theme === 'dark' ? '#404040' : '#cbd5e1',
                      color: theme === 'dark' ? '#fafafa' : '#1e293b'
                    }}
                  >
                    <BookOpen className="w-4 h-4" />
                    Catálogo Técnico
                  </button>
                </div>

                {/* Checklist Circular */}
                <div className="flex items-center gap-3">
                  {checklistItems.map((item) => {
                    const Icon = item.icon;
                    const isChecked = checklistState[item.id];
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleChecklist(item.id)}
                        className="w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all relative"
                        style={isChecked ? {
                          background: '#3b82f6',
                          borderColor: '#3b82f6',
                          color: 'white'
                        } : {
                          background: theme === 'dark' ? '#262626' : '#f8fafc',
                          borderColor: theme === 'dark' ? '#404040' : '#cbd5e1',
                          color: theme === 'dark' ? '#737373' : '#94a3b8'
                        }}
                      >
                        <Icon className="w-6 h-6" />
                        {isChecked && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Checkboxes */}
                <div className="flex items-center gap-4">
                  {checklistItems.map((item) => (
                    <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checklistState[item.id]}
                        onChange={() => toggleChecklist(item.id)}
                        className="w-5 h-5 rounded border-2 accent-blue-600"
                      />
                      <span className="text-sm font-medium" style={{ color: theme === 'dark' ? '#fafafa' : '#1e293b' }}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                  <button className="text-sm" style={{ color: '#94a3b8' }}>
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Textarea */}
                <textarea
                  value={defeitoRelatado}
                  onChange={(e) => setDefeitoRelatado(e.target.value)}
                  placeholder="Descrever o Problema"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border resize-none text-sm"
                  style={{
                    background: theme === 'dark' ? '#262626' : '#ffffff',
                    borderColor: theme === 'dark' ? '#404040' : '#cbd5e1',
                    color: theme === 'dark' ? '#fafafa' : '#1e293b'
                  }}
                />
              </div>

              {/* SEÇÃO: Finalização */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" style={{ color: '#10b981' }} />
                  <h3 className="font-semibold" style={{ color: theme === 'dark' ? '#fafafa' : '#1e293b' }}>Finalização</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Tipo de Atendimento */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#a3a3a3' : '#64748b' }}>
                      Tipo de Atendimento
                    </label>
                    <select
                      value={tipoAtendimento}
                      onChange={(e) => setTipoAtendimento(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm"
                      style={{
                        background: theme === 'dark' ? '#262626' : '#ffffff',
                        borderColor: theme === 'dark' ? '#404040' : '#cbd5e1',
                        color: theme === 'dark' ? '#fafafa' : '#1e293b'
                      }}
                    >
                      <option value="garantia">Garantia</option>
                      <option value="orcamento">Orçamento</option>
                      <option value="cortesia">Cortesia</option>
                    </select>
                  </div>

                  {/* Observações Internas */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#a3a3a3' : '#64748b' }}>
                      Observações Internas
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        placeholder="Assinatura..."
                        className="w-full px-4 py-2.5 pr-10 rounded-xl border text-sm"
                        style={{
                          background: theme === 'dark' ? '#262626' : '#ffffff',
                          borderColor: theme === 'dark' ? '#404040' : '#cbd5e1',
                          color: theme === 'dark' ? '#fafafa' : '#1e293b'
                        }}
                      />
                      <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#94a3b8' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões Finais */}
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl font-semibold text-sm"
                  style={{ background: '#94a3b8', color: 'white' }}
                >
                  DESCARTAR
                </button>

                <button
                  onClick={handleEfetivar}
                  className="px-12 py-3 rounded-xl font-semibold text-sm"
                  style={{ 
                    background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
                    color: 'white',
                    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  EFETIVAR REGISTRO
                </button>
              </div>

              {/* Footer com Ícones */}
              <div className="flex items-center justify-center gap-6 pt-4 border-t" style={{ borderColor: theme === 'dark' ? '#262626' : '#e2e8f0' }}>
                <button 
                  onClick={() => setShowIAAssistant(true)}
                  className="flex items-center gap-2 text-sm font-medium" 
                  style={{ color: '#3b82f6' }}
                >
                  <Sparkles className="w-4 h-4" />
                  IA Assistant
                </button>
                <button 
                  onClick={() => setShowCatalogo(true)}
                  className="flex items-center gap-2 text-sm font-medium" 
                  style={{ color: '#3b82f6' }}
                >
                  <BookOpen className="w-4 h-4" />
                  Catálogo Técnico
                </button>
                <button 
                  onClick={() => setShowSeguranca(true)}
                  className="flex items-center gap-2 text-sm font-medium" 
                  style={{ color: '#10b981' }}
                >
                  <Lock className="w-4 h-4" />
                  Input de Segurança
                </button>
                <button 
                  onClick={() => setShowSucesso(true)}
                  className="flex items-center gap-2 text-sm font-medium" 
                  style={{ color: '#f59e0b' }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Sucesso
                </button>
              </div>
            </div>

            {/* ========================================
                COLUNA DIREITA: PASSAPORTE LIVE
                ======================================== */}
            <div className="sticky top-6 h-fit">
              <div 
                className="rounded-3xl p-6 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 50%, #1e293b 100%)',
                  minHeight: '600px',
                  boxShadow: '0 8px 32px rgba(30, 58, 138, 0.4)'
                }}
              >
                {/* Background Pattern */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                  }}
                />

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <h3 className="font-bold text-white">PASSAPORTE LIVE</h3>
                  </div>
                  <Settings className="w-5 h-5 text-white/60" />
                </div>

                {/* Status Badge */}
                <div 
                  className="relative z-10 mb-6 p-3 rounded-xl text-center"
                  style={{ background: 'rgba(251, 191, 36, 0.2)', border: '1px solid rgba(251, 191, 36, 0.3)' }}
                >
                  <p className="text-sm font-semibold text-amber-400">Status: Em Andamento</p>
                </div>

                {/* Checklist */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Checklist</span>
                    <span className="text-sm font-bold text-white">{progresso}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${progresso}%`,
                        background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)'
                      }}
                    />
                  </div>
                </div>

                {/* Estimativa */}
                <div className="relative z-10 space-y-3 mb-6">
                  <div className="flex items-center justify-between text-white/80 text-sm">
                    <span>Estimativa</span>
                    <span className="font-semibold text-white">2-3 Dias</span>
                  </div>
                  <div className="flex items-center justify-between text-white/80 text-sm">
                    <span>Custo inicial</span>
                    <span className="font-semibold text-white">R$ 150,00</span>
                  </div>
                </div>

                {/* Badge Sincronizado */}
                <div 
                  className="relative z-10 mt-8 flex items-center justify-center gap-2 py-2.5 rounded-xl"
                  style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.3)' }}
                >
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-medium text-green-300">Dados Sincronizados</span>
                </div>

                {/* Decorative Bottom Wave */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
                  style={{
                    background: 'radial-gradient(ellipse at bottom, rgba(59, 130, 246, 0.5) 0%, transparent 70%)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
