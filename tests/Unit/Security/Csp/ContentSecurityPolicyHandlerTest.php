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

namespace Pimcore\Bundle\StudioUiBundle\Tests\Unit\Security\Csp;

use Codeception\Test\Unit;
use Pimcore\Bundle\StudioUiBundle\Security\Csp\ContentSecurityPolicyHandler;
use Pimcore\Bundle\StudioUiBundle\Security\Csp\ContentSecurityPolicyHandlerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

class ContentSecurityPolicyHandlerTest extends Unit
{
    private const CDN = 'https://cdn.example.com';

    public function testTheScriptDirectiveCarriesTheNonceOfTheTemplate(): void
    {
        $handler = new ContentSecurityPolicyHandler(true);

        preg_match('/nonce="([^"]+)"/', $handler->getNonceHtmlAttribute(), $match);

        $expected = "script-src 'self' 'nonce-" . $match[1] . "' 'unsafe-eval' ";
        $this->assertStringContainsString($expected, $handler->getCspHeader());
    }

    public function testEachMainRequestGetsItsOwnNonce(): void
    {
        $requestStack = new RequestStack();
        $handler = new ContentSecurityPolicyHandler(true, [], $requestStack);

        $requestStack->push(Request::create('/pimcore-studio/'));
        $first = $handler->getNonceHtmlAttribute();
        $this->assertSame($first, $handler->getNonceHtmlAttribute());
        $requestStack->pop();

        $requestStack->push(Request::create('/pimcore-studio/'));
        $this->assertNotSame($first, $handler->getNonceHtmlAttribute());
    }

    public function testAdditionsToACloneStayOnTheClone(): void
    {
        $handler = new ContentSecurityPolicyHandler(true);
        $clone = clone $handler;

        $clone->addAllowedUrls(ContentSecurityPolicyHandlerInterface::SCRIPT_OPT, [self::CDN]);

        $this->assertStringContainsString(self::CDN, $clone->getCspHeader());
        $this->assertStringNotContainsString(self::CDN, $handler->getCspHeader());
    }
}
