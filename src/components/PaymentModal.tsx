import { X, Banknote, CreditCard, Smartphone, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface PaymentModalProps {
  total: number;
  onClose: () => void;
  onPaymentComplete: () => void;
}

type PaymentMethod = 'cash' | 'pix' | 'card' | null;

export function PaymentModal({ total, onClose, onPaymentComplete }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cashReceived, setCashReceived] = useState('');

  const change = cashReceived ? parseFloat(cashReceived) - total : 0;

  const handlePayment = () => {
    if (!selectedMethod) return;

    setIsProcessing(true);
    
    // Simular processamento de pagamento
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      // Fechar modal após mostrar sucesso
      setTimeout(() => {
        onPaymentComplete();
      }, 2000);
    }, 1500);
  };

  if (isComplete) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-8">
        <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
          <div className="mb-6">
            <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto animate-pulse" />
          </div>
          <h2 className="text-3xl mb-4 text-slate-800">Pagamento Confirmado!</h2>
          <p className="text-xl text-slate-600 mb-2">Venda finalizada com sucesso</p>
          {selectedMethod === 'cash' && change > 0 && (
            <div className="mt-6 p-6 bg-green-50 rounded-2xl border-2 border-green-200">
              <p className="text-sm text-green-700 mb-1">Troco:</p>
              <p className="text-3xl text-green-600">R$ {change.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Cabeçalho */}
        <div className="p-10 border-b-2 border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-4xl mb-3 text-slate-800">Finalizar Pagamento</h2>
            <p className="text-slate-500 text-lg">Selecione a forma de pagamento</p>
          </div>
          <button
            onClick={onClose}
            className="p-4 hover:bg-slate-100 rounded-2xl transition-all touch-manipulation active:scale-95"
          >
            <X className="w-9 h-9 text-slate-600" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-10">
          {/* Total */}
          <div className="bg-blue-600 rounded-3xl p-10 mb-10 text-center shadow-xl">
            <p className="text-blue-100 text-base mb-2 font-medium">TOTAL A PAGAR</p>
            <p className="text-white text-6xl font-bold">R$ {total.toFixed(2)}</p>
          </div>

          {/* Métodos de Pagamento */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            {/* Dinheiro */}
            <button
              onClick={() => setSelectedMethod('cash')}
              className={`
                p-10 rounded-3xl border-4 transition-all duration-200 touch-manipulation active:scale-95
                ${selectedMethod === 'cash'
                  ? 'border-green-500 bg-green-50 shadow-xl shadow-green-200'
                  : 'border-slate-200 hover:border-green-300 hover:bg-green-50/50'
                }
              `}
            >
              <Banknote className={`w-20 h-20 mx-auto mb-5 ${selectedMethod === 'cash' ? 'text-green-600' : 'text-slate-400'}`} />
              <p className={`text-2xl font-semibold ${selectedMethod === 'cash' ? 'text-green-600' : 'text-slate-600'}`}>
                Dinheiro
              </p>
            </button>

            {/* PIX */}
            <button
              onClick={() => setSelectedMethod('pix')}
              className={`
                p-10 rounded-3xl border-4 transition-all duration-200 touch-manipulation active:scale-95
                ${selectedMethod === 'pix'
                  ? 'border-blue-500 bg-blue-50 shadow-xl shadow-blue-200'
                  : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                }
              `}
            >
              <Smartphone className={`w-20 h-20 mx-auto mb-5 ${selectedMethod === 'pix' ? 'text-blue-600' : 'text-slate-400'}`} />
              <p className={`text-2xl font-semibold ${selectedMethod === 'pix' ? 'text-blue-600' : 'text-slate-600'}`}>
                PIX
              </p>
            </button>

            {/* Cartão */}
            <button
              onClick={() => setSelectedMethod('card')}
              className={`
                p-10 rounded-3xl border-4 transition-all duration-200 touch-manipulation active:scale-95
                ${selectedMethod === 'card'
                  ? 'border-purple-500 bg-purple-50 shadow-xl shadow-purple-200'
                  : 'border-slate-200 hover:border-purple-300 hover:bg-purple-50/50'
                }
              `}
            >
              <CreditCard className={`w-20 h-20 mx-auto mb-5 ${selectedMethod === 'card' ? 'text-purple-600' : 'text-slate-400'}`} />
              <p className={`text-2xl font-semibold ${selectedMethod === 'card' ? 'text-purple-600' : 'text-slate-600'}`}>
                Cartão
              </p>
            </button>
          </div>

          {/* Campo de Dinheiro Recebido */}
          {selectedMethod === 'cash' && (
            <div className="mb-10 p-8 bg-green-50 rounded-3xl border-3 border-green-200 animate-in fade-in slide-in-from-top duration-200">
              <label className="block text-xl text-green-800 mb-4 font-medium">
                Valor Recebido
              </label>
              <input
                type="number"
                step="0.01"
                value={cashReceived}
                onChange={(e) => setCashReceived(e.target.value)}
                placeholder="0,00"
                className="w-full px-8 py-6 text-4xl bg-white border-3 border-green-300 rounded-2xl
                         focus:outline-none focus:border-green-500 transition-all touch-manipulation font-semibold"
              />
              {change > 0 && (
                <div className="mt-6 flex items-center justify-between text-xl">
                  <span className="text-green-700 font-medium">Troco:</span>
                  <span className="text-3xl text-green-600 font-bold">R$ {change.toFixed(2)}</span>
                </div>
              )}
              {change < 0 && cashReceived && (
                <div className="mt-6 text-red-500 text-center text-xl font-medium">
                  Valor insuficiente
                </div>
              )}
            </div>
          )}

          {/* Botão de Confirmar */}
          <button
            onClick={handlePayment}
            disabled={!selectedMethod || (selectedMethod === 'cash' && change < 0) || isProcessing}
            className={`
              w-full py-8 rounded-3xl text-3xl font-semibold transition-all touch-manipulation
              ${selectedMethod && (selectedMethod !== 'cash' || change >= 0) && !isProcessing
                ? 'bg-green-500 text-white hover:bg-green-600 active:scale-95 shadow-xl hover:shadow-2xl'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }
            `}
          >
            {isProcessing ? 'Processando...' : 'Confirmar Pagamento'}
          </button>
        </div>
      </div>
    </div>
  );
}