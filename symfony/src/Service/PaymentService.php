<?php

namespace App\Service;

class PaymentService
{
  function luhnValidation($number)
  {
    // Étape 1: Inverser le numéro
    $number = strrev($number);

    $sum = 0;
    for ($i = 0, $j = strlen($number); $i < $j; $i++) {
      // Étape 2: Multiplier les chiffres pairs
      $digit = (int) $number[$i];
      if ($i % 2 == 1) {
        $digit *= 2;
        if ($digit > 9) {
          $digit -= 9;
        }
      }
      // Étape 3: Addition des chiffres
      $sum += $digit;
    }

    // Étape 4: Vérification de la validité
    return $sum % 10 === 0;
  }

  function isCryptogramValid($cryptogram): bool
  {
    return strlen($cryptogram) == 3;
  }

  function isExpirationDateValid($date): bool
  {
    // vérifie le format du mois 01 à 09 ou 10 à 12 + un / + 2 digits
    if (!preg_match('/^(0[1-9]|1[0-2])\/\d{2}$/', $date)) {
      return false;
    }

    $currentYear = date('Y'); // ex 12
    $currentMonth = date('m'); // ex 24
    $month = substr($date, 0, 2);
    $year = '20' . substr($date, 3, 2); // 20 . 24 = "2024"

    if ($year < $currentYear) {
      // check cartes avec année expirée
      return false;
    }

    if ($year == $currentYear && $month < $currentMonth) {
      // check mois pas encore passé si l'expiration est dans la même année
      return false;
    }

    return true;
  }
}
