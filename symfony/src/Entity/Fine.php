<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\FineRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;

#[ORM\Entity(repositoryClass: FineRepository::class)]
#[ApiResource]
#[GetCollection()]
#[Get(security: "is_granted('ROLE_USER')", securityMessage: "Vous devez être un utilisateur connecté au service pour obtenir les données d'une amende")]
#[Delete(security: "is_granted('ROLE_ADMIN')", securityMessage: "Vous devez être administrateur pour supprimer une amende")]
#[Put(security: "is_granted('ROLE_ADMIN')", securityMessage: "Vous devez être administrateur pour remplacer les données d'une amende")]
#[Patch(security: "is_granted('ROLE_ADMIN')", securityMessage: "Vous devez être administrateur pour modifier une amende")]
#[Post(security: "is_granted('ROLE_ADMIN')", securityMessage: "Vous devez être administrateur pour créer une amende")]
#[ApiFilter(SearchFilter::class, properties: ['code' => 'exact'])]
class Fine
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    public ?int $id = null;

    #[ORM\Column]
    public ?int $amount = null;

    #[ORM\Column(length: 12)]
    public ?string $code = null;

    #[ORM\Column]
    public ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(nullable: true)]
    public ?\DateTimeImmutable $updated_at = null;

    #[ORM\OneToOne(mappedBy: 'fine', cascade: ['persist', 'remove'])]
    public ?Payment $payment = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?int
    {
        return $this->amount;
    }

    public function setAmount(int $amount): static
    {
        $this->amount = $amount;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

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

    public function getPayment(): ?Payment
    {
        return $this->payment;
    }

    public function setPayment(Payment $payment): static
    {
        // set the owning side of the relation if necessary
        if ($payment->getFine() !== $this) {
            $payment->setFine($this);
        }

        $this->payment = $payment;

        return $this;
    }
}
