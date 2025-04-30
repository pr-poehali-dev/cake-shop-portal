import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Типы данных для продуктов
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const Index = () => {
  // Здесь в реальном приложении будет API-запрос
  const featuredProducts: Product[] = [
    {
      id: "1",
      name: "Шоколадный торт",
      price: 1200,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=700"
    },
    {
      id: "2",
      name: "Ванильный торт",
      price: 950,
      image: "https://images.unsplash.com/photo-1566121933407-3c7ccdd26763?q=80&w=700"
    },
    {
      id: "3",
      name: "Медовик",
      price: 1100,
      image: "https://images.unsplash.com/photo-1553786803-4daa28fefd5c?q=80&w=700"
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative">
        <div className="h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1200')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="container mx-auto px-4 h-full flex items-center justify-center relative">
            <div className="text-center text-white max-w-3xl">
              <h1 className="text-5xl font-bold mb-4 animate-fade-in">Сладкие Мечты</h1>
              <p className="text-xl mb-8">Кондитерская с любовью к сладкому и мастерству. Создаем торты, пирожные и десерты на заказ для любого события.</p>
              <Button size="lg" className="animate-scale-in">Заказать торт</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наши популярные торты</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover-scale">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-primary font-bold mb-4">{product.price} ₽</p>
                  <div className="flex gap-2">
                    <Link to={`/product/${product.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">Подробнее</Button>
                    </Link>
                    <Button className="flex-1">В корзину</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">Смотреть все торты</Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🍰</div>
              <h3 className="text-xl font-semibold mb-2">Натуральные ингредиенты</h3>
              <p className="text-gray-600">Мы используем только натуральные продукты высшего качества, без искусственных добавок</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Индивидуальный дизайн</h3>
              <p className="text-gray-600">Создаем торты по вашему индивидуальному дизайну для любого праздника</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Доставляем свежие торты точно в срок в любую точку города</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Отзывы наших клиентов</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="text-yellow-400 flex mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4">
                "Заказывала торт на день рождения дочери. Очень красивый и вкусный! Все гости были в восторге."
              </p>
              <p className="font-semibold">Анна К.</p>
            </Card>
            
            <Card className="p-6">
              <div className="text-yellow-400 flex mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4">
                "Лучшие торты в городе! Всегда свежие, красивые и неимоверно вкусные. Теперь только здесь заказываю."
              </p>
              <p className="font-semibold">Дмитрий С.</p>
            </Card>
            
            <Card className="p-6">
              <div className="text-yellow-400 flex mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4">
                "Заказывали свадебный торт. Результат превзошел все ожидания! Спасибо за профессионализм!"
              </p>
              <p className="font-semibold">Елена и Сергей</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Готовы заказать идеальный торт?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами сегодня, и мы поможем воплотить ваши сладкие фантазии в реальность!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="secondary" size="lg">Заказать сейчас</Button>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Связаться с нами
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
