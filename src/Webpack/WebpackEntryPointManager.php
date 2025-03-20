<?php
declare(strict_types=1);

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