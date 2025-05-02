
import MainLayout from "@/components/layout/MainLayout";
import UserProfile from "@/components/auth/UserProfile";

const Profile = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>
        <UserProfile />
      </div>
    </MainLayout>
  );
};

export default Profile;
