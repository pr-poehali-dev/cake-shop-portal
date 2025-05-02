
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  Check,
  X
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

// Импорт компонентов административной панели
import StatisticsCards from "@/components/admin/StatisticsCards";
import ProductsTab from "@/components/admin/ProductsTab";
import OrdersTab from "@/components/admin/OrdersTab";
import CustomersTab from "@/components/admin/CustomersTab";
import AnalyticsTab from "@/components/admin/AnalyticsTab";
import SettingsTab from "@/components/admin/SettingsTab";
import InventoryTab from "@/components/admin/InventoryTab";
import AdminHeader from "@/components/admin/AdminHeader";

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

/**
 * Административная панель магазина
 */
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
        <AdminHeader />
        
        {showNotification && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle>Успешно!</AlertTitle>
            <AlertDescription>
              Действие успешно выполнено.
            </AlertDescription>
          </Alert>
        )}
        
        <StatisticsCards analytics={analytics} />
        
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
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Склад
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Настройки
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <ProductsTab products={products} onProductAction={handleProductAction} />
          </TabsContent>
          
          <TabsContent value="orders">
            <OrdersTab 
              orders={orders} 
              onOrderAction={handleOrderAction} 
              getOrderStatusBadge={getOrderStatusBadge} 
            />
          </TabsContent>
          
          <TabsContent value="customers">
            <CustomersTab customers={customers} />
          </TabsContent>
          
          <TabsContent value="analytics">
            <AnalyticsTab analytics={analytics} />
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Admin;
