<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\PaymentRepository;
use ApiPlatform\Metadata\GetCollection;

#[ORM\Entity(repositoryClass: PaymentRepository::class)]
#[ApiResource]
#[GetCollection(security: "is_granted('ROLE_USER')", securityMessage: "Vous devez être connecté pour consulter les paiements")]
#[Get(security: "is_granted('ROLE_ADMIN') or object.user == user", securityMessage: "Vous devez administrateur ou auteur du paiement pour en obtenir les données")]
#[Delete(security: "is_granted('ROLE_ADMIN')", securityMessage: "Vous devez être administrateur pour supprimer une amende")]
#[Put(security: "is_granted('ROLE_ADMIN')", securityMessage: "Vous devez être administrateur pour remplacer les données d'une amende")]
#[Patch(security: "is_granted('ROLE_ADMIN')", securityMessage: "Vous devez être administrateur pour modifier une amende")]
#[Post(security: "is_granted('ROLE_USER')", securityMessage: "Vous devez être administrateur pour créer une amende")]
class Payment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    public ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'payments')]
    #[ORM\JoinColumn(nullable: false)]
    public ?User $user = null;

    #[ORM\Column(length: 16)]
    public ?string $card_number = null;

    #[ORM\Column(length: 3)]
    public ?string $cryptogram = null;

    #[ORM\Column(length: 7)]
    public ?string $expiration = null;

    #[ORM\Column]
    public ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(nullable: true)]
    public ?\DateTimeImmutable $updated_at = null;

    #[ORM\OneToOne(inversedBy: 'payment', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    public ?Fine $fine = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getCardNumber(): ?string
    {
        return $this->card_number;
    }

    public function setCardNumber(string $card_number): static
    {
        $this->card_number = $card_number;

        return $this;
    }

    public function getCryptogram(): ?string
    {
        return $this->cryptogram;
    }

    public function setCryptogram(string $cryptogram): static
    {
        $this->cryptogram = $cryptogram;

        return $this;
    }

    public function getExpiration(): ?string
    {
        return $this->expiration;
    }

    public function setExpiration(string $expiration): static
    {
        $this->expiration = $expiration;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function getFine(): ?Fine
    {
        return $this->fine;
    }

    public function setFine(Fine $fine): static
    {
        $this->fine = $fine;

        return $this;
    }
}
