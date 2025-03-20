<?php
declare(strict_types=1);

/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    http://www.pimcore.org/license     GPLv3 and PCL
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
