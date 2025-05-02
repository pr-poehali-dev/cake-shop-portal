
import MainLayout from "@/components/layout/MainLayout";
import AuthForm from "@/components/auth/AuthForm";

const Auth = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Личный кабинет</h1>
          <AuthForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default Auth;
