
import SignupForm from "@/features/auth/ui/SignUp";
import LoginForm from "@/features/auth/ui/Login";
export default async function loginPage() {
  return (
    <div>
      <LoginForm />
      <SignupForm />

    </div>

  );
}
