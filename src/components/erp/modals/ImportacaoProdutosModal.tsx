import { useState, useRef } from 'react';
import { X, Upload, FileSpreadsheet, Download, AlertCircle, CheckCircle2, FileText } from 'lucide-react';

interface ImportacaoProdutosModalProps {
  onClose: () => void;
  onImport: (produtos: any[]) => void;
}

export function ImportacaoProdutosModal({ onClose, onImport }: ImportacaoProdutosModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      processFile(selectedFile);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      
      // Pula o cabeçalho e processa as linhas
      const produtos = lines.slice(1)
        .filter(line => line.trim())
        .map((line, index) => {
          const [nome, categoria, preco, quantidade, minimo, fornecedor, localizacao, codigoBarras] = line.split(';');
          
          return {
            id: `PRD-${(index + 1).toString().padStart(3, '0')}`,
            nome: nome?.trim() || '',
            categoria: categoria?.trim() || 'Peças',
            preco: parseFloat(preco?.replace(',', '.')) || 0,
            quantidade: parseInt(quantidade) || 0,
            minimo: parseInt(minimo) || 0,
            fornecedor: fornecedor?.trim() || '',
            localizacao: localizacao?.trim() || '',
            codigoBarras: codigoBarras?.trim() || '',
          };
        });
      
      setPreview(produtos.slice(0, 5)); // Mostra preview dos primeiros 5
    };

    reader.readAsText(file);
  };

  const handleImport = () => {
    if (!file) return;

    setImporting(true);

    // Simula processamento
    setTimeout(() => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        
        const produtos = lines.slice(1)
          .filter(line => line.trim())
          .map((line, index) => {
            const [nome, categoria, preco, quantidade, minimo, fornecedor, localizacao, codigoBarras] = line.split(';');
            
            return {
              id: `PRD-${(1000 + index).toString()}`,
              nome: nome?.trim() || '',
              categoria: categoria?.trim() || 'Peças',
              preco: parseFloat(preco?.replace(',', '.')) || 0,
              quantidade: parseInt(quantidade) || 0,
              minimo: parseInt(minimo) || 0,
              fornecedor: fornecedor?.trim() || '',
              localizacao: localizacao?.trim() || '',
              codigoBarras: codigoBarras?.trim() || '',
            };
          });
        
        onImport(produtos);
        setImportStatus('success');
        setImporting(false);

        // Fecha após 2 segundos
        setTimeout(() => {
          onClose();
        }, 2000);
      };

      reader.readAsText(file);
    }, 1500);
  };

  const downloadTemplate = () => {
    const template = `nome;categoria;preco;quantidade;minimo;fornecedor;localizacao;codigoBarras
Tela iPhone 14 Pro;Peças;899.00;5;10;DistribCell;A1-P2;7891234567890
Bateria Samsung S23;Peças;189.00;12;8;TechParts;A2-P1;7891234567891
Cabo USB-C Premium;Acessórios;49.90;45;20;ImportTech;B1-P3;7891234567892
Película Hidrogel;Acessórios;29.90;30;30;ProScreen;B2-P1;7891234567893`;

    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'template_importacao_produtos.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Upload className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl text-white">Importação em Massa</h2>
              <p className="text-blue-100 text-sm">Importe múltiplos produtos via CSV</p>
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
        <div className="p-8">
          {importStatus === 'success' ? (
            // Success State
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl text-slate-900 mb-2">Importação Concluída!</h3>
              <p className="text-slate-600">Produtos importados com sucesso</p>
            </div>
          ) : (
            <>
              {/* Download Template */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileSpreadsheet className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Template de Importação</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Baixe o arquivo modelo e preencha com os dados dos seus produtos. 
                      O arquivo deve estar no formato CSV com separador ponto e vírgula (;)
                    </p>
                    <button
                      onClick={downloadTemplate}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium"
                    >
                      <Download className="w-5 h-5" />
                      Baixar Template CSV
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload Area */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-slate-900 mb-3">Selecionar Arquivo</h3>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-slate-300 rounded-2xl p-12 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-100 group-hover:bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all">
                      <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-600 transition-all" />
                    </div>
                    {file ? (
                      <>
                        <p className="text-lg font-medium text-slate-900 mb-1">
                          {file.name}
                        </p>
                        <p className="text-sm text-green-600">✓ Arquivo selecionado</p>
                      </>
                    ) : (
                      <>
                        <p className="text-lg font-medium text-slate-900 mb-1">
                          Clique para selecionar arquivo
                        </p>
                        <p className="text-sm text-slate-500">Formatos aceitos: CSV</p>
                      </>
                    )}
                  </div>
                </button>
              </div>

              {/* Preview */}
              {preview.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-slate-900 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Pré-visualização ({preview.length} primeiros registros)
                  </h3>
                  <div className="border-2 border-slate-200 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="px-4 py-3 text-left font-medium text-slate-700">Nome</th>
                            <th className="px-4 py-3 text-left font-medium text-slate-700">Categoria</th>
                            <th className="px-4 py-3 text-right font-medium text-slate-700">Preço</th>
                            <th className="px-4 py-3 text-center font-medium text-slate-700">Qtd</th>
                            <th className="px-4 py-3 text-left font-medium text-slate-700">Fornecedor</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {preview.map((produto, index) => (
                            <tr key={index} className="hover:bg-slate-50">
                              <td className="px-4 py-3 text-slate-900">{produto.nome}</td>
                              <td className="px-4 py-3 text-slate-600">{produto.categoria}</td>
                              <td className="px-4 py-3 text-right text-slate-900">R$ {produto.preco.toFixed(2)}</td>
                              <td className="px-4 py-3 text-center text-slate-900">{produto.quantidade}</td>
                              <td className="px-4 py-3 text-slate-600">{produto.fornecedor}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Info Alert */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Atenção:</p>
                  <p>Certifique-se de que o arquivo CSV está corretamente formatado conforme o template. 
                  Produtos com dados incompletos não serão importados.</p>
                </div>
              </div>

              {/* Footer com Botões */}
              <div className="flex items-center justify-end gap-4">
                <button
                  onClick={onClose}
                  disabled={importing}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-medium disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleImport}
                  disabled={!file || importing}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {importing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Importando...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Importar Produtos
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
