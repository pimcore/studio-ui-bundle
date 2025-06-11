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

namespace Pimcore\Bundle\StudioUiBundle\EventSubscriber;

use Pimcore\Bundle\CoreBundle\EventListener\Traits\PimcoreContextAwareTrait;
use Pimcore\Bundle\StudioUiBundle\Service\StaticResourcesResolverInterface;
use Pimcore\Document\Editable\EditmodeEditableDefinitionCollector;
use Pimcore\Extension\Bundle\PimcoreBundleManager;
use Pimcore\Http\Request\Resolver\DocumentResolver;
use Pimcore\Http\Request\Resolver\EditmodeResolver;
use Pimcore\Http\Request\Resolver\PimcoreContextResolver;
use Pimcore\Model\Document;
use Pimcore\Security\User\UserLoader;
use Psr\Log\LoggerAwareTrait;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\RouterInterface;

/**
 * Modifies responses for editmode
 *
 * @internal
 */
final class EditmodeSubscriber implements EventSubscriberInterface
{
    use LoggerAwareTrait;
    use PimcoreContextAwareTrait;

    private array $contentTypes = [
        'text/html',
    ];

    public function __construct(
        private readonly EditmodeResolver $editmodeResolver,
        private readonly DocumentResolver $documentResolver,
        private readonly UserLoader $userLoader,
        private readonly PimcoreBundleManager $bundleManager,
        private readonly RouterInterface $router,
        private EditmodeEditableDefinitionCollector $editableConfigCollector,
        private StaticResourcesResolverInterface $staticResourcesResolver
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => 'onKernelRequest',
            KernelEvents::RESPONSE => 'onKernelResponse',
        ];
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();

        if (!$event->isMainRequest()) {
            return; // only resolve editmode in frontend
        }

        if (!$this->matchesPimcoreContext($request, PimcoreContextResolver::CONTEXT_DEFAULT)) {
            return;
        }

        if (!$request->query->getBoolean('pimcore_studio')) {
            return;
        }

        // trigger this once to make sure it is resolved properly
        // TODO is this needed?
        $this->editmodeResolver->isEditmode($request);
    }

    public function onKernelResponse(ResponseEvent $event): void
    {
        $request = $event->getRequest();
        $response = $event->getResponse();

        if (!$event->isMainRequest()) {
            return; // only main requests inject editmode assets
        }

        if (!$this->matchesPimcoreContext($request, PimcoreContextResolver::CONTEXT_DEFAULT)) {
            return;
        }

        if (!$this->editmodeResolver->isEditmode($request)) {
            return;
        }

        if (!$this->contentTypeMatches($response)) {
            return;
        }

        if (!$request->query->getBoolean('pimcore_studio')) {
            return;
        }

        $document = $this->documentResolver->getDocument($request);
        if (!$document) {
            return;
        }

        $this->logger->info('Injecting editmode assets into request {request}', [
            'request' => $request->getPathInfo(),
        ]);

        $this->addEditmodeAssets($document, $response);

        // set sameorigin header for editmode responses
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN', true);
    }

    private function contentTypeMatches(Response $response): bool
    {
        $contentType = $response->headers->get('Content-Type');
        if (!$contentType) {
            return true;
        }

        // check for substring as the content type could define attributes (e.g. charset)
        foreach ($this->contentTypes as $ct) {
            if (str_contains($contentType, $ct)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Inject editmode assets into response HTML
     *
     */
    private function addEditmodeAssets(Document $document, Response $response): void
    {
        if (Document\Service::isValidType($document->getType())) {
            $html = $response->getContent();

            if (!$html) {
                return;
            }

            $user = $this->userLoader->getUser();

            $htmlElement = preg_match('/<html[^a-zA-Z]?( [^>]+)?>/', $html);
            $headElement = preg_match('/<head[^a-zA-Z]?( [^>]+)?>/', $html);
            $bodyElement = preg_match('/<body[^a-zA-Z]?( [^>]+)?>/', $html);

            $skipCheck = false;

            // if there's no head and no body, create a wrapper including these elements
            // add html headers for snippets in editmode, so there is no problem with javascript
            if (!$headElement && !$bodyElement && !$htmlElement) {
                $html = "<!DOCTYPE html>\n<html>\n<head></head><body>" . $html . '</body></html>';
                $skipCheck = true;
            }

            if ($skipCheck || ($headElement && $bodyElement && $htmlElement)) {

                $headHtml = $this->buildHeadHtml($document, $user->getLanguage());
                $bodyHtml = "\n\n" . $this->editableConfigCollector->getHtml() . "\n\n" . '<div id="pimcore-studio-app"></div>';

                $html = $this->insertBefore('</head>', $html, $headHtml);
                $html = $this->insertBefore('</body>', $html, $bodyHtml);

                $response->setContent($html);
            } else {
                $response->setContent('<div style="font-size:30px; font-family: Arial; font-weight:bold; color:red; text-align: center; margin: 40px 0">You have to define a &lt;html&gt;, &lt;head&gt;, &lt;body&gt;<br />HTML-tag in your view/layout markup!</div>');
            }
        }
    }

    private function insertBefore(string $search, string $code, string $insert): string
    {
        $endPosition = strripos($code, $search);

        if (false !== $endPosition) {
            $code = substr_replace($code, $insert . "\n\n" . $search, $endPosition, 7);
        }

        return $code;
    }

    private function buildHeadHtml(Document $document, string $language): string
    {
        $headHtml = "\n\n\n<!-- pimcore editmode -->\n";
        $headHtml .= '<meta name="google" value="notranslate">';
        $headHtml .= "\n\n";

        $scripts = array_merge(
            $this->staticResourcesResolver->getBundleJsFiles(),
            $this->staticResourcesResolver->getStudioJsFiles(),
        );

        foreach ($scripts as $jsFile) {
            $headHtml .= '<script src="' . $jsFile . '"></script>';
            $headHtml .= "\n";
        }

        $stylesheets = array_merge(
            $this->staticResourcesResolver->getStudioCssFiles(),
            $this->staticResourcesResolver->getBundleCssFiles()
        );

        // include stylesheets
        foreach ($stylesheets as $stylesheet) {
            $headHtml .= '<link rel="stylesheet" type="text/css" href="' . $stylesheet . '" />';
            $headHtml .= "\n";
        }

        // set var for editable configurations which is filled by Document\Tag::admin()
        $headHtml .= '<script>
            var editableDefinitions = [];
            var pimcore_document_id = ' . $document->getId() . ';
        </script>';

        $headHtml .= "\n\n<!-- /pimcore editmode -->\n\n\n";

        return $headHtml;
    }
}
