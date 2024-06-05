<?php

namespace App\Controller;

use App\Repository\FineRepository;
use App\Service\FineService;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class FineController extends AbstractController
{
    /**
     * Vérifie si une amende existe grâce à son code
     * @param string fineCode Le code de l'amende
     */
    #[Route('/api/fine/check/{fineCode}', name: 'check_fine', methods: ['GET'])]
    public function checkFine(FineRepository $fineRepository, SerializerInterface $serializer, string $fineCode, FineService $fineService): JsonResponse
    {

        $codeFormatValid = $fineService->isValidFormat($fineCode);

        if (!$codeFormatValid) {
            return new JsonResponse(['error' => 'The fine code format is invalid'], 400);
        }

        $fine = $fineRepository->findOneBy(['code' => $fineCode]);

        if (!$fine) {
            return new JsonResponse(['error' => 'Fine not found for that code'], 404);
        }

        $context = [
            'attributes' => ['id', 'amount', 'code', 'created_at', 'updated_at', 'payment']
        ];

        $serializedFine = $fine ? $serializer->serialize($fine, 'json', $context) : null;

        return new JsonResponse([
            'exists' => $fine !== null,
            'fine' => $serializedFine ? json_decode($serializedFine, true) : null
        ]);
    }

    /**
     * Vérifie si une amende à un paiement
     */
    #[Route('/api/fine/{fineId}/payment', name: 'check_fine_payment', methods: ['GET'])]
    public function checkFinePayment(
        FineRepository $fineRepository,
        SerializerInterface $serializer,
        string $fineId
    ): JsonResponse {
        $fine = $fineRepository->findOneBy(['id' => $fineId]);

        if (!$fine) {
            return new JsonResponse(['error' => 'Fine not found'], 404);
        }

        $payment = $fine->getPayment();

        $context = [
            'attributes' => ['id', 'user', 'card_number', 'cryptogram', 'expiration', 'created_at', 'updated_at', 'fine']
        ];

        $serializedPayment = $payment ? $serializer->serialize($payment, 'json', $context) : null;

        return new JsonResponse([
            'exists' => $payment !== null,
            'payment' => $serializedPayment ? json_decode($serializedPayment, true) : null
        ]);
    }
}
