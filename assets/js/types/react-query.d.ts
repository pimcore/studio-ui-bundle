/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type TypedUseQueryHookResult, type BaseQueryFn, type TypedUseMutation } from '@reduxjs/toolkit/query/react'

type AnyQueryHook<TData = any, TArg = any> = (
  arg?: TArg
) => TypedUseQueryHookResult<TData, TArg, BaseQueryFn>

type AnyMutationHook<TResult = any, TArg = any> = TypedUseMutation<
  TResult,
  TArg,
  BaseQueryFn
>
