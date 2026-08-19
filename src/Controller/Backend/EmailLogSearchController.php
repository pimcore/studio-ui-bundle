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

namespace Pimcore\Bundle\StudioUiBundle\Controller\Backend;

use OpenApi\Attributes\Post;
use Pimcore\Bundle\StudioBackendBundle\Controller\AbstractApiController;
use Pimcore\Bundle\StudioBackendBundle\Email\Schema\EmailLogEntryDetail;
use Pimcore\Bundle\StudioBackendBundle\Email\Service\EmailLogServiceInterface;
use Pimcore\Bundle\StudioBackendBundle\Filter\Attribute\Request\CollectionRequestBody;
use Pimcore\Bundle\StudioBackendBundle\Gdpr\Schema\GdprDataRow;
use Pimcore\Bundle\StudioBackendBundle\Gdpr\Service\GdprManagerServiceInterface;
use Pimcore\Bundle\StudioBackendBundle\MappedParameter\CollectionFilterParameter;
use Pimcore\Bundle\StudioBackendBundle\OpenApi\Attribute\Property\GenericCollection;
use Pimcore\Bundle\StudioBackendBundle\OpenApi\Attribute\Response\Content\CollectionJson;
use Pimcore\Bundle\StudioBackendBundle\OpenApi\Attribute\Response\DefaultResponses;
use Pimcore\Bundle\StudioBackendBundle\OpenApi\Attribute\Response\SuccessResponse;
use Pimcore\Bundle\StudioBackendBundle\OpenApi\Config\Tags;
use Pimcore\Bundle\StudioBackendBundle\Util\Constant\HttpResponseCodes;
use Pimcore\Bundle\StudioBackendBundle\Util\Constant\UserPermissions;
use Pimcore\Bundle\StudioBackendBundle\Util\Trait\PaginatedResponseTrait;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @internal
 */
final class EmailLogSearchController extends AbstractApiController
{
    use PaginatedResponseTrait;

    public function __construct(
        SerializerInterface $serializer,
        private readonly GdprManagerServiceInterface $gdprManagerService,
        private readonly EmailLogServiceInterface $emailLogService,
    ) {
        parent::__construct($serializer);
    }

    #[Route('/emails/search', name: 'pimcore_studio_ui_api_emails_log_search', methods: ['POST'])]
    #[IsGranted(UserPermissions::EMAILS->value)]
    #[Post(
        path: self::PREFIX . '/emails/search',
        operationId: 'email_log_search',
        description: 'Search email log entries.',
        summary: 'Search email log entries',
        tags: [Tags::Emails->value]
    )]
    #[CollectionRequestBody(
        columnFiltersExample: '[{"type":"email", "filterValue":"john.doe@mail.com"}]',
        sortFilterExample: '{"key":"sentDate", "direction":"DESC"}'
    )]
    #[SuccessResponse(
        description: 'Paginated matching email log entries.',
        content: new CollectionJson(new GenericCollection(EmailLogEntryDetail::class))
    )]
    #[DefaultResponses([
        HttpResponseCodes::UNAUTHORIZED,
        HttpResponseCodes::FORBIDDEN,
        HttpResponseCodes::NOT_FOUND,
        HttpResponseCodes::BAD_REQUEST,
        HttpResponseCodes::UNPROCESSABLE_CONTENT,
    ])]
    public function search(
        #[MapRequestPayload] CollectionFilterParameter $parameters
    ): JsonResponse {
        $matches = $this->gdprManagerService->search($parameters, 'sent_mails');
        $entries = array_map(
            fn (GdprDataRow $row): EmailLogEntryDetail => $this->emailLogService->getEntryDetails(
                (int) $row->getData()['id']
            ),
            $matches->getItems()
        );

        return $this->getPaginatedCollection(
            $this->serializer,
            $entries,
            $matches->getTotalItems()
        );
    }
}
