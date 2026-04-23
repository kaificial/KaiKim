"use client";

import { MutableRefObject } from 'react';
import { useGSAP as useGSAPContext } from '@gsap/react';

interface UseGSAPOptions {
    scope?: MutableRefObject<any>;
    dependencies?: any[];
    revertOnUpdate?: boolean;
}

export function useGSAP(
    callback: (context: gsap.Context) => void | (() => void),
    options: UseGSAPOptions = {}
) {
    const { scope, dependencies = [], revertOnUpdate = false } = options;

    return useGSAPContext(callback, {
        scope,
        dependencies,
        revertOnUpdate,
    });
}
