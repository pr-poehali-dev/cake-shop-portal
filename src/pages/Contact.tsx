import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Контакты</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Свяжитесь с нами</h2>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium">Ваше имя</label>
                <Input id="name" placeholder="Введите ваше имя" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block font-medium">Электронная почта</label>
                <Input id="email" type="email" placeholder="example@mail.ru" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="block font-medium">Номер телефона</label>
                <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block font-medium">Сообщение</label>
                <Textarea 
                  id="message" 
                  placeholder="Ваше сообщение" 
                  rows={5}
                />
              </div>
              
              <Button type="submit" className="w-full">Отправить сообщение</Button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Наши контакты</h2>
            
            <div className="grid gap-6">
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Адрес</h3>
                    <p className="text-gray-700">ул. Кондитерская, 123, Москва, 123456</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Телефон</h3>
                    <p className="text-gray-700">+7 (495) 123-45-67</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-700">info@tortikiprazdnik.ru</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Часы работы</h3>
                    <p className="text-gray-700">Пн-Пт: 9:00 - 20:00</p>
                    <p className="text-gray-700">Сб-Вс: 10:00 - 18:00</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg h-96 flex items-center justify-center">
          <p className="text-gray-500">Здесь будет карта с расположением кондитерской</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
