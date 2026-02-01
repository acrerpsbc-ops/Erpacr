import { useState } from 'react';
import { Package, Search, AlertTriangle, TrendingDown, Plus, Filter, Upload, Zap } from 'lucide-react';
import { CadastroProdutoModal } from '../modals/CadastroProdutoModal';
import { ImportacaoProdutosModal } from '../modals/ImportacaoProdutosModal';
import { TemplatesModal } from '../modals/TemplatesModal';

interface ProdutoEstoque {
  id: string;
  nome: string;
  categoria: string;
  quantidade: number;
  minimo: number;
  preco: number;
  fornecedor: string;
  localizacao: string;
}

const mockProdutos: ProdutoEstoque[] = [
  { id: 'PRD-001', nome: 'Tela iPhone 14 Pro Original', categoria: 'Peças', quantidade: 5, minimo: 10, preco: 899.00, fornecedor: 'DistribCell', localizacao: 'A1-P2' },
  { id: 'PRD-002', nome: 'Bateria Samsung S23', categoria: 'Peças', quantidade: 12, minimo: 8, preco: 189.00, fornecedor: 'TechParts', localizacao: 'A2-P1' },
  { id: 'PRD-003', nome: 'Cabo USB-C Premium', categoria: 'Acessórios', quantidade: 45, minimo: 20, preco: 49.90, fornecedor: 'ImportTech', localizacao: 'B1-P3' },
  { id: 'PRD-004', nome: 'Película Hidrogel', categoria: 'Acessórios', quantidade: 8, minimo: 30, preco: 29.90, fornecedor: 'ProScreen', localizacao: 'B2-P1' },
  { id: 'PRD-005', nome: 'Conector Lightning', categoria: 'Peças', quantidade: 3, minimo: 15, preco: 45.00, fornecedor: 'DistribCell', localizacao: 'A1-P5' },
  { id: 'PRD-006', nome: 'Case Silicone Premium', categoria: 'Acessórios', quantidade: 67, minimo: 25, preco: 79.90, fornecedor: 'CaseMania', localizacao: 'C1-P2' },
  { id: 'PRD-007', nome: 'Tela MacBook Air M2', categoria: 'Peças', quantidade: 1, minimo: 3, preco: 2899.00, fornecedor: 'AppleParts', localizacao: 'A3-P1' },
];

export function Estoque() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('todas');
  const [produtos, setProdutos] = useState<ProdutoEstoque[]>(mockProdutos);
  const [showCadastro, setShowCadastro] = useState(false);
  const [showImportacao, setShowImportacao] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const filteredProdutos = produtos.filter(produto => {
    const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'todas' || produto.categoria === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const produtosBaixos = produtos.filter(p => p.quantidade < p.minimo).length;
  const valorTotal = produtos.reduce((sum, p) => sum + (p.quantidade * p.preco), 0);

  const handleSaveProduto = (novoProduto: ProdutoEstoque) => {
    setProdutos([...produtos, novoProduto]);
  };

  const handleImportProdutos = (novosProdutos: ProdutoEstoque[]) => {
    setProdutos([...produtos, ...novosProdutos]);
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">Gestão de Estoque</h1>
            <p className="text-slate-600">Controle completo de produtos e peças</p>
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
              className="flex items-center gap-3 bg-cyan-600 text-white px-6 py-4 rounded-2xl
                       hover:bg-cyan-700 transition-all shadow-lg"
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
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-6 text-white">
            <Package className="w-8 h-8 mb-3" />
            <p className="text-cyan-100 text-sm mb-1">Total de Itens</p>
            <p className="text-3xl font-bold">{produtos.length}</p>
          </div>

          <div className="bg-white border-2 border-red-200 rounded-2xl p-6">
            <AlertTriangle className="w-8 h-8 text-red-600 mb-3" />
            <p className="text-slate-600 text-sm mb-1">Estoque Baixo</p>
            <p className="text-3xl font-bold text-red-600">{produtosBaixos}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
            <TrendingDown className="w-8 h-8 text-slate-600 mb-3" />
            <p className="text-slate-600 text-sm mb-1">Valor em Estoque</p>
            <p className="text-2xl font-bold text-slate-900">R$ {(valorTotal / 1000).toFixed(1)}K</p>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
            <Package className="w-8 h-8 text-slate-600 mb-3" />
            <p className="text-slate-600 text-sm mb-1">Categorias</p>
            <p className="text-3xl font-bold text-slate-900">2</p>
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
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl
                       focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-cyan-500"
          >
            <option value="todas">Todas Categorias</option>
            <option value="Peças">Peças</option>
            <option value="Acessórios">Acessórios</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50">
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="p-8">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">Produto</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">Categoria</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-slate-700">Quantidade</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-700">Preço Unit.</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-700">Fornecedor</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-slate-700">Local</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredProdutos.map((produto) => {
                const isBaixo = produto.quantidade < produto.minimo;
                return (
                  <tr key={produto.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{produto.nome}</p>
                      <p className="text-sm text-slate-500">{produto.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                        {produto.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-lg font-semibold ${isBaixo ? 'text-red-600' : 'text-slate-900'}`}>
                        {produto.quantidade}
                      </span>
                      <span className="text-sm text-slate-500"> / {produto.minimo}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900">
                      R$ {produto.preco.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {produto.fornecedor}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-mono text-sm bg-slate-100 px-3 py-1 rounded">
                        {produto.localizacao}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isBaixo ? (
                        <span className="flex items-center justify-center gap-2 text-red-600">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm font-medium">Baixo</span>
                        </span>
                      ) : (
                        <span className="text-green-600 text-sm font-medium">OK</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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