"use client";
import Link from "next/link";
import { useState } from "react";
import { FaCircleUser, FaUserPlus } from "react-icons/fa6";
import Button from "./Buttons/Button";
import { FaUserAltSlash } from "react-icons/fa";

export default function MobileMenu({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string | undefined;
}) {
  const [open, setOpen] = useState(false);
  function handleMenu() {
    console.log("clicked!");
    setOpen((prev) => !prev);
  }
  return (
    <div className="sm:hidden">
      <span onClick={() => handleMenu()}>{children}</span>
      {open && (
        <div className="absolute w-full left-0 mt-6 p-6 bg-white min-h-[100px] border">
          {token ? (
            <div className="flex gap-6 justify-center">
              <Link href={"/profil"}>
                <Button variant="secondary" text="Profile">
                  <FaCircleUser />
                </Button>
              </Link>
              <Link href={"/logout"}>
                <Button variant="secondary" text="Déconnexion">
                  <FaUserAltSlash />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex gap-6 justify-center">
              <Link href={"/login"}>
                <Button variant="secondary" text="Connexion">
                  <FaCircleUser />
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button variant="secondary" text="Inscription">
                  <FaUserPlus />
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
