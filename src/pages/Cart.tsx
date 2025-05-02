
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Trash2, 
  ShoppingCart, 
  AlertCircle, 
  Check, 
  ChevronRight, 
  ArrowLeft,
  Heart,
  Loader2
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  available: boolean;
  maxQuantity: number;
};

type PromoCode = {
  code: string;
  discount: number;
  isValid: boolean;
  minOrderAmount: number;
};

const Cart = () => {
  // Состояние корзины
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Шоколадный торт",
      price: 1200,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=200",
      category: "Торты",
      available: true,
      maxQuantity: 5
    },
    {
      id: "2",
      name: "Ванильный торт",
      price: 950,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1566121933407-3c7ccdd26763?q=80&w=200",
      category: "Торты",
      available: true,
      maxQuantity: 3
    },
    {
      id: "9",
      name: "Макарон Ассорти",
      price: 790,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1558326567-98166332163b?q=80&w=200",
      category: "Макароны",
      available: true,
      maxQuantity: 10
    }
  ]);

  // Состояния для этапов оформления заказа
  const [activeStep, setActiveStep] = useState("cart"); // cart, delivery, payment, confirmation
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Состояния для промокода
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [isCheckingPromo, setIsCheckingPromo] = useState(false);
  const [promoError, setPromoError] = useState("");

  // Состояния для формы доставки
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryFormData, setDeliveryFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    comment: ""
  });

  // Состояния для формы оплаты
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Рекомендуемые товары
  const [recommendedProducts] = useState([
    {
      id: "4",
      name: "Фруктовый торт",
      price: 1300,
      image: "https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?q=80&w=200",
      isNew: true
    },
    {
      id: "8",
      name: "Черничный капкейк",
      price: 180,
      image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=200",
      isNew: false
    },
    {
      id: "12",
      name: "Тирамису",
      price: 550,
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=200",
      isNew: false
    }
  ]);

  // Имитация успешного заказа
  useEffect(() => {
    if (isProcessingOrder) {
      const timer = setTimeout(() => {
        setIsProcessingOrder(false);
        setOrderCompleted(true);
        setOrderNumber(`${Math.floor(Math.random() * 10000)}`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isProcessingOrder]);

  // Функция обновления количества товара
  const updateQuantity = (id: string, newQuantity: number) => {
    const item = cartItems.find(item => item.id === id);
    if (!item || newQuantity < 1 || newQuantity > item.maxQuantity) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Функция удаления товара
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    
    // Если удаляется последний товар, сбрасываем промокод
    if (cartItems.length === 1) {
      setAppliedPromo(null);
      setPromoCode("");
      setPromoError("");
    }
  };

  // Функция применения промокода
  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      setPromoError("Введите промокод");
      return;
    }

    setIsCheckingPromo(true);
    setPromoError("");

    // Имитация API-запроса
    setTimeout(() => {
      setIsCheckingPromo(false);

      if (promoCode.toUpperCase() === "SWEET20") {
        // Успешный промокод
        const promo: PromoCode = {
          code: "SWEET20",
          discount: 20,
          isValid: true,
          minOrderAmount: 2000
        };

        if (subtotal < promo.minOrderAmount) {
          setPromoError(`Минимальная сумма заказа для промокода: ${promo.minOrderAmount} ₽`);
        } else {
          setAppliedPromo(promo);
          setPromoError("");
        }
      } else if (promoCode.toUpperCase() === "CAKE10") {
        // Успешный промокод
        setAppliedPromo({
          code: "CAKE10",
          discount: 10,
          isValid: true,
          minOrderAmount: 1000
        });
        setPromoError("");
      } else {
        // Неверный промокод
        setPromoError("Недействительный промокод");
      }
    }, 1000);
  };

  // Функция отмены промокода
  const cancelPromoCode = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setPromoError("");
  };

  // Функция перехода к следующему шагу
  const goToNextStep = () => {
    if (activeStep === "cart") {
      setActiveStep("delivery");
    } else if (activeStep === "delivery") {
      setActiveStep("payment");
    } else if (activeStep === "payment") {
      // Обработка заказа
      setIsProcessingOrder(true);
      setActiveStep("confirmation");
    }
  };

  // Функция возврата к предыдущему шагу
  const goToPreviousStep = () => {
    if (activeStep === "delivery") {
      setActiveStep("cart");
    } else if (activeStep === "payment") {
      setActiveStep("delivery");
    }
  };

  // Функция добавления товара в корзину
  const addItemToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      // Увеличиваем количество, если товар уже в корзине
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      // Добавляем новый товар
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        category: "Десерты", // Здесь можно установить реальную категорию
        available: true,
        maxQuantity: 10
      }]);
    }
  };

  // Функция обработки изменений в форме доставки
  const handleDeliveryFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDeliveryFormData({
      ...deliveryFormData,
      [name]: value
    });
  };

  // Проверка возможности перехода к следующему шагу
  const canProceedToNextStep = () => {
    if (activeStep === "cart") {
      return cartItems.length > 0;
    } else if (activeStep === "delivery") {
      const { name, phone, email } = deliveryFormData;
      const addressRequired = deliveryMethod === "delivery";
      
      return (
        name.trim() !== "" && 
        phone.trim() !== "" && 
        email.trim() !== "" && 
        (!addressRequired || deliveryFormData.address.trim() !== "") &&
        deliveryDate !== "" &&
        deliveryTime !== ""
      );
    } else if (activeStep === "payment") {
      return agreeToTerms;
    }
    
    return false;
  };

  // Расчет суммы товаров
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Расчет скидки
  const discountAmount = appliedPromo ? Math.round(subtotal * (appliedPromo.discount / 100)) : 0;
  
  // Стоимость доставки
  const deliveryCost = deliveryMethod === "delivery" ? (subtotal >= 3000 ? 0 : 300) : 0;
  
  // Итоговая сумма к оплате
  const totalPrice = subtotal - discountAmount + deliveryCost;

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <ChevronRight className="h-4 w-4" />
          <span>Корзина</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">
          {activeStep === "cart" && "Корзина"}
          {activeStep === "delivery" && "Доставка"}
          {activeStep === "payment" && "Оплата"}
          {activeStep === "confirmation" && "Подтверждение заказа"}
        </h1>
        
        {cartItems.length === 0 && !orderCompleted ? (
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Ваша корзина пуста</h2>
            <p className="text-gray-600 mb-6">Добавьте что-нибудь вкусное!</p>
            <Link to="/catalog">
              <Button>Перейти в каталог</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Основное содержимое (корзина, доставка, оплата, подтверждение) */}
            <div className="lg:col-span-2">
              {activeStep === "cart" && (
                <>
                  {cartItems.map(item => (
                    <Card key={item.id} className="mb-4">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Link to={`/product/${item.id}`} className="shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-md" 
                            />
                          </Link>
                          <div className="flex-grow">
                            <Link to={`/product/${item.id}`}>
                              <h3 className="font-medium hover:text-primary">{item.name}</h3>
                            </Link>
                            <p className="text-gray-500 text-sm">{item.category}</p>
                            <p className="text-primary font-semibold">{item.price} ₽</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.maxQuantity}
                            >
                              +
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{item.price * item.quantity} ₽</p>
                            <div className="flex gap-2 mt-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                              >
                                <Heart className="h-4 w-4 text-gray-500" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="flex justify-between mt-6">
                    <Link to="/catalog">
                      <Button variant="outline" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Продолжить покупки
                      </Button>
                    </Link>
                    <Button 
                      onClick={goToNextStep}
                      disabled={!canProceedToNextStep()}
                    >
                      Перейти к оформлению
                    </Button>
                  </div>
                </>
              )}
              
              {activeStep === "delivery" && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Способ получения</h2>
                    
                    <Tabs defaultValue="delivery" value={deliveryMethod} onValueChange={setDeliveryMethod}>
                      <TabsList className="grid grid-cols-2 mb-6">
                        <TabsTrigger value="delivery">Доставка</TabsTrigger>
                        <TabsTrigger value="pickup">Самовывоз</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="delivery">
                        <div className="space-y-4">
                          <p className="text-sm text-gray-500">
                            Стоимость доставки: {subtotal >= 3000 ? "бесплатно" : "300 ₽"}
                            {subtotal < 3000 && subtotal > 0 && (
                              <span className="ml-2 text-gray-400">
                                (бесплатно от 3000 ₽, осталось {3000 - subtotal} ₽)
                              </span>
                            )}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="name" className="block text-sm font-medium">
                                Ваше имя*
                              </label>
                              <Input 
                                id="name" 
                                name="name"
                                value={deliveryFormData.name}
                                onChange={handleDeliveryFormChange}
                                placeholder="Иван Иванов" 
                                required
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="phone" className="block text-sm font-medium">
                                Телефон*
                              </label>
                              <Input 
                                id="phone" 
                                name="phone"
                                value={deliveryFormData.phone}
                                onChange={handleDeliveryFormChange}
                                placeholder="+7 (XXX) XXX-XX-XX" 
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium">
                              Email*
                            </label>
                            <Input 
                              id="email" 
                              name="email"
                              type="email"
                              value={deliveryFormData.email}
                              onChange={handleDeliveryFormChange}
                              placeholder="example@mail.ru" 
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="address" className="block text-sm font-medium">
                              Адрес доставки*
                            </label>
                            <Textarea 
                              id="address" 
                              name="address"
                              value={deliveryFormData.address}
                              onChange={handleDeliveryFormChange}
                              placeholder="Город, улица, дом, квартира" 
                              required
                            />
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="pickup">
                        <div className="space-y-4">
                          <p className="text-sm text-gray-500">
                            Вы можете забрать заказ в нашей кондитерской по адресу: 
                            <strong> ул. Кондитерская, 123, Москва</strong>
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="name-pickup" className="block text-sm font-medium">
                                Ваше имя*
                              </label>
                              <Input 
                                id="name-pickup" 
                                name="name"
                                value={deliveryFormData.name}
                                onChange={handleDeliveryFormChange}
                                placeholder="Иван Иванов" 
                                required
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="phone-pickup" className="block text-sm font-medium">
                                Телефон*
                              </label>
                              <Input 
                                id="phone-pickup" 
                                name="phone"
                                value={deliveryFormData.phone}
                                onChange={handleDeliveryFormChange}
                                placeholder="+7 (XXX) XXX-XX-XX" 
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="email-pickup" className="block text-sm font-medium">
                              Email*
                            </label>
                            <Input 
                              id="email-pickup" 
                              name="email"
                              type="email"
                              value={deliveryFormData.email}
                              onChange={handleDeliveryFormChange}
                              placeholder="example@mail.ru" 
                              required
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <Separator className="my-6" />
                    
                    <h2 className="text-xl font-semibold mb-4">Дата и время получения</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <label htmlFor="date" className="block text-sm font-medium">
                          Дата*
                        </label>
                        <Input 
                          id="date" 
                          type="date" 
                          value={deliveryDate}
                          onChange={(e) => setDeliveryDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="time" className="block text-sm font-medium">
                          Время*
                        </label>
                        <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите время" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10:00-12:00">10:00 - 12:00</SelectItem>
                            <SelectItem value="12:00-14:00">12:00 - 14:00</SelectItem>
                            <SelectItem value="14:00-16:00">14:00 - 16:00</SelectItem>
                            <SelectItem value="16:00-18:00">16:00 - 18:00</SelectItem>
                            <SelectItem value="18:00-20:00">18:00 - 20:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="comment" className="block text-sm font-medium">
                        Комментарий к заказу
                      </label>
                      <Textarea 
                        id="comment" 
                        name="comment"
                        value={deliveryFormData.comment}
                        onChange={handleDeliveryFormChange}
                        placeholder="Дополнительная информация к заказу" 
                      />
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={goToPreviousStep}>
                        Назад в корзину
                      </Button>
                      <Button 
                        onClick={goToNextStep}
                        disabled={!canProceedToNextStep()}
                      >
                        Перейти к оплате
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {activeStep === "payment" && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Способ оплаты</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="payment-card" 
                          checked={paymentMethod === "card"}
                          onCheckedChange={() => setPaymentMethod("card")}
                        />
                        <label 
                          htmlFor="payment-card" 
                          className="flex items-center cursor-pointer"
                        >
                          <span className="mr-2">Банковская карта</span>
                          <div className="flex space-x-1">
                            <div className="h-6 w-10 bg-blue-100 rounded"></div>
                            <div className="h-6 w-10 bg-gray-200 rounded"></div>
                            <div className="h-6 w-10 bg-red-100 rounded"></div>
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="payment-cash" 
                          checked={paymentMethod === "cash"}
                          onCheckedChange={() => setPaymentMethod("cash")}
                        />
                        <label 
                          htmlFor="payment-cash" 
                          className="cursor-pointer"
                        >
                          Наличными при получении
                        </label>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <h2 className="text-xl font-semibold mb-4">Подтверждение заказа</h2>
                    
                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                      <h3 className="font-medium mb-3">Информация о заказе:</h3>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Способ получения:</span>
                          <span className="font-medium">
                            {deliveryMethod === "delivery" ? "Доставка" : "Самовывоз"}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>Дата и время:</span>
                          <span className="font-medium">
                            {deliveryDate && new Date(deliveryDate).toLocaleDateString("ru-RU")} ({deliveryTime})
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>Получатель:</span>
                          <span className="font-medium">{deliveryFormData.name}</span>
                        </div>
                        
                        {deliveryMethod === "delivery" && (
                          <div className="flex justify-between">
                            <span>Адрес:</span>
                            <span className="font-medium">{deliveryFormData.address}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between">
                          <span>Контакты:</span>
                          <span className="font-medium">
                            {deliveryFormData.phone}, {deliveryFormData.email}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>Способ оплаты:</span>
                          <span className="font-medium">
                            {paymentMethod === "card" ? "Банковская карта" : "Наличными при получении"}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-6">
                      <Checkbox 
                        id="terms" 
                        checked={agreeToTerms}
                        onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                        required
                      />
                      <label 
                        htmlFor="terms" 
                        className="text-sm cursor-pointer"
                      >
                        Я согласен с условиями обработки персональных данных и правилами интернет-магазина
                      </label>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={goToPreviousStep}>
                        Назад к доставке
                      </Button>
                      <Button 
                        onClick={goToNextStep}
                        disabled={!canProceedToNextStep()}
                      >
                        Оформить заказ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {activeStep === "confirmation" && (
                <Card>
                  <CardContent className="p-6 text-center">
                    {isProcessingOrder ? (
                      <div className="py-12">
                        <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Обрабатываем ваш заказ</h2>
                        <p className="text-gray-500">Пожалуйста, подождите...</p>
                      </div>
                    ) : orderCompleted ? (
                      <div className="py-12">
                        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                          <Check className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Заказ успешно оформлен!</h2>
                        <p className="text-gray-500 mb-6">Номер вашего заказа: <strong>#{orderNumber}</strong></p>
                        <p className="text-gray-500 mb-8">
                          Мы отправили информацию о заказе на ваш email: <strong>{deliveryFormData.email}</strong>
                        </p>
                        <div className="flex justify-center gap-4">
                          <Link to="/">
                            <Button variant="outline">Вернуться на главную</Button>
                          </Link>
                          <Link to="/catalog">
                            <Button>Продолжить покупки</Button>
                          </Link>
                        </div>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Сайдбар с информацией о заказе */}
            <div>
              {(activeStep !== "confirmation" || isProcessingOrder) && (
                <Card className="sticky top-4">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Ваш заказ</h2>
                    
                    <div className="mb-4">
                      <div className="max-h-[200px] overflow-auto pr-1">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex items-center justify-between py-2 border-b">
                            <div className="flex items-center gap-2">
                              <span className="bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {item.quantity}
                              </span>
                              <span className="text-sm">{item.name}</span>
                            </div>
                            <span className="font-medium">{item.price * item.quantity} ₽</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span>Товаров:</span>
                        <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} шт.</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Стоимость:</span>
                        <span>{subtotal} ₽</span>
                      </div>
                      
                      {appliedPromo && (
                        <div className="flex justify-between text-green-600">
                          <span>Скидка ({appliedPromo.discount}%):</span>
                          <span>-{discountAmount} ₽</span>
                        </div>
                      )}
                      
                      {deliveryMethod === "delivery" && (
                        <div className="flex justify-between">
                          <span>Доставка:</span>
                          <span>{deliveryCost > 0 ? `${deliveryCost} ₽` : "Бесплатно"}</span>
                        </div>
                      )}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between font-bold text-lg mb-6">
                      <span>К оплате:</span>
                      <span>{totalPrice} ₽</span>
                    </div>
                    
                    {activeStep === "cart" && (
                      <div className="space-y-4">
                        <div className="relative">
                          <Input
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Введите промокод"
                            className={promoError ? "border-red-500" : ""}
                            disabled={isCheckingPromo || appliedPromo !== null}
                          />
                          {isCheckingPromo && (
                            <Loader2 className="absolute right-3 top-2.5 h-5 w-5 animate-spin text-gray-400" />
                          )}
                          {appliedPromo && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1.5 h-7 w-7 p-0"
                              onClick={cancelPromoCode}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        
                        {promoError && (
                          <p className="text-red-500 text-sm">{promoError}</p>
                        )}
                        
                        {appliedPromo ? (
                          <Alert className="bg-green-50 border-green-200">
                            <Check className="h-4 w-4 text-green-600" />
                            <AlertTitle>Промокод применен!</AlertTitle>
                            <AlertDescription>
                              Вы получили скидку {appliedPromo.discount}%
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <Button 
                            onClick={applyPromoCode} 
                            className="w-full"
                            disabled={isCheckingPromo || promoCode.trim() === ""}
                          >
                            Применить промокод
                          </Button>
                        )}
                        
                        <Button 
                          className="w-full"
                          onClick={goToNextStep}
                          disabled={!canProceedToNextStep()}
                        >
                          Перейти к оформлению
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              
              {/* Рекомендуемые товары в сайдбаре */}
              {(activeStep === "cart" || activeStep === "delivery") && (
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Рекомендуем также</h2>
                    
                    <div className="space-y-4">
                      {recommendedProducts.map(product => (
                        <div key={product.id} className="flex gap-3">
                          <Link to={`/product/${product.id}`} className="shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-md" 
                            />
                          </Link>
                          <div className="flex-grow">
                            <Link to={`/product/${product.id}`}>
                              <h3 className="font-medium text-sm hover:text-primary">{product.name}</h3>
                            </Link>
                            <p className="text-primary font-semibold text-sm">{product.price} ₽</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs px-2 h-7 mt-1"
                              onClick={() => addItemToCart(product)}
                            >
                              В корзину
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
