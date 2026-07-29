(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/composite/root/CompositeRootContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompositeRootContext",
    ()=>CompositeRootContext,
    "useCompositeRootContext",
    ()=>useCompositeRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const CompositeRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) CompositeRootContext.displayName = "CompositeRootContext";
function useCompositeRootContext(optional = false) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](CompositeRootContext);
    if (context === undefined && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: CompositeRootContext is missing. Composite parts must be placed within <Composite.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFocusableWhenDisabled",
    ()=>useFocusableWhenDisabled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
function useFocusableWhenDisabled(parameters) {
    const { focusableWhenDisabled, disabled, composite = false, tabIndex: tabIndexProp = 0, isNativeButton } = parameters;
    const isFocusableComposite = composite && focusableWhenDisabled !== false;
    const isNonFocusableComposite = composite && focusableWhenDisabled === false;
    // we can't explicitly assign `undefined` to any of these props because it
    // would otherwise prevent subsequently merged props from setting them
    const props = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useFocusableWhenDisabled.useMemo[props]": ()=>{
            const additionalProps = {
                // allow Tabbing away from focusableWhenDisabled elements
                onKeyDown (event) {
                    if (disabled && focusableWhenDisabled && event.key !== 'Tab') {
                        event.preventDefault();
                    }
                }
            };
            if (!composite) {
                additionalProps.tabIndex = tabIndexProp;
                if (!isNativeButton && disabled) {
                    additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
                }
            }
            if (isNativeButton && (focusableWhenDisabled || isFocusableComposite) || !isNativeButton && disabled) {
                additionalProps['aria-disabled'] = disabled;
            }
            if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) {
                additionalProps.disabled = disabled;
            }
            return additionalProps;
        }
    }["useFocusableWhenDisabled.useMemo[props]"], [
        composite,
        disabled,
        focusableWhenDisabled,
        isFocusableComposite,
        isNonFocusableComposite,
        isNativeButton,
        tabIndexProp
    ]);
    return {
        props
    };
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/use-button/useButton.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useButton",
    ()=>useButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/useStableCallback.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/error.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$safeReact$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/safeReact.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/merge-props/mergeProps.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$composite$2f$root$2f$CompositeRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/composite/root/CompositeRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$useFocusableWhenDisabled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function useButton(parameters = {}) {
    const { disabled = false, focusableWhenDisabled, tabIndex = 0, native: isNativeButton = true, composite: compositeProp } = parameters;
    const elementRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const compositeRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$composite$2f$root$2f$CompositeRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompositeRootContext"])(true);
    const isCompositeItem = compositeProp ?? compositeRootContext !== undefined;
    const { props: focusableWhenDisabledProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$useFocusableWhenDisabled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFocusableWhenDisabled"])({
        focusableWhenDisabled,
        disabled,
        composite: isCompositeItem,
        tabIndex,
        isNativeButton
    });
    if ("TURBOPACK compile-time truthy", 1) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
            "useButton.useEffect": ()=>{
                if (!elementRef.current) {
                    return;
                }
                const isButtonTag = isButtonElement(elementRef.current);
                if (isNativeButton) {
                    if (!isButtonTag) {
                        const ownerStackMessage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$safeReact$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeReact"].captureOwnerStack?.() || '';
                        const message = 'A component that acts as a button expected a native <button> because the ' + '`nativeButton` prop is true. Rendering a non-<button> removes native button ' + 'semantics, which can impact forms and accessibility. Use a real <button> in the ' + '`render` prop, or set `nativeButton` to `false`.';
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["error"])(`${message}${ownerStackMessage}`);
                    }
                } else if (isButtonTag) {
                    const ownerStackMessage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$safeReact$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeReact"].captureOwnerStack?.() || '';
                    const message = 'A component that acts as a button expected a non-<button> because the `nativeButton` ' + 'prop is false. Rendering a <button> keeps native behavior while Base UI applies ' + 'non-native attributes and handlers, which can add unintended extra attributes (such ' + 'as `role` or `aria-disabled`). Use a non-<button> in the `render` prop, or set ' + '`nativeButton` to `true`.';
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["error"])(`${message}${ownerStackMessage}`);
                }
            }
        }["useButton.useEffect"], [
            isNativeButton
        ]);
    }
    // handles a disabled composite button rendering another button, e.g.
    // <Toolbar.Button disabled render={<Menu.Trigger />} />
    // the `disabled` prop needs to pass through 2 `useButton`s then finally
    // delete the `disabled` attribute from DOM
    const updateDisabled = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useButton.useCallback[updateDisabled]": ()=>{
            const element = elementRef.current;
            if (!isButtonElement(element)) {
                return;
            }
            if (isCompositeItem && disabled && focusableWhenDisabledProps.disabled === undefined && element.disabled) {
                element.disabled = false;
            }
        }
    }["useButton.useCallback[updateDisabled]"], [
        disabled,
        focusableWhenDisabledProps.disabled,
        isCompositeItem
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(updateDisabled, [
        updateDisabled
    ]);
    const getButtonProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useButton.useCallback[getButtonProps]": (externalProps = {})=>{
            const { onClick: externalOnClick, onMouseDown: externalOnMouseDown, onKeyUp: externalOnKeyUp, onKeyDown: externalOnKeyDown, onPointerDown: externalOnPointerDown, ...otherExternalProps } = externalProps;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])({
                onClick (event) {
                    if (disabled) {
                        event.preventDefault();
                        return;
                    }
                    externalOnClick?.(event);
                },
                onMouseDown (event) {
                    if (!disabled) {
                        externalOnMouseDown?.(event);
                    }
                },
                onKeyDown (event) {
                    if (disabled) {
                        return;
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeEventPreventable"])(event);
                    externalOnKeyDown?.(event);
                    if (event.baseUIHandlerPrevented) {
                        return;
                    }
                    const isCurrentTarget = event.target === event.currentTarget;
                    const currentTarget = event.currentTarget;
                    const isButton = isButtonElement(currentTarget);
                    const isLink = !isNativeButton && isValidLinkElement(currentTarget);
                    const shouldClick = isCurrentTarget && (isNativeButton ? isButton : !isLink);
                    const isEnterKey = event.key === 'Enter';
                    const isSpaceKey = event.key === ' ';
                    const role = currentTarget.getAttribute('role');
                    const isTextNavigationRole = role?.startsWith('menuitem') || role === 'option' || role === 'gridcell';
                    if (isCurrentTarget && isCompositeItem && isSpaceKey) {
                        if (event.defaultPrevented && isTextNavigationRole) {
                            return;
                        }
                        event.preventDefault();
                        if (isLink || isNativeButton && isButton) {
                            currentTarget.click();
                            event.preventBaseUIHandler();
                        } else if (shouldClick) {
                            externalOnClick?.(event);
                            event.preventBaseUIHandler();
                        }
                        return;
                    }
                    // Keyboard accessibility for native and non-native elements.
                    if (shouldClick) {
                        if (!isNativeButton && (isSpaceKey || isEnterKey)) {
                            event.preventDefault();
                        }
                        if (!isNativeButton && isEnterKey) {
                            externalOnClick?.(event);
                        }
                    }
                },
                onKeyUp (event) {
                    if (disabled) {
                        return;
                    }
                    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
                    // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeEventPreventable"])(event);
                    externalOnKeyUp?.(event);
                    if (event.target === event.currentTarget && isNativeButton && isCompositeItem && isButtonElement(event.currentTarget) && event.key === ' ') {
                        event.preventDefault();
                        return;
                    }
                    if (event.baseUIHandlerPrevented) {
                        return;
                    }
                    // Keyboard accessibility for non interactive elements
                    if (event.target === event.currentTarget && !isNativeButton && !isCompositeItem && event.key === ' ') {
                        externalOnClick?.(event);
                    }
                },
                onPointerDown (event) {
                    if (disabled) {
                        event.preventDefault();
                        return;
                    }
                    externalOnPointerDown?.(event);
                }
            }, isNativeButton ? {
                type: 'button'
            } : {
                role: 'button'
            }, focusableWhenDisabledProps, otherExternalProps);
        }
    }["useButton.useCallback[getButtonProps]"], [
        disabled,
        focusableWhenDisabledProps,
        isCompositeItem,
        isNativeButton
    ]);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useButton.useStableCallback[buttonRef]": (element)=>{
            elementRef.current = element;
            updateDisabled();
        }
    }["useButton.useStableCallback[buttonRef]"]);
    return {
        getButtonProps,
        buttonRef
    };
}
function isButtonElement(elem) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(elem) && elem.tagName === 'BUTTON';
}
function isValidLinkElement(elem) {
    return Boolean(elem?.tagName === 'A' && elem?.href);
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/button/Button.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$use$2d$button$2f$useButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/use-button/useButton.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
'use client';
;
;
;
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function Button(componentProps, forwardedRef) {
    const { render, className, disabled = false, focusableWhenDisabled = false, nativeButton = true, style, ...elementProps } = componentProps;
    const { getButtonProps, buttonRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$use$2d$button$2f$useButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useButton"])({
        disabled,
        focusableWhenDisabled,
        native: nativeButton
    });
    const state = {
        disabled
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('button', componentProps, {
        state,
        ref: [
            forwardedRef,
            buttonRef
        ],
        props: [
            elementProps,
            getButtonProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) Button.displayName = "Button";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/alert-dialog/index.parts.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
;
;
;
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/root/useDialogRoot.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogInteractions",
    ()=>DialogInteractions,
    "useDialogRoot",
    ()=>useDialogRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useScrollLock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/useScrollLock.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/empty.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$hooks$2f$useDismiss$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/hooks/useDismiss.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/shadowDom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$createBaseUIEventDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/reason-parts.mjs [app-client] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$popupStoreUtils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/popups/popupStoreUtils.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function useDialogRoot(params) {
    const { store, actionsRef } = params;
    const open = store.useState('open');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$popupStoreUtils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePopupRootSync"])(store, open);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$popupStoreUtils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImplicitActiveTrigger"])(store);
    const { forceUnmount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$popupStoreUtils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOpenStateTransitions"])(open, store);
    const handleImperativeClose = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useDialogRoot.useCallback[handleImperativeClose]": ()=>{
            store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$createBaseUIEventDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].imperativeAction));
        }
    }["useDialogRoot.useCallback[handleImperativeClose]"], [
        store
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"](actionsRef, {
        "useDialogRoot.useImperativeHandle": ()=>({
                unmount: forceUnmount,
                close: handleImperativeClose
            })
    }["useDialogRoot.useImperativeHandle"], [
        forceUnmount,
        handleImperativeClose
    ]);
}
function DialogInteractions({ store, parentContext, isDrawer }) {
    const open = store.useState('open');
    const disablePointerDismissal = store.useState('disablePointerDismissal');
    const modal = store.useState('modal');
    const popupElement = store.useState('popupElement');
    const floatingRootContext = store.useState('floatingRootContext');
    const [ownNestedOpenDialogs, setOwnNestedOpenDialogs] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](0);
    const [ownNestedOpenDrawers, setOwnNestedOpenDrawers] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](0);
    const isTopmost = ownNestedOpenDialogs === 0;
    const dismiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$hooks$2f$useDismiss$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDismiss"])(floatingRootContext, {
        outsidePressEvent () {
            if (store.context.internalBackdropRef.current || store.context.backdropRef.current) {
                return 'intentional';
            }
            // Ensure `aria-hidden` on outside elements is removed immediately
            // on outside press when trapping focus.
            return {
                mouse: modal === 'trap-focus' ? 'sloppy' : 'intentional',
                touch: 'sloppy'
            };
        },
        outsidePress (event) {
            if (!store.context.outsidePressEnabledRef.current) {
                return false;
            }
            // For mouse events, only accept left button (button 0)
            // For touch events, a single touch is equivalent to left button
            if ('button' in event && event.button !== 0) {
                return false;
            }
            if ('touches' in event && event.touches.length !== 1) {
                return false;
            }
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
            if (isTopmost && !disablePointerDismissal) {
                // Only close if the click occurred on the dialog's owning backdrop.
                // This supports multiple modal dialogs that aren't nested in the React tree:
                // https://github.com/mui/base-ui/issues/1320
                if (modal) {
                    return store.context.internalBackdropRef.current || store.context.backdropRef.current ? store.context.internalBackdropRef.current === target || store.context.backdropRef.current === target || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(target, popupElement) && !target?.hasAttribute('data-base-ui-portal') : true;
                }
                return true;
            }
            return false;
        },
        escapeKey: isTopmost
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useScrollLock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollLock"])(open && modal === true, popupElement);
    // Listen for nested open/close events on this store to maintain the counts.
    store.useContextCallback('onNestedDialogOpen', {
        "DialogInteractions.useContextCallback": (dialogCount, drawerCount)=>{
            setOwnNestedOpenDialogs(dialogCount);
            setOwnNestedOpenDrawers(drawerCount);
        }
    }["DialogInteractions.useContextCallback"]);
    store.useContextCallback('onNestedDialogClose', {
        "DialogInteractions.useContextCallback": ()=>{
            setOwnNestedOpenDialogs(0);
            setOwnNestedOpenDrawers(0);
        }
    }["DialogInteractions.useContextCallback"]);
    // Notify parent of our open/close state using parent callbacks, if any
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "DialogInteractions.useEffect": ()=>{
            if (parentContext?.onNestedDialogOpen && open) {
                parentContext.onNestedDialogOpen(ownNestedOpenDialogs + 1, ownNestedOpenDrawers + (isDrawer ? 1 : 0));
            }
            if (parentContext?.onNestedDialogClose && !open) {
                parentContext.onNestedDialogClose();
            }
            return ({
                "DialogInteractions.useEffect": ()=>{
                    if (parentContext?.onNestedDialogClose && open) {
                        parentContext.onNestedDialogClose();
                    }
                }
            })["DialogInteractions.useEffect"];
        }
    }["DialogInteractions.useEffect"], [
        isDrawer,
        open,
        ownNestedOpenDialogs,
        ownNestedOpenDrawers,
        parentContext
    ]);
    const activeTriggerProps = dismiss.reference ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    const inactiveTriggerProps = dismiss.trigger ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    // Consumers (DialogPopup/DrawerPopup) already spread `FOCUSABLE_POPUP_PROPS`
    // directly, so the popup props only need to carry the dismiss handlers.
    const popupProps = dismiss.floating ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$popupStoreUtils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePopupInteractionProps"])(store, {
        activeTriggerProps,
        inactiveTriggerProps,
        popupProps,
        nestedOpenDialogCount: ownNestedOpenDialogs,
        nestedOpenDrawerCount: ownNestedOpenDrawers
    });
    return null;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/root/DialogRootContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogRootContext",
    ()=>DialogRootContext,
    "IsDrawerContext",
    ()=>IsDrawerContext,
    "useDialogRootContext",
    ()=>useDialogRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const IsDrawerContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](false);
if ("TURBOPACK compile-time truthy", 1) IsDrawerContext.displayName = "IsDrawerContext";
const DialogRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) DialogRootContext.displayName = "DialogRootContext";
function useDialogRootContext(optional) {
    const dialogRootContext = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](DialogRootContext);
    if (optional === false && dialogRootContext === undefined) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: DialogRootContext is missing. Dialog parts must be placed within <Dialog.Root>.' : "TURBOPACK unreachable");
    }
    return dialogRootContext;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/store/DialogStore.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogStore",
    ()=>DialogStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/store/createSelector.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$store$2f$ReactStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/store/ReactStore.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/popups/store.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$popupTriggerMap$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/popups/popupTriggerMap.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$popupStoreUtils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/popups/popupStoreUtils.mjs [app-client] (ecmascript)");
;
;
;
const selectors = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["popupStoreSelectors"],
    modal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.modal),
    nested: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.nested),
    nestedOpenDialogCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.nestedOpenDialogCount),
    nestedOpenDrawerCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.nestedOpenDrawerCount),
    disablePointerDismissal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.disablePointerDismissal),
    openMethod: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.openMethod),
    descriptionElementId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.descriptionElementId),
    titleElementId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.titleElementId),
    viewportElement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.viewportElement),
    role: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.role)
};
class DialogStore extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$store$2f$ReactStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactStore"] {
    constructor(initialState, floatingId, nested = false){
        const triggerElements = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$popupTriggerMap$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopupTriggerMap"]();
        const state = createInitialState(initialState);
        state.floatingRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPopupFloatingRootContext"])(triggerElements, floatingId, nested);
        super(state, {
            popupRef: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRef"](),
            backdropRef: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRef"](),
            internalBackdropRef: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRef"](),
            outsidePressEnabledRef: {
                current: true
            },
            triggerElements,
            onOpenChange: undefined,
            onOpenChangeComplete: undefined
        }, selectors);
    }
    setOpen = (nextOpen, eventDetails)=>{
        eventDetails.preventUnmountOnClose = ()=>{
            this.set('preventUnmountingOnClose', true);
        };
        if (!nextOpen && eventDetails.trigger == null && this.state.activeTriggerId != null) {
            // When closing the dialog, pass the old trigger to the onOpenChange event
            // so it's not reset too early (potentially causing focus issues in controlled scenarios).
            eventDetails.trigger = this.state.activeTriggerElement ?? undefined;
        }
        this.context.onOpenChange?.(nextOpen, eventDetails);
        if (eventDetails.isCanceled) {
            return;
        }
        this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
        const updatedState = {
            open: nextOpen
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$popupStoreUtils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setPopupOpenState"])(updatedState, nextOpen, eventDetails.trigger);
        this.update(updatedState);
    };
    static useStore(externalStore, initialState) {
        /* eslint-disable react-hooks/rules-of-hooks */ const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$popupStoreUtils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePopupStore"])(externalStore, (floatingId, nested)=>new DialogStore(initialState, floatingId, nested), true).store;
        /* eslint-enable react-hooks/rules-of-hooks */ return store;
    }
}
function createInitialState(initialState = {}) {
    return {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createInitialPopupStoreState"])(),
        modal: true,
        disablePointerDismissal: false,
        popupElement: null,
        viewportElement: null,
        descriptionElementId: undefined,
        titleElementId: undefined,
        openMethod: null,
        nested: false,
        nestedOpenDialogCount: 0,
        nestedOpenDrawerCount: 0,
        role: 'dialog',
        ...initialState
    };
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/root/useRenderDialogRoot.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRenderDialogRoot",
    ()=>useRenderDialogRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useOnFirstRender$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/useOnFirstRender.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$useDialogRoot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/root/useDialogRoot.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/root/DialogRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$store$2f$DialogStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/store/DialogStore.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
function useRenderDialogRoot(props, mode = 'dialog') {
    const { children, open: openProp, defaultOpen = false, onOpenChange, onOpenChangeComplete, disablePointerDismissal: disablePointerDismissalProp = false, modal: modalProp = true, actionsRef, handle, triggerId: triggerIdProp, defaultTriggerId: defaultTriggerIdProp = null } = props;
    const isDrawer = mode === 'drawer';
    const isAlertDialog = mode === 'alert-dialog';
    const modal = isAlertDialog ? true : modalProp;
    const disablePointerDismissal = isAlertDialog || disablePointerDismissalProp;
    const role = isAlertDialog ? 'alertdialog' : 'dialog';
    const parentDialogRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])(true);
    const nested = Boolean(parentDialogRootContext);
    const rootState = {
        modal,
        disablePointerDismissal,
        nested,
        role
    };
    const store = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$store$2f$DialogStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogStore"].useStore(handle?.store, {
        open: defaultOpen,
        openProp,
        activeTriggerId: defaultTriggerIdProp,
        triggerIdProp,
        ...rootState
    });
    // Support initially open state when uncontrolled
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useOnFirstRender$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOnFirstRender"])({
        "useRenderDialogRoot.useOnFirstRender": ()=>{
            const nextState = openProp === undefined && store.state.open === false && defaultOpen === true ? {
                open: true,
                activeTriggerId: defaultTriggerIdProp
            } : null;
            if (isAlertDialog) {
                // Handles can reuse plain Dialog stores; alert dialog invariants must exist immediately.
                store.update(nextState ? {
                    ...rootState,
                    ...nextState
                } : rootState);
            } else if (nextState) {
                store.update(nextState);
            }
        }
    }["useRenderDialogRoot.useOnFirstRender"]);
    store.useControlledProp('openProp', openProp);
    store.useControlledProp('triggerIdProp', triggerIdProp);
    store.useSyncedValues(rootState);
    store.useContextCallback('onOpenChange', onOpenChange);
    store.useContextCallback('onOpenChangeComplete', onOpenChangeComplete);
    const open = store.useState('open');
    const mounted = store.useState('mounted');
    const payload = store.useState('payload');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$useDialogRoot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRoot"])({
        store,
        actionsRef
    });
    const shouldRenderInteractions = open || mounted;
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useRenderDialogRoot.useMemo[contextValue]": ()=>({
                store
            })
    }["useRenderDialogRoot.useMemo[contextValue]"], [
        store
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IsDrawerContext"].Provider, {
        value: false,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogRootContext"].Provider, {
            value: contextValue,
            children: [
                shouldRenderInteractions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$useDialogRoot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogInteractions"], {
                    store: store,
                    parentContext: parentDialogRootContext?.store.context,
                    isDrawer: isDrawer
                }),
                typeof children === 'function' ? children({
                    payload
                }) : children
            ]
        })
    });
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/alert-dialog/root/AlertDialogRoot.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialogRoot",
    ()=>AlertDialogRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$useRenderDialogRoot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/root/useRenderDialogRoot.mjs [app-client] (ecmascript)");
'use client';
;
function AlertDialogRoot(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$useRenderDialogRoot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderDialogRoot"])(props, 'alert-dialog');
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/backdrop/DialogBackdrop.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogBackdrop",
    ()=>DialogBackdrop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/root/DialogRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/popupStateMapping.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$stateAttributesMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/stateAttributesMapping.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["popupStateMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$stateAttributesMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transitionStatusMapping"]
};
const DialogBackdrop = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function DialogBackdrop(componentProps, forwardedRef) {
    const { render, className, style, forceRender = false, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const open = store.useState('open');
    const nested = store.useState('nested');
    const mounted = store.useState('mounted');
    const transitionStatus = store.useState('transitionStatus');
    const state = {
        open,
        transitionStatus
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: [
            store.context.backdropRef,
            forwardedRef
        ],
        stateAttributesMapping,
        props: [
            {
                role: 'presentation',
                hidden: !mounted,
                style: {
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                }
            },
            elementProps
        ],
        enabled: forceRender || !nested
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogBackdrop.displayName = "DialogBackdrop";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/close/DialogClose.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogClose",
    ()=>DialogClose
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/root/DialogRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$use$2d$button$2f$useButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/use-button/useButton.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$createBaseUIEventDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/reason-parts.mjs [app-client] (ecmascript) <export * as REASONS>");
'use client';
;
;
;
;
;
;
const DialogClose = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function DialogClose(componentProps, forwardedRef) {
    const { render, className, style, disabled = false, nativeButton = true, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const open = store.useState('open');
    const { getButtonProps, buttonRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$use$2d$button$2f$useButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useButton"])({
        disabled,
        native: nativeButton
    });
    const state = {
        disabled
    };
    function handleClick(event) {
        if (open) {
            store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$createBaseUIEventDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].closePress, event.nativeEvent));
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('button', componentProps, {
        state,
        ref: [
            forwardedRef,
            buttonRef
        ],
        props: [
            {
                onClick: handleClick
            },
            elementProps,
            getButtonProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogClose.displayName = "DialogClose";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/description/DialogDescription.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogDescription",
    ()=>DialogDescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/root/DialogRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/useBaseUiId.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
const DialogDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function DialogDescription(componentProps, forwardedRef) {
    const { render, className, style, id: idProp, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    store.useSyncedValueWithCleanup('descriptionElementId', id);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('p', componentProps, {
        ref: forwardedRef,
        props: [
            {
                id
            },
            elementProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogDescription.displayName = "DialogDescription";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/utils/enqueueFocus.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "enqueueFocus",
    ()=>enqueueFocus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/empty.mjs [app-client] (ecmascript)");
;
let rafId = 0;
function enqueueFocus(el, options = {}) {
    const { preventScroll = false, sync = false, shouldFocus } = options;
    cancelAnimationFrame(rafId);
    function exec() {
        if (shouldFocus && !shouldFocus()) {
            return;
        }
        el?.focus({
            preventScroll
        });
    }
    if (sync) {
        exec();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"];
    }
    const currentRafId = requestAnimationFrame(exec);
    rafId = currentRafId;
    return ()=>{
        if (rafId === currentRafId) {
            cancelAnimationFrame(currentRafId);
            rafId = 0;
        }
    };
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/utils/markOthers.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "markOthers",
    ()=>markOthers
]);
// Modified to add conditional `aria-hidden` support:
// https://github.com/theKashey/aria-hidden/blob/9220c8f4a4fd35f63bee5510a9f41a37264382d4/src/index.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$owner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/owner.mjs [app-client] (ecmascript) <locals>");
;
;
const counters = {
    inert: new WeakMap(),
    'aria-hidden': new WeakMap()
};
const markerName = 'data-base-ui-inert';
const uncontrolledElementsSets = {
    inert: new WeakSet(),
    'aria-hidden': new WeakSet()
};
let markerCounterMap = new WeakMap();
let lockCount = 0;
function getUncontrolledElementsSet(controlAttribute) {
    return uncontrolledElementsSets[controlAttribute];
}
function unwrapHost(node) {
    if (!node) {
        return null;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isShadowRoot"])(node) ? node.host : unwrapHost(node.parentNode);
}
const correctElements = (parent, targets)=>targets.map((target)=>{
        if (parent.contains(target)) {
            return target;
        }
        const correctedTarget = unwrapHost(target);
        if (parent.contains(correctedTarget)) {
            return correctedTarget;
        }
        return null;
    }).filter((x)=>x != null);
const buildKeepSet = (targets)=>{
    const keep = new Set();
    targets.forEach((target)=>{
        let node = target;
        while(node && !keep.has(node)){
            keep.add(node);
            node = node.parentNode;
        }
    });
    return keep;
};
const collectOutsideElements = (root, keepElements, stopElements)=>{
    const outside = [];
    const walk = (parent)=>{
        if (!parent || stopElements.has(parent)) {
            return;
        }
        Array.from(parent.children).forEach((node)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeName"])(node) === 'script') {
                return;
            }
            if (keepElements.has(node)) {
                walk(node);
            } else {
                outside.push(node);
            }
        });
    };
    walk(root);
    return outside;
};
function applyAttributeToOthers(uncorrectedAvoidElements, body, ariaHidden, inert, { mark = true }) {
    let controlAttribute = null;
    if (inert) {
        controlAttribute = 'inert';
    } else if (ariaHidden) {
        controlAttribute = 'aria-hidden';
    }
    let counterMap = null;
    let uncontrolledElementsSet = null;
    const avoidElements = correctElements(body, uncorrectedAvoidElements);
    const markerTargets = mark ? collectOutsideElements(body, buildKeepSet(avoidElements), new Set(avoidElements)) : [];
    const hiddenElements = [];
    const markedElements = [];
    if (controlAttribute) {
        const map = counters[controlAttribute];
        const currentUncontrolledElementsSet = getUncontrolledElementsSet(controlAttribute);
        uncontrolledElementsSet = currentUncontrolledElementsSet;
        counterMap = map;
        const ariaLiveElements = correctElements(body, Array.from(body.querySelectorAll('[aria-live]')));
        const controlElements = avoidElements.concat(ariaLiveElements);
        const controlTargets = collectOutsideElements(body, buildKeepSet(controlElements), new Set(controlElements));
        controlTargets.forEach((node)=>{
            const attr = node.getAttribute(controlAttribute);
            const alreadyHidden = attr !== null && attr !== 'false';
            const counterValue = (map.get(node) || 0) + 1;
            map.set(node, counterValue);
            hiddenElements.push(node);
            if (counterValue === 1 && alreadyHidden) {
                currentUncontrolledElementsSet.add(node);
            }
            if (!alreadyHidden) {
                node.setAttribute(controlAttribute, controlAttribute === 'inert' ? '' : 'true');
            }
        });
    }
    if (mark) {
        markerTargets.forEach((node)=>{
            const markerValue = (markerCounterMap.get(node) || 0) + 1;
            markerCounterMap.set(node, markerValue);
            markedElements.push(node);
            if (markerValue === 1) {
                node.setAttribute(markerName, '');
            }
        });
    }
    lockCount += 1;
    return ()=>{
        if (counterMap) {
            hiddenElements.forEach((element)=>{
                const currentCounterValue = counterMap.get(element) || 0;
                const counterValue = currentCounterValue - 1;
                counterMap.set(element, counterValue);
                if (!counterValue) {
                    if (!uncontrolledElementsSet?.has(element) && controlAttribute) {
                        element.removeAttribute(controlAttribute);
                    }
                    uncontrolledElementsSet?.delete(element);
                }
            });
        }
        if (mark) {
            markedElements.forEach((element)=>{
                const markerValue = (markerCounterMap.get(element) || 0) - 1;
                markerCounterMap.set(element, markerValue);
                if (!markerValue) {
                    element.removeAttribute(markerName);
                }
            });
        }
        lockCount -= 1;
        if (!lockCount) {
            counters.inert = new WeakMap();
            counters['aria-hidden'] = new WeakMap();
            uncontrolledElementsSets.inert = new WeakSet();
            uncontrolledElementsSets['aria-hidden'] = new WeakSet();
            markerCounterMap = new WeakMap();
        }
    };
}
function markOthers(avoidElements, options = {}) {
    const { ariaHidden = false, inert = false, mark = true } = options;
    const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$owner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(avoidElements[0]).body;
    return applyAttributeToOthers(avoidElements, body, ariaHidden, inert, {
        mark
    });
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/components/FloatingFocusManager.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingFocusManager",
    ()=>FloatingFocusManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$addEventListener$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/addEventListener.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$mergeCleanups$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/mergeCleanups.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useMergedRefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/useMergedRefs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useValueAsRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/useValueAsRef.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/useStableCallback.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useTimeout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/useTimeout.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$platform$2f$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__platform$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/platform/parts.mjs [app-client] (ecmascript) <export * as platform>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useAnimationFrame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/useAnimationFrame.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$owner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/owner.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript) <export getWindow as ownerWindow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$FocusGuard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/FocusGuard.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/shadowDom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/utils/element.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/utils/event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/utils/tabbable.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/utils/nodes.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/utils/composite.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$createBaseUIEventDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/reason-parts.mjs [app-client] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/utils/createAttribute.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$enqueueFocus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/utils/enqueueFocus.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$markOthers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/utils/markOthers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingPortal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/components/FloatingPortal.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/components/FloatingTree.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$resolveRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/resolveRef.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function getEventType(event, lastInteractionType) {
    const win = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__["ownerWindow"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event));
    if (event instanceof win.KeyboardEvent) {
        return 'keyboard';
    }
    if (event instanceof win.FocusEvent) {
        // Focus events can be caused by a preceding pointer interaction (e.g., focusout on outside press).
        // Prefer the last known pointer type if provided, else treat as keyboard.
        return lastInteractionType || 'keyboard';
    }
    if ('pointerType' in event) {
        return event.pointerType || 'keyboard';
    }
    if ('touches' in event) {
        return 'touch';
    }
    if (event instanceof win.MouseEvent) {
        // onClick events may not contain pointer events, and will fall through to here
        return lastInteractionType || (event.detail === 0 ? 'keyboard' : 'mouse');
    }
    return '';
}
const LIST_LIMIT = 20;
let previouslyFocusedElements = [];
function clearDisconnectedPreviouslyFocusedElements() {
    previouslyFocusedElements = previouslyFocusedElements.filter((entry)=>{
        return entry.deref()?.isConnected;
    });
}
function addPreviouslyFocusedElement(element) {
    clearDisconnectedPreviouslyFocusedElements();
    if (element && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeName"])(element) !== 'body') {
        previouslyFocusedElements.push(new WeakRef(element));
        if (previouslyFocusedElements.length > LIST_LIMIT) {
            previouslyFocusedElements = previouslyFocusedElements.slice(-LIST_LIMIT);
        }
    }
}
function getPreviouslyFocusedElement() {
    clearDisconnectedPreviouslyFocusedElements();
    return previouslyFocusedElements[previouslyFocusedElements.length - 1]?.deref();
}
function getFirstTabbableElement(container) {
    if (!container) {
        return null;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTabbable"])(container)) {
        return container;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabbable"])(container)[0] || container;
}
function handleTabIndex(floatingFocusElement) {
    if (floatingFocusElement.hasAttribute('tabindex') && !floatingFocusElement.hasAttribute('data-tabindex')) {
        return;
    }
    if (!floatingFocusElement.getAttribute('role')?.includes('dialog')) {
        return;
    }
    const focusableElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusable"])(floatingFocusElement);
    const tabbableContent = focusableElements.filter((element)=>{
        const dataTabIndex = element.getAttribute('data-tabindex') || '';
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTabbable"])(element) || element.hasAttribute('data-tabindex') && !dataTabIndex.startsWith('-');
    });
    const tabIndex = floatingFocusElement.getAttribute('tabindex');
    if (tabbableContent.length === 0) {
        if (tabIndex !== '0') {
            floatingFocusElement.setAttribute('tabindex', '0');
            // Mark our own write so the externally-managed early-return above doesn't
            // mistake it for a user-authored `tabindex` and freeze management.
            floatingFocusElement.setAttribute('data-tabindex', '0');
        }
    } else if (tabIndex !== '-1' || floatingFocusElement.hasAttribute('data-tabindex') && floatingFocusElement.getAttribute('data-tabindex') !== '-1') {
        floatingFocusElement.setAttribute('tabindex', '-1');
        floatingFocusElement.setAttribute('data-tabindex', '-1');
    }
}
function FloatingFocusManager(props) {
    const { context, children, disabled = false, initialFocus = true, returnFocus = true, restoreFocus = false, modal = true, closeOnFocusOut = true, openInteractionType = '', nextFocusableElement, previousFocusableElement, beforeContentFocusGuardRef, externalTree, getInsideElements } = props;
    const store = 'rootStore' in context ? context.rootStore : context;
    const open = store.useState('open');
    const domReference = store.useState('domReferenceElement');
    const floating = store.useState('floatingElement');
    const { events, dataRef } = store.context;
    const getNodeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "FloatingFocusManager.useStableCallback[getNodeId]": ()=>dataRef.current.floatingContext?.nodeId
    }["FloatingFocusManager.useStableCallback[getNodeId]"]);
    const ignoreInitialFocus = initialFocus === false;
    // If the reference is a combobox and is typeable (e.g. input/textarea),
    // there are different focus semantics. The guards should not be rendered, but
    // aria-hidden should be applied to all nodes still. Further, the visually
    // hidden dismiss button should only appear at the end of the list, not the
    // start.
    const isUntrappedTypeableCombobox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isTypeableCombobox"])(domReference) && ignoreInitialFocus;
    const initialFocusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useValueAsRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(initialFocus);
    const returnFocusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useValueAsRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(returnFocus);
    const openInteractionTypeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useValueAsRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(openInteractionType);
    const openRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useValueAsRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueAsRef"])(open);
    const tree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingTree"])(externalTree);
    const portalContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingPortal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePortalContext"])();
    const preventReturnFocusRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const isPointerDownRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const pointerDownOutsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const lastFocusedTabbableRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const closeTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]('');
    const lastInteractionTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]('');
    const beforeGuardRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const afterGuardRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const mergedBeforeGuardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useMergedRefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(beforeGuardRef, beforeContentFocusGuardRef, portalContext?.beforeInsideRef);
    const mergedAfterGuardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useMergedRefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(afterGuardRef, portalContext?.afterInsideRef);
    const blurTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useTimeout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const pointerDownTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useTimeout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const restoreFocusFrame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useAnimationFrame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimationFrame"])();
    const isInsidePortal = portalContext != null;
    const floatingFocusElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getFloatingFocusElement"])(floating);
    const getTabbableContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "FloatingFocusManager.useStableCallback[getTabbableContent]": (container = floatingFocusElement)=>{
            return container ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabbable"])(container) : [];
        }
    }["FloatingFocusManager.useStableCallback[getTabbableContent]"]);
    const getResolvedInsideElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "FloatingFocusManager.useStableCallback[getResolvedInsideElements]": ()=>getInsideElements?.().filter({
                "FloatingFocusManager.useStableCallback[getResolvedInsideElements]": (element)=>element != null
            }["FloatingFocusManager.useStableCallback[getResolvedInsideElements]"]) ?? []
    }["FloatingFocusManager.useStableCallback[getResolvedInsideElements]"]);
    // Prevent Tab from escaping the modal when there are no tabbable elements.
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "FloatingFocusManager.useEffect": ()=>{
            if (disabled || !modal) {
                return undefined;
            }
            function onKeyDown(event) {
                if (event.key === 'Tab') {
                    // The focus guards have nothing to focus, so we need to stop the event.
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floatingFocusElement, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$owner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(floatingFocusElement))) && getTabbableContent().length === 0 && !isUntrappedTypeableCombobox) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                    }
                }
            }
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$owner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(floatingFocusElement);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$addEventListener$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEventListener"])(doc, 'keydown', onKeyDown);
        }
    }["FloatingFocusManager.useEffect"], [
        disabled,
        floatingFocusElement,
        modal,
        isUntrappedTypeableCombobox,
        getTabbableContent
    ]);
    // Track pointer/keyboard interactions to disambiguate focus and outside presses.
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "FloatingFocusManager.useEffect": ()=>{
            if (disabled || !open) {
                return undefined;
            }
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$owner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(floatingFocusElement);
            function clearPointerDownOutside() {
                pointerDownOutsideRef.current = false;
            }
            function onPointerDown(event) {
                const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
                const insideElements = getResolvedInsideElements();
                const pointerTargetInside = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floating, target) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(domReference, target) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(portalContext?.portalNode, target) || insideElements.some({
                    "FloatingFocusManager.useEffect.onPointerDown": (element)=>element === target || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(element, target)
                }["FloatingFocusManager.useEffect.onPointerDown"]);
                pointerDownOutsideRef.current = !pointerTargetInside;
                lastInteractionTypeRef.current = event.pointerType || 'keyboard';
                if (target?.closest(`[${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLICK_TRIGGER_IDENTIFIER"]}]`)) {
                    isPointerDownRef.current = true;
                    // Reset on the next tick so a single click on a click-trigger doesn't
                    // permanently suppress focus-out closing for the lifetime of the instance.
                    pointerDownTimeout.start(0, {
                        "FloatingFocusManager.useEffect.onPointerDown": ()=>{
                            isPointerDownRef.current = false;
                        }
                    }["FloatingFocusManager.useEffect.onPointerDown"]);
                }
            }
            function onKeyDown() {
                lastInteractionTypeRef.current = 'keyboard';
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$mergeCleanups$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeCleanups"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$addEventListener$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEventListener"])(doc, 'pointerdown', onPointerDown, true), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$addEventListener$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEventListener"])(doc, 'pointerup', clearPointerDownOutside, true), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$addEventListener$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEventListener"])(doc, 'pointercancel', clearPointerDownOutside, true), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$addEventListener$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEventListener"])(doc, 'keydown', onKeyDown, true), // Avoid a stale `true` leaking into the next open (e.g. keep-mounted popups)
            // if the popup dismissed between pointerdown and pointerup.
            clearPointerDownOutside);
        }
    }["FloatingFocusManager.useEffect"], [
        disabled,
        floating,
        domReference,
        floatingFocusElement,
        open,
        portalContext,
        pointerDownTimeout,
        getResolvedInsideElements
    ]);
    // Close on focus out and restore focus within the floating tree when needed.
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "FloatingFocusManager.useEffect": ()=>{
            if (disabled || !closeOnFocusOut) {
                return undefined;
            }
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$owner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(floatingFocusElement);
            // In Safari, buttons lose focus when pressing them.
            function handlePointerDown() {
                isPointerDownRef.current = true;
                pointerDownTimeout.start(0, {
                    "FloatingFocusManager.useEffect.handlePointerDown": ()=>{
                        isPointerDownRef.current = false;
                    }
                }["FloatingFocusManager.useEffect.handlePointerDown"]);
            }
            function handleFocusIn(event) {
                const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTabbable"])(target)) {
                    lastFocusedTabbableRef.current = target;
                }
            }
            function handleFocusOutside(event) {
                const relatedTarget = event.relatedTarget;
                const currentTarget = event.currentTarget;
                const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
                // When focus is lost to the body (e.g. on a backdrop press), record the element that
                // had focus so a confirmation dialog opened while the body is focused can return focus
                // to it. Scoped to `modal` to avoid non-modal popups polluting the shared stack.
                if (modal && relatedTarget == null && target != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floating, target)) {
                    addPreviouslyFocusedElement(target);
                }
                queueMicrotask({
                    "FloatingFocusManager.useEffect.handleFocusOutside": ()=>{
                        const nodeId = getNodeId();
                        const triggers = store.context.triggerElements;
                        const insideElements = getResolvedInsideElements();
                        const isRelatedFocusGuard = relatedTarget?.hasAttribute((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAttribute"])('focus-guard')) && [
                            beforeGuardRef.current,
                            afterGuardRef.current,
                            portalContext?.beforeInsideRef.current,
                            portalContext?.afterInsideRef.current,
                            portalContext?.beforeOutsideRef.current,
                            portalContext?.afterOutsideRef.current,
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$resolveRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(previousFocusableElement),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$resolveRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(nextFocusableElement)
                        ].includes(relatedTarget);
                        const movedToUnrelatedNode = !((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(domReference, relatedTarget) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floating, relatedTarget) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(relatedTarget, floating) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(portalContext?.portalNode, relatedTarget) || insideElements.some({
                            "FloatingFocusManager.useEffect.handleFocusOutside": (element)=>element === relatedTarget || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(element, relatedTarget)
                        }["FloatingFocusManager.useEffect.handleFocusOutside"]) || relatedTarget != null && triggers.hasElement(relatedTarget) || triggers.hasMatchingElement({
                            "FloatingFocusManager.useEffect.handleFocusOutside": (trigger)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(trigger, relatedTarget)
                        }["FloatingFocusManager.useEffect.handleFocusOutside"]) || isRelatedFocusGuard || tree && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeChildren"])(tree.nodesRef.current, nodeId).find({
                            "FloatingFocusManager.useEffect.handleFocusOutside": (node)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(node.context?.elements.floating, relatedTarget) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(node.context?.elements.domReference, relatedTarget)
                        }["FloatingFocusManager.useEffect.handleFocusOutside"]) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeAncestors"])(tree.nodesRef.current, nodeId).find({
                            "FloatingFocusManager.useEffect.handleFocusOutside": (node)=>[
                                    node.context?.elements.floating,
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getFloatingFocusElement"])(node.context?.elements.floating)
                                ].includes(relatedTarget) || node.context?.elements.domReference === relatedTarget
                        }["FloatingFocusManager.useEffect.handleFocusOutside"])));
                        if (currentTarget === domReference && floatingFocusElement) {
                            handleTabIndex(floatingFocusElement);
                        }
                        // Restore focus to the previous tabbable element index to prevent
                        // focus from being lost outside the floating tree.
                        if (restoreFocus && currentTarget !== domReference && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementVisible"])(target) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])(doc) === doc.body) {
                            // Let `FloatingPortal` effect knows that focus is still inside the
                            // floating tree.
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(floatingFocusElement)) {
                                floatingFocusElement.focus();
                                // If explicitly requested to restore focus to the popup container, do not search
                                // for the next/previous tabbable element.
                                if (restoreFocus === 'popup') {
                                    // If the element is removed on pointerdown, focus tries to move it,
                                    // but since it's removed at the same time, focus gets lost as it
                                    // happens after the .focus() call above.
                                    // In this case, focus needs to be moved asynchronously.
                                    restoreFocusFrame.request({
                                        "FloatingFocusManager.useEffect.handleFocusOutside": ()=>{
                                            floatingFocusElement.focus();
                                        }
                                    }["FloatingFocusManager.useEffect.handleFocusOutside"]);
                                    return;
                                }
                            }
                            const tabbableContent = getTabbableContent();
                            const prevTabbable = lastFocusedTabbableRef.current;
                            const nodeToFocus = (prevTabbable && tabbableContent.includes(prevTabbable) ? prevTabbable : null) || tabbableContent[tabbableContent.length - 1] || floatingFocusElement;
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(nodeToFocus)) {
                                nodeToFocus.focus();
                            }
                        }
                        // https://github.com/floating-ui/floating-ui/issues/3060
                        if (dataRef.current.insideReactTree) {
                            dataRef.current.insideReactTree = false;
                            return;
                        }
                        // Focus did not move inside the floating tree, and there are no tabbable
                        // portal guards to handle closing.
                        if ((isUntrappedTypeableCombobox ? true : !modal) && relatedTarget && movedToUnrelatedNode && !isPointerDownRef.current && (// Fix React 18 Strict Mode returnFocus due to double rendering.
                        // For an "untrapped" typeable combobox (input role=combobox with
                        // initialFocus=false), re-opening the popup and tabbing out should still close it even
                        // when the previously focused element (e.g. the next tabbable outside the popup) is
                        // focused again. Otherwise, the popup remains open on the second Tab sequence:
                        // click input -> Tab (closes) -> click input -> Tab.
                        // Allow closing when `isUntrappedTypeableCombobox` regardless of the previously focused element.
                        isUntrappedTypeableCombobox || relatedTarget !== getPreviouslyFocusedElement())) {
                            preventReturnFocusRef.current = true;
                            store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$createBaseUIEventDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].focusOut, event));
                        }
                    }
                }["FloatingFocusManager.useEffect.handleFocusOutside"]);
            }
            function markInsideReactTree() {
                if (pointerDownOutsideRef.current) {
                    return;
                }
                dataRef.current.insideReactTree = true;
                blurTimeout.start(0, {
                    "FloatingFocusManager.useEffect.markInsideReactTree": ()=>{
                        dataRef.current.insideReactTree = false;
                    }
                }["FloatingFocusManager.useEffect.markInsideReactTree"]);
            }
            const domReferenceElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(domReference) ? domReference : null;
            if (!floating && !domReferenceElement) {
                return undefined;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$mergeCleanups$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeCleanups"])(domReferenceElement && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$addEventListener$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEventListener"])(domReferenceElement, 'focusout', handleFocusOutside), domReferenceElement && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$addEventListener$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEventListener"])(domReferenceElement, 'pointerdown', handlePointerDown), floating && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$addEventListener$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEventListener"])(floating, 'focusin', handleFocusIn), floating && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$addEventListener$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEventListener"])(floating, 'focusout', handleFocusOutside), floating && portalContext && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$addEventListener$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEventListener"])(floating, 'focusout', markInsideReactTree, true));
        }
    }["FloatingFocusManager.useEffect"], [
        disabled,
        domReference,
        floating,
        floatingFocusElement,
        modal,
        tree,
        portalContext,
        store,
        closeOnFocusOut,
        restoreFocus,
        getTabbableContent,
        isUntrappedTypeableCombobox,
        getNodeId,
        dataRef,
        blurTimeout,
        pointerDownTimeout,
        restoreFocusFrame,
        nextFocusableElement,
        previousFocusableElement,
        getResolvedInsideElements
    ]);
    // Hide everything outside the floating tree from assistive tech while open.
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "FloatingFocusManager.useEffect": ()=>{
            if (disabled || !floating || !open) {
                return undefined;
            }
            // Don't hide portals nested within the parent portal.
            const portalNodes = Array.from(portalContext?.portalNode?.querySelectorAll(`[${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAttribute"])('portal')}]`) || []);
            const ancestors = tree ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeAncestors"])(tree.nodesRef.current, getNodeId()) : [];
            const rootAncestorComboboxDomReference = ancestors.find({
                "FloatingFocusManager.useEffect": (node)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isTypeableCombobox"])(node.context?.elements.domReference || null)
            }["FloatingFocusManager.useEffect"])?.context?.elements.domReference;
            const controlInsideElements = [
                floating,
                ...portalNodes,
                beforeGuardRef.current,
                afterGuardRef.current,
                portalContext?.beforeOutsideRef.current,
                portalContext?.afterOutsideRef.current,
                ...getResolvedInsideElements()
            ];
            const insideElements = [
                ...controlInsideElements,
                rootAncestorComboboxDomReference,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$resolveRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(previousFocusableElement),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$resolveRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(nextFocusableElement),
                isUntrappedTypeableCombobox ? domReference : null
            ].filter({
                "FloatingFocusManager.useEffect.insideElements": (x)=>x != null
            }["FloatingFocusManager.useEffect.insideElements"]);
            const ariaHiddenCleanup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$markOthers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markOthers"])(insideElements, {
                ariaHidden: modal || isUntrappedTypeableCombobox,
                mark: false
            });
            const markerInsideElements = [
                floating,
                ...portalNodes
            ].filter({
                "FloatingFocusManager.useEffect.markerInsideElements": (x)=>x != null
            }["FloatingFocusManager.useEffect.markerInsideElements"]);
            const markerCleanup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$markOthers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markOthers"])(markerInsideElements);
            return ({
                "FloatingFocusManager.useEffect": ()=>{
                    markerCleanup();
                    ariaHiddenCleanup();
                }
            })["FloatingFocusManager.useEffect"];
        }
    }["FloatingFocusManager.useEffect"], [
        open,
        disabled,
        domReference,
        floating,
        modal,
        portalContext,
        isUntrappedTypeableCombobox,
        tree,
        getNodeId,
        nextFocusableElement,
        previousFocusableElement,
        getResolvedInsideElements
    ]);
    // Focus the initial element when the floating element opens.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FloatingFocusManager.useIsoLayoutEffect": ()=>{
            if (!open || disabled || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(floatingFocusElement)) {
                return;
            }
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$owner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(floatingFocusElement);
            const previouslyFocusedElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])(doc);
            // Wait for any layout effect state setters to execute to set `tabIndex`.
            queueMicrotask({
                "FloatingFocusManager.useIsoLayoutEffect": ()=>{
                    const initialFocusValueOrFn = initialFocusRef.current;
                    const resolvedInitialFocus = typeof initialFocusValueOrFn === 'function' ? initialFocusValueOrFn(openInteractionTypeRef.current || '') : initialFocusValueOrFn;
                    // `null` should fallback to default behavior in case of an empty ref.
                    if (resolvedInitialFocus === undefined || resolvedInitialFocus === false) {
                        return;
                    }
                    const focusAlreadyInsideFloatingEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floatingFocusElement, previouslyFocusedElement);
                    if (focusAlreadyInsideFloatingEl) {
                        return;
                    }
                    let focusableElements = null;
                    const getDefaultFocusElement = {
                        "FloatingFocusManager.useIsoLayoutEffect.getDefaultFocusElement": ()=>{
                            if (focusableElements == null) {
                                focusableElements = getTabbableContent(floatingFocusElement);
                            }
                            return focusableElements[0] || floatingFocusElement;
                        }
                    }["FloatingFocusManager.useIsoLayoutEffect.getDefaultFocusElement"];
                    let elToFocus;
                    if (resolvedInitialFocus === true || resolvedInitialFocus === null) {
                        elToFocus = getDefaultFocusElement();
                    } else {
                        elToFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$resolveRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(resolvedInitialFocus);
                    }
                    elToFocus = elToFocus || getDefaultFocusElement();
                    const hadFocusInside = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floatingFocusElement, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])(doc));
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$enqueueFocus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueFocus"])(elToFocus, {
                        preventScroll: elToFocus === floatingFocusElement,
                        shouldFocus () {
                            // This focus is queued on the next animation frame. If the floating element has closed
                            // before it runs — e.g. tabbing out of a kept-mounted popup — don't pull focus back
                            // onto the initial element after it has legitimately moved elsewhere.
                            if (!openRef.current) {
                                return false;
                            }
                            if (hadFocusInside) {
                                return true;
                            }
                            const currentActiveElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])(doc);
                            const focusMovedInside = currentActiveElement !== elToFocus && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floatingFocusElement, currentActiveElement);
                            return !focusMovedInside;
                        }
                    });
                }
            }["FloatingFocusManager.useIsoLayoutEffect"]);
        }
    }["FloatingFocusManager.useIsoLayoutEffect"], [
        disabled,
        open,
        floatingFocusElement,
        getTabbableContent,
        initialFocusRef,
        openInteractionTypeRef,
        openRef
    ]);
    // Track return focus targets and restore focus on unmount/close.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FloatingFocusManager.useIsoLayoutEffect": ()=>{
            if (disabled || !floatingFocusElement) {
                return undefined;
            }
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$owner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(floatingFocusElement);
            const elementFocusedBeforeOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])(doc);
            // Only nullish interaction types represent programmatic opens. The empty
            // string default is intentionally not treated as programmatic.
            const preferPreviousFocus = openInteractionTypeRef.current == null;
            addPreviouslyFocusedElement(elementFocusedBeforeOpen);
            // Dismissing via outside press should always ignore `returnFocus` to
            // prevent unwanted scrolling.
            function onOpenChangeLocal(details) {
                if (!details.open) {
                    closeTypeRef.current = getEventType(details.nativeEvent, lastInteractionTypeRef.current);
                }
                if (details.reason === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerHover && details.nativeEvent.type === 'mouseleave') {
                    preventReturnFocusRef.current = true;
                }
                if (details.reason !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].outsidePress) {
                    return;
                }
                if (details.nested) {
                    preventReturnFocusRef.current = false;
                } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVirtualClick"])(details.nativeEvent) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVirtualPointerEvent"])(details.nativeEvent)) {
                    preventReturnFocusRef.current = false;
                } else {
                    let isPreventScrollSupported = false;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$owner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(floatingFocusElement).createElement('div').focus({
                        get preventScroll () {
                            isPreventScrollSupported = true;
                            return false;
                        }
                    });
                    if (isPreventScrollSupported) {
                        preventReturnFocusRef.current = false;
                    } else {
                        preventReturnFocusRef.current = true;
                    }
                }
            }
            events.on('openchange', onOpenChangeLocal);
            function getReturnElement() {
                const returnFocusValueOrFn = returnFocusRef.current;
                let resolvedReturnFocusValue = typeof returnFocusValueOrFn === 'function' ? returnFocusValueOrFn(closeTypeRef.current) : returnFocusValueOrFn;
                // `null` should fallback to default behavior in case of an empty ref.
                if (resolvedReturnFocusValue === undefined || resolvedReturnFocusValue === false) {
                    return null;
                }
                if (resolvedReturnFocusValue === null) {
                    resolvedReturnFocusValue = true;
                }
                const referenceReturnElement = domReference?.isConnected ? domReference : null;
                const previousReturnElement = elementFocusedBeforeOpen?.isConnected && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeName"])(elementFocusedBeforeOpen) !== 'body' ? elementFocusedBeforeOpen : null;
                let defaultReturnElement = preferPreviousFocus ? previousReturnElement || referenceReturnElement : referenceReturnElement || previousReturnElement;
                if (!defaultReturnElement) {
                    defaultReturnElement = getPreviouslyFocusedElement() || null;
                }
                if (typeof resolvedReturnFocusValue === 'boolean') {
                    return defaultReturnElement;
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$resolveRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(resolvedReturnFocusValue) || defaultReturnElement || null;
            }
            return ({
                "FloatingFocusManager.useIsoLayoutEffect": ()=>{
                    events.off('openchange', onOpenChangeLocal);
                    const activeEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])(doc);
                    const insideElements = getResolvedInsideElements();
                    const isFocusInsideFloatingTree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floating, activeEl) || insideElements.some({
                        "FloatingFocusManager.useIsoLayoutEffect": (element)=>element === activeEl || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(element, activeEl)
                    }["FloatingFocusManager.useIsoLayoutEffect"]) || tree && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeChildren"])(tree.nodesRef.current, getNodeId(), false).some({
                        "FloatingFocusManager.useIsoLayoutEffect": (node)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(node.context?.elements.floating, activeEl)
                    }["FloatingFocusManager.useIsoLayoutEffect"]);
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    const returnFocusValueOrFn = returnFocusRef.current;
                    const returnElement = getReturnElement();
                    queueMicrotask({
                        "FloatingFocusManager.useIsoLayoutEffect": ()=>{
                            // This is `returnElement`, if it's tabbable, or its first tabbable child.
                            const tabbableReturnElement = getFirstTabbableElement(returnElement);
                            const hasExplicitReturnFocus = typeof returnFocusValueOrFn !== 'boolean';
                            if (returnFocusValueOrFn && !preventReturnFocusRef.current && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(tabbableReturnElement) && (// If the focus moved somewhere else after mount, avoid returning focus
                            // since it likely entered a different element which should be
                            // respected: https://github.com/floating-ui/floating-ui/issues/2607
                            !hasExplicitReturnFocus && tabbableReturnElement !== activeEl && activeEl !== doc.body ? isFocusInsideFloatingTree : true)) {
                                tabbableReturnElement.focus({
                                    preventScroll: true
                                });
                            }
                            preventReturnFocusRef.current = false;
                        }
                    }["FloatingFocusManager.useIsoLayoutEffect"]);
                }
            })["FloatingFocusManager.useIsoLayoutEffect"];
        }
    }["FloatingFocusManager.useIsoLayoutEffect"], [
        disabled,
        floating,
        floatingFocusElement,
        returnFocusRef,
        openInteractionTypeRef,
        events,
        tree,
        domReference,
        getNodeId,
        getResolvedInsideElements
    ]);
    // Safari may randomly scroll to the bottom of the page if an input inside a popup has focus
    // when the popup unmounts from the DOM.
    // By blurring it before the popup unmounts, we can prevent this behavior.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FloatingFocusManager.useIsoLayoutEffect": ()=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$platform$2f$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__platform$3e$__["platform"].engine.webkit || open || !floating) {
                return;
            }
            const activeEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$owner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(floating));
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(activeEl) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isTypeableElement"])(activeEl)) {
                return;
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floating, activeEl)) {
                activeEl.blur();
            }
        }
    }["FloatingFocusManager.useIsoLayoutEffect"], [
        open,
        floating
    ]);
    // Synchronize the `context` & `modal` value to the FloatingPortal context.
    // It will decide whether or not it needs to render its own guards.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FloatingFocusManager.useIsoLayoutEffect": ()=>{
            if (disabled || !portalContext) {
                return undefined;
            }
            portalContext.setFocusManagerState({
                modal,
                closeOnFocusOut,
                open,
                onOpenChange: store.setOpen,
                domReference
            });
            return ({
                "FloatingFocusManager.useIsoLayoutEffect": ()=>{
                    portalContext.setFocusManagerState(null);
                }
            })["FloatingFocusManager.useIsoLayoutEffect"];
        }
    }["FloatingFocusManager.useIsoLayoutEffect"], [
        disabled,
        portalContext,
        modal,
        open,
        store,
        closeOnFocusOut,
        domReference
    ]);
    // Keep the floating element tabIndex in sync and clear stale focus records.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FloatingFocusManager.useIsoLayoutEffect": ()=>{
            if (disabled || !floatingFocusElement) {
                return undefined;
            }
            handleTabIndex(floatingFocusElement);
            return ({
                "FloatingFocusManager.useIsoLayoutEffect": ()=>{
                    queueMicrotask(clearDisconnectedPreviouslyFocusedElements);
                }
            })["FloatingFocusManager.useIsoLayoutEffect"];
        }
    }["FloatingFocusManager.useIsoLayoutEffect"], [
        disabled,
        floatingFocusElement
    ]);
    const shouldRenderGuards = !disabled && (modal ? !isUntrappedTypeableCombobox : true) && (isInsidePortal || modal);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            shouldRenderGuards && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$FocusGuard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FocusGuard"], {
                "data-type": "inside",
                ref: mergedBeforeGuardRef,
                onFocus: (event)=>{
                    if (modal) {
                        const els = getTabbableContent();
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$enqueueFocus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueFocus"])(els[els.length - 1]);
                    } else if (portalContext?.portalNode) {
                        preventReturnFocusRef.current = false;
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOutsideEvent"])(event, portalContext.portalNode)) {
                            const nextTabbable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNextTabbable"])(domReference);
                            nextTabbable?.focus();
                        } else {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$resolveRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(previousFocusableElement ?? portalContext.beforeOutsideRef)?.focus();
                        }
                    }
                }
            }),
            children,
            shouldRenderGuards && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$FocusGuard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FocusGuard"], {
                "data-type": "inside",
                ref: mergedAfterGuardRef,
                onFocus: (event)=>{
                    if (modal) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$enqueueFocus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueFocus"])(getTabbableContent()[0]);
                    } else if (portalContext?.portalNode) {
                        if (closeOnFocusOut) {
                            preventReturnFocusRef.current = true;
                        }
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOutsideEvent"])(event, portalContext.portalNode)) {
                            const prevTabbable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreviousTabbable"])(domReference);
                            prevTabbable?.focus();
                        } else {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$resolveRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(nextFocusableElement ?? portalContext.afterOutsideRef)?.focus();
                        }
                    }
                }
            })
        ]
    });
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/popup/DialogPopupCssVars.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogPopupCssVars",
    ()=>DialogPopupCssVars
]);
let DialogPopupCssVars = /*#__PURE__*/ function(DialogPopupCssVars) {
    /**
   * Indicates how many dialogs are nested within.
   * @type {number}
   */ DialogPopupCssVars["nestedDialogs"] = "--nested-dialogs";
    return DialogPopupCssVars;
}({});
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/popup/DialogPopupDataAttributes.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogPopupDataAttributes",
    ()=>DialogPopupDataAttributes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/popupStateMapping.mjs [app-client] (ecmascript)");
;
let DialogPopupDataAttributes = function(DialogPopupDataAttributes) {
    /**
   * Present when the dialog is open.
   */ DialogPopupDataAttributes[DialogPopupDataAttributes["open"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].open] = "open";
    /**
   * Present when the dialog is closed.
   */ DialogPopupDataAttributes[DialogPopupDataAttributes["closed"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].closed] = "closed";
    /**
   * Present when the dialog is animating in.
   */ DialogPopupDataAttributes[DialogPopupDataAttributes["startingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].startingStyle] = "startingStyle";
    /**
   * Present when the dialog is animating out.
   */ DialogPopupDataAttributes[DialogPopupDataAttributes["endingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].endingStyle] = "endingStyle";
    /**
   * Present when the dialog is nested within another dialog.
   */ DialogPopupDataAttributes["nested"] = "data-nested";
    /**
   * Present when the dialog has other open dialogs nested within it.
   */ DialogPopupDataAttributes["nestedDialogOpen"] = "data-nested-dialog-open";
    return DialogPopupDataAttributes;
}({});
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/portal/DialogPortalContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogPortalContext",
    ()=>DialogPortalContext,
    "useDialogPortalContext",
    ()=>useDialogPortalContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const DialogPortalContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) DialogPortalContext.displayName = "DialogPortalContext";
function useDialogPortalContext() {
    const value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](DialogPortalContext);
    if (value === undefined) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: <Dialog.Portal> is missing.' : "TURBOPACK unreachable");
    }
    return value;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/composite/composite.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALT",
    ()=>ALT,
    "ARROW_DOWN",
    ()=>ARROW_DOWN,
    "ARROW_KEYS",
    ()=>ARROW_KEYS,
    "ARROW_LEFT",
    ()=>ARROW_LEFT,
    "ARROW_RIGHT",
    ()=>ARROW_RIGHT,
    "ARROW_UP",
    ()=>ARROW_UP,
    "COMPOSITE_KEYS",
    ()=>COMPOSITE_KEYS,
    "CONTROL",
    ()=>CONTROL,
    "END",
    ()=>END,
    "HOME",
    ()=>HOME,
    "HORIZONTAL_KEYS",
    ()=>HORIZONTAL_KEYS,
    "HORIZONTAL_KEYS_WITH_EXTRA_KEYS",
    ()=>HORIZONTAL_KEYS_WITH_EXTRA_KEYS,
    "META",
    ()=>META,
    "MODIFIER_KEYS",
    ()=>MODIFIER_KEYS,
    "PAGE_DOWN",
    ()=>PAGE_DOWN,
    "PAGE_UP",
    ()=>PAGE_UP,
    "SHIFT",
    ()=>SHIFT,
    "VERTICAL_KEYS",
    ()=>VERTICAL_KEYS,
    "VERTICAL_KEYS_WITH_EXTRA_KEYS",
    ()=>VERTICAL_KEYS_WITH_EXTRA_KEYS,
    "isNativeInput",
    ()=>isNativeInput,
    "scrollIntoViewIfNeeded",
    ()=>scrollIntoViewIfNeeded
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
;
;
const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const HOME = 'Home';
const END = 'End';
const PAGE_UP = 'PageUp';
const PAGE_DOWN = 'PageDown';
const HORIZONTAL_KEYS = new Set([
    ARROW_LEFT,
    ARROW_RIGHT
]);
const HORIZONTAL_KEYS_WITH_EXTRA_KEYS = new Set([
    ARROW_LEFT,
    ARROW_RIGHT,
    HOME,
    END
]);
const VERTICAL_KEYS = new Set([
    ARROW_UP,
    ARROW_DOWN
]);
const VERTICAL_KEYS_WITH_EXTRA_KEYS = new Set([
    ARROW_UP,
    ARROW_DOWN,
    HOME,
    END
]);
const ARROW_KEYS = new Set([
    ...HORIZONTAL_KEYS,
    ...VERTICAL_KEYS
]);
const COMPOSITE_KEYS = new Set([
    ...ARROW_KEYS,
    HOME,
    END
]);
const SHIFT = 'Shift';
const CONTROL = 'Control';
const ALT = 'Alt';
const META = 'Meta';
const MODIFIER_KEYS = new Set([
    SHIFT,
    CONTROL,
    ALT,
    META
]);
function isInputElement(element) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(element) && element.tagName === 'INPUT';
}
function isNativeInput(element) {
    if (isInputElement(element) && element.selectionStart != null) {
        return true;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(element) && element.tagName === 'TEXTAREA') {
        return true;
    }
    return false;
}
function scrollIntoViewIfNeeded(scrollContainer, element, direction, orientation) {
    if (!scrollContainer || !element || !element.scrollTo) {
        return;
    }
    let targetX = scrollContainer.scrollLeft;
    let targetY = scrollContainer.scrollTop;
    const isOverflowingX = scrollContainer.clientWidth < scrollContainer.scrollWidth;
    const isOverflowingY = scrollContainer.clientHeight < scrollContainer.scrollHeight;
    if (isOverflowingX && orientation !== 'vertical') {
        const elementOffsetLeft = getOffset(scrollContainer, element, 'left');
        const containerStyles = getStyles(scrollContainer);
        const elementStyles = getStyles(element);
        if (direction === 'ltr') {
            if (elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight > scrollContainer.scrollLeft + scrollContainer.clientWidth - containerStyles.scrollPaddingRight) {
                // overflow to the right, scroll to align right edges
                targetX = elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight - scrollContainer.clientWidth + containerStyles.scrollPaddingRight;
            } else if (elementOffsetLeft - elementStyles.scrollMarginLeft < scrollContainer.scrollLeft + containerStyles.scrollPaddingLeft) {
                // overflow to the left, scroll to align left edges
                targetX = elementOffsetLeft - elementStyles.scrollMarginLeft - containerStyles.scrollPaddingLeft;
            }
        }
        if (direction === 'rtl') {
            if (elementOffsetLeft - elementStyles.scrollMarginRight < scrollContainer.scrollLeft + containerStyles.scrollPaddingLeft) {
                // overflow to the left, scroll to align left edges
                targetX = elementOffsetLeft - elementStyles.scrollMarginLeft - containerStyles.scrollPaddingLeft;
            } else if (elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight > scrollContainer.scrollLeft + scrollContainer.clientWidth - containerStyles.scrollPaddingRight) {
                // overflow to the right, scroll to align right edges
                targetX = elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight - scrollContainer.clientWidth + containerStyles.scrollPaddingRight;
            }
        }
    }
    if (isOverflowingY && orientation !== 'horizontal') {
        const elementOffsetTop = getOffset(scrollContainer, element, 'top');
        const containerStyles = getStyles(scrollContainer);
        const elementStyles = getStyles(element);
        if (elementOffsetTop - elementStyles.scrollMarginTop < scrollContainer.scrollTop + containerStyles.scrollPaddingTop) {
            // overflow upwards, align top edges
            targetY = elementOffsetTop - elementStyles.scrollMarginTop - containerStyles.scrollPaddingTop;
        } else if (elementOffsetTop + element.offsetHeight + elementStyles.scrollMarginBottom > scrollContainer.scrollTop + scrollContainer.clientHeight - containerStyles.scrollPaddingBottom) {
            // overflow downwards, align bottom edges
            targetY = elementOffsetTop + element.offsetHeight + elementStyles.scrollMarginBottom - scrollContainer.clientHeight + containerStyles.scrollPaddingBottom;
        }
    }
    scrollContainer.scrollTo({
        left: targetX,
        top: targetY,
        behavior: 'auto'
    });
}
function getOffset(ancestor, element, side) {
    const propName = side === 'left' ? 'offsetLeft' : 'offsetTop';
    let result = 0;
    while(element.offsetParent){
        result += element[propName];
        if (element.offsetParent === ancestor) {
            break;
        }
        element = element.offsetParent;
    }
    return result;
}
function getStyles(element) {
    const styles = getComputedStyle(element);
    return {
        scrollMarginTop: parseFloat(styles.scrollMarginTop) || 0,
        scrollMarginRight: parseFloat(styles.scrollMarginRight) || 0,
        scrollMarginBottom: parseFloat(styles.scrollMarginBottom) || 0,
        scrollMarginLeft: parseFloat(styles.scrollMarginLeft) || 0,
        scrollPaddingTop: parseFloat(styles.scrollPaddingTop) || 0,
        scrollPaddingRight: parseFloat(styles.scrollPaddingRight) || 0,
        scrollPaddingBottom: parseFloat(styles.scrollPaddingBottom) || 0,
        scrollPaddingLeft: parseFloat(styles.scrollPaddingLeft) || 0
    };
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/popup/DialogPopup.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogPopup",
    ()=>DialogPopup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingFocusManager$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/components/FloatingFocusManager.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/root/DialogRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/popupStateMapping.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$stateAttributesMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/stateAttributesMapping.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$popup$2f$DialogPopupCssVars$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/popup/DialogPopupCssVars.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$popup$2f$DialogPopupDataAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/popup/DialogPopupDataAttributes.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$portal$2f$DialogPortalContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/portal/DialogPortalContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useOpenChangeComplete$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$composite$2f$composite$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/composite/composite.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$popupStoreUtils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/popups/popupStoreUtils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["popupStateMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$stateAttributesMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transitionStatusMapping"],
    nestedDialogOpen (value) {
        return value ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$popup$2f$DialogPopupDataAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPopupDataAttributes"].nestedDialogOpen]: ''
        } : null;
    }
};
const DialogPopup = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function DialogPopup(componentProps, forwardedRef) {
    const { render, className, style, finalFocus, initialFocus, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const descriptionElementId = store.useState('descriptionElementId');
    const disablePointerDismissal = store.useState('disablePointerDismissal');
    const floatingRootContext = store.useState('floatingRootContext');
    const rootPopupProps = store.useState('popupProps');
    const modal = store.useState('modal');
    const mounted = store.useState('mounted');
    const nested = store.useState('nested');
    const nestedOpenDialogCount = store.useState('nestedOpenDialogCount');
    const open = store.useState('open');
    const openMethod = store.useState('openMethod');
    const titleElementId = store.useState('titleElementId');
    const transitionStatus = store.useState('transitionStatus');
    const role = store.useState('role');
    const floatingId = floatingRootContext.useState('floatingId');
    const popupId = elementProps.id ?? floatingId;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$portal$2f$DialogPortalContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogPortalContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useOpenChangeComplete$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOpenChangeComplete"])({
        open,
        ref: store.context.popupRef,
        onComplete () {
            if (open) {
                store.context.onOpenChangeComplete?.(true);
            }
        }
    });
    const resolvedInitialFocus = initialFocus === undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$popupStoreUtils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDefaultInitialFocus"])(store.context.popupRef) : initialFocus;
    const nestedDialogOpen = nestedOpenDialogCount > 0;
    const setPopupElement = store.useStateSetter('popupElement');
    const state = {
        open,
        nested,
        transitionStatus,
        nestedDialogOpen
    };
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        props: [
            rootPopupProps,
            {
                id: popupId,
                'aria-labelledby': titleElementId ?? undefined,
                'aria-describedby': descriptionElementId ?? undefined,
                role,
                ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$popupStoreUtils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FOCUSABLE_POPUP_PROPS"],
                hidden: !mounted,
                onKeyDown (event) {
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$composite$2f$composite$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COMPOSITE_KEYS"].has(event.key)) {
                        event.stopPropagation();
                    }
                },
                style: {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$popup$2f$DialogPopupCssVars$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPopupCssVars"].nestedDialogs]: nestedOpenDialogCount
                }
            },
            elementProps
        ],
        ref: [
            forwardedRef,
            store.context.popupRef,
            setPopupElement
        ],
        stateAttributesMapping
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingFocusManager$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingFocusManager"], {
        context: floatingRootContext,
        openInteractionType: openMethod,
        disabled: !mounted,
        closeOnFocusOut: !disablePointerDismissal,
        initialFocus: resolvedInitialFocus,
        returnFocus: finalFocus,
        modal: modal !== false,
        restoreFocus: "popup",
        children: element
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogPopup.displayName = "DialogPopup";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/InternalBackdrop.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InternalBackdrop",
    ()=>InternalBackdrop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
/**
 * @internal
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
const InternalBackdrop = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function InternalBackdrop(props, ref) {
    const { cutout, ...otherProps } = props;
    let clipPath;
    if (cutout) {
        const rect = cutout.getBoundingClientRect();
        clipPath = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${rect.left}px ${rect.top}px,${rect.left}px ${rect.bottom}px,${rect.right}px ${rect.bottom}px,${rect.right}px ${rect.top}px,${rect.left}px ${rect.top}px)`;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        ref: ref,
        role: "presentation",
        "data-base-ui-inert": "",
        ...otherProps,
        style: {
            position: 'fixed',
            inset: 0,
            userSelect: 'none',
            WebkitUserSelect: 'none',
            clipPath
        }
    });
});
if ("TURBOPACK compile-time truthy", 1) InternalBackdrop.displayName = "InternalBackdrop";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/portal/DialogPortal.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogPortal",
    ()=>DialogPortal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$inertValue$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/inertValue.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingPortal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/components/FloatingPortal.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/root/DialogRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$portal$2f$DialogPortalContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/portal/DialogPortalContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$InternalBackdrop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/InternalBackdrop.mjs [app-client] (ecmascript)");
/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const DialogPortal = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function DialogPortal(props, forwardedRef) {
    const { keepMounted = false, ...portalProps } = props;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const mounted = store.useState('mounted');
    const modal = store.useState('modal');
    const open = store.useState('open');
    const shouldRender = mounted || keepMounted;
    if (!shouldRender) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$portal$2f$DialogPortalContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPortalContext"].Provider, {
        value: keepMounted,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingPortal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingPortal"], {
            ref: forwardedRef,
            ...portalProps,
            children: [
                mounted && modal === true && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$InternalBackdrop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InternalBackdrop"], {
                    ref: store.context.internalBackdropRef,
                    inert: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$inertValue$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inertValue"])(!open)
                }),
                props.children
            ]
        })
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogPortal.displayName = "DialogPortal";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/title/DialogTitle.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogTitle",
    ()=>DialogTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/root/DialogRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/useBaseUiId.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
const DialogTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function DialogTitle(componentProps, forwardedRef) {
    const { render, className, style, id: idProp, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    store.useSyncedValueWithCleanup('titleElementId', id);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('h2', componentProps, {
        ref: forwardedRef,
        props: [
            {
                id
            },
            elementProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogTitle.displayName = "DialogTitle";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/hooks/useClick.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useClick",
    ()=>useClick
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useAnimationFrame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/useAnimationFrame.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useTimeout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/useTimeout.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/empty.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/shadowDom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/utils/element.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/utils/event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$createBaseUIEventDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/reason-parts.mjs [app-client] (ecmascript) <export * as REASONS>");
'use client';
;
;
;
;
;
;
;
;
function useClick(context, props = {}) {
    const { enabled = true, event: eventOption = 'click', toggle = true, ignoreMouse = false, stickIfOpen = true, touchOpenDelay = 0, reason = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].triggerPress } = props;
    const store = 'rootStore' in context ? context.rootStore : context;
    const dataRef = store.context.dataRef;
    const pointerTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](undefined);
    const frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useAnimationFrame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimationFrame"])();
    const touchOpenTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useTimeout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useClick.useMemo[reference]": ()=>{
            function setOpenWithTouchDelay(nextOpen, nativeEvent, target, pointerType) {
                const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$createBaseUIEventDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(reason, nativeEvent, target);
                if (nextOpen && pointerType === 'touch' && touchOpenDelay > 0) {
                    touchOpenTimeout.start(touchOpenDelay, {
                        "useClick.useMemo[reference].setOpenWithTouchDelay": ()=>{
                            store.setOpen(true, details);
                        }
                    }["useClick.useMemo[reference].setOpenWithTouchDelay"]);
                } else {
                    store.setOpen(nextOpen, details);
                }
            }
            function getNextOpen(open, currentTarget, isClickLikeOpenEvent) {
                const openEvent = dataRef.current.openEvent;
                const hasClickedOnInactiveTrigger = store.select('domReferenceElement') !== currentTarget;
                if (open && hasClickedOnInactiveTrigger) {
                    // Moving between triggers should always open the newly active one.
                    return true;
                }
                if (!open) {
                    // A closed popup should open on the next press.
                    return true;
                }
                if (!toggle) {
                    // Non-toggle mode never closes on a repeated trigger press.
                    return true;
                }
                if (openEvent && stickIfOpen) {
                    // Preserve hover/focus-opened popups until the matching click-like event closes them.
                    return !isClickLikeOpenEvent(openEvent.type);
                }
                // Otherwise, a repeated click toggles the popup closed.
                return false;
            }
            return {
                onPointerDown (event) {
                    pointerTypeRef.current = event.pointerType;
                },
                onMouseDown (event) {
                    const pointerType = pointerTypeRef.current;
                    const nativeEvent = event.nativeEvent;
                    const open = store.select('open');
                    // Ignore all buttons except for the "main" button.
                    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
                    if (event.button !== 0 || eventOption === 'click' || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerType, true) && ignoreMouse) {
                        return;
                    }
                    const nextOpen = getNextOpen(open, event.currentTarget, {
                        "useClick.useMemo[reference].nextOpen": (openEventType)=>openEventType === 'click' || openEventType === 'mousedown'
                    }["useClick.useMemo[reference].nextOpen"]);
                    // Animations sometimes won't run on a typeable element if using a rAF.
                    // Focus is always set on these elements. For touch, we may delay opening.
                    const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(nativeEvent);
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isTypeableElement"])(target)) {
                        setOpenWithTouchDelay(nextOpen, nativeEvent, target, pointerType);
                        return;
                    }
                    // Capture the currentTarget before the rAF.
                    // as React sets it to null after the event handler completes.
                    const eventCurrentTarget = event.currentTarget;
                    // Wait until focus is set on the element. This is an alternative to
                    // `event.preventDefault()` to avoid :focus-visible from appearing when using a pointer.
                    frame.request({
                        "useClick.useMemo[reference]": ()=>{
                            setOpenWithTouchDelay(nextOpen, nativeEvent, eventCurrentTarget, pointerType);
                        }
                    }["useClick.useMemo[reference]"]);
                },
                onClick (event) {
                    if (eventOption === 'mousedown-only') {
                        return;
                    }
                    const pointerType = pointerTypeRef.current;
                    if (eventOption === 'mousedown' && pointerType) {
                        pointerTypeRef.current = undefined;
                        return;
                    }
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerType, true) && ignoreMouse) {
                        return;
                    }
                    const open = store.select('open');
                    const nextOpen = getNextOpen(open, event.currentTarget, {
                        "useClick.useMemo[reference].nextOpen": (openEventType)=>openEventType === 'click' || openEventType === 'mousedown' || openEventType === 'keydown' || openEventType === 'keyup'
                    }["useClick.useMemo[reference].nextOpen"]);
                    setOpenWithTouchDelay(nextOpen, event.nativeEvent, event.currentTarget, pointerType);
                },
                onKeyDown () {
                    pointerTypeRef.current = undefined;
                }
            };
        }
    }["useClick.useMemo[reference]"], [
        dataRef,
        eventOption,
        ignoreMouse,
        reason,
        store,
        stickIfOpen,
        toggle,
        frame,
        touchOpenTimeout,
        touchOpenDelay
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useClick.useMemo": ()=>enabled ? {
                reference
            } : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"]
    }["useClick.useMemo"], [
        enabled,
        reference
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/useValueChanged.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useValueChanged",
    ()=>useValueChanged
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/useStableCallback.mjs [app-client] (ecmascript)");
'use client';
;
;
;
function useValueChanged(value, onChange) {
    const valueRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](value);
    const onChangeCallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])(onChange);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useValueChanged.useIsoLayoutEffect": ()=>{
            if (valueRef.current === value) {
                return;
            }
            onChangeCallback(valueRef.current);
        }
    }["useValueChanged.useIsoLayoutEffect"], [
        value,
        onChangeCallback
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useValueChanged.useIsoLayoutEffect": ()=>{
            valueRef.current = value;
        }
    }["useValueChanged.useIsoLayoutEffect"], [
        value
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/useOpenInteractionType.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOpenInteractionType",
    ()=>useOpenInteractionType,
    "useOpenMethodTriggerProps",
    ()=>useOpenMethodTriggerProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/useStableCallback.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useEnhancedClickHandler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/useEnhancedClickHandler.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$platform$2f$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__platform$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/platform/parts.mjs [app-client] (ecmascript) <export * as platform>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useValueChanged$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/useValueChanged.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
function useOpenMethodTriggerProps(open, setOpenMethod) {
    const handleTriggerClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useOpenMethodTriggerProps.useStableCallback[handleTriggerClick]": (_, interactionType)=>{
            const isOpen = typeof open === 'function' ? open() : open;
            if (!isOpen) {
                setOpenMethod(interactionType || (// On iOS Safari, the hitslop around touch targets means tapping outside an element's
                // bounds does not fire `pointerdown` but does fire `mousedown`. The `interactionType`
                // will be "" in that case.
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$platform$2f$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__platform$3e$__["platform"].os.ios ? 'touch' : ''));
            }
        }
    }["useOpenMethodTriggerProps.useStableCallback[handleTriggerClick]"]);
    const { onClick, onPointerDown } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types$2b$react$40$19$2e$2$2e$17_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useEnhancedClickHandler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnhancedClickHandler"])(handleTriggerClick);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useOpenMethodTriggerProps.useMemo": ()=>({
                onClick,
                onPointerDown
            })
    }["useOpenMethodTriggerProps.useMemo"], [
        onClick,
        onPointerDown
    ]);
}
function useOpenInteractionType(open) {
    const [openMethod, setOpenMethod] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const triggerProps = useOpenMethodTriggerProps(open, setOpenMethod);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useValueChanged$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueChanged"])(open, {
        "useOpenInteractionType.useValueChanged": (previousOpen)=>{
            if (previousOpen && !open) {
                setOpenMethod(null);
            }
        }
    }["useOpenInteractionType.useValueChanged"]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useOpenInteractionType.useMemo": ()=>({
                openMethod,
                triggerProps
            })
    }["useOpenInteractionType.useMemo"], [
        openMethod,
        triggerProps
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/trigger/DialogTrigger.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/root/DialogRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$use$2d$button$2f$useButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/use-button/useButton.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/popupStateMapping.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$popupStoreUtils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/popups/popupStoreUtils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/useBaseUiId.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$hooks$2f$useClick$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/floating-ui-react/hooks/useClick.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$useOpenInteractionType$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/useOpenInteractionType.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
const DialogTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function DialogTrigger(componentProps, forwardedRef) {
    const { render, className, style, disabled = false, nativeButton = true, id: idProp, payload, handle, ...elementProps } = componentProps;
    const dialogRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])(true);
    const store = handle?.store ?? dialogRootContext?.store;
    if (!store) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: <Dialog.Trigger> must be used within <Dialog.Root> or provided with a handle.' : "TURBOPACK unreachable");
    }
    const thisTriggerId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const floatingContext = store.useState('floatingRootContext');
    const isOpenedByThisTrigger = store.useState('isOpenedByTrigger', thisTriggerId);
    const popupId = store.useState('triggerPopupId', thisTriggerId);
    const triggerElementRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const { registerTrigger, isMountedByThisTrigger } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popups$2f$popupStoreUtils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTriggerDataForwarding"])(thisTriggerId, triggerElementRef, store, {
        payload
    });
    const { getButtonProps, buttonRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$use$2d$button$2f$useButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useButton"])({
        disabled,
        native: nativeButton
    });
    const click = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$floating$2d$ui$2d$react$2f$hooks$2f$useClick$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClick"])(floatingContext, {
        enabled: floatingContext != null
    });
    const interactionTypeProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$useOpenInteractionType$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOpenMethodTriggerProps"])({
        "DialogTrigger.DialogTrigger.useOpenMethodTriggerProps[interactionTypeProps]": ()=>store.select('open')
    }["DialogTrigger.DialogTrigger.useOpenMethodTriggerProps[interactionTypeProps]"], {
        "DialogTrigger.DialogTrigger.useOpenMethodTriggerProps[interactionTypeProps]": (interactionType)=>{
            store.set('openMethod', interactionType);
        }
    }["DialogTrigger.DialogTrigger.useOpenMethodTriggerProps[interactionTypeProps]"]);
    const state = {
        disabled,
        open: isOpenedByThisTrigger
    };
    const rootTriggerProps = store.useState('triggerProps', isMountedByThisTrigger);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('button', componentProps, {
        state,
        ref: [
            buttonRef,
            forwardedRef,
            registerTrigger,
            triggerElementRef
        ],
        props: [
            click.reference,
            rootTriggerProps,
            interactionTypeProps,
            {
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLICK_TRIGGER_IDENTIFIER"]]: '',
                id: thisTriggerId,
                'aria-haspopup': 'dialog',
                'aria-expanded': isOpenedByThisTrigger,
                'aria-controls': popupId
            },
            elementProps,
            getButtonProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["triggerOpenStateMapping"]
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogTrigger.displayName = "DialogTrigger";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/alert-dialog/trigger/AlertDialogTrigger.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialogTrigger",
    ()=>AlertDialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$trigger$2f$DialogTrigger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/trigger/DialogTrigger.mjs [app-client] (ecmascript)");
'use client';
;
const AlertDialogTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$trigger$2f$DialogTrigger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTrigger"];
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/viewport/DialogViewportDataAttributes.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogViewportDataAttributes",
    ()=>DialogViewportDataAttributes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/popupStateMapping.mjs [app-client] (ecmascript)");
;
let DialogViewportDataAttributes = function(DialogViewportDataAttributes) {
    /**
   * Present when the dialog is open.
   */ DialogViewportDataAttributes[DialogViewportDataAttributes["open"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].open] = "open";
    /**
   * Present when the dialog is closed.
   */ DialogViewportDataAttributes[DialogViewportDataAttributes["closed"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].closed] = "closed";
    /**
   * Present when the dialog is animating in.
   */ DialogViewportDataAttributes[DialogViewportDataAttributes["startingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].startingStyle] = "startingStyle";
    /**
   * Present when the dialog is animating out.
   */ DialogViewportDataAttributes[DialogViewportDataAttributes["endingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].endingStyle] = "endingStyle";
    /**
   * Present when the dialog is nested within another dialog.
   */ DialogViewportDataAttributes["nested"] = "data-nested";
    /**
   * Present when the dialog has other open dialogs nested within it.
   */ DialogViewportDataAttributes["nestedDialogOpen"] = "data-nested-dialog-open";
    return DialogViewportDataAttributes;
}({});
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/viewport/DialogViewport.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogViewport",
    ()=>DialogViewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/utils/popupStateMapping.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$stateAttributesMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/stateAttributesMapping.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/root/DialogRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$portal$2f$DialogPortalContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/portal/DialogPortalContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$viewport$2f$DialogViewportDataAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/viewport/DialogViewportDataAttributes.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$popupStateMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["popupStateMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$stateAttributesMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transitionStatusMapping"],
    nested (value) {
        return value ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$viewport$2f$DialogViewportDataAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogViewportDataAttributes"].nested]: ''
        } : null;
    },
    nestedDialogOpen (value) {
        return value ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$viewport$2f$DialogViewportDataAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogViewportDataAttributes"].nestedDialogOpen]: ''
        } : null;
    }
};
const DialogViewport = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function DialogViewport(componentProps, forwardedRef) {
    const { render, className, style, children, ...elementProps } = componentProps;
    const keepMounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$portal$2f$DialogPortalContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogPortalContext"])();
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$root$2f$DialogRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const open = store.useState('open');
    const nested = store.useState('nested');
    const transitionStatus = store.useState('transitionStatus');
    const nestedOpenDialogCount = store.useState('nestedOpenDialogCount');
    const mounted = store.useState('mounted');
    const setViewportElement = store.useStateSetter('viewportElement');
    const nestedDialogOpen = nestedOpenDialogCount > 0;
    const state = {
        open,
        nested,
        transitionStatus,
        nestedDialogOpen
    };
    const shouldRender = keepMounted || mounted;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        enabled: shouldRender,
        state,
        ref: [
            forwardedRef,
            setViewportElement
        ],
        stateAttributesMapping,
        props: [
            {
                role: 'presentation',
                hidden: !mounted,
                style: {
                    pointerEvents: !open ? 'none' : undefined
                },
                children
            },
            elementProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogViewport.displayName = "DialogViewport";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/store/DialogHandle.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogHandle",
    ()=>DialogHandle,
    "createDialogHandle",
    ()=>createDialogHandle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$12_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$7$2e$2$2e$0_$5f40$playwright$2b$test$40$1$2e$62$2e$0_react$2d$dom_9af59b2006eaf5f49a6177e590ea8081$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.12_@babel+core@7.29.7_supports-color@7.2.0__@playwright+test@1.62.0_react-dom_9af59b2006eaf5f49a6177e590ea8081/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$store$2f$DialogStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/store/DialogStore.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$createBaseUIEventDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/internals/reason-parts.mjs [app-client] (ecmascript) <export * as REASONS>");
;
;
;
class DialogHandle {
    /**
   * Internal store holding the dialog state.
   * @internal
   */ constructor(store){
        this.store = store ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$store$2f$DialogStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogStore"]();
    }
    /**
   * Opens the dialog and associates it with the trigger with the given id.
   * The trigger, if provided, must be a matching Trigger component with this handle passed as a prop.
   *
   * This method should only be called in an event handler or an effect (not during rendering).
   *
   * @param triggerId ID of the trigger to associate with the dialog. If null, the dialog will open without a trigger association.
   */ open(triggerId) {
        const triggerElement = triggerId ? this.store.context.triggerElements.getById(triggerId) : undefined;
        if ("TURBOPACK compile-time truthy", 1) {
            if (triggerId && !triggerElement) {
                console.warn(`Base UI: DialogHandle.open: No trigger found with id "${triggerId}". The dialog will open, but the trigger will not be associated with the dialog.`);
            }
        }
        this.store.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$createBaseUIEventDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].imperativeAction, undefined, triggerElement));
    }
    /**
   * Opens the dialog and sets the payload.
   * Does not associate the dialog with any trigger.
   *
   * @param payload Payload to set when opening the dialog.
   */ openWithPayload(payload) {
        this.store.set('payload', payload);
        this.store.setOpen(true, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$createBaseUIEventDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].imperativeAction, undefined, undefined));
    }
    /**
   * Closes the dialog.
   */ close() {
        this.store.setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$createBaseUIEventDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].imperativeAction, undefined, undefined));
    }
    /**
   * Indicates whether the dialog is currently open.
   */ get isOpen() {
        return this.store.select('open');
    }
}
function createDialogHandle() {
    return new DialogHandle();
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/alert-dialog/handle.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialogHandle",
    ()=>AlertDialogHandle,
    "alertDialogState",
    ()=>alertDialogState,
    "createAlertDialogHandle",
    ()=>createAlertDialogHandle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$store$2f$DialogHandle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/store/DialogHandle.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$store$2f$DialogStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/store/DialogStore.mjs [app-client] (ecmascript)");
;
;
const alertDialogState = {
    modal: true,
    disablePointerDismissal: true,
    role: 'alertdialog'
};
class AlertDialogHandle extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$store$2f$DialogHandle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHandle"] {
    constructor(store){
        const alertDialogStore = store ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$store$2f$DialogStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogStore"](alertDialogState);
        super(alertDialogStore);
        if (store) {
            // Supplied stores may have been created as plain dialogs; enforce alert-dialog state.
            this.store.update(alertDialogState);
        }
    }
}
function createAlertDialogHandle() {
    return new AlertDialogHandle();
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/alert-dialog/index.parts.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Backdrop",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$backdrop$2f$DialogBackdrop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogBackdrop"],
    "Close",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$close$2f$DialogClose$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogClose"],
    "Description",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$description$2f$DialogDescription$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"],
    "Handle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$alert$2d$dialog$2f$handle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogHandle"],
    "Popup",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$popup$2f$DialogPopup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPopup"],
    "Portal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$portal$2f$DialogPortal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogPortal"],
    "Root",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$alert$2d$dialog$2f$root$2f$AlertDialogRoot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogRoot"],
    "Title",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$title$2f$DialogTitle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"],
    "Trigger",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$alert$2d$dialog$2f$trigger$2f$AlertDialogTrigger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogTrigger"],
    "Viewport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$viewport$2f$DialogViewport$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogViewport"],
    "createHandle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$alert$2d$dialog$2f$handle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAlertDialogHandle"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$alert$2d$dialog$2f$index$2e$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/alert-dialog/index.parts.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$alert$2d$dialog$2f$root$2f$AlertDialogRoot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/alert-dialog/root/AlertDialogRoot.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$backdrop$2f$DialogBackdrop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/backdrop/DialogBackdrop.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$close$2f$DialogClose$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/close/DialogClose.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$description$2f$DialogDescription$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/description/DialogDescription.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$popup$2f$DialogPopup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/popup/DialogPopup.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$portal$2f$DialogPortal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/portal/DialogPortal.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$title$2f$DialogTitle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/title/DialogTitle.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$alert$2d$dialog$2f$trigger$2f$AlertDialogTrigger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/alert-dialog/trigger/AlertDialogTrigger.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$viewport$2f$DialogViewport$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/dialog/viewport/DialogViewport.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$alert$2d$dialog$2f$handle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/alert-dialog/handle.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/alert-dialog/index.parts.mjs [app-client] (ecmascript) <export * as AlertDialog>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$alert$2d$dialog$2f$index$2e$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_date$2d$fns$40$4$2e$4$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$alert$2d$dialog$2f$index$2e$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/alert-dialog/index.parts.mjs [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=1fnm_%40base-ui_react_0wmu0d9._.js.map