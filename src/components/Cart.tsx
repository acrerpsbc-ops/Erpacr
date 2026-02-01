import { Trash2, Plus, Minus, ShoppingCart, X } from 'lucide-react';
import { CartItem } from '../App';

interface CartProps {
  items: CartItem[];
  total: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onFinalizeSale: () => void;
}

export function Cart({
  items,
  total,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onFinalizeSale,
}: CartProps) {
  return (
    <div className="w-[32rem] bg-white flex flex-col shadow-2xl border-l-2 border-slate-200">
      {/* Cabeçalho do Carrinho */}
      <div className="p-8 border-b-2 border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl text-slate-800">Carrinho</h2>
          </div>
          {items.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-red-500 hover:text-red-600 p-3 hover:bg-red-50 rounded-2xl transition-all touch-manipulation active:scale-95"
              title="Limpar carrinho"
            >
              <X className="w-7 h-7" />
            </button>
          )}
        </div>
        <p className="text-slate-500 text-lg">
          {items.length} {items.length === 1 ? 'item' : 'itens'}
        </p>
      </div>

      {/* Lista de Itens */}
      <div className="flex-1 overflow-y-auto p-8 space-y-5">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <ShoppingCart className="w-24 h-24 mb-6 opacity-30" />
            <p className="text-2xl mb-3">Carrinho vazio</p>
            <p className="text-lg">Adicione produtos para começar</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-3xl p-6 border-2 border-slate-200 hover:border-blue-300 transition-all"
            >
              {/* Nome e Preço */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg text-slate-800 mb-2 font-medium leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-2xl text-blue-600 font-semibold">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-600 p-3 hover:bg-red-50 rounded-2xl transition-all ml-3 touch-manipulation active:scale-95"
                  title="Remover item"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>

              {/* Controles de Quantidade */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 bg-white rounded-2xl border-2 border-slate-300">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-4 hover:bg-slate-100 rounded-l-2xl transition-all touch-manipulation active:scale-95"
                  >
                    <Minus className="w-6 h-6 text-slate-600" />
                  </button>
                  <span className="text-2xl w-16 text-center text-slate-800 font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-4 hover:bg-slate-100 rounded-r-2xl transition-all touch-manipulation active:scale-95"
                  >
                    <Plus className="w-6 h-6 text-slate-600" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-2xl text-slate-800 font-semibold">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Resumo e Finalização */}
      <div className="p-8 bg-slate-50 border-t-2 border-slate-200 space-y-5">
        {/* Total */}
        <div className="bg-blue-600 rounded-3xl p-8 shadow-xl">
          <p className="text-blue-100 text-base mb-2">TOTAL DA VENDA</p>
          <p className="text-white text-6xl font-bold">
            R$ {total.toFixed(2)}
          </p>
        </div>

        {/* Botão Finalizar */}
        <button
          onClick={onFinalizeSale}
          disabled={items.length === 0}
          className={`
            w-full py-7 rounded-3xl text-2xl font-semibold transition-all touch-manipulation
            ${items.length > 0
              ? 'bg-green-500 text-white hover:bg-green-600 active:scale-95 shadow-xl hover:shadow-2xl'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }
          `}
        >
          Finalizar Venda
        </button>
      </div>
    </div>
  );
}