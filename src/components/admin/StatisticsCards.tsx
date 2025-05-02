
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Package, ShoppingCart } from "lucide-react";

interface StatisticsCardsProps {
  analytics: {
    totalSales: number;
    totalOrders: number;
    averageOrder: number;
  };
}

const StatisticsCards = ({ analytics }: StatisticsCardsProps) => {
  return (
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
  );
};

export default StatisticsCards;
