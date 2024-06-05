<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use Symfony\Component\DependencyInjection\Attribute\AsDecorator;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

// annote le processor pour qu'il ne remplace pas le processor de base mais passe avant
#[AsDecorator('api_platform.doctrine.orm.state.persist_processor')]
class UserHashPasswordStateProcessor implements ProcessorInterface
{
  public function __construct(private ProcessorInterface $innerProcessor, private UserPasswordHasherInterface $userPasswordHasher)
  {
  }

  // data : User ; operation = post/put/patch
  public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
  {
    // chech si l'entity est bien un User, prend le clear password, hash le, set password et efface le clear password
    if ($data instanceof User && $data->getPlainPassword()) {
      $data->setPassword($this->userPasswordHasher->hashPassword($data, $data->getPlainPassword()));
      $data->eraseCredentials();
    }

    // continue avec le processor habituel pour persist l'entité
    return  $this->innerProcessor->process($data, $operation, $uriVariables, $context);
  }
}
