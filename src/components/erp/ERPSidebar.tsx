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
  ChevronRight
} from 'lucide-react';
import { ModuleType } from '../../App';

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
  return (
    <div className="w-72 bg-slate-900 flex flex-col shadow-2xl">
      {/* Header / Logo */}
      <div className="p-8 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">A</span>
          </div>
          <div>
            <h1 className="text-white text-2xl">ACR ERP</h1>
            <p className="text-blue-400 text-xs">ULTRA SYSTEM</p>
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
                transition-all duration-200 group relative
                ${isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }
              `}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
              <span className="flex-1 text-left font-medium">{item.name}</span>
              {isActive && (
                <ChevronRight className="w-5 h-5 text-white" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">AD</span>
          </div>
          <div className="flex-1">
            <p className="text-white text-sm">Admin User</p>
            <p className="text-slate-500 text-xs">Operador Master</p>
          </div>
          <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
        </div>
      </div>
    </div>
  );
}