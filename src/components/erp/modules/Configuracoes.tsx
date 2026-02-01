import { useState } from 'react';
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  Printer, 
  Database,
  Users as UsersIcon,
  FileText,
  Globe,
  Lock
} from 'lucide-react';

export function Configuracoes() {
  const [notifications, setNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">Configurações do Sistema</h1>
            <p className="text-slate-600">Administração e personalização do ACR ERP ULTRA</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Sistema Online</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Menu Lateral de Configurações */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-500 px-4 mb-4">CATEGORIAS</h3>
            
            {[
              { icon: Bell, label: 'Notificações', active: true },
              { icon: Shield, label: 'Segurança & Permissões', active: false },
              { icon: Palette, label: 'Aparência', active: false },
              { icon: Printer, label: 'Impressoras & Hardware', active: false },
              { icon: Database, label: 'Backup & Dados', active: false },
              { icon: UsersIcon, label: 'Usuários & Equipe', active: false },
              { icon: FileText, label: 'Fiscal & Tributário', active: false },
              { icon: Globe, label: 'APIs & Integrações', active: false },
            ].map((item, idx) => (
              <button
                key={idx}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  item.active
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Painel de Configurações */}
          <div className="col-span-2 space-y-6">
            {/* Notificações */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl text-slate-900">Notificações</h3>
                  <p className="text-sm text-slate-500">Configure alertas e avisos do sistema</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900">Notificações Push</p>
                    <p className="text-sm text-slate-500">Receber alertas em tempo real</p>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`w-14 h-8 rounded-full transition-all ${
                      notifications ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all ${
                      notifications ? 'translate-x-7' : 'translate-x-1'
                    }`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900">Email de Resumo Diário</p>
                    <p className="text-sm text-slate-500">Receber relatório diário por email</p>
                  </div>
                  <button className="w-14 h-8 rounded-full bg-blue-600">
                    <div className="w-6 h-6 bg-white rounded-full shadow-md translate-x-7"></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900">Alertas de Estoque Baixo</p>
                    <p className="text-sm text-slate-500">Avisar quando itens estiverem acabando</p>
                  </div>
                  <button className="w-14 h-8 rounded-full bg-blue-600">
                    <div className="w-6 h-6 bg-white rounded-full shadow-md translate-x-7"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Segurança */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl text-slate-900">Segurança</h3>
                  <p className="text-sm text-slate-500">Proteção e controle de acesso</p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-slate-600" />
                    <div className="text-left">
                      <p className="font-medium text-slate-900">Alterar Senha</p>
                      <p className="text-sm text-slate-500">Última alteração: 15/01/2026</p>
                    </div>
                  </div>
                  <span className="text-blue-600 text-sm">Alterar →</span>
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all">
                  <div className="flex items-center gap-3">
                    <UsersIcon className="w-5 h-5 text-slate-600" />
                    <div className="text-left">
                      <p className="font-medium text-slate-900">Permissões de Usuários</p>
                      <p className="text-sm text-slate-500">Controle RBAC</p>
                    </div>
                  </div>
                  <span className="text-blue-600 text-sm">Gerenciar →</span>
                </button>
              </div>
            </div>

            {/* Backup */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Database className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl text-slate-900">Backup & Dados</h3>
                  <p className="text-sm text-slate-500">Proteção e recuperação de informações</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900">Backup Automático</p>
                    <p className="text-sm text-slate-500">Backup diário às 02:00</p>
                  </div>
                  <button
                    onClick={() => setAutoBackup(!autoBackup)}
                    className={`w-14 h-8 rounded-full transition-all ${
                      autoBackup ? 'bg-green-600' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all ${
                      autoBackup ? 'translate-x-7' : 'translate-x-1'
                    }`}></div>
                  </button>
                </div>

                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-sm font-medium text-green-800 mb-1">Último Backup</p>
                  <p className="text-sm text-green-600">31/01/2026 às 02:00 - Sucesso ✓</p>
                </div>

                <button className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-medium">
                  Fazer Backup Manual Agora
                </button>
              </div>
            </div>

            {/* Informações do Sistema */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-xl text-white">
              <h3 className="text-xl mb-4">Informações do Sistema</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Versão</p>
                  <p className="font-medium">ACR ERP ULTRA v2.5.1</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Licença</p>
                  <p className="font-medium">Premium - Ativa</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Banco de Dados</p>
                  <p className="font-medium">PostgreSQL 15.2</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Uptime</p>
                  <p className="font-medium">99.98%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
