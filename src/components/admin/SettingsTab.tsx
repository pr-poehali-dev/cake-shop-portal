
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

const SettingsTab = () => {
  const [formData, setFormData] = useState({
    shopName: "Сладкие Мечты",
    email: "info@tortikiprazdnik.ru",
    phone: "+7 (495) 123-45-67",
    currency: "rub",
    address: "ул. Кондитерская, 123, Москва, 123456",
    minOrder: "500",
    deliveryFee: "300",
    freeDeliveryThreshold: "3000",
    allowPreorders: true,
    allowPickups: true,
    paymentMethods: {
      card: true,
      cash: true,
      online: true,
      invoice: false
    },
    notifications: {
      orders: true,
      lowStock: true,
      reviews: true
    },
    socialNetworks: {
      vk: "",
      telegram: "",
      instagram: ""
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('shop-', '')]: value
    }));
  };

  const handleToggleChange = (field: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handlePaymentMethodToggle = (method: keyof typeof formData.paymentMethods, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: {
        ...prev.paymentMethods,
        [method]: checked
      }
    }));
  };

  const handleNotificationToggle = (notification: keyof typeof formData.notifications, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [notification]: checked
      }
    }));
  };

  const handleSocialInputChange = (network: keyof typeof formData.socialNetworks, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialNetworks: {
        ...prev.socialNetworks,
        [network]: value
      }
    }));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Настройки магазина</h2>
          <Button>Сохранить изменения</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ShopInfoSettings formData={formData} handleInputChange={handleInputChange} />
            
            <Separator className="my-6" />
            
            <OrderSettings 
              formData={formData} 
              handleInputChange={handleInputChange} 
              handleToggleChange={handleToggleChange} 
            />
            
            <Separator className="my-6" />
            
            <PaymentMethodsSettings 
              formData={formData} 
              handlePaymentMethodToggle={handlePaymentMethodToggle} 
            />
          </div>
          
          <div>
            <LogoSettings />
            
            <NotificationsSettings 
              formData={formData} 
              handleNotificationToggle={handleNotificationToggle} 
            />
            
            <SocialNetworksSettings 
              formData={formData} 
              handleSocialInputChange={handleSocialInputChange} 
            />
          </div>
        </div>
        
        <div className="mt-8 flex gap-4 justify-end">
          <Button variant="outline">Отмена</Button>
          <Button>Сохранить изменения</Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface FormData {
  shopName: string;
  email: string;
  phone: string;
  currency: string;
  address: string;
  minOrder: string;
  deliveryFee: string;
  freeDeliveryThreshold: string;
  allowPreorders: boolean;
  allowPickups: boolean;
  paymentMethods: {
    card: boolean;
    cash: boolean;
    online: boolean;
    invoice: boolean;
  };
  notifications: {
    orders: boolean;
    lowStock: boolean;
    reviews: boolean;
  };
  socialNetworks: {
    vk: string;
    telegram: string;
    instagram: string;
  };
}

interface ShopInfoSettingsProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ShopInfoSettings = ({ formData, handleInputChange }: ShopInfoSettingsProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Основная информация</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="shop-name" className="block font-medium">Название магазина</label>
            <Input id="shop-name" value={formData.shopName} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <label htmlFor="shop-email" className="block font-medium">Email магазина</label>
            <Input id="shop-email" type="email" value={formData.email} onChange={handleInputChange} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="shop-phone" className="block font-medium">Телефон</label>
            <Input id="shop-phone" value={formData.phone} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <label htmlFor="shop-currency" className="block font-medium">Валюта</label>
            <Select defaultValue={formData.currency}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите валюту" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rub">Российский рубль (₽)</SelectItem>
                <SelectItem value="usd">Доллар США ($)</SelectItem>
                <SelectItem value="eur">Евро (€)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="shop-address" className="block font-medium">Адрес</label>
          <Textarea id="shop-address" value={formData.address} onChange={handleInputChange} />
        </div>
      </div>
    </div>
  );
};

interface OrderSettingsProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleToggleChange: (field: string, checked: boolean) => void;
}

const OrderSettings = ({ formData, handleInputChange, handleToggleChange }: OrderSettingsProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Настройки заказов</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="min-order" className="block font-medium">Мин. сумма заказа</label>
            <Input id="min-order" type="number" value={formData.minOrder} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <label htmlFor="delivery-fee" className="block font-medium">Стоимость доставки</label>
            <Input id="delivery-fee" type="number" value={formData.deliveryFee} onChange={handleInputChange} />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="free-delivery-threshold" className="block font-medium">Бесплатная доставка от</label>
          <Input 
            id="free-delivery-threshold" 
            type="number" 
            value={formData.freeDeliveryThreshold} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="allow-preorders" 
            checked={formData.allowPreorders}
            onCheckedChange={(checked) => handleToggleChange('allowPreorders', checked)} 
          />
          <label htmlFor="allow-preorders">Разрешить предварительные заказы</label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="allow-pickups" 
            checked={formData.allowPickups}
            onCheckedChange={(checked) => handleToggleChange('allowPickups', checked)} 
          />
          <label htmlFor="allow-pickups">Разрешить самовывоз</label>
        </div>
      </div>
    </div>
  );
};

interface PaymentMethodsSettingsProps {
  formData: FormData;
  handlePaymentMethodToggle: (method: keyof typeof formData.paymentMethods, checked: boolean) => void;
}

const PaymentMethodsSettings = ({ formData, handlePaymentMethodToggle }: PaymentMethodsSettingsProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Способы оплаты</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="payment-card" 
            checked={formData.paymentMethods.card}
            onCheckedChange={(checked) => 
              handlePaymentMethodToggle('card', checked === true)
            } 
          />
          <label htmlFor="payment-card">Банковские карты</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="payment-cash" 
            checked={formData.paymentMethods.cash}
            onCheckedChange={(checked) => 
              handlePaymentMethodToggle('cash', checked === true)
            } 
          />
          <label htmlFor="payment-cash">Наличные при доставке</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="payment-online" 
            checked={formData.paymentMethods.online}
            onCheckedChange={(checked) => 
              handlePaymentMethodToggle('online', checked === true)
            } 
          />
          <label htmlFor="payment-online">Онлайн-оплата</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="payment-invoice" 
            checked={formData.paymentMethods.invoice}
            onCheckedChange={(checked) => 
              handlePaymentMethodToggle('invoice', checked === true)
            } 
          />
          <label htmlFor="payment-invoice">Счет на юр. лицо</label>
        </div>
      </div>
    </div>
  );
};

const LogoSettings = () => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Логотип магазина</h3>
      <div className="border rounded-md p-4 text-center">
        <div className="w-32 h-32 mx-auto bg-gray-100 mb-4 rounded-md flex items-center justify-center">
          <span className="text-2xl font-bold text-primary">СМ</span>
        </div>
        <Button variant="outline" size="sm">Загрузить логотип</Button>
      </div>
    </div>
  );
};

interface NotificationsSettingsProps {
  formData: FormData;
  handleNotificationToggle: (notification: keyof typeof formData.notifications, checked: boolean) => void;
}

const NotificationsSettings = ({ formData, handleNotificationToggle }: NotificationsSettingsProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Уведомления</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Switch 
            id="notify-orders" 
            checked={formData.notifications.orders}
            onCheckedChange={(checked) => 
              handleNotificationToggle('orders', checked)
            } 
          />
          <label htmlFor="notify-orders">Новые заказы</label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="notify-low-stock" 
            checked={formData.notifications.lowStock}
            onCheckedChange={(checked) => 
              handleNotificationToggle('lowStock', checked)
            } 
          />
          <label htmlFor="notify-low-stock">Низкий запас товаров</label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="notify-reviews" 
            checked={formData.notifications.reviews}
            onCheckedChange={(checked) => 
              handleNotificationToggle('reviews', checked)
            } 
          />
          <label htmlFor="notify-reviews">Новые отзывы</label>
        </div>
      </div>
    </div>
  );
};

interface SocialNetworksSettingsProps {
  formData: FormData;
  handleSocialInputChange: (network: keyof typeof formData.socialNetworks, value: string) => void;
}

const SocialNetworksSettings = ({ formData, handleSocialInputChange }: SocialNetworksSettingsProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Социальные сети</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="social-vk" className="block font-medium">ВКонтакте</label>
          <Input 
            id="social-vk" 
            placeholder="https://vk.com/..." 
            value={formData.socialNetworks.vk}
            onChange={(e) => handleSocialInputChange('vk', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="social-telegram" className="block font-medium">Telegram</label>
          <Input 
            id="social-telegram" 
            placeholder="https://t.me/..." 
            value={formData.socialNetworks.telegram}
            onChange={(e) => handleSocialInputChange('telegram', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="social-instagram" className="block font-medium">Instagram</label>
          <Input 
            id="social-instagram" 
            placeholder="https://instagram.com/..." 
            value={formData.socialNetworks.instagram}
            onChange={(e) => handleSocialInputChange('instagram', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
