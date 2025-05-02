
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Analytics {
  totalSales: number;
  totalOrders: number;
  averageOrder: number;
  topSellingProducts: Array<{id: string, name: string, sold: number}>;
  monthlySales: Array<{month: string, amount: number}>;
}

interface AnalyticsTabProps {
  analytics: Analytics;
}

const AnalyticsTab = ({ analytics }: AnalyticsTabProps) => {
  return (
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
          <MonthlySalesChart monthlySales={analytics.monthlySales} />
          <TopProductsChart topSellingProducts={analytics.topSellingProducts} />
        </div>
        
        <CategorySalesChart />
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <PaymentMethodsChart />
          <SalesChannelsChart />
        </div>
      </CardContent>
    </Card>
  );
};

const MonthlySalesChart = ({ monthlySales }: { monthlySales: Analytics['monthlySales'] }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Ежемесячные продажи</h3>
        <div className="h-64 flex items-end gap-2">
          {monthlySales.map((item, index) => (
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
  );
};

const TopProductsChart = ({ topSellingProducts }: { topSellingProducts: Analytics['topSellingProducts'] }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Топ продаж</h3>
        <div className="space-y-4">
          {topSellingProducts.map((product, index) => (
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
  );
};

const CategorySalesChart = () => {
  return (
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
  );
};

const PaymentMethodsChart = () => {
  return (
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
  );
};

const SalesChannelsChart = () => {
  return (
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
  );
};

export default AnalyticsTab;
