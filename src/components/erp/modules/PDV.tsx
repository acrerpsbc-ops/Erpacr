import { useState } from 'react';
import { ProductGrid } from '../../ProductGrid';
import { Cart } from '../../Cart';
import { PaymentModal } from '../../PaymentModal';
import { Product, CartItem } from '../../../App';
import { ArrowLeft } from 'lucide-react';

export function PDV() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFinalizeSale = () => {
    if (cart.length > 0) {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentComplete = () => {
    setShowPaymentModal(false);
    clearCart();
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl text-slate-900">PDV - Balcão Express</h1>
          <p className="text-sm text-slate-600">Ponto de Venda Rápido</p>
        </div>
      </div>

      {/* PDV Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar de categorias foi integrada ao ProductGrid */}
        <div className="flex-1">
          <ProductGrid
            selectedCategory={selectedCategory}
            onAddToCart={addToCart}
          />
        </div>

        {/* Carrinho */}
        <Cart
          items={cart}
          total={total}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
          onFinalizeSale={handleFinalizeSale}
        />
      </div>

      {/* Modal de Pagamento */}
      {showPaymentModal && (
        <PaymentModal
          total={total}
          onClose={() => setShowPaymentModal(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}
