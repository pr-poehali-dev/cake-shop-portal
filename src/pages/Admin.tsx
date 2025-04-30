import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  AlertCircle,
  Check,
  X,
  Search
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

// Типы данных для административной панели
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  active: boolean;
};

type Order = {
  id: string;
  customer: string;
  date: string;
  status: string;
  total: number;
  items: number;
};

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  registered: string;
  status: "active" | "blocked";
};

// Данные для аналитики
type Analytics = {
  totalSales: number;
  totalOrders: number;
  averageOrder: number;
  topSellingProducts: Array<{id: string, name: string, sold: number}>;
  monthlySales: Array<{month: string, amount: number}>;
};

const Admin = () => {
  // Состояния
  const [activeTab, setActiveTab] = useState("products");
  const [showNotification, setShowNotification] = useState(false);
  
  // Здесь в реальном приложении будут API-запросы
  const [products] = useState<Product[]>([
    { id: "1", name: "Шоколадный торт", price: 1200, description: "Нежный шоколадный торт", category: "Торты", stock: 5, active: true },
    { id: "2", name: "Ванильный торт", price: 950, description: "Классический ванильный торт", category: "Торты", stock: 3, active: true },
    { id: "3", name: "Медовик", price: 1100, description: "Медовый торт со сметанным кремом", category: "Торты", stock: 0, active: false },
    { id: "4", name: "Капкейки шоколадные", price: 150, description: "Шоколадные капкейки с кремом", category: "Капкейки", stock: 12, active: true },
    { id: "5", name: "Эклеры", price: 180, description: "Эклеры с заварным кремом", category: "Пирожные", stock: 8, active: true },
  ]);

  const [orders] = useState<Order[]>([
    { id: "1", customer: "Иванов Иван", date: "2025-04-28", status: "Выполнен", total: 2150, items: 2 },
    { id: "2", customer: "Петрова Анна", date: "2025-04-29", status: "В обработке", total: 1200, items: 1 },
    { id: "3", customer: "Сидоров Алексей", date: "2025-04-30", status: "Ожидает оплаты", total: 3300, items: 3 },
    { id: "4", customer: "Козлова Мария", date: "2025-04-30", status: "Отменён", total: 950, items: 1 },
    { id: "5", customer: "Новиков Дмитрий", date: "2025-05-01", status: "В обработке", total: 1800, items: 2 },
  ]);

  const [customers] = useState<Customer[]>([
    { id: "1", name: "Иванов Иван", email: "ivanov@mail.ru", phone: "+7 (901) 123-45-67", orders: 3, registered: "2024-12-15", status: "active" },
    { id: "2", name: "Петрова Анна", email: "petrova@mail.ru", phone: "+7 (902) 234-56-78", orders: 1, registered: "2025-01-20", status: "active" },
    { id: "3", name: "Сидоров Алексей", email: "sidorov@mail.ru", phone: "+7 (903) 345-67-89", orders: 2, registered: "2025-02-05", status: "active" },
    { id: "4", name: "Козлова Мария", email: "kozlova@mail.ru", phone: "+7 (904) 456-78-90", orders: 1, registered: "2025-03-12", status: "blocked" },
    { id: "5", name: "Новиков Дмитрий", email: "novikov@mail.ru", phone: "+7 (905) 567-89-01", orders: 2, registered: "2025-03-25", status: "active" },
  ]);

  const [analytics] = useState<Analytics>({
    totalSales: 286500,
    totalOrders: 157,
    averageOrder: 1825,
    topSellingProducts: [
      {id: "1", name: "Шоколадный торт", sold: 42},
      {id: "4", name: "Капкейки шоколадные", sold: 36},
      {id: "2", name: "Ванильный торт", sold: 28}
    ],
    monthlySales: [
      {month: "Янв", amount: 45000},
      {month: "Фев", amount: 52000},
      {month: "Мар", amount: 61500},
      {month: "Апр", amount: 73000},
      {month: "Май", amount: 55000}
    ]
  });

  // Функция для имитации действий с товарами
  const handleProductAction = (action: string, productId: string) => {
    console.log(`${action} продукт с ID: ${productId}`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Функция для имитации действий с заказами
  const handleOrderAction = (action: string, orderId: string) => {
    console.log(`${action} заказ с ID: ${orderId}`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Получение статуса заказа с соответствующим стилем
  const getOrderStatusBadge = (status: string) => {
    switch(status) {
      case "Выполнен":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
      case "В обработке":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{status}</Badge>;
      case "Ожидает оплаты":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">{status}</Badge>;
      case "Отменён":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Административная панель</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              Настройки
            </Button>
            <Button variant="destructive" size="sm" className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              Проблемы (3)
            </Button>
          </div>
        </div>
        
        {showNotification && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle>Успешно!</AlertTitle>
            <AlertDescription>
              Действие успешно выполнено.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Всего продаж</h3>
                <BarChart3 className="h-6 w-6 text-primary/80" />
              </div>
              <p className="text-3xl font-bold mt-2">{analytics.totalSales.toLocaleString()} ₽</p>
              <p className="text-sm text-gray-500 mt-1">+12% по сравнению с прошлым месяцем</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Заказов</h3>
                <ShoppingCart className="h-6 w-6 text-primary/80" />
              </div>
              <p className="text-3xl font-bold mt-2">{analytics.totalOrders}</p>
              <p className="text-sm text-gray-500 mt-1">5 новых заказов сегодня</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Средний чек</h3>
                <Package className="h-6 w-6 text-primary/80" />
              </div>
              <p className="text-3xl font-bold mt-2">{analytics.averageOrder.toLocaleString()} ₽</p>
              <p className="text-sm text-gray-500 mt-1">+5% по сравнению с прошлым месяцем</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab}>
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
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Аналитика
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
                
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder="Поиск товаров..." className="pl-10" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Категория" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все категории</SelectItem>
                      <SelectItem value="cakes">Торты</SelectItem>
                      <SelectItem value="cupcakes">Капкейки</SelectItem>
                      <SelectItem value="pastry">Пирожные</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="active">Активные</SelectItem>
                      <SelectItem value="inactive">Неактивные</SelectItem>
                      <SelectItem value="outofstock">Нет в наличии</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Цена</TableHead>
                      <TableHead>Наличие</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map(product => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price.toLocaleString()} ₽</TableCell>
                        <TableCell>
                          {product.stock > 0 ? (
                            <span className={`${
                              product.stock < 5 ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                              {product.stock} шт.
                            </span>
                          ) : (
                            <span className="text-red-600">Нет в наличии</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Switch 
                              checked={product.active} 
                              onCheckedChange={() => handleProductAction('toggle', product.id)}
                              className="mr-2"
                            />
                            <span className={product.active ? 'text-green-600' : 'text-gray-400'}>
                              {product.active ? 'Активен' : 'Неактивен'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleProductAction('edit', product.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleProductAction('delete', product.id)}
                            >
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
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cakes">Торты</SelectItem>
                          <SelectItem value="cupcakes">Капкейки</SelectItem>
                          <SelectItem value="pastry">Пирожные</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="product-price" className="block font-medium">Цена</label>
                      <Input id="product-price" type="number" placeholder="0" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="product-stock" className="block font-medium">Количество</label>
                      <Input id="product-stock" type="number" placeholder="0" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="product-image" className="block font-medium">Изображение</label>
                      <Input id="product-image" type="file" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="product-status" className="block font-medium">Статус</label>
                      <div className="flex items-center space-x-2 pt-2">
                        <Switch id="product-status" defaultChecked />
                        <label htmlFor="product-status">Активен</label>
                      </div>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="product-description" className="block font-medium">Описание</label>
                      <Textarea id="product-description" placeholder="Введите описание товара" rows={3} />
                    </div>
                    
                    <div className="md:col-span-2 flex gap-2">
                      <Button type="submit">Сохранить товар</Button>
                      <Button type="button" variant="outline">Отмена</Button>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Управление заказами</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Экспорт
                    </Button>
                    <Button size="sm">
                      Создать заказ
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder="Поиск заказов..." className="pl-10" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="completed">Выполнен</SelectItem>
                      <SelectItem value="processing">В обработке</SelectItem>
                      <SelectItem value="waiting">Ожидает оплаты</SelectItem>
                      <SelectItem value="cancelled">Отменён</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="date"
                    placeholder="Дата"
                    className="w-full md:w-[180px]"
                  />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID заказа</TableHead>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Товары</TableHead>
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
                        <TableCell>{new Date(order.date).toLocaleDateString('ru-RU')}</TableCell>
                        <TableCell>{order.items} шт.</TableCell>
                        <TableCell>
                          {getOrderStatusBadge(order.status)}
                        </TableCell>
                        <TableCell>{order.total.toLocaleString()} ₽</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleOrderAction('view', order.id)}
                            >
                              Подробнее
                            </Button>
                            <Select 
                              defaultValue={order.status === "Выполнен" ? "completed" : 
                                           order.status === "В обработке" ? "processing" :
                                           order.status === "Ожидает оплаты" ? "waiting" : "cancelled"}
                              onValueChange={(value) => handleOrderAction(`change-status-${value}`, order.id)}
                            >
                              <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Изменить статус" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="completed">Выполнен</SelectItem>
                                <SelectItem value="processing">В обработке</SelectItem>
                                <SelectItem value="waiting">Ожидает оплаты</SelectItem>
                                <SelectItem value="cancelled">Отменён</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-gray-500">
                    Показано 5 из 125 заказов
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Предыдущая
                    </Button>
                    <Button variant="outline" size="sm" className="bg-primary text-white hover:bg-primary/90">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Следующая
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Клиенты</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Экспорт данных
                    </Button>
                    <Button size="sm">
                      Добавить клиента
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder="Поиск клиентов..." className="pl-10" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все клиенты</SelectItem>
                      <SelectItem value="active">Активные</SelectItem>
                      <SelectItem value="blocked">Заблокированные</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Имя</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead>Регистрация</TableHead>
                      <TableHead>Заказов</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map(customer => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{new Date(customer.registered).toLocaleDateString('ru-RU')}</TableCell>
                        <TableCell>{customer.orders}</TableCell>
                        <TableCell>
                          <Badge className={customer.status === "active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"}>
                            {customer.status === "active" ? "Активен" : "Заблокирован"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              История заказов
                            </Button>
                            <Button 
                              variant={customer.status === "active" ? "destructive" : "outline"} 
                              size="sm"
                            >
                              {customer.status === "active" ? "Заблокировать" : "Разблокировать"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-gray-500">
                    Показано 5 из 98 клиентов
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Предыдущая
                    </Button>
                    <Button variant="outline" size="sm" className="bg-primary text-white hover:bg-primary/90">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Следующая
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Аналитика продаж</h2>
                  <div className="flex gap-2">
                    <Select defaultValue="month">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Период" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Неделя</SelectItem>
                        <SelectItem value="month">Месяц</SelectItem>
                        <SelectItem value="quarter">Квартал</SelectItem>
                        <SelectItem value="year">Год</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      Экспорт отчета
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Ежемесячные продажи</h3>
                      <div className="h-64 flex items-end gap-2">
                        {analytics.monthlySales.map((item, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div 
                              className="w-full bg-primary/80 hover:bg-primary transition-colors rounded-t-md" 
                              style={{ height: `${(item.amount / 75000) * 100}%` }}
                            ></div>
                            <span className="text-xs mt-1">{item.month}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Топ продаж</h3>
                      <div className="space-y-4">
                        {analytics.topSellingProducts.map((product, index) => (
                          <div key={index}>
                            <div className="flex justify-between items-center mb-1">
                              <span>{product.name}</span>
                              <span className="font-semibold">{product.sold} шт.</span>
                            </div>
                            <Progress value={(product.sold / 50) * 100} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Продажи по категориям</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-md text-center">
                        <h4 className="text-gray-500 mb-2">Торты</h4>
                        <p className="text-2xl font-bold">42%</p>
                        <div className="text-sm text-green-600 mt-1">↑ 8%</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md text-center">
                        <h4 className="text-gray-500 mb-2">Капкейки</h4>
                        <p className="text-2xl font-bold">31%</p>
                        <div className="text-sm text-green-600 mt-1">↑ 5%</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md text-center">
                        <h4 className="text-gray-500 mb-2">Пирожные</h4>
                        <p className="text-2xl font-bold">27%</p>
                        <div className="text-sm text-red-600 mt-1">↓ 3%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Способы оплаты</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center p-3 bg-gray-50 rounded-md">
                          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-xl">💳</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Карта</p>
                            <p className="font-semibold">68%</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-md">
                          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-xl">📱</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Онлайн</p>
                            <p className="font-semibold">24%</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-md">
                          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-xl">💰</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Наличные</p>
                            <p className="font-semibold">8%</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Каналы продаж</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center p-3 bg-gray-50 rounded-md">
                          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-xl">🌐</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Сайт</p>
                            <p className="font-semibold">54%</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-md">
                          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-xl">📞</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Телефон</p>
                            <p className="font-semibold">21%</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-md">
                          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-xl">🏪</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Магазин</p>
                            <p className="font-semibold">25%</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Admin;
