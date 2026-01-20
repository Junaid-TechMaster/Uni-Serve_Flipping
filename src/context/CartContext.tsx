import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course, CartItem } from '../types';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const { showToast } = useToast();

  /* =========================
     Persist Cart
  ========================= */
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  /* =========================
     Actions
  ========================= */
  const addToCart = (course: Course) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === course.id);
      if (exists) {
        showToast('Course already in cart', 'info');
        return prev;
      }

      showToast('Course added to cart', 'success');
      return [...prev, { ...course, quantity: 1 }];
    });
  };

  const removeFromCart = (courseId: string) => {
    setCart(prev => {
      showToast('Course removed from cart', 'info');
      return prev.filter(item => item.id !== courseId);
    });
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared', 'error');
  };

  /* =========================
     Derived Values
  ========================= */
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
