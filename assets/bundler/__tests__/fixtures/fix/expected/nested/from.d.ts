import type { UseQueryStateDefaultResult } from "@reduxjs/toolkit/query/react";
import { type UseQueryStateDefaultResult as Result } from '@reduxjs/toolkit/query/react';
import { reactHooksModuleName } from "@reduxjs/toolkit/dist/query/react";
export type Hook = UseQueryStateDefaultResult<unknown> | Result<unknown>;  
