import { X, Smartphone, Laptop, Headphones, Cable, Shield, Zap } from 'lucide-react';

interface Template {
  id: string;
  nome: string;
  categoria: string;
  icon: any;
  descricao: string;
  produtos: Array<{
    nome: string;
    categoria: string;
    preco: number;
    quantidade: number;
    minimo: number;
    fornecedor: string;
  }>;
}

interface TemplatesModalProps {
  onClose: () => void;
  onSelectTemplate: (produtos: any[]) => void;
}

const templates: Template[] = [
  {
    id: 'smartphones',
    nome: 'Kit Peças iPhone',
    categoria: 'Smartphones Apple',
    icon: Smartphone,
    descricao: 'Principais peças para reparo de iPhone',
    produtos: [
      { nome: 'Tela iPhone 14 Pro Original', categoria: 'Peças', preco: 899.00, quantidade: 5, minimo: 10, fornecedor: 'DistribCell' },
      { nome: 'Bateria iPhone 14 Pro', categoria: 'Peças', preco: 249.00, quantidade: 8, minimo: 12, fornecedor: 'DistribCell' },
      { nome: 'Conector Lightning iPhone', categoria: 'Peças', preco: 89.00, quantidade: 15, minimo: 20, fornecedor: 'TechParts' },
      { nome: 'Câmera Traseira iPhone 14 Pro', categoria: 'Peças', preco: 549.00, quantidade: 3, minimo: 5, fornecedor: 'DistribCell' },
      { nome: 'Alto Falante iPhone 14', categoria: 'Peças', preco: 69.00, quantidade: 10, minimo: 15, fornecedor: 'TechParts' },
    ]
  },
  {
    id: 'samsung',
    nome: 'Kit Peças Samsung',
    categoria: 'Smartphones Samsung',
    icon: Smartphone,
    descricao: 'Principais peças para linha Galaxy',
    produtos: [
      { nome: 'Tela Samsung S23 Ultra OLED', categoria: 'Peças', preco: 749.00, quantidade: 4, minimo: 8, fornecedor: 'SamsungParts' },
      { nome: 'Bateria Samsung S23', categoria: 'Peças', preco: 189.00, quantidade: 12, minimo: 15, fornecedor: 'TechParts' },
      { nome: 'Conector USB-C Samsung', categoria: 'Peças', preco: 45.00, quantidade: 20, minimo: 25, fornecedor: 'TechParts' },
      { nome: 'Câmera Galaxy S23 Ultra', categoria: 'Peças', preco: 449.00, quantidade: 2, minimo: 4, fornecedor: 'SamsungParts' },
      { nome: 'Vibra Call Samsung', categoria: 'Peças', preco: 35.00, quantidade: 15, minimo: 20, fornecedor: 'TechParts' },
    ]
  },
  {
    id: 'notebooks',
    nome: 'Kit Peças Notebooks',
    categoria: 'Notebooks e Laptops',
    icon: Laptop,
    descricao: 'Peças essenciais para manutenção de notebooks',
    produtos: [
      { nome: 'SSD 256GB NVME', categoria: 'Peças', preco: 299.00, quantidade: 10, minimo: 15, fornecedor: 'ImportTech' },
      { nome: 'Memória RAM 8GB DDR4', categoria: 'Peças', preco: 189.00, quantidade: 15, minimo: 20, fornecedor: 'ImportTech' },
      { nome: 'Teclado Notebook Universal', categoria: 'Peças', preco: 129.00, quantidade: 8, minimo: 12, fornecedor: 'TechParts' },
      { nome: 'Bateria Notebook Universal', categoria: 'Peças', preco: 249.00, quantidade: 6, minimo: 10, fornecedor: 'PowerCell' },
      { nome: 'Pasta Térmica Premium', categoria: 'Consumíveis', preco: 29.90, quantidade: 20, minimo: 30, fornecedor: 'TechParts' },
    ]
  },
  {
    id: 'acessorios',
    nome: 'Kit Acessórios Premium',
    categoria: 'Acessórios',
    icon: Headphones,
    descricao: 'Acessórios mais vendidos',
    produtos: [
      { nome: 'Fone Bluetooth TWS', categoria: 'Acessórios', preco: 149.00, quantidade: 25, minimo: 30, fornecedor: 'AudioTech' },
      { nome: 'Case Silicone Premium', categoria: 'Acessórios', preco: 79.90, quantidade: 50, minimo: 60, fornecedor: 'CaseMania' },
      { nome: 'Película Hidrogel', categoria: 'Acessórios', preco: 29.90, quantidade: 100, minimo: 120, fornecedor: 'ProScreen' },
      { nome: 'Suporte Veicular Premium', categoria: 'Acessórios', preco: 89.90, quantidade: 20, minimo: 25, fornecedor: 'CarTech' },
      { nome: 'Power Bank 10000mAh', categoria: 'Acessórios', preco: 129.00, quantidade: 15, minimo: 20, fornecedor: 'PowerCell' },
    ]
  },
  {
    id: 'cabos',
    nome: 'Kit Cabos e Carregadores',
    categoria: 'Cabos e Carregadores',
    icon: Cable,
    descricao: 'Linha completa de cabos e carregadores',
    produtos: [
      { nome: 'Cabo USB-C 1m Premium', categoria: 'Acessórios', preco: 49.90, quantidade: 50, minimo: 60, fornecedor: 'CableTech' },
      { nome: 'Cabo Lightning 1m MFi', categoria: 'Acessórios', preco: 69.90, quantidade: 40, minimo: 50, fornecedor: 'AppleParts' },
      { nome: 'Carregador Turbo 65W', categoria: 'Acessórios', preco: 129.00, quantidade: 25, minimo: 30, fornecedor: 'PowerTech' },
      { nome: 'Cabo Micro USB 1m', categoria: 'Acessórios', preco: 29.90, quantidade: 60, minimo: 70, fornecedor: 'CableTech' },
      { nome: 'Carregador Sem Fio Qi', categoria: 'Acessórios', preco: 99.90, quantidade: 20, minimo: 25, fornecedor: 'PowerTech' },
    ]
  },
  {
    id: 'protecao',
    nome: 'Kit Proteção Total',
    categoria: 'Proteção e Segurança',
    icon: Shield,
    descricao: 'Produtos para proteção de dispositivos',
    produtos: [
      { nome: 'Película Vidro Temperado 9H', categoria: 'Acessórios', preco: 39.90, quantidade: 80, minimo: 100, fornecedor: 'ProScreen' },
      { nome: 'Case Anti-Impacto', categoria: 'Acessórios', preco: 119.00, quantidade: 40, minimo: 50, fornecedor: 'CaseMania' },
      { nome: 'Película Privacidade', categoria: 'Acessórios', preco: 59.90, quantidade: 30, minimo: 40, fornecedor: 'ProScreen' },
      { nome: 'Seguro Lente Câmera', categoria: 'Acessórios', preco: 29.90, quantidade: 50, minimo: 60, fornecedor: 'ProScreen' },
      { nome: 'Capa Carteira Premium', categoria: 'Acessórios', preco: 149.00, quantidade: 25, minimo: 30, fornecedor: 'CaseMania' },
    ]
  },
];

export function TemplatesModal({ onClose, onSelectTemplate }: TemplatesModalProps) {
  const handleSelectTemplate = (template: Template) => {
    const produtos = template.produtos.map((produto, index) => ({
      id: `PRD-${(Math.random() * 10000).toFixed(0).padStart(4, '0')}`,
      ...produto,
      localizacao: `A${Math.floor(Math.random() * 3) + 1}-P${Math.floor(Math.random() * 5) + 1}`,
      codigoBarras: `789${Math.floor(Math.random() * 10000000000)}`,
    }));

    onSelectTemplate(produtos);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl text-white">Templates de Produtos</h2>
              <p className="text-purple-100 text-sm">Kits pré-configurados para cadastro rápido</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-2 gap-6">
            {templates.map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.id}
                  className="bg-white border-2 border-slate-200 rounded-3xl p-6 hover:border-purple-500 hover:shadow-xl transition-all group cursor-pointer"
                  onClick={() => handleSelectTemplate(template)}
                >
                  {/* Header do Card */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-slate-900 mb-1">{template.nome}</h3>
                      <p className="text-sm text-purple-600">{template.categoria}</p>
                    </div>
                    <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {template.produtos.length} itens
                    </div>
                  </div>

                  {/* Descrição */}
                  <p className="text-sm text-slate-600 mb-4">{template.descricao}</p>

                  {/* Lista de Produtos */}
                  <div className="space-y-2 mb-4">
                    {template.produtos.slice(0, 3).map((produto, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-2 bg-slate-50 rounded-lg">
                        <span className="text-slate-700">{produto.nome}</span>
                        <span className="text-purple-600 font-medium">R$ {produto.preco.toFixed(2)}</span>
                      </div>
                    ))}
                    {template.produtos.length > 3 && (
                      <div className="text-center text-sm text-slate-500 py-2">
                        + {template.produtos.length - 3} produtos adicionais
                      </div>
                    )}
                  </div>

                  {/* Botão de Ação */}
                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all font-medium group-hover:shadow-lg">
                    Usar Template
                  </button>
                </div>
              );
            })}
          </div>

          {/* Info */}
          <div className="mt-8 bg-purple-50 border border-purple-200 rounded-2xl p-6">
            <h4 className="font-medium text-purple-900 mb-2">💡 Como usar os templates</h4>
            <p className="text-sm text-purple-700">
              Os templates são kits pré-configurados com os produtos mais comuns para cada categoria. 
              Ao selecionar um template, todos os produtos serão adicionados ao estoque automaticamente. 
              Você pode editar os valores depois se necessário.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
