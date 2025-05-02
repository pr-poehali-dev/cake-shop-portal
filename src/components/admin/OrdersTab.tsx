
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Search, 
  AlertCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: string;
  customer: string;
  date: string;
  status: string;
  total: number;
  items: number;
}

interface OrdersTabProps {
  orders: Order[];
  onOrderAction: (action: string, orderId: string) => void;
  getOrderStatusBadge: (status: string) => React.ReactNode;
}

const OrdersTab = ({ orders, onOrderAction, getOrderStatusBadge }: OrdersTabProps) => {
  return (
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
        
        <Card className="mb-6 border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="h-5 w-5" />
              <span>Новый заказ требует подтверждения!</span>
              <Button size="sm" variant="outline" className="ml-auto">Просмотреть</Button>
            </div>
          </CardContent>
        </Card>
        
        <OrderSummaryCards />
        
        <OrdersTable 
          orders={orders} 
          onOrderAction={onOrderAction} 
          getOrderStatusBadge={getOrderStatusBadge} 
        />
        
        <OrdersPagination />
      </CardContent>
    </Card>
  );
};

const OrderSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-500 mb-1">Сегодня</h3>
          <p className="text-2xl font-bold">5 заказов</p>
          <p className="text-sm text-green-600 mt-1">+2 по сравнению со вчера</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-500 mb-1">Ожидают обработки</h3>
          <p className="text-2xl font-bold">3 заказа</p>
          <div className="flex items-center text-orange-500 text-sm mt-1">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>Требуют внимания</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-500 mb-1">Сумма продаж сегодня</h3>
          <p className="text-2xl font-bold">9 250 ₽</p>
          <p className="text-sm text-green-600 mt-1">+3 500 ₽ по сравнению со вчера</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-500 mb-1">Выполнено за неделю</h3>
          <p className="text-2xl font-bold">28 заказов</p>
          <p className="text-sm text-green-600 mt-1">+4 по сравнению с прошлой неделей</p>
        </CardContent>
      </Card>
    </div>
  );
};

const OrdersTable = ({ orders, onOrderAction, getOrderStatusBadge }: OrdersTabProps) => {
  return (
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
                  onClick={() => onOrderAction('view', order.id)}
                >
                  Подробнее
                </Button>
                <Select 
                  defaultValue={order.status === "Выполнен" ? "completed" : 
                               order.status === "В обработке" ? "processing" :
                               order.status === "Ожидает оплаты" ? "waiting" : "cancelled"}
                  onValueChange={(value) => onOrderAction(`change-status-${value}`, order.id)}
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
  );
};

const OrdersPagination = () => {
  return (
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
  );
};

export default OrdersTab;
