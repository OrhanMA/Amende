<?php

namespace App\Tests;

use stdClass;
use App\Service\FineService;
use PHPUnit\Framework\TestCase;
use App\Repository\FineRepository;

class FineServiceTest extends TestCase
{
    /**
     * @var FineRepository|MockObject
     */
    private $fineRepository;

    /**
     * @var FineService
     */
    private $fineService;

    protected function setUp(): void
    {
        $this->fineRepository = $this->createMock(FineRepository::class);
        $this->fineService = new FineService($this->fineRepository);
    }
    public function testValidFormat(): void
    {
        $currentYear = date("Y");

        $this->assertTrue($this->fineService->isValidFormat("AB{$currentYear}_17_83"));
        $this->assertTrue($this->fineService->isValidFormat("KW{$currentYear}_22_78"));
        // $this->assertTrue($this->fineService->isValidFormat("YZ{$currentYear}_1_99"));
    }

    public function testInvalidFormat(): void
    {
        $currentYear = date("Y");

        $this->assertFalse($this->fineService->isValidFormat("ZA{$currentYear}_22_78")); // Invalid letters order
        $this->assertFalse($this->fineService->isValidFormat("AB2023_17_83")); // Invalid year
        $this->assertFalse($this->fineService->isValidFormat("YZ{$currentYear}_2_99")); // Invalid number length
        $this->assertFalse($this->fineService->isValidFormat("AB{$currentYear}-17-83")); // Invalid separators
        $this->assertFalse($this->fineService->isValidFormat("AB{$currentYear}_1783")); // Missing separator
    }
}
