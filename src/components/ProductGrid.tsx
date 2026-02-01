import { Search, Barcode } from 'lucide-react';
import { Product } from '../App';
import { useState } from 'react';

interface ProductGridProps {
  selectedCategory: string;
  onAddToCart: (product: Product) => void;
}

// Mock de produtos
const mockProducts: Product[] = [
  // Celulares
  { id: '1', name: 'iPhone 15 Pro', price: 7999.00, category: 'celulares', image: 'https://images.unsplash.com/photo-1592286927505-c3b0c8d56d4d?w=400' },
  { id: '2', name: 'Samsung S24 Ultra', price: 6999.00, category: 'celulares', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400' },
  { id: '3', name: 'Xiaomi 14 Pro', price: 4499.00, category: 'celulares', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
  
  // Acessórios
  { id: '4', name: 'AirPods Pro', price: 2199.00, category: 'acessorios', image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400' },
  { id: '5', name: 'Capa Silicone Premium', price: 89.90, category: 'acessorios', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400' },
  { id: '6', name: 'Película Hidrogel', price: 49.90, category: 'acessorios', image: 'https://images.unsplash.com/photo-1585790050230-5dd28404f869?w=400' },
  
  // Cabos
  { id: '7', name: 'Cabo USB-C 2m', price: 59.90, category: 'cabos', image: 'https://images.unsplash.com/photo-1591290619762-c588f92e2b14?w=400' },
  { id: '8', name: 'Cabo Lightning Original', price: 129.90, category: 'cabos', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400' },
  { id: '9', name: 'Cabo USB-A para USB-C', price: 39.90, category: 'cabos', image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400' },
  
  // Serviços
  { id: '10', name: 'Troca de Tela iPhone', price: 899.00, category: 'servicos', image: 'https://images.unsplash.com/photo-1621339256714-e68d1ce1e93d?w=400' },
  { id: '11', name: 'Troca de Bateria', price: 249.00, category: 'servicos', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400' },
  { id: '12', name: 'Limpeza Técnica', price: 79.00, category: 'servicos', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400' },
  
  // Computadores
  { id: '13', name: 'MacBook Air M2', price: 9999.00, category: 'computadores', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400' },
  { id: '14', name: 'Mouse Logitech MX', price: 449.00, category: 'computadores', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400' },
  { id: '15', name: 'Teclado Mecânico RGB', price: 599.00, category: 'computadores', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400' },
  
  // Smartwatch
  { id: '16', name: 'Apple Watch Series 9', price: 4299.00, category: 'smartwatch', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400' },
  { id: '17', name: 'Samsung Galaxy Watch 6', price: 2499.00, category: 'smartwatch', image: 'https://images.unsplash.com/photo-1617625802912-cef60f80c831?w=400' },
  
  // Áudio
  { id: '18', name: 'JBL Flip 6', price: 799.00, category: 'audio', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400' },
  { id: '19', name: 'Sony WH-1000XM5', price: 2499.00, category: 'audio', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400' },
  
  // Games
  { id: '20', name: 'Controle PS5', price: 449.00, category: 'games', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400' },
  { id: '21', name: 'Headset Gamer RGB', price: 349.00, category: 'games', image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400' },
];

export function ProductGrid({ selectedCategory, onAddToCart }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [addedProduct, setAddedProduct] = useState<string | null>(null);

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    setAddedProduct(product.id);
    setTimeout(() => setAddedProduct(null), 600);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Barra de Busca */}
      <div className="px-8 py-8 bg-white border-b-2 border-slate-200">
        <div className="relative max-w-3xl">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou código de barras..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-16 py-5 bg-slate-50 border-2 border-slate-300 rounded-2xl text-xl
                     focus:outline-none focus:border-blue-500 focus:bg-white transition-all touch-manipulation"
          />
          <Barcode className="absolute right-6 top-1/2 -translate-y-1/2 w-7 h-7 text-slate-400" />
        </div>
      </div>

      {/* Grid de Produtos */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="grid grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => handleAddToCart(product)}
              className={`
                relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl
                transition-all duration-300 hover:scale-105 active:scale-95
                border-3 touch-manipulation
                ${addedProduct === product.id 
                  ? 'border-green-500 bg-green-50 shadow-green-200' 
                  : 'border-slate-200 hover:border-blue-500'
                }
              `}
            >
              {/* Feedback Visual */}
              {addedProduct === product.id && (
                <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full text-base font-medium animate-pulse shadow-lg">
                  ✓ Adicionado!
                </div>
              )}

              {/* Imagem do Produto */}
              <div className="aspect-square mb-6 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Nome do Produto */}
              <h3 className="text-xl mb-4 text-slate-800 line-clamp-2 min-h-[3.5rem] font-medium">
                {product.name}
              </h3>

              {/* Preço */}
              <div className="text-4xl text-blue-600 font-semibold">
                R$ {product.price.toFixed(2)}
              </div>
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-slate-400">
              <p className="text-2xl mb-3">Nenhum produto encontrado</p>
              <p className="text-lg">Tente buscar por outro termo ou categoria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}