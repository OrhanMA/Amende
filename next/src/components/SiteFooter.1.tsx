import {
  Footer,
  FooterBody,
  FooterBodyItem,
  FooterLink,
  FooterOperator,
  FooterPartners,
  FooterPartnersLogo,
  FooterPartnersTitle,
  FooterTop,
  FooterTopCategory,
  Link,
  Logo,
} from "@dataesr/react-dsfr";

export default function SiteFooter() {
  return (
    <Footer>
      <FooterTop>
        <FooterTopCategory title="Nom de la catégorie">
          <FooterLink asLink={<Link href="/myFooterLink" />}>
            Footer Link Router
          </FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
        </FooterTopCategory>
        <FooterTopCategory title="Nom de la catégorie">
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
        </FooterTopCategory>
        <FooterTopCategory title="Nom de la catégorie">
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
        </FooterTopCategory>
        <FooterTopCategory title="Nom de la catégorie">
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
        </FooterTopCategory>
        <FooterTopCategory title="Nom de la catégorie">
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
          <FooterLink href="/">Footer Link</FooterLink>
        </FooterTopCategory>
      </FooterTop>
      <FooterBody description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Uenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.">
        <Logo>Service national des amendes</Logo>
        <FooterOperator>
          <img alt="texte alternatif" src="https://fakeimg.pl/145x81/" />
        </FooterOperator>
        <FooterBodyItem>
          <Link href="https://legifrance.gouv.fr">legifrance.gouv.fr</Link>
        </FooterBodyItem>
        <FooterBodyItem>
          <Link href="https://gouvernement.fr">gouvernement.fr</Link>
        </FooterBodyItem>
        <FooterBodyItem>
          <Link href="https://service-public.fr">service-public.fr</Link>
        </FooterBodyItem>
        <FooterBodyItem>
          <Link href="https://data.gouv.fr">data.gouv.fr</Link>
        </FooterBodyItem>
      </FooterBody>
      <FooterPartners>
        <FooterPartnersTitle>Nos partenaires</FooterPartnersTitle>
        <FooterPartnersLogo
          href="/"
          imageAlt="Logo 1"
          imageSrc="https://dummyimage.com/140x80/000/fff.png&text=main-logo"
          isMain
        />
        <FooterPartnersLogo
          href="/"
          imageAlt="Logo 2"
          imageSrc="https://dummyimage.com/100x80/000/fff.png&text=logo+2"
        />
        <FooterPartnersLogo
          href="/"
          imageAlt="Logo 3"
          imageSrc="https://dummyimage.com/100x80/000/fff.png&text=logo+3"
        />
        <FooterPartnersLogo
          href="/"
          imageAlt="Logo 4"
          imageSrc="https://dummyimage.com/100x80/000/fff.png&text=logo+4"
        />
      </FooterPartners>
      <FooterBottom>
        <FooterLink
          asLink={
            <button type="button">
              <span
                aria-controls="fr-theme-modal"
                className="fr-fi-theme-fill fr-link--icon-left"
              >
                Paramètres d’affichage
              </span>
            </button>
          }
        />
        <FooterLink href="/">Footer Link</FooterLink>
        <FooterLink href="/">Footer Link</FooterLink>
        <FooterLink href="/">Footer Link</FooterLink>
        <FooterLink href="/">Footer Link</FooterLink>
        <FooterLink href="/">Footer Link</FooterLink>
        <FooterCopy>licence etalab-2.0</FooterCopy>
      </FooterBottom>
    </Footer>
  );
}
