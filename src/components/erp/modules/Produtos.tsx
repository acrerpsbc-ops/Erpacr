import { useState } from 'react';
import { Package, Search, Plus, Upload, Zap, Edit, Trash2, Star } from 'lucide-react';
import { CadastroProdutoModal } from '../modals/CadastroProdutoModal';
import { ImportacaoProdutosModal } from '../modals/ImportacaoProdutosModal';
import { TemplatesModal } from '../modals/TemplatesModal';

interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  precoCompra: number;
  marca: string;
  modelo: string;
  codigoBarras: string;
  ativo: boolean;
  destaque: boolean;
}

const mockProdutos: Produto[] = [
  { id: 'PRD-001', nome: 'Tela iPhone 14 Pro Original', categoria: 'Peças', preco: 899.00, precoCompra: 650.00, marca: 'Apple', modelo: 'A2890', codigoBarras: '7891234567890', ativo: true, destaque: true },
  { id: 'PRD-002', nome: 'Bateria Samsung S23', categoria: 'Peças', preco: 189.00, precoCompra: 120.00, marca: 'Samsung', modelo: 'SM-S918', codigoBarras: '7891234567891', ativo: true, destaque: false },
  { id: 'PRD-003', nome: 'Cabo USB-C Premium', categoria: 'Acessórios', preco: 49.90, precoCompra: 25.00, marca: 'Anker', modelo: 'A8187', codigoBarras: '7891234567892', ativo: true, destaque: true },
  { id: 'PRD-004', nome: 'Película Hidrogel', categoria: 'Acessórios', preco: 29.90, precoCompra: 8.50, marca: 'Hprime', modelo: 'HG-001', codigoBarras: '7891234567893', ativo: true, destaque: false },
  { id: 'PRD-005', nome: 'Conector Lightning', categoria: 'Peças', preco: 45.00, precoCompra: 28.00, marca: 'Apple', modelo: 'Lightning', codigoBarras: '7891234567894', ativo: true, destaque: false },
  { id: 'PRD-006', nome: 'Case Silicone Premium', categoria: 'Acessórios', preco: 79.90, precoCompra: 35.00, marca: 'ESR', modelo: 'Classic', codigoBarras: '7891234567895', ativo: true, destaque: true },
  { id: 'PRD-007', nome: 'Tela MacBook Air M2', categoria: 'Peças', preco: 2899.00, precoCompra: 2100.00, marca: 'Apple', modelo: 'MBA-M2', codigoBarras: '7891234567896', ativo: true, destaque: false },
  { id: 'PRD-008', nome: 'Fone Bluetooth TWS', categoria: 'Acessórios', preco: 149.00, precoCompra: 75.00, marca: 'QCY', modelo: 'T13', codigoBarras: '7891234567897', ativo: true, destaque: true },
];

export function Produtos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('todas');
  const [produtos, setProdutos] = useState<Produto[]>(mockProdutos);
  const [showCadastro, setShowCadastro] = useState(false);
  const [showImportacao, setShowImportacao] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const filteredProdutos = produtos.filter(produto => {
    const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.marca.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'todas' || produto.categoria === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveProduto = (novoProduto: any) => {
    setProdutos([...produtos, { ...novoProduto, ativo: true, destaque: false }]);
  };

  const handleImportProdutos = (novosProdutos: any[]) => {
    const produtosComStatus = novosProdutos.map(p => ({ ...p, ativo: true, destaque: false }));
    setProdutos([...produtos, ...produtosComStatus]);
  };

  const totalAtivos = produtos.filter(p => p.ativo).length;
  const totalDestaques = produtos.filter(p => p.destaque).length;
  const margemMedia = produtos.reduce((sum, p) => {
    const margem = ((p.preco - p.precoCompra) / p.preco) * 100;
    return sum + margem;
  }, 0) / produtos.length;

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">Catálogo de Produtos</h1>
            <p className="text-slate-600">Cadastro e gestão de produtos para venda</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowTemplates(true)}
              className="flex items-center gap-3 bg-purple-600 text-white px-6 py-4 rounded-2xl
                       hover:bg-purple-700 transition-all shadow-lg"
            >
              <Zap className="w-6 h-6" />
              <span className="font-medium text-lg">Templates</span>
            </button>
            <button 
              onClick={() => setShowImportacao(true)}
              className="flex items-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-2xl
                       hover:bg-blue-700 transition-all shadow-lg"
            >
              <Upload className="w-6 h-6" />
              <span className="font-medium text-lg">Importar</span>
            </button>
            <button 
              onClick={() => setShowCadastro(true)}
              className="flex items-center gap-3 bg-violet-600 text-white px-6 py-4 rounded-2xl
                       hover:bg-violet-700 transition-all shadow-lg"
            >
              <Plus className="w-6 h-6" />
              <span className="font-medium text-lg">Novo Produto</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-8 border-b border-slate-200 bg-white">
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl p-6 text-white">
            <Package className="w-8 h-8 mb-3" />
            <p className="text-violet-100 text-sm mb-1">Total de Produtos</p>
            <p className="text-3xl font-bold">{produtos.length}</p>
          </div>

          <div className="bg-white border-2 border-green-200 rounded-2xl p-6">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-green-600 text-lg">✓</span>
            </div>
            <p className="text-slate-600 text-sm mb-1">Produtos Ativos</p>
            <p className="text-3xl font-bold text-green-600">{totalAtivos}</p>
          </div>

          <div className="bg-white border-2 border-yellow-200 rounded-2xl p-6">
            <Star className="w-8 h-8 text-yellow-600 mb-3" />
            <p className="text-slate-600 text-sm mb-1">Em Destaque</p>
            <p className="text-3xl font-bold text-yellow-600">{totalDestaques}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-slate-600 text-lg">%</span>
            </div>
            <p className="text-slate-600 text-sm mb-1">Margem Média</p>
            <p className="text-2xl font-bold text-slate-900">{margemMedia.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-8 py-6 bg-white border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar produtos por nome, marca ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl
                       focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-violet-500"
          >
            <option value="todas">Todas Categorias</option>
            <option value="Peças">Peças</option>
            <option value="Acessórios">Acessórios</option>
            <option value="Ferramentas">Ferramentas</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-8">
        <div className="grid grid-cols-3 gap-6">
          {filteredProdutos.map((produto) => {
            const margem = ((produto.preco - produto.precoCompra) / produto.preco) * 100;
            
            return (
              <div
                key={produto.id}
                className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all group"
              >
                {/* Header do Card */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {produto.destaque && (
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      )}
                      <h3 className="text-lg font-medium text-slate-900">{produto.nome}</h3>
                    </div>
                    <p className="text-sm text-slate-500 mb-1">{produto.marca} - {produto.modelo}</p>
                    <p className="text-xs text-slate-400 font-mono">{produto.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    produto.ativo 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {produto.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>

                {/* Categoria */}
                <div className="mb-4">
                  <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm">
                    {produto.categoria}
                  </span>
                </div>

                {/* Preços */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Preço de Venda</p>
                    <p className="text-xl font-bold text-green-600">R$ {produto.preco.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Custo</p>
                    <p className="text-lg font-medium text-slate-700">R$ {produto.precoCompra.toFixed(2)}</p>
                  </div>
                </div>

                {/* Margem */}
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">Margem de Lucro</span>
                    <span className="text-lg font-bold text-blue-600">{margem.toFixed(1)}%</span>
                  </div>
                </div>

                {/* Código de Barras */}
                <div className="mb-4 p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Código de Barras</p>
                  <p className="font-mono text-sm text-slate-900">{produto.codigoBarras}</p>
                </div>

                {/* Ações */}
                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-all">
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">Editar</span>
                  </button>
                  <button className="px-4 py-2 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProdutos.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-400">Nenhum produto encontrado</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCadastro && (
        <CadastroProdutoModal
          onClose={() => setShowCadastro(false)}
          onSave={handleSaveProduto}
        />
      )}

      {showImportacao && (
        <ImportacaoProdutosModal
          onClose={() => setShowImportacao(false)}
          onImport={handleImportProdutos}
        />
      )}

      {showTemplates && (
        <TemplatesModal
          onClose={() => setShowTemplates(false)}
          onSelectTemplate={handleImportProdutos}
        />
      )}
    </div>
  );
}
