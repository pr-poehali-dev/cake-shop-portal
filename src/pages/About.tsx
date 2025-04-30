import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">О нас</h1>
          
          <div className="mb-12">
            <img 
              src="https://images.unsplash.com/photo-1607478900766-efe13248b125?q=80&w=1200" 
              alt="Наша кондитерская" 
              className="w-full h-80 object-cover rounded-xl mb-6"
            />
            
            <div className="prose prose-lg max-w-none">
              <p>
                Добро пожаловать в кондитерскую "Сладкие Мечты" – место, где мы превращаем самые сладкие фантазии в реальность! 
                Вот уже более 10 лет мы создаем не просто десерты, а настоящие произведения кондитерского искусства, 
                которые становятся центральным украшением любого праздника.
              </p>
              
              <p>
                Наша история началась в 2013 году с небольшой домашней кондитерской. Благодаря любви к своему делу, 
                постоянному совершенствованию рецептур и безупречному качеству, сегодня мы являемся одной из ведущих 
                кондитерских Москвы, радуя наших клиентов изысканными тортами и десертами.
              </p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-6">Наши принципы</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Качество без компромиссов</h3>
                <p>Мы используем только натуральные ингредиенты высшего качества без искусственных добавок</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Индивидуальный подход</h3>
                <p>Каждый торт создается с учетом всех пожеланий клиента, делая его уникальным</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Постоянное развитие</h3>
                <p>Мы регулярно обновляем ассортимент и совершенствуем технологии приготовления</p>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-3xl font-bold mb-6">Наша команда</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=300" 
                alt="Анна Смирнова" 
                className="w-full aspect-square object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Анна Смирнова</h3>
              <p className="text-gray-600">Шеф-кондитер</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?q=80&w=300" 
                alt="Дмитрий Петров" 
                className="w-full aspect-square object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Дмитрий Петров</h3>
              <p className="text-gray-600">Шоколатье</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300" 
                alt="Екатерина Иванова" 
                className="w-full aspect-square object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Екатерина Иванова</h3>
              <p className="text-gray-600">Декоратор</p>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Мы гордимся каждым созданным нами тортом и каждым счастливым клиентом. 
              Наша миссия – делать ваши праздники еще более особенными и запоминающимися через вкус и красоту наших кондитерских изделий.
            </p>
            <p>
              Приглашаем вас посетить нашу кондитерскую и окунуться в мир неповторимых вкусов и ароматов!
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
