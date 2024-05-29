<?php

namespace App\Tests;

use stdClass;
use App\Service\PaymentService;
use PHPUnit\Framework\TestCase;
use App\Repository\FineRepository;

class PaymentServiceTest extends TestCase
{
  /**
   * @var PaymentService
   */
  private $paymentService;

  protected function setUp(): void
  {
    $this->paymentService = new PaymentService();
  }
  public function testCardNumberValidFormat(): void
  {

    $this->assertTrue($this->paymentService->luhnValidation("4539148803436467"));
    $this->assertTrue($this->paymentService->luhnValidation("3574471495614086"));
    $this->assertTrue($this->paymentService->luhnValidation("0252276755291102"));
    $this->assertTrue($this->paymentService->luhnValidation("6011111111111117"));
    $this->assertTrue($this->paymentService->luhnValidation("6902792659460628"));
  }

  public function testCardNumberInvalidFormat(): void
  {
    $this->assertFalse($this->paymentService->luhnValidation("4539148803436466"));
    $this->assertFalse($this->paymentService->luhnValidation("4485270713746356"));
    $this->assertFalse($this->paymentService->luhnValidation("4716300400309279"));
    $this->assertFalse($this->paymentService->luhnValidation("6011111111111118"));
    $this->assertFalse($this->paymentService->luhnValidation("379282246310006"));
  }

  public function testCryptogramValidFormat(): void
  {
    $this->assertTrue($this->paymentService->isCryptogramValid("111"));
    $this->assertFalse($this->paymentService->isCryptogramValid("11"));
    $this->assertFalse($this->paymentService->isCryptogramValid("1111"));
  }

  public function testExpirationDateValidFormat(): void
  {
    $this->assertTrue($this->paymentService->isExpirationDateValid('12/24'));
    $this->assertTrue($this->paymentService->isExpirationDateValid('12/45'));
    $this->assertTrue($this->paymentService->isExpirationDateValid('01/30'));


    $this->assertFalse($this->paymentService->isExpirationDateValid('00/30'));
    $this->assertFalse($this->paymentService->isExpirationDateValid('14/30'));
    $this->assertFalse($this->paymentService->isExpirationDateValid('12/19'));
    $this->assertFalse($this->paymentService->isExpirationDateValid('01/24'));
  }
}
