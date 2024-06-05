<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;


class SecurityController extends AbstractController
{

    #[Route(path: '/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', [
            'last_username' => $lastUsername,
            'error' => $error,
        ]);
    }

    #[Route(path: '/api/login_check', name: 'json_login')]
    public function json_login(Request $request)
    {
        // return new Response('ok', 200);
    }


    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }


    #[Route('/register', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, Security $security, EntityManagerInterface $entityManager): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // encode the plain password
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $form->get('plainPassword')->getData()
                )
            );

            $entityManager->persist($user);
            $entityManager->flush();

            // do anything else you need here, like send an email

            return $security->login($user, 'form_login', 'login');
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form,
        ]);
    }

    #[Route('/email_check', name: 'app_email_check')]
    public function emailCheck(Request $request, UserRepository $userRepository): Response
    {

        $requestBody = json_decode($request->getContent(), true);

        if (empty($requestBody['email']) || !isset($requestBody['email'])) {
            return new JsonResponse([
                "success" => false,
                "message" => "Veuillez envoyer l'email concerné pour procéder à la vérification"
            ], 400);
        }

        $email = $requestBody['email'];

        $userExists = $userRepository->findOneBy(["email" => $email]) !== null;

        if ($userExists) {
            return new JsonResponse([
                "success" => false,
                "message" => "Un utilisateur existe déjà avec cette adresse email"
            ], 200);
        }

        return new JsonResponse([
            "success" => true,
            "message" => "Aucun utilisateur ne correspond à cette adresse email. L'enregistrement peut continuer"
        ], 200);
    }

    // #[Route('/me', name: 'app_user_infos')]
    // public function getUserID(Request $request, UserRepository $userRepository, JWTEncoderInterface $jwtEncoderInterface): Response
    // {
    //     $authorizationHeader = $request->headers->get('authorization');

    //     $token = substr($authorizationHeader, 7, strlen($authorizationHeader));

    //     if (!$token) {
    //         return new JsonResponse(['message' => 'Could not find token in the Authorization header']);
    //     }

    //     $decoded = $jwtEncoderInterface->decode($token);

    //     $email = $decoded['username'];

    //     $id = $userRepository->findOneBy(['email' => $email])->id;

    //     return new JsonResponse([
    //         "id" => $id,
    //     ]);
    // }
}
