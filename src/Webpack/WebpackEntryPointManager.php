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

namespace Pimcore\Bundle\StudioUiBundle\Webpack;

use InvalidArgumentException;
use Traversable;

/**
 * @internal
 */
final readonly class WebpackEntryPointManager
{
    /**
     * @var WebpackEntryPointProviderInterface[] $providers
     */
    private array $providers;

    public function __construct(iterable $providers)
    {
        $providers = $providers instanceof Traversable ? iterator_to_array($providers) : $providers;
        foreach ($providers as $provider) {
            if (!$provider instanceof WebpackEntryPointProviderInterface) {
                throw new InvalidArgumentException(sprintf(
                    'Expected instance of %s, got %s',
                    WebpackEntryPointProviderInterface::class,
                    is_object($provider) ? get_class($provider) : gettype($provider)
                ));
            }
        }
        $this->providers = $providers;
    }

    public function getProviders(): array
    {
        return $this->providers;
    }
}
