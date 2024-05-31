"use client";
import {
  Header,
  HeaderBody,
  HeaderNav,
  HeaderOperator,
  Logo,
  MegaNavItem,
  MegaNavSubItem,
  NavItem,
  NavSubItem,
  SearchBar,
  Service,
  Tool,
  ToolItem,
  ToolItemGroup,
} from "@dataesr/react-dsfr";
import Link from "next/link";
import Image from "next/image";

export default function SiteHeader() {
  return (
    <Header closeButtonLabel="Fermeture">
      <HeaderBody>
        <Logo splitCharacter={10}>Service national des amendes</Logo>
        {/* <HeaderOperator>
          <Image
            alt="texte alternatif"
            src={"https://fakeimg.pl/145x81/"}
            width={145}
            height={81}
          />
        </HeaderOperator> */}
        <Service
          description="Service national des amendes"
          title="Payez vos amendes!"
        />
        <Tool>
          <ToolItemGroup>
            <ToolItem icon="ri-lock-line" link="/login">
              Connexion
            </ToolItem>
            <ToolItem icon="ri-add-circle-line" link="/register">
              Inscription
            </ToolItem>
          </ToolItemGroup>
          {/* <SearchBar
            buttonLabel="Search"
            label="SearchBar"
            onSearch={function noRefCheck() {}}
            placeholder="Search"
          /> */}
        </Tool>
      </HeaderBody>
      <HeaderNav>
        <NavItem link="/amende/portal" title="Payer une amende" />
        <NavItem link="/profil" title="Mes informations" />
        <NavItem link="/profil/paiements" title="Liste de mes paiements" />
      </HeaderNav>
    </Header>
  );
}
