import Button from "@/components/Buttons/Button";
import { cookies } from "next/headers";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";

export default function Home() {
  const token = cookies().get("token")?.value;
  return (
    <main className="py-6 sm:py-8 md:py-12 w-full flex flex-col items-center gap-8">
      <h1 className="text-center font-bold text-2xl">
        Service national de paiement des amendes
      </h1>
      {token ? (
        <Link href={"/profil"}>Mon profil</Link>
      ) : (
        <div className="flex flex-wrap gap-4 sm:gap-6">
          <Link href={"/login"}>
            <Button text="Me connecter">
              <FaUserAlt />
            </Button>
          </Link>
          <Link href={"/register"}>
            <Button text="M'inscrire">
              <FaUserPlus />
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
}
