import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// В реальном приложении здесь будет запрос к API
const mockProduct = {
  id: "1",
  name: "Шоколадный торт",
  price: 1200,
  description: "Нежный шоколадный торт с ганашем и вишневым наполнением",
  ingredients: "Шоколад, сливки, вишня, мука, сахар, яйца",
  image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=700"
};

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  // В реальном приложении здесь будет запрос к API по id
  const product = mockProduct;

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
          
          <Card className="p-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary mb-4">{product.price} ₽</p>
            
            <Separator className="my-4" />
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Описание</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Состав</h2>
              <p className="text-gray-700">{product.ingredients}</p>
            </div>
            
            <CardContent className="p-0 flex gap-4">
              <Button size="lg" className="w-full">
                Добавить в корзину
              </Button>
              <Link to="/cart">
                <Button size="lg" variant="outline">
                  Перейти в корзину
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductPage;
