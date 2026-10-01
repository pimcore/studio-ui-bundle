<?php
declare(strict_types=1);

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

namespace Pimcore\Bundle\StudioUiBundle\Tests\Unit\DependencyInjection;

use Codeception\Test\Unit;
use Pimcore\Bundle\StudioUiBundle\DependencyInjection\Configuration;
use Symfony\Component\Config\Definition\Exception\InvalidConfigurationException;
use Symfony\Component\Config\Definition\Processor;

final class ConfigurationTest extends Unit
{
    public function testPaginationDefaults(): void
    {
        $config = $this->process([]);

        $this->assertSame([10, 20, 50, 100], $config['pagination']['page_size_options']);
        $this->assertSame(20, $config['pagination']['default_page_size']);
        $this->assertSame(200, $config['pagination']['max_page_size']);
    }

    public function testPageSizeOptionsAcceptAList(): void
    {
        $config = $this->process(['pagination' => [
            'page_size_options' => [25, 50, 75],
            'default_page_size' => 25,
        ]]);

        $this->assertSame([25, 50, 75], $config['pagination']['page_size_options']);
    }

    public function testPageSizeOptionsAcceptACommaSeparatedString(): void
    {
        $config = $this->process(['pagination' => [
            'page_size_options' => ' 10, 25 ,50,50',
            'default_page_size' => 25,
        ]]);

        $this->assertSame([10, 25, 50], $config['pagination']['page_size_options']);
    }

    public function testPageSizeOptionsIgnoreEmptyEntriesInTheCommaSeparatedForm(): void
    {
        $config = $this->process(['pagination' => [
            'page_size_options' => '10,20,',
            'default_page_size' => 20,
        ]]);

        $this->assertSame([10, 20], $config['pagination']['page_size_options']);
    }

    public function testPageSizeOptionsDeduplicateIntegers(): void
    {
        $config = $this->process(['pagination' => [
            'page_size_options' => [20, 20, '20'],
            'default_page_size' => 20,
        ]]);

        $this->assertSame([20], $config['pagination']['page_size_options']);
    }

    public function testPageSizeOptionsRejectBooleanEntries(): void
    {
        $this->expectException(InvalidConfigurationException::class);

        $this->process(['pagination' => ['page_size_options' => [1, true]]]);
    }

    public function testPageSizeOptionsRejectFloatEntries(): void
    {
        $this->expectException(InvalidConfigurationException::class);

        $this->process(['pagination' => ['page_size_options' => [10, 1.5]]]);
    }

    public function testPageSizeOptionsRejectEmptyEntriesInAList(): void
    {
        $this->expectException(InvalidConfigurationException::class);

        $this->process(['pagination' => ['page_size_options' => ['10', '', '20']]]);
    }

    public function testPageSizeOptionsRejectNonIntegerEntries(): void
    {
        $this->expectException(InvalidConfigurationException::class);

        $this->process(['pagination' => ['page_size_options' => '10,foo,20']]);
    }

    public function testPageSizeOptionsRejectZero(): void
    {
        $this->expectException(InvalidConfigurationException::class);

        $this->process(['pagination' => ['page_size_options' => [0, 20]]]);
    }

    public function testPageSizeOptionsMustNotBeEmpty(): void
    {
        $this->expectException(InvalidConfigurationException::class);

        $this->process(['pagination' => ['page_size_options' => '']]);
    }

    public function testDefaultPageSizeMustBeOneOfTheOptions(): void
    {
        $this->expectException(InvalidConfigurationException::class);
        $this->expectExceptionMessage('default_page_size');

        $this->process(['pagination' => ['default_page_size' => 25]]);
    }

    public function testPageSizeOptionsMustNotExceedMaxPageSize(): void
    {
        $this->expectException(InvalidConfigurationException::class);
        $this->expectExceptionMessage('max_page_size');

        $this->process(['pagination' => [
            'page_size_options' => [10, 20, 500],
            'max_page_size' => 200,
        ]]);
    }

    public function testMaxPageSizeMustBePositive(): void
    {
        $this->expectException(InvalidConfigurationException::class);

        $this->process(['pagination' => ['max_page_size' => 0]]);
    }

    /**
     * @param array<string, mixed> $config
     *
     * @return array<string, mixed>
     */
    private function process(array $config): array
    {
        return (new Processor())->processConfiguration(new Configuration(), [$config]);
    }
}
