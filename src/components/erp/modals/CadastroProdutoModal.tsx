import { useState } from 'react';
import { X, Package, DollarSign, Tag, MapPin, Barcode, Image as ImageIcon } from 'lucide-react';

interface CadastroProdutoModalProps {
  onClose: () => void;
  onSave: (produto: any) => void;
}

export function CadastroProdutoModal({ onClose, onSave }: CadastroProdutoModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    categoria: 'Peças',
    codigoBarras: '',
    preco: '',
    precoCompra: '',
    quantidade: '',
    minimo: '',
    fornecedor: '',
    localizacao: '',
    descricao: '',
    marca: '',
    modelo: '',
    unidade: 'UN',
    ncm: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const novoProduto = {
      id: `PRD-${Math.floor(Math.random() * 9999).toString().padStart(3, '0')}`,
      nome: formData.nome,
      categoria: formData.categoria,
      quantidade: parseInt(formData.quantidade) || 0,
      minimo: parseInt(formData.minimo) || 0,
      preco: parseFloat(formData.preco) || 0,
      precoCompra: parseFloat(formData.precoCompra) || 0,
      fornecedor: formData.fornecedor,
      localizacao: formData.localizacao,
      codigoBarras: formData.codigoBarras,
      marca: formData.marca,
      modelo: formData.modelo,
      descricao: formData.descricao,
      ncm: formData.ncm,
      unidade: formData.unidade,
    };

    onSave(novoProduto);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Package className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl text-white">Cadastro de Produto</h2>
              <p className="text-cyan-100 text-sm">Preencha as informações do produto</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-cyan-600" />
                Informações Básicas
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nome do Produto *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    placeholder="Ex: Tela iPhone 14 Pro Original"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Categoria *
                  </label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                  >
                    <option value="Peças">Peças</option>
                    <option value="Acessórios">Acessórios</option>
                    <option value="Ferramentas">Ferramentas</option>
                    <option value="Consumíveis">Consumíveis</option>
                    <option value="Eletrônicos">Eletrônicos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Código de Barras (EAN)
                  </label>
                  <div className="relative">
                    <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="codigoBarras"
                      value={formData.codigoBarras}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                      placeholder="7891234567890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Marca
                  </label>
                  <input
                    type="text"
                    name="marca"
                    value={formData.marca}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    placeholder="Ex: Apple, Samsung"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Modelo
                  </label>
                  <input
                    type="text"
                    name="modelo"
                    value={formData.modelo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    placeholder="Ex: A2890, SM-S918"
                  />
                </div>
              </div>
            </div>

            {/* Valores e Estoque */}
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Valores e Estoque
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preço de Venda * (R$)
                  </label>
                  <input
                    type="number"
                    name="preco"
                    value={formData.preco}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preço de Compra (R$)
                  </label>
                  <input
                    type="number"
                    name="precoCompra"
                    value={formData.precoCompra}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Quantidade Inicial *
                  </label>
                  <input
                    type="number"
                    name="quantidade"
                    value={formData.quantidade}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Estoque Mínimo *
                  </label>
                  <input
                    type="number"
                    name="minimo"
                    value={formData.minimo}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Unidade de Medida
                  </label>
                  <select
                    name="unidade"
                    value={formData.unidade}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                  >
                    <option value="UN">Unidade (UN)</option>
                    <option value="CX">Caixa (CX)</option>
                    <option value="PC">Peça (PC)</option>
                    <option value="KG">Quilograma (KG)</option>
                    <option value="MT">Metro (MT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    NCM (Classificação Fiscal)
                  </label>
                  <input
                    type="text"
                    name="ncm"
                    value={formData.ncm}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    placeholder="0000.00.00"
                    maxLength={10}
                  />
                </div>
              </div>
            </div>

            {/* Fornecedor e Localização */}
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                Fornecedor e Localização
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Fornecedor *
                  </label>
                  <input
                    type="text"
                    name="fornecedor"
                    value={formData.fornecedor}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    placeholder="Ex: DistribCell Ltda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Localização no Estoque *
                  </label>
                  <input
                    type="text"
                    name="localizacao"
                    value={formData.localizacao}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    placeholder="Ex: A1-P2"
                  />
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Descrição Detalhada
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all resize-none"
                placeholder="Informações adicionais sobre o produto..."
              />
            </div>
          </div>

          {/* Footer com Botões */}
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl hover:from-cyan-700 hover:to-cyan-800 transition-all font-medium shadow-lg shadow-cyan-600/30"
            >
              Salvar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
