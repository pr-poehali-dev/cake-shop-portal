
import { useState } from "react";
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
  PlusCircle, 
  Search, 
  Trash2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  active: boolean;
}

interface ProductsTabProps {
  products: Product[];
  onProductAction: (action: string, productId: string) => void;
}

const ProductsTab = ({ products, onProductAction }: ProductsTabProps) => {
  return (
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
        
        <ProductsTable products={products} onProductAction={onProductAction} />
        
        <AddProductForm />
      </CardContent>
    </Card>
  );
};

const ProductsTable = ({ products, onProductAction }: ProductsTabProps) => {
  return (
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
                  onCheckedChange={() => onProductAction('toggle', product.id)}
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
                  onClick={() => onProductAction('edit', product.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onProductAction('delete', product.id)}
                >
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

const AddProductForm = () => {
  return (
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
  );
};

export default ProductsTab;
