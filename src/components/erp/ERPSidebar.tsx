import { 
  LayoutDashboard, 
  ShoppingCart, 
  TrendingUp,
  Package,
  Wrench, 
  Warehouse,
  DollarSign,
  Truck, 
  Users, 
  Settings,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ModuleType } from '../../App';
import { useTheme } from './ThemeContext';

interface ERPSidebarProps {
  activeModule: ModuleType;
  onNavigate: (module: ModuleType) => void;
}

const menuItems = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, color: 'blue' },
  { id: 'pdv', name: 'PDV Express', icon: ShoppingCart, color: 'green' },
  { id: 'vendas', name: 'Vendas', icon: TrendingUp, color: 'blue' },
  { id: 'produtos', name: 'Produtos', icon: Package, color: 'violet' },
  { id: 'os', name: 'Ordem de Serviço', icon: Wrench, color: 'orange' },
  { id: 'estoque', name: 'Estoque', icon: Warehouse, color: 'cyan' },
  { id: 'financeiro', name: 'Financeiro', icon: DollarSign, color: 'emerald' },
  { id: 'logistica', name: 'Logística', icon: Truck, color: 'purple' },
  { id: 'crm', name: 'CRM', icon: Users, color: 'pink' },
  { id: 'configuracoes', name: 'Configurações', icon: Settings, color: 'slate' },
] as const;

export function ERPSidebar({ activeModule, onNavigate }: ERPSidebarProps) {
  const { theme } = useTheme();

  // TEMA 1: MODERN PREMIUM - Sidebar Expandida com Glassmorphism
  if (theme === 'modern') {
    return (
      <div 
        className="flex flex-col shadow-2xl relative"
        style={{
          width: '280px',
          background: 'var(--sidebar-bg)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid var(--sidebar-border)'
        }}
      >
        {/* Header com Gradiente */}
        <div className="p-6 border-b relative overflow-hidden" style={{ borderColor: 'var(--sidebar-border)' }}>
          {/* Gradient Background Effect */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
            }}
          />
          
          <div className="flex items-center gap-3 mb-3 relative z-10">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
            >
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold tracking-tight">ACR ERP</h1>
              <p className="text-blue-300 text-xs font-semibold">ULTRA PREMIUM</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as ModuleType)}
                className={`
                  w-full flex items-center gap-4 px-4 py-4 rounded-xl
                  transition-all duration-300 group relative overflow-hidden
                  ${isActive ? 'shadow-lg' : 'hover:bg-white/10'}
                `}
                style={isActive ? {
                  background: 'var(--sidebar-active)',
                  color: 'white'
                } : {
                  color: 'var(--sidebar-text)'
                }}
              >
                {isActive && (
                  <div 
                    className="absolute inset-0 opacity-30 animate-pulse"
                    style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
                  />
                )}
                <Icon className={`w-6 h-6 relative z-10 ${isActive ? 'text-white drop-shadow-lg' : 'text-slate-400 group-hover:text-white'}`} />
                <span className="flex-1 text-left font-semibold relative z-10">{item.name}</span>
                {isActive && (
                  <ChevronRight className="w-5 h-5 text-white animate-pulse relative z-10" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t" style={{ borderColor: 'var(--sidebar-border)' }}>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
            <div 
              className="w-11 h-11 rounded-xl flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
            >
              <span className="text-white font-bold">AD</span>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 shadow-lg"></div>
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-semibold">Admin User</p>
              <p className="text-slate-400 text-xs">Operador Master</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TEMA 2: MINIMALIST CLEAN - Sidebar Lateral Clara e Espaçosa
  if (theme === 'minimalist') {
    return (
      <div 
        className="flex flex-col border-r"
        style={{
          width: '240px',
          background: 'var(--sidebar-bg)',
          borderColor: 'var(--sidebar-border)'
        }}
      >
        {/* Header Minimalista */}
        <div className="p-8 border-b" style={{ borderColor: 'var(--sidebar-border)' }}>
          <div className="flex items-center gap-3 mb-1">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--sidebar-active)' }}
            >
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 
                className="text-xl font-semibold tracking-tight"
                style={{ color: 'var(--sidebar-text)' }}
              >
                ACR ERP
              </h1>
            </div>
          </div>
        </div>

        {/* Menu Items Minimalista */}
        <nav className="flex-1 overflow-y-auto p-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as ModuleType)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-150
                `}
                style={isActive ? {
                  background: 'var(--sidebar-active)',
                  color: 'white'
                } : {
                  color: 'var(--sidebar-text)',
                  background: 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'var(--sidebar-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 text-left text-sm font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Minimalista */}
        <div className="p-6 border-t" style={{ borderColor: 'var(--sidebar-border)' }}>
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold relative"
              style={{ 
                background: 'var(--sidebar-hover)',
                color: 'var(--sidebar-text)'
              }}
            >
              AD
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: 'var(--sidebar-text)' }}>Admin User</p>
              <p className="text-xs" style={{ color: 'var(--sidebar-text)', opacity: 0.6 }}>Master</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TEMA 3: DARK PRO - Sidebar Compacta com Tooltips e Neon
  if (theme === 'dark') {
    return (
      <div 
        className="flex flex-col relative"
        style={{
          width: '80px',
          background: 'var(--sidebar-bg)',
          borderRight: '1px solid var(--sidebar-border)'
        }}
      >
        {/* Logo Compacto */}
        <div className="p-4 flex justify-center border-b" style={{ borderColor: 'var(--sidebar-border)' }}>
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center relative group cursor-pointer"
            style={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
            }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Menu Items Compactos */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => onNavigate(item.id as ModuleType)}
                  className={`
                    w-full flex items-center justify-center p-4 rounded-xl
                    transition-all duration-200 relative
                  `}
                  style={isActive ? {
                    background: 'var(--sidebar-active)',
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
                  } : {
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'var(--sidebar-hover)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <Icon 
                    className={`w-6 h-6 ${isActive ? 'text-white' : 'text-slate-500'}`}
                    style={isActive ? { filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.8))' } : {}}
                  />
                  {isActive && (
                    <div 
                      className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 rounded-l-full"
                      style={{ background: 'linear-gradient(to bottom, #6366f1, #8b5cf6)' }}
                    />
                  )}
                </button>

                {/* Tooltip on Hover */}
                <div 
                  className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg whitespace-nowrap
                             opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50"
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                    color: 'var(--foreground)'
                  }}
                >
                  <span className="text-sm font-medium">{item.name}</span>
                  <div 
                    className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent"
                    style={{ borderRightColor: 'var(--card-border)' }}
                  />
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer Compacto */}
        <div className="p-3 border-t flex justify-center" style={{ borderColor: 'var(--sidebar-border)' }}>
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold relative cursor-pointer group"
            style={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 0 15px rgba(99, 102, 241, 0.3)'
            }}
          >
            <span className="text-white">AD</span>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 shadow-lg" style={{ borderColor: 'var(--sidebar-bg)', boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)' }}></div>
            
            {/* Tooltip Usuario */}
            <div 
              className="absolute left-full ml-4 bottom-0 px-3 py-2 rounded-lg whitespace-nowrap
                         opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                color: 'var(--foreground)'
              }}
            >
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs opacity-60">Operador Master</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return null;
}
