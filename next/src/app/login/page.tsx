import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="py-6 sm:py-8 md:py-12 flex flex-col items-center gap-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        Connexion à Payez vos amendes!
      </h1>
      <LoginForm />
    </div>
  );
}
