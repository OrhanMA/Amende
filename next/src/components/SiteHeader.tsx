import Image from "next/image";
import { cookies } from "next/headers";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaCircleUser, FaUserMinus } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import Button from "./Buttons/Button";
import MobileMenu from "./MobileMenu";
import logo from "../../public/images/logo.png";
export default function SiteHeader() {
  const token = cookies().get("token")?.value;
  return (
    <div className="min-h-24 flex items-center justify-between p-4 border-sand-50 border-b-2">
      <Link href={"/"} className="flex items-center gap-6">
        <Image
          src={logo}
          width={90}
          height={73}
          alt="Logo"
          className="hidden min-[460px]:flex"
        />
        <div className="hidden min-[350px]:flex flex-col">
          <p className="font-bold text-lg">Payez vos amendes!</p>
          <p className="text-xs">Service national du paiement des amendes</p>
        </div>
      </Link>
      <MobileMenu token={token}>
        <Button
          variant="secondary"
          className="border border-sand-200 sm:hidden p-1"
        >
          <RxHamburgerMenu size={30} color="#0c0091" />
        </Button>
      </MobileMenu>
      <nav className="gap-6 hidden sm:flex">
        {token ? (
          <>
            <Link href={"/profil"}>
              <Button variant="secondary" className="bg-white" text="Profile">
                <FaCircleUser />
              </Button>
            </Link>
            <Link href={"/logout"}>
              <Button
                variant="secondary"
                className="bg-white"
                text="Déconnexion"
              >
                <FaUserMinus />
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href={"/login"}>
              <Button variant="secondary" className="bg-white" text="Connexion">
                <FaCircleUser />
              </Button>
            </Link>
            <Link href={"/register"}>
              <Button
                variant="secondary"
                className="bg-white"
                text="Inscription"
              >
                <FaUserPlus />
              </Button>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}
