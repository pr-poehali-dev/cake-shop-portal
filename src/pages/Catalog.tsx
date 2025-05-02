
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Filter, 
  Search, 
  X, 
  Heart, 
  ShoppingCart, 
  ChevronUp, 
  ChevronDown,
  Grid,
  List
} from "lucide-react";

// Типы данных
type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  tags: string[];
  image: string;
  isNew: boolean;
  isPopular: boolean;
  discount?: number;
  rating: number;
  available: boolean;
  description: string;
};

// Каталог товаров
const Catalog = () => {
  // Состояния фильтров
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [sortBy, setSortBy] = useState("popularity");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    price: true,
    tags: true,
    special: true
  });

  // Для анимации загрузки товаров
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showDiscountOnly, setShowDiscountOnly] = useState(false);
  
  // Имитация загрузки данных
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // В реальном приложении это будет API-запрос
  const products: Product[] = [
    {
      id: "1",
      name: "Шоколадный торт",
      price: 1200,
      category: "chocolate",
      tags: ["шоколад", "классика", "торт"],
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=700",
      isNew: true,
      isPopular: true,
      rating: 4.8,
      available: true,
      description: "Нежный шоколадный торт с шоколадным кремом и темным шоколадом"
    },
    {
      id: "2",
      name: "Ванильный торт",
      price: 950,
      category: "vanilla",
      tags: ["ваниль", "классика", "торт"],
      image: "https://images.unsplash.com/photo-1566121933407-3c7ccdd26763?q=80&w=700",
      isNew: false,
      isPopular: true,
      rating: 4.5,
      available: true,
      description: "Нежный ванильный бисквит с кремом из маскарпоне"
    },
    {
      id: "3",
      name: "Медовик",
      price: 1100,
      category: "honey",
      tags: ["мед", "классика", "торт"],
      image: "https://images.unsplash.com/photo-1553786803-4daa28fefd5c?q=80&w=700",
      isNew: false,
      isPopular: true,
      rating: 4.7,
      available: true,
      description: "Классический медовый торт с нежными коржами и кремом"
    },
    {
      id: "4",
      name: "Фруктовый торт",
      price: 1300,
      category: "fruit",
      tags: ["фрукты", "ягоды", "торт"],
      image: "https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?q=80&w=700",
      isNew: true,
      isPopular: false,
      rating: 4.3,
      available: true,
      description: "Бисквитный торт со свежими сезонными фруктами и ягодами"
    },
    {
      id: "5",
      name: "Чизкейк",
      price: 950,
      category: "cheesecake",
      tags: ["сыр", "десерт", "торт"],
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=700",
      isNew: false,
      isPopular: true,
      rating: 4.9,
      available: true,
      description: "Классический нью-йоркский чизкейк с сырной начинкой"
    },
    {
      id: "6",
      name: "Свадебный торт",
      price: 2000,
      category: "wedding",
      tags: ["праздничный", "свадьба", "торт"],
      image: "https://images.unsplash.com/photo-1595228702210-e607bf8e7a7c?q=80&w=700",
      isNew: false,
      isPopular: false,
      rating: 5.0,
      available: true,
      description: "Элегантный многоярусный торт для свадьбы с цветочным декором"
    },
    {
      id: "7",
      name: "Карамельный торт",
      price: 1450,
      category: "caramel",
      tags: ["карамель", "сливки", "торт"],
      image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=700",
      isNew: false,
      isPopular: false,
      rating: 4.6,
      available: true,
      description: "Торт с нежным бисквитом и карамельным кремом"
    },
    {
      id: "8",
      name: "Черничный капкейк",
      price: 180,
      category: "cupcake",
      tags: ["черника", "ягоды", "капкейк"],
      image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=700",
      isNew: true,
      isPopular: false,
      rating: 4.2,
      available: true,
      description: "Миниатюрный капкейк с черничной начинкой и кремом"
    },
    {
      id: "9",
      name: "Макарон Ассорти",
      price: 790,
      category: "macaron",
      tags: ["макарон", "ассорти", "набор"],
      image: "https://images.unsplash.com/photo-1558326567-98166332163b?q=80&w=700",
      isNew: false,
      isPopular: true,
      discount: 15,
      rating: 4.7,
      available: true,
      description: "Набор из 12 макарон разных вкусов и цветов"
    },
    {
      id: "10",
      name: "Клубничный тарт",
      price: 850,
      category: "tart",
      tags: ["клубника", "ягоды", "тарт"],
      image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?q=80&w=700",
      isNew: false,
      isPopular: false,
      discount: 10,
      rating: 4.4,
      available: true,
      description: "Французский тарт со свежей клубникой и заварным кремом"
    },
    {
      id: "11",
      name: "Шоколадный маффин",
      price: 150,
      category: "muffin",
      tags: ["шоколад", "маффин", "десерт"],
      image: "https://images.unsplash.com/photo-1586195831800-24f14c992de1?q=80&w=700",
      isNew: false,
      isPopular: false,
      rating: 4.1,
      available: false,
      description: "Шоколадный маффин с кусочками темного шоколада"
    },
    {
      id: "12",
      name: "Тирамису",
      price: 550,
      category: "tiramisu",
      tags: ["кофе", "сыр", "десерт"],
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=700",
      isNew: false,
      isPopular: true,
      rating: 4.8,
      available: true,
      description: "Классический итальянский десерт с кофейным вкусом и маскарпоне"
    }
  ];

  // Все теги из продуктов
  const allTags = Array.from(new Set(products.flatMap(product => product.tags)));

  // Категории для фильтрации
  const categories = [
    { id: "all", name: "Все категории" },
    { id: "chocolate", name: "Шоколадные" },
    { id: "vanilla", name: "Ванильные" },
    { id: "fruit", name: "Фруктовые" },
    { id: "honey", name: "Медовые" },
    { id: "cheesecake", name: "Чизкейки" },
    { id: "cupcake", name: "Капкейки" },
    { id: "macaron", name: "Макароны" },
    { id: "tart", name: "Тарты" },
    { id: "wedding", name: "Свадебные" }
  ];

  // Переключение состояния раскрытия фильтров
  const toggleFilter = (filter: keyof typeof expandedFilters) => {
    setExpandedFilters({
      ...expandedFilters,
      [filter]: !expandedFilters[filter]
    });
  };

  // Добавление/удаление тега из выбранных
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Фильтрация товаров
  const filteredProducts = products.filter(product => {
    // Поиск по имени и описанию
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Фильтр по категории
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    // Фильтр по цене
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    // Фильтр по тегам
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.every(tag => product.tags.includes(tag));
    
    // Фильтр по новинкам
    const matchesNew = !showNewOnly || product.isNew;
    
    // Фильтр по скидкам
    const matchesDiscount = !showDiscountOnly || product.discount !== undefined;

    // Фильтр по наличию
    const matchesAvailability = product.available;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesTags && 
           matchesNew && matchesDiscount && matchesAvailability;
  });

  // Сортировка товаров
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case "popularity":
      default:
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    }
  });

  // Рендер списка товаров
  const renderProducts = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="overflow-hidden">
              <div className="h-64 bg-gray-200 animate-pulse"></div>
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 animate-pulse mb-2 w-3/4"></div>
                <div className="h-6 bg-gray-200 animate-pulse mb-4 w-1/4"></div>
                <div className="flex gap-2">
                  <div className="h-10 bg-gray-200 animate-pulse flex-1"></div>
                  <div className="h-10 bg-gray-200 animate-pulse flex-1"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (sortedProducts.length === 0) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Товары не найдены</h2>
          <p className="text-gray-600 mb-6">Попробуйте изменить параметры фильтрации</p>
          <Button onClick={() => {
            setSearchQuery("");
            setSelectedCategory("all");
            setPriceRange([500, 2000]);
            setSelectedTags([]);
            setShowNewOnly(false);
            setShowDiscountOnly(false);
          }}>
            Сбросить фильтры
          </Button>
        </div>
      );
    }

    if (viewMode === "grid") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover-scale">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                {product.isNew && (
                  <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                    Новинка
                  </Badge>
                )}
                {product.discount && (
                  <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                    -{product.discount}%
                  </Badge>
                )}
                <div className="absolute bottom-2 right-2 flex gap-1">
                  <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  {product.discount ? (
                    <div>
                      <span className="text-gray-400 line-through text-sm mr-2">{product.price} ₽</span>
                      <span className="text-primary font-bold">{Math.round(product.price * (1 - product.discount / 100))} ₽</span>
                    </div>
                  ) : (
                    <span className="text-primary font-bold">{product.price} ₽</span>
                  )}
                  <div className="flex gap-1">
                    {product.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/product/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">Подробнее</Button>
                  </Link>
                  <Button className="flex-1 gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    В корзину
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    } else {
      // List view
      return (
        <div className="space-y-4">
          {sortedProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-64 h-64 md:h-auto">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.isNew && (
                    <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                      Новинка
                    </Badge>
                  )}
                  {product.discount && (
                    <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <div className="flex items-center text-yellow-500 mt-2 md:mt-0">
                      <span className="text-sm font-medium ml-1">{product.rating} ★</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      {product.discount ? (
                        <div>
                          <span className="text-gray-400 line-through text-sm mr-2">{product.price} ₽</span>
                          <span className="text-primary font-bold text-xl">{Math.round(product.price * (1 - product.discount / 100))} ₽</span>
                        </div>
                      ) : (
                        <span className="text-primary font-bold text-xl">{product.price} ₽</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        В избранное
                      </Button>
                      <Link to={`/product/${product.id}`}>
                        <Button variant="outline" size="sm">Подробнее</Button>
                      </Link>
                      <Button size="sm" className="flex items-center gap-1">
                        <ShoppingCart className="h-4 w-4" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      );
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Каталог десертов</h1>
          <Tabs defaultValue="all" className="hidden md:block">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>Все</TabsTrigger>
              <TabsTrigger value="cakes" onClick={() => setSelectedCategory("chocolate")}>Торты</TabsTrigger>
              <TabsTrigger value="cupcakes" onClick={() => setSelectedCategory("cupcake")}>Капкейки</TabsTrigger>
              <TabsTrigger value="macarons" onClick={() => setSelectedCategory("macaron")}>Макароны</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Поиск и кнопка фильтров для мобильной версии */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        <div className="hidden md:flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button 
                variant={viewMode === "grid" ? "default" : "outline"} 
                size="icon" 
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === "list" ? "default" : "outline"} 
                size="icon" 
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-gray-500">
              Показано {sortedProducts.length} из {products.length} товаров
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Сортировать по:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Популярности</SelectItem>
                <SelectItem value="price-asc">Цене (по возрастанию)</SelectItem>
                <SelectItem value="price-desc">Цене (по убыванию)</SelectItem>
                <SelectItem value="name">Названию</SelectItem>
                <SelectItem value="rating">Рейтингу</SelectItem>
                <SelectItem value="newest">Новизне</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Фильтры */}
          <div className={`w-full md:w-64 ${showFilters ? 'block' : 'hidden'} md:block bg-white md:bg-transparent p-4 md:p-0 fixed md:static top-0 left-0 h-full md:h-auto z-50 md:z-auto overflow-auto`}>
            <div className="flex items-center justify-between mb-4 md:hidden">
              <h2 className="text-xl font-semibold">Фильтры</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowFilters(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="hidden md:block">
                  <h2 className="text-xl font-semibold mb-4">Фильтры</h2>
                </div>
                
                <div className="space-y-6">
                  {/* Категории */}
                  <div>
                    <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => toggleFilter('categories')}>
                      <h3 className="text-sm font-medium">Категории</h3>
                      {expandedFilters.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                    
                    {expandedFilters.categories && (
                      <div className="space-y-2">
                        {categories.map(category => (
                          <div key={category.id} className="flex items-center">
                            <Checkbox 
                              id={`category-${category.id}`} 
                              checked={selectedCategory === category.id}
                              onCheckedChange={() => setSelectedCategory(category.id)}
                            />
                            <label 
                              htmlFor={`category-${category.id}`}
                              className="ml-2 text-sm"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  {/* Цена */}
                  <div>
                    <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => toggleFilter('price')}>
                      <h3 className="text-sm font-medium">Цена</h3>
                      {expandedFilters.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                    
                    {expandedFilters.price && (
                      <div className="space-y-4">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          min={150}
                          max={2000}
                          step={50}
                        />
                        <div className="flex justify-between text-sm">
                          <span>{priceRange[0]} ₽</span>
                          <span>{priceRange[1]} ₽</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number" 
                            value={priceRange[0]} 
                            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                            className="w-24"
                          />
                          <span>—</span>
                          <Input 
                            type="number" 
                            value={priceRange[1]} 
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-24"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  {/* Теги */}
                  <div>
                    <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => toggleFilter('tags')}>
                      <h3 className="text-sm font-medium">Теги</h3>
                      {expandedFilters.tags ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                    
                    {expandedFilters.tags && (
                      <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => (
                          <Badge 
                            key={tag} 
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  {/* Специальные фильтры */}
                  <div>
                    <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => toggleFilter('special')}>
                      <h3 className="text-sm font-medium">Специальные</h3>
                      {expandedFilters.special ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                    
                    {expandedFilters.special && (
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Checkbox 
                            id="new" 
                            checked={showNewOnly}
                            onCheckedChange={(checked) => setShowNewOnly(checked === true)}
                          />
                          <label htmlFor="new" className="ml-2 text-sm">Только новинки</label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox 
                            id="discount" 
                            checked={showDiscountOnly}
                            onCheckedChange={(checked) => setShowDiscountOnly(checked === true)}
                          />
                          <label htmlFor="discount" className="ml-2 text-sm">Со скидкой</label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setPriceRange([150, 2000]);
                      setSelectedTags([]);
                      setShowNewOnly(false);
                      setShowDiscountOnly(false);
                    }}
                  >
                    Сбросить все фильтры
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full md:hidden"
                    onClick={() => setShowFilters(false)}
                  >
                    Применить фильтры
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Содержимое каталога */}
          <div className="flex-grow">
            {/* Мобильная сортировка */}
            <div className="md:hidden mb-6">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Сортировать по" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Популярности</SelectItem>
                  <SelectItem value="price-asc">Цене (по возрастанию)</SelectItem>
                  <SelectItem value="price-desc">Цене (по убыванию)</SelectItem>
                  <SelectItem value="name">Названию</SelectItem>
                  <SelectItem value="rating">Рейтингу</SelectItem>
                  <SelectItem value="newest">Новизне</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Подсчет количества товаров */}
            <div className="hidden md:block text-sm text-gray-500 mb-4">
              Найдено: {sortedProducts.length} товаров
            </div>
            
            {/* Товары */}
            {renderProducts()}
            
            {/* Пагинация */}
            {sortedProducts.length > 0 && (
              <div className="flex justify-center mt-8">
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
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Catalog;
