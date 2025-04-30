import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Edit, Trash2, Package, ShoppingCart, Users } from "lucide-react";

// Типы данных для административной панели
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
};

type Order = {
  id: string;
  customer: string;
  date: string;
  status: string;
  total: number;
};

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
};

const Admin = () => {
  // Здесь в реальном приложении будут API-запросы
  const [products] = useState<Product[]>([
    { id: "1", name: "Шоколадный торт", price: 1200, description: "Нежный шоколадный торт", category: "Торты" },
    { id: "2", name: "Ванильный торт", price: 950, description: "Классический ванильный торт", category: "Торты" },
    { id: "3", name: "Медовик", price: 1100, description: "Медовый торт со сметанным кремом", category: "Торты" },
  ]);

  const [orders] = useState<Order[]>([
    { id: "1", customer: "Иванов Иван", date: "2025-04-28", status: "Выполнен", total: 2150 },
    { id: "2", customer: "Петрова Анна", date: "2025-04-29", status: "В обработке", total: 1200 },
    { id: "3", customer: "Сидоров Алексей", date: "2025-04-30", status: "Ожидает оплаты", total: 3300 },
  ]);

  const [customers] = useState<Customer[]>([
    { id: "1", name: "Иванов Иван", email: "ivanov@mail.ru", phone: "+7 (901) 123-45-67", orders: 3 },
    { id: "2", name: "Петрова Анна", email: "petrova@mail.ru", phone: "+7 (902) 234-56-78", orders: 1 },
    { id: "3", name: "Сидоров Алексей", email: "sidorov@mail.ru", phone: "+7 (903) 345-67-89", orders: 2 },
  ]);

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Административная панель</h1>
        
        <Tabs defaultValue="products">
          <TabsList className="mb-8">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Товары
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Заказы
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Клиенты
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Управление товарами</h2>
                  <Button className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Добавить товар
                  </Button>
                </div>
                
                <div className="mb-6">
                  <div className="relative">
                    <Input placeholder="Поиск товаров..." className="pl-10" />
                    <span className="absolute left-3 top-2.5">🔍</span>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Цена</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map(product => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price} ₽</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Добавить новый товар</h3>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="product-name" className="block font-medium">Название</label>
                      <Input id="product-name" placeholder="Введите название" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="product-category" className="block font-medium">Категория</label>
                      <Input id="product-category" placeholder="Выберите категорию" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="product-price" className="block font-medium">Цена</label>
                      <Input id="product-price" type="number" placeholder="0" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="product-image" className="block font-medium">Изображение</label>
                      <Input id="product-image" type="file" />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="product-description" className="block font-medium">Описание</label>
                      <Textarea id="product-description" placeholder="Введите описание товара" rows={3} />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Button type="submit">Сохранить товар</Button>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Управление заказами</h2>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID заказа</TableHead>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "Выполнен" ? "bg-green-100 text-green-800" : 
                            order.status === "В обработке" ? "bg-blue-100 text-blue-800" : 
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>{order.total} ₽</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Подробнее</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Клиенты</h2>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Имя</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead>Заказов</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map(customer => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.orders}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">История заказов</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Admin;
