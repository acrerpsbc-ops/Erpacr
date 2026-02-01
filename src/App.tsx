import { useState } from 'react';
import { ERPSidebar } from './components/erp/ERPSidebar';
import { Dashboard } from './components/erp/modules/Dashboard';
import { PDV } from './components/erp/modules/PDV';
import { Vendas } from './components/erp/modules/Vendas';
import { Produtos } from './components/erp/modules/Produtos';
import { OrdemServico } from './components/erp/modules/OrdemServico';
import { Estoque } from './components/erp/modules/Estoque';
import { Financeiro } from './components/erp/modules/Financeiro';
import { Logistica } from './components/erp/modules/Logistica';
import { CRM } from './components/erp/modules/CRM';
import { Configuracoes } from './components/erp/modules/Configuracoes';

export type ModuleType = 
  | 'dashboard' 
  | 'pdv'
  | 'vendas'
  | 'produtos'
  | 'os' 
  | 'estoque'
  | 'financeiro'
  | 'logistica' 
  | 'crm' 
  | 'configuracoes';

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('dashboard');

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveModule} />;
      case 'pdv':
        return <PDV />;
      case 'vendas':
        return <Vendas />;
      case 'produtos':
        return <Produtos />;
      case 'os':
        return <OrdemServico />;
      case 'estoque':
        return <Estoque />;
      case 'financeiro':
        return <Financeiro />;
      case 'logistica':
        return <Logistica />;
      case 'crm':
        return <CRM />;
      case 'configuracoes':
        return <Configuracoes />;
      default:
        return <Dashboard onNavigate={setActiveModule} />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-100 flex">
      {/* Sidebar de Navegação */}
      <ERPSidebar activeModule={activeModule} onNavigate={setActiveModule} />

      {/* Conteúdo Principal */}
      <div className="flex-1 overflow-hidden">
        {renderModule()}
      </div>
    </div>
  );
}