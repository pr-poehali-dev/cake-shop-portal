import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">Сладкие Мечты</Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Главная</Link>
              <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">О нас</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">Контакты</Link>

              <Link to="/catalog" className="text-gray-700 hover:text-primary transition-colors">Каталог</Link>
              <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">О нас</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">Контакты</Link>
              <Link to="/cart">
                <Button variant="outline" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Войти
                </Button>
              </Link>

            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden focus:outline-none" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Главная
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                О нас
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Контакты
              </Link>
              <Link 
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button variant="outline" className="flex items-center gap-2 w-full justify-start">
                  <ShoppingCart className="h-5 w-5" />
                  Корзина
                </Button>
              </Link>
              <Link 
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button variant="default" className="w-full">
                  Админ-панель
                </Button>
              </Link>
            </nav>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Сладкие Мечты</h3>
              <p className="text-gray-600">
                Кондитерская с любовью к сладкому и качественным ингредиентам. 
                Создаем торты, пирожные и десерты на заказ для любого события.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Навигация</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Главная</Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">О нас</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">Контакты</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <address className="not-italic text-gray-600">
                <p>ул. Кондитерская, 123</p>
                <p>Москва, 123456</p>
                <p className="mt-2">Тел: +7 (495) 123-45-67</p>
                <p>Email: info@tortikiprazdnik.ru</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Сладкие Мечты. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
