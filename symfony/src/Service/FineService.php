<?php

namespace App\Service;

use App\Repository\FineRepository;

class FineService
{
  private $entityManager;
  private $fineRepository;

  public function __construct(FineRepository $fineRepository)
  {
    $this->fineRepository = $fineRepository;
  }

  public function isValidFormat(string $fineCode)
  {
    if (strlen($fineCode) !== 12) {
      return false;
    }

    // AB2024_17_83
    $letterA = $fineCode[0];
    // dd($letterA);
    $letterB = $fineCode[1];
    // dd($letterB);
    $codeYear = substr($fineCode, 2, 4);
    // dd($codeYear);
    $separator1 = $fineCode[6];
    // dd($separator1);
    // Extract the first number part
    $number1StartIndex = strpos($fineCode, '_', 6);
    // dd($number1StartIndex);
    if ($number1StartIndex === false) {
      return false; // No underscore found after the first separator
    }
    $number1StartIndex++; // Move past the underscore
    $number1EndIndex = strpos($fineCode, '_', $number1StartIndex);
    // dd($number1EndIndex); // 8
    if ($number1EndIndex === false) {
      return false; // No second underscore found after the first number
    }
    $number1 = substr($fineCode, $number1StartIndex, $number1EndIndex - $number1StartIndex);
    // dd($number1);

    // Extract the second number part
    $number2StartIndex = $number1EndIndex + 1;
    $number2EndIndex = strpos($fineCode, '_', $number2StartIndex);
    // dd($number2StartIndex);
    if ($number2EndIndex === false) {
      $number2EndIndex = strlen($fineCode); // If no second underscore found, consider the rest of the string as the second number
    }
    $number2 = substr($fineCode, $number2StartIndex, $number2EndIndex - $number2StartIndex);
    // dd($number2);

    if ($letterA >= $letterB) {
      return false;
    }

    $currentYear = date("Y");
    if ($codeYear != $currentYear) {
      return false;
    }

    // Check if separators are underscores
    if ($separator1 !== '_' || strlen($number1) > 2 || strlen($number2) > 2) {
      return false;
    }

    // Check numeric character(s)
    if (!ctype_digit($number1) || !ctype_digit($number2)) {
      return false;
    }

    // If one number is one digit long, the other one must be two digits long
    if ((strlen($number1) === 1 && strlen($number2) !== 2) || (strlen($number2) === 1 && strlen($number1) !== 2)) {
      return false;
    }

    // Ensure that the sum of the numbers is 100
    if ((int)$number1 + (int)$number2 !== 100) {
      return false;
    }

    return true;
  }




  /**
   * @return bool
   * @param string $fineCode
   * Vérifie si le code existe en base de données 
   */
  public function existsInDatabase(string $fineCode): bool
  {
    return $this->fineRepository->findOneBy(['code' => $fineCode]) !== null;
  }
}
