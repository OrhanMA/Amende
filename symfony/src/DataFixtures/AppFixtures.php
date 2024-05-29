<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Fine;
use App\Entity\User;
use DateTimeImmutable;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    protected $passwordHasher;


    public function __construct(UserPasswordHasherInterface $passwordHasher,)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $fines = array(
            array("code" => "KW2024_22_78", "amount" => 68),
            array("code" => "AB2024_17_83", "amount" => 135),
            array("code" => "YZ2024_1_99", "amount" => 45),
            array("code" => "CD2024_10_20", "amount" => 1500),
            array("code" => "EF2024_33_67", "amount" => 3750)
        );

        for ($i = 0; $i < count($fines); $i++) {
            $fine = new Fine();
            $fine->setCode($fines[$i]['code']);
            $fine->setAmount($fines[$i]['amount']);
            $fine->setCreatedAt(new DateTimeImmutable());
            $manager->persist($fine);
        }

        $faker = Factory::create();

        for ($i = 0; $i < 10; $i++) {
            $randomSexe = rand(0, 1);
            $user = new User();
            if ($randomSexe === 1) {
                $user->setSexe($faker->firstNameFemale());
            } else {
                $user->setSexe($faker->firstNameMale());
            }
            $user->setLastName($faker->lastName());
            $user->setEmail($faker->email());
            $user->setPhoneNumber("0612345678");
            $user->setPassword($this->passwordHasher->hashPassword($user, "test1234"));
            $user->setRoles(["ROLE_USER"]);
            $user->setAddress("1 place de la Libération");
            $user->setCity($faker->city());
            $user->setPostalCode(rand(10000, 99999));
            $user->setCreatedAt(new DateTimeImmutable());
            $manager->persist($user);
        }

        $user = new User();
        $user->setPassword($this->passwordHasher->hashPassword($user, 'test1234'));
        $user->setEmail('test@test.com');
        $user->setCreatedAt(new DateTimeImmutable());
        $manager->persist($user);
        $manager->flush();
    }
}
