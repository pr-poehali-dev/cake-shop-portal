
import { 
  Button 
} from "@/components/ui/button";
import { 
  RefreshCw,
  Calendar,
  Download,
  Printer,
  AlertCircle
} from "lucide-react";

const AdminHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Административная панель</h1>
        <p className="text-gray-500 mt-1">Управление магазином и мониторинг данных</p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <RefreshCw className="h-4 w-4" />
          Обновить
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {new Date().toLocaleDateString('ru-RU')}
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          Экспорт
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Printer className="h-4 w-4" />
          Печать
        </Button>
        <Button variant="destructive" size="sm" className="flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          Проблемы (3)
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
