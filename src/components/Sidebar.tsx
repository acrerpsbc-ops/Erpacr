import { Smartphone, Headphones, Cable, Wrench, Laptop, Watch, Speaker, Gamepad2 } from 'lucide-react';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'Todos', icon: Smartphone },
  { id: 'celulares', name: 'Celulares', icon: Smartphone },
  { id: 'acessorios', name: 'Acessórios', icon: Headphones },
  { id: 'cabos', name: 'Cabos', icon: Cable },
  { id: 'servicos', name: 'Serviços', icon: Wrench },
  { id: 'computadores', name: 'Computadores', icon: Laptop },
  { id: 'smartwatch', name: 'Smartwatch', icon: Watch },
  { id: 'audio', name: 'Áudio', icon: Speaker },
  { id: 'games', name: 'Games', icon: Gamepad2 },
];

export function Sidebar({ selectedCategory, onSelectCategory }: SidebarProps) {
  return (
    <div className="w-80 bg-slate-800 flex flex-col p-8 shadow-2xl">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-white text-3xl mb-2">ACR ERP ULTRA</h1>
        <p className="text-blue-400 text-base">PDV Balcão Express</p>
      </div>

      {/* Categorias */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`
                w-full flex items-center gap-5 px-6 py-6 rounded-2xl
                transition-all duration-200 touch-manipulation
                ${isActive
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/40 scale-105'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white active:scale-95'
                }
              `}
            >
              <Icon className="w-7 h-7 flex-shrink-0" />
              <span className="font-medium text-lg">{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-8 border-t border-slate-700">
        <div className="text-slate-400 text-sm space-y-2">
          <p>Operador: <span className="text-slate-200 font-medium">Admin</span></p>
          <p>Caixa: <span className="text-green-400 font-medium">Aberto</span></p>
        </div>
      </div>
    </div>
  );
}