
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Minus, 
  Plus, 
  Heart, 
  ChevronRight, 
  Star, 
  Info, 
  MessageSquare, 
  ChevronLeft,
  ChevronDown, 
  Share2, 
  Archive, 
  ShoppingCart, 
  Truck,
  Clock, 
  Package,
  Check
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// В реальном приложении это будет API-запрос
const mockProduct = {
  id: "1",
  name: "Шоколадный торт",
  price: 1200,
  oldPrice: 1500, // Если есть скидка
  discount: 20, // Процент скидки
  description: "Нежный шоколадный торт с ганашем и вишневым наполнением. Идеальное решение для праздничного стола или особого случая. Торт изготовлен из высококачественных ингредиентов и украшен вишнями и шоколадной стружкой.",
  shortDescription: "Нежный шоколадный торт с ганашем и вишневым наполнением",
  ingredients: "Шоколад, сливки, вишня, мука, сахар, яйца, масло сливочное, какао",
  detailedIngredients: [
    { name: "Мука пшеничная высшего сорта", allergen: false },
    { name: "Яйца куриные", allergen: true },
    { name: "Шоколад горький 70%", allergen: false },
    { name: "Вишня свежая", allergen: false },
    { name: "Сливки 33%", allergen: true },
    { name: "Сахар", allergen: false },
    { name: "Масло сливочное", allergen: true },
    { name: "Какао-порошок", allergen: false }
  ],
  nutritionalValue: {
    calories: 328,
    proteins: 4.5,
    fats: 18.2,
    carbohydrates: 35.6
  },
  weight: 1000, // в граммах
  portions: 8,
  images: [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=700",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=700",
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=700",
    "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=700"
  ],
  category: "Торты",
  subcategory: "Шоколадные",
  tags: ["шоколад", "вишня", "ганаш", "праздничный", "торт"],
  isNew: false,
  isBestseller: true,
  inStock: true,
  stockCount: 5,
  rating: 4.7,
  reviewCount: 23,
  shelfLife: "72 часа при температуре от +2°C до +6°C",
  deliveryInfo: "Доставка в день заказа при оформлении до 14:00",
  relatedProducts: [
    {
      id: "2",
      name: "Ванильный торт",
      price: 950,
      image: "https://images.unsplash.com/photo-1566121933407-3c7ccdd26763?q=80&w=700",
      rating: 4.5,
      reviewCount: 15
    },
    {
      id: "3",
      name: "Медовик",
      price: 1100,
      image: "https://images.unsplash.com/photo-1553786803-4daa28fefd5c?q=80&w=700",
      rating: 4.8,
      reviewCount: 27
    },
    {
      id: "4",
      name: "Фруктовый торт",
      price: 1300,
      image: "https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?q=80&w=700",
      rating: 4.3,
      reviewCount: 12
    }
  ],
  reviews: [
    {
      id: "r1",
      author: "Анна М.",
      rating: 5,
      date: "2025-04-15",
      text: "Прекрасный торт! Очень вкусный, свежий, не приторный. Всем понравился.",
      avatarUrl: "https://randomuser.me/api/portraits/women/45.jpg",
      likes: 3
    },
    {
      id: "r2",
      author: "Игорь К.",
      rating: 4,
      date: "2025-04-05",
      text: "Хороший торт, но мне показалось, что многовато вишни. В целом доволен покупкой.",
      avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg",
      likes: 1
    },
    {
      id: "r3",
      author: "Мария Д.",
      rating: 5,
      date: "2025-03-25",
      text: "Заказывала на день рождения сыну, все гости были в восторге! Буду заказывать еще.",
      avatarUrl: "https://randomuser.me/api/portraits/women/32.jpg",
      likes: 5
    }
  ]
};

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  // В реальном приложении здесь будет запрос к API по id
  const product = mockProduct;
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();

  // Изменение количества товара
  const incrementQuantity = () => {
    if (quantity < product.stockCount) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Добавление в корзину
  const addToCart = () => {
    toast({
      title: "Товар добавлен в корзину",
      description: `${product.name} (${quantity} шт.)`,
      action: <Link to="/cart"><Button variant="outline" size="sm">Перейти в корзину</Button></Link>
    });
  };

  // Добавление в избранное
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted 
        ? "Товар удален из избранного" 
        : "Товар добавлен в избранное",
      description: product.name
    });
  };

  // Форматирование цены
  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU');
  };

  // Расчет рейтинга для звезд
  const renderRatingStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={cn(
          "h-4 w-4", 
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : i < rating 
              ? "fill-yellow-400 text-yellow-400 half-filled" 
              : "text-gray-300"
        )} 
      />
    ));
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        {/* Хлебные крошки */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link to="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link to="/catalog/cakes" className="hover:text-primary transition-colors">{product.category}</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Галерея изображений */}
          <div>
            <div className="mb-4 rounded-lg overflow-hidden border">
              <AspectRatio ratio={1 / 1}>
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={cn(
                    "cursor-pointer rounded-md overflow-hidden border transition-all",
                    selectedImage === index ? "border-primary ring-2 ring-primary ring-opacity-20" : "hover:border-gray-300"
                  )}
                  onClick={() => setSelectedImage(index)}
                >
                  <AspectRatio ratio={1 / 1}>
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
              ))}
            </div>
          </div>
          
          {/* Информация о товаре */}
          <div>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {renderRatingStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">{product.rating} ({product.reviewCount} отзывов)</span>
                  {product.isBestseller && (
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Бестселлер</Badge>
                  )}
                  {product.isNew && (
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Новинка</Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={toggleWishlist}>
                        <Heart className={cn("h-5 w-5", isWishlisted && "fill-red-500 text-red-500")} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isWishlisted ? "Удалить из избранного" : "Добавить в избранное"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Поделиться</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">{product.shortDescription}</p>
            
            <div className="flex items-baseline mb-6">
              {product.discount ? (
                <>
                  <span className="text-3xl font-bold text-primary mr-2">
                    {formatPrice(product.price)} ₽
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.oldPrice)} ₽
                  </span>
                  <Badge className="bg-red-100 text-red-800 ml-3 hover:bg-red-200">
                    Скидка {product.discount}%
                  </Badge>
                </>
              ) : (
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)} ₽
                </span>
              )}
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">Вес: {product.weight} г ({product.portions} порций)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">Срок хранения: {product.shelfLife}</span>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="ml-4 text-sm text-gray-500">
                {product.inStock ? (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>В наличии</span>
                    {product.stockCount <= 5 && (
                      <span className="ml-1 text-orange-500">
                        (осталось {product.stockCount} шт.)
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span>Нет в наличии</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Button 
                size="lg" 
                className="w-full gap-2"
                onClick={addToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                В корзину
              </Button>
              <Link to="/cart" className="w-full">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                >
                  Перейти в корзину
                </Button>
              </Link>
            </div>
            
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex gap-3">
                <Truck className="h-5 w-5 text-gray-600" />
                <div>
                  <h3 className="font-medium">Доставка</h3>
                  <p className="text-sm text-gray-600">{product.deliveryInfo}</p>
                  <p className="text-sm text-gray-600">Бесплатно при заказе от 3000 ₽</p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-3">
                <Package className="h-5 w-5 text-gray-600" />
                <div>
                  <h3 className="font-medium">Самовывоз</h3>
                  <p className="text-sm text-gray-600">
                    Вы можете забрать заказ в нашей кондитерской по адресу: ул. Кондитерская, 123
                  </p>
                </div>
              </div>
            </div>
            
            <Accordion type="single" collapsible defaultValue="description">
              <AccordionItem value="description">
                <AccordionTrigger>Описание</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">{product.description}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ingredients">
                <AccordionTrigger>Состав</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-gray-700">{product.ingredients}</p>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Подробный состав:</h4>
                      <ul className="space-y-2">
                        {product.detailedIngredients.map((ingredient, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            {ingredient.name}
                            {ingredient.allergen && (
                              <Badge className="ml-2 bg-yellow-100 text-yellow-800 text-xs">
                                Аллерген
                              </Badge>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="nutritional">
                <AccordionTrigger>Пищевая ценность</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <h4 className="text-gray-500 text-sm">Калории</h4>
                      <p className="font-bold">{product.nutritionalValue.calories} ккал</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <h4 className="text-gray-500 text-sm">Белки</h4>
                      <p className="font-bold">{product.nutritionalValue.proteins} г</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <h4 className="text-gray-500 text-sm">Жиры</h4>
                      <p className="font-bold">{product.nutritionalValue.fats} г</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <h4 className="text-gray-500 text-sm">Углеводы</h4>
                      <p className="font-bold">{product.nutritionalValue.carbohydrates} г</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    * Пищевая ценность указана на 100 г продукта
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="delivery">
                <AccordionTrigger>Доставка и оплата</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Доставка</h4>
                      <p className="text-gray-700 text-sm">
                        Доставка осуществляется по Москве и Московской области. 
                        Срок доставки 1-2 дня. При заказе до 14:00 возможна доставка в день заказа.
                      </p>
                      <p className="text-gray-700 text-sm mt-1">
                        Стоимость доставки: 300 ₽, бесплатно при заказе от 3000 ₽.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Оплата</h4>
                      <p className="text-gray-700 text-sm">
                        Вы можете оплатить заказ онлайн на сайте или при получении наличными или картой.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        {/* Подробная информация о товаре на вкладках */}
        <div className="mb-12">
          <Tabs defaultValue="reviews">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="reviews" className="flex gap-2">
                <MessageSquare className="h-4 w-4" />
                Отзывы ({product.reviewCount})
              </TabsTrigger>
              <TabsTrigger value="details" className="flex gap-2">
                <Info className="h-4 w-4" />
                Характеристики
              </TabsTrigger>
              <TabsTrigger value="delivery" className="flex gap-2">
                <Truck className="h-4 w-4" />
                Доставка и оплата
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="reviews">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">Отзывы о товаре</h2>
                    <Button>Написать отзыв</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="md:col-span-2">
                      {/* Список отзывов */}
                      <div className="space-y-6">
                        {product.reviews.map((review) => (
                          <div key={review.id} className="border-b pb-6">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <img 
                                  src={review.avatarUrl} 
                                  alt={review.author}
                                  className="w-10 h-10 rounded-full" 
                                />
                                <div>
                                  <h4 className="font-medium">{review.author}</h4>
                                  <p className="text-xs text-gray-500">
                                    {new Date(review.date).toLocaleDateString('ru-RU')}
                                  </p>
                                </div>
                              </div>
                              <div className="flex">
                                {Array(5).fill(0).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={cn(
                                      "h-4 w-4", 
                                      i < review.rating 
                                        ? "fill-yellow-400 text-yellow-400" 
                                        : "text-gray-300"
                                    )} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 mb-3">{review.text}</p>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="flex gap-1">
                                <Heart className="h-4 w-4" />
                                <span>{review.likes}</span>
                              </Button>
                              <Button variant="ghost" size="sm">
                                Ответить
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <Button variant="outline">Показать больше отзывов</Button>
                      </div>
                    </div>
                    
                    <div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-3">Общий рейтинг</h3>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-3xl font-bold">{product.rating}</span>
                          <div className="flex">
                            {renderRatingStars(product.rating)}
                          </div>
                          <span className="text-sm text-gray-600">
                            ({product.reviewCount})
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm w-6">5</span>
                            <div className="h-2 bg-gray-200 rounded-full flex-1">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                            <span className="text-sm w-6">70%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm w-6">4</span>
                            <div className="h-2 bg-gray-200 rounded-full flex-1">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: '20%' }}></div>
                            </div>
                            <span className="text-sm w-6">20%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm w-6">3</span>
                            <div className="h-2 bg-gray-200 rounded-full flex-1">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: '5%' }}></div>
                            </div>
                            <span className="text-sm w-6">5%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm w-6">2</span>
                            <div className="h-2 bg-gray-200 rounded-full flex-1">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: '3%' }}></div>
                            </div>
                            <span className="text-sm w-6">3%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm w-6">1</span>
                            <div className="h-2 bg-gray-200 rounded-full flex-1">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: '2%' }}></div>
                            </div>
                            <span className="text-sm w-6">2%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Характеристики</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <table className="w-full">
                        <tbody className="divide-y">
                          <tr>
                            <td className="py-3 text-gray-500">Вес</td>
                            <td className="py-3 font-medium">{product.weight} г</td>
                          </tr>
                          <tr>
                            <td className="py-3 text-gray-500">Количество порций</td>
                            <td className="py-3 font-medium">{product.portions}</td>
                          </tr>
                          <tr>
                            <td className="py-3 text-gray-500">Срок годности</td>
                            <td className="py-3 font-medium">{product.shelfLife}</td>
                          </tr>
                          <tr>
                            <td className="py-3 text-gray-500">Категория</td>
                            <td className="py-3 font-medium">{product.category} &gt; {product.subcategory}</td>
                          </tr>
                          <tr>
                            <td className="py-3 text-gray-500">Артикул</td>
                            <td className="py-3 font-medium">CAKE-{product.id}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <h3 className="font-medium mb-4">Пищевая ценность (на 100 г)</h3>
                      <table className="w-full">
                        <tbody className="divide-y">
                          <tr>
                            <td className="py-3 text-gray-500">Калории</td>
                            <td className="py-3 font-medium">{product.nutritionalValue.calories} ккал</td>
                          </tr>
                          <tr>
                            <td className="py-3 text-gray-500">Белки</td>
                            <td className="py-3 font-medium">{product.nutritionalValue.proteins} г</td>
                          </tr>
                          <tr>
                            <td className="py-3 text-gray-500">Жиры</td>
                            <td className="py-3 font-medium">{product.nutritionalValue.fats} г</td>
                          </tr>
                          <tr>
                            <td className="py-3 text-gray-500">Углеводы</td>
                            <td className="py-3 font-medium">{product.nutritionalValue.carbohydrates} г</td>
                          </tr>
                        </tbody>
                      </table>
                      
                      <h3 className="font-medium mb-2 mt-6">Теги</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="delivery">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Доставка и оплата</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-medium text-lg mb-4">Доставка</h3>
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <Truck className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium">Курьерская доставка</h4>
                            <p className="text-sm text-gray-600">
                              Доставка по Москве и Московской области курьером. 
                              Стоимость доставки 300 ₽, бесплатно при заказе от 3000 ₽.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Package className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium">Самовывоз</h4>
                            <p className="text-sm text-gray-600">
                              Вы можете забрать заказ в нашей кондитерской по адресу: 
                              ул. Кондитерская, 123, Москва.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Clock className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium">Сроки доставки</h4>
                            <p className="text-sm text-gray-600">
                              Доставка осуществляется в течение 1-2 дней с момента оформления заказа. 
                              При заказе до 14:00 возможна доставка в день заказа.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-4">Оплата</h3>
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="w-8 h-5 bg-blue-100 rounded flex items-center justify-center text-xs">
                            💳
                          </div>
                          <div>
                            <h4 className="font-medium">Банковской картой</h4>
                            <p className="text-sm text-gray-600">
                              Вы можете оплатить заказ банковской картой онлайн на сайте или при получении.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-8 h-5 bg-green-100 rounded flex items-center justify-center text-xs">
                            💰
                          </div>
                          <div>
                            <h4 className="font-medium">Наличными</h4>
                            <p className="text-sm text-gray-600">
                              Оплата наличными возможна при получении заказа курьеру или в пункте самовывоза.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Похожие товары */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Похожие товары</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="overflow-hidden hover-scale">
                <Link to={`/product/${relatedProduct.id}`}>
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105" 
                    />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <h3 className="font-medium mb-1 hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                  </Link>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {renderRatingStars(relatedProduct.rating)}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      ({relatedProduct.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-primary">
                      {formatPrice(relatedProduct.price)} ₽
                    </p>
                    <Button variant="outline" size="sm">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductPage;
