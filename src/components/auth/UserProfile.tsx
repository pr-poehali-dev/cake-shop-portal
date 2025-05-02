
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Loader2, 
  UserCircle, 
  Package, 
  Heart, 
  LogOut, 
  Settings, 
  Home, 
  Phone, 
  Mail 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Схема валидации для профиля
const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать не менее 2 символов",
  }),
  email: z.string().email({
    message: "Введите корректный email адрес",
  }),
  phone: z.string().min(6, {
    message: "Телефон должен содержать не менее 6 символов",
  }).optional(),
  address: z.string().min(5, {
    message: "Адрес должен содержать не менее 5 символов",
  }).optional(),
});

// Схема валидации для смены пароля
const passwordSchema = z.object({
  currentPassword: z.string().min(1, {
    message: "Введите текущий пароль",
  }),
  newPassword: z.string().min(8, {
    message: "Новый пароль должен содержать не менее 8 символов",
  }),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Демо-данные пользователя
  const userData = {
    id: "1",
    name: "Иван Иванов",
    email: "ivan@example.com",
    phone: "+7 (999) 123-45-67",
    address: "г. Москва, ул. Примерная, д. 123, кв. 45",
    avatar: "", // URL аватара
    orderCount: 5,
    wishlistCount: 3,
  };

  // Форма для редактирования профиля
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
    },
  });

  // Форма для смены пароля
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Обработка сохранения профиля
  const onSaveProfile = async (values: ProfileFormValues) => {
    setSaving(true);
    setError(null);
    
    try {
      // Имитация запроса к API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Профиль обновлен",
        description: "Ваши данные успешно сохранены.",
      });
    } catch (error) {
      setError("Ошибка при сохранении профиля");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Обработка смены пароля
  const onChangePassword = async (values: PasswordFormValues) => {
    setSaving(true);
    setError(null);
    
    try {
      // Имитация запроса к API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Проверка текущего пароля (для демо)
      if (values.currentPassword !== "password123") {
        setError("Неверный текущий пароль");
      } else {
        toast({
          title: "Пароль изменен",
          description: "Ваш пароль успешно обновлен.",
        });
        passwordForm.reset();
      }
    } catch (error) {
      setError("Ошибка при смене пароля");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Имитация выхода из системы
  const handleLogout = () => {
    toast({
      title: "Выход из системы",
      description: "Вы успешно вышли из системы.",
    });
    // Здесь будет перенаправление на страницу входа
  };

  // Демо-заказы пользователя
  const userOrders = [
    { id: "ORD-12345", date: "2025-04-28", status: "Доставлен", total: 2150 },
    { id: "ORD-12346", date: "2025-04-15", status: "Доставлен", total: 1350 },
    { id: "ORD-12347", date: "2025-03-22", status: "Доставлен", total: 950 },
  ];

  // Демо-товары в избранном
  const wishlistItems = [
    { id: "1", name: "Шоколадный торт", price: 1200 },
    { id: "5", name: "Чизкейк", price: 950 },
    { id: "12", name: "Тирамису", price: 550 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Сайдбар профиля */}
      <div>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>{userData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold mb-1">{userData.name}</h2>
              <p className="text-gray-500 mb-4">{userData.email}</p>
              <div className="w-full space-y-2 mt-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("profile")}
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  Мой профиль
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("orders")}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Мои заказы
                  <span className="ml-auto bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                    {userData.orderCount}
                  </span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("wishlist")}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Избранное
                  <span className="ml-auto bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                    {userData.wishlistCount}
                  </span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("security")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Безопасность
                </Button>
                <Separator className="my-2" />
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Выйти
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Основной контент */}
      <div className="md:col-span-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="wishlist">Избранное</TabsTrigger>
            <TabsTrigger value="security">Безопасность</TabsTrigger>
          </TabsList>

          {/* Вкладка редактирования профиля */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Ваш профиль</CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onSaveProfile)} className="space-y-4">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Полное имя</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <UserCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                placeholder="Ваше имя" 
                                {...field} 
                                className="pl-10"
                                disabled={saving} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                placeholder="ваш@email.com" 
                                {...field} 
                                className="pl-10"
                                disabled={saving} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Телефон</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                placeholder="+7 (XXX) XXX-XX-XX" 
                                {...field} 
                                className="pl-10"
                                disabled={saving} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Адрес доставки</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                placeholder="Ваш адрес" 
                                {...field} 
                                className="pl-10"
                                disabled={saving} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={saving}>
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Сохранение...
                        </>
                      ) : "Сохранить изменения"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Вкладка заказов */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>История заказов</CardTitle>
              </CardHeader>
              <CardContent>
                {userOrders.length > 0 ? (
                  <div className="space-y-4">
                    {userOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h3 className="font-semibold">Заказ #{order.id}</h3>
                            <p className="text-sm text-gray-500">
                              {new Date(order.date).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs">
                              {order.status}
                            </span>
                            <p className="font-semibold mt-1">{order.total} ₽</p>
                          </div>
                        </div>
                        <div className="flex justify-between mt-2">
                          <Button variant="outline" size="sm">Подробнее</Button>
                          <Button variant="outline" size="sm">Повторить заказ</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <h3 className="text-lg font-semibold mb-1">У вас еще нет заказов</h3>
                    <p className="text-gray-500 mb-4">Когда вы сделаете свой первый заказ, он будет отображаться здесь.</p>
                    <Button>Перейти в каталог</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Вкладка избранного */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>Избранные товары</CardTitle>
              </CardHeader>
              <CardContent>
                {wishlistItems.length > 0 ? (
                  <div className="space-y-4">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                            <img 
                              src={`https://source.unsplash.com/100x100/?cake`} 
                              alt={item.name}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-primary font-semibold">{item.price} ₽</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">В корзину</Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <h3 className="text-lg font-semibold mb-1">Список избранного пуст</h3>
                    <p className="text-gray-500 mb-4">Добавляйте понравившиеся товары в избранное, чтобы вернуться к ним позже.</p>
                    <Button>Перейти в каталог</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Вкладка безопасности и смены пароля */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Безопасность аккаунта</CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onChangePassword)} className="space-y-4">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Текущий пароль</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Введите текущий пароль" 
                              {...field} 
                              disabled={saving} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Новый пароль</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Минимум 8 символов" 
                              {...field} 
                              disabled={saving} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Подтверждение пароля</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Повторите новый пароль" 
                              {...field} 
                              disabled={saving} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={saving}>
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Сохранение...
                        </>
                      ) : "Сменить пароль"}
                    </Button>
                  </form>
                </Form>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-semibold mb-4">Сеансы и устройства</h3>
                  <div className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Текущий сеанс</h4>
                        <p className="text-sm text-gray-500">Москва, Россия • Chrome на Windows</p>
                      </div>
                      <Button variant="outline" size="sm" disabled>Активен</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full text-red-500">
                    Завершить все другие сеансы
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
