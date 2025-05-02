
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
  Edit, 
  Search, 
  Trash2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const InventoryTab = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Управление складом</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Экспорт
            </Button>
            <Button size="sm">
              Обновить запасы
            </Button>
          </div>
        </div>
        
        <InventoryFilters />
        
        <InventoryTable />
        
        <AddIngredientForm />
      </CardContent>
    </Card>
  );
};

const InventoryFilters = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input placeholder="Поиск ингредиентов..." className="pl-10" />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Категория" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все категории</SelectItem>
          <SelectItem value="flour">Мука и основы</SelectItem>
          <SelectItem value="cream">Кремы и начинки</SelectItem>
          <SelectItem value="fruits">Фрукты и ягоды</SelectItem>
          <SelectItem value="decor">Декор</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="low">
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Статус" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все статусы</SelectItem>
          <SelectItem value="low">Низкий запас</SelectItem>
          <SelectItem value="normal">Нормальный запас</SelectItem>
          <SelectItem value="high">Высокий запас</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

const InventoryTable = () => {
  const ingredients = [
    {
      id: "1",
      name: "Мука высший сорт",
      category: "Мука и основы",
      quantity: 24,
      unit: "кг",
      minQuantity: 10,
      status: "normal"
    },
    {
      id: "2",
      name: "Сахар-песок",
      category: "Мука и основы",
      quantity: 18,
      unit: "кг",
      minQuantity: 10,
      status: "normal"
    },
    {
      id: "3",
      name: "Шоколад темный",
      category: "Кремы и начинки",
      quantity: 5,
      unit: "кг",
      minQuantity: 8,
      status: "low"
    },
    {
      id: "4",
      name: "Ягоды малины свежие",
      category: "Фрукты и ягоды",
      quantity: 2,
      unit: "кг",
      minQuantity: 5,
      status: "critical"
    },
    {
      id: "5",
      name: "Сливки 33%",
      category: "Кремы и начинки",
      quantity: 12,
      unit: "л",
      minQuantity: 5,
      status: "normal"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "normal":
        return <Badge className="bg-green-100 text-green-800">Нормальный запас</Badge>;
      case "low":
        return <Badge className="bg-yellow-100 text-yellow-800">Низкий запас</Badge>;
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Критический запас</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Наименование</TableHead>
          <TableHead>Категория</TableHead>
          <TableHead>На складе</TableHead>
          <TableHead>Единица</TableHead>
          <TableHead>Мин. кол-во</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ingredients.map(ingredient => (
          <TableRow key={ingredient.id}>
            <TableCell className="font-medium">{ingredient.name}</TableCell>
            <TableCell>{ingredient.category}</TableCell>
            <TableCell>{ingredient.quantity}</TableCell>
            <TableCell>{ingredient.unit}</TableCell>
            <TableCell>{ingredient.minQuantity}</TableCell>
            <TableCell>
              {getStatusBadge(ingredient.status)}
            </TableCell>
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
  );
};

const AddIngredientForm = () => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Добавить ингредиент</h3>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label htmlFor="ingredient-name" className="block font-medium">Наименование</label>
          <Input id="ingredient-name" placeholder="Введите название" />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="ingredient-category" className="block font-medium">Категория</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flour">Мука и основы</SelectItem>
              <SelectItem value="cream">Кремы и начинки</SelectItem>
              <SelectItem value="fruits">Фрукты и ягоды</SelectItem>
              <SelectItem value="decor">Декор</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="ingredient-unit" className="block font-medium">Единица измерения</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Выберите единицу" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">кг</SelectItem>
              <SelectItem value="g">г</SelectItem>
              <SelectItem value="l">л</SelectItem>
              <SelectItem value="pcs">шт</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="ingredient-quantity" className="block font-medium">Количество</label>
          <Input id="ingredient-quantity" type="number" placeholder="0" />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="ingredient-min" className="block font-medium">Мин. количество</label>
          <Input id="ingredient-min" type="number" placeholder="0" />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="ingredient-supplier" className="block font-medium">Поставщик</label>
          <Input id="ingredient-supplier" placeholder="Название поставщика" />
        </div>
        
        <div className="md:col-span-3 flex gap-2">
          <Button type="submit">Добавить ингредиент</Button>
          <Button type="button" variant="outline">Отмена</Button>
        </div>
      </form>
    </div>
  );
};

export default InventoryTab;
