/// <reference types="node" />

import type { EmptyObject } from 'type-fest';
import type { Entries } from 'type-fest';
import type { IncomingHttpHeaders } from 'http';
import type { Jsonifiable } from 'type-fest';
import type { JsonPrimitive } from 'type-fest';
import type { JsonValue } from 'type-fest';
import type { Merge } from 'type-fest';
import type { OmitIndexSignature } from 'type-fest';
import type { PickIndexSignature } from 'type-fest';
import type { Primitive } from 'type-fest';
import type { UnionToIntersection } from 'type-fest';

declare interface ApiDispatch {
    /**
     * Create and initialize a new instance.
     * @returns the **new** instance.
     */
    create(config?: FetchInit): FetchedApi;
    /**
     * Create a new instance based off of the current one while
     * optionally providing a new config object to merge with.
     * @returns the **new** instance with *inherited* defaults.
     */
    with(config?: FetchInit): FetchedApi;
    /**
     * Set the defaults for the current instance,
     * disregarding any previous configuration.
     * @returns the current **mutated** instance.
     */
    set(config: FetchInit): FetchedApi;
    /**
     * Update the defaults for the current instance
     * while merging with any previous configuration.
     * @returns the current **mutated** instance.
     */
    use(config: FetchInit): FetchedApi;
}

declare interface ApiOptions {
    /**
     * Transform the default return type for fetch requests to the
     * result of `res.json()` (or `res.text()`) for resolved responses.
     * *While `true`, it may still be possible to access the resolved response with a provided `onres` callback.*
     * @defaultValue `true` for `get`, `post`, and `options` methods.
     */
    transform?: boolean;
    /**
     * Body types supported natively by `fetch` are passed as is.
     * Otherwise the body will be transformed and converted to:
     * - `string`, resulting from converting the body with `JSON.stringify`.
     * - `URLSearchParams`, if the `Content-Type` header is set to `"application/x-www-form-urlencoded"`.
     * - `FormData`, if the `Content-Type` header is set to `"multipart/form-data"`. \
     *   *Note: This header will be omitted during the request since it is
     *   {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects#sect4 | not meant to be set explicitly}.*
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/fetch#body | Fetch API Body}
     */
    body?: FetchBody;
    /**
     * Base url to be prefixed to the request input.
     */
    baseURL?: string;
    /**
     * URL search parameters to be suffixed to the request input.
     */
    query?: FetchQuery;
    /**
     * Headers to be merged and constructed into a new `Headers`
     * object, with any previous headers being overwritten using the
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/Headers/set | `Headers.set`} method.
     * @see {@link RequestInit.headers}
     */
    headers?: FetchHeaders;
    /**
     * Headers to be merged and constructed into a new `Headers`
     * object, with any previous headers being appended to using the
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/Headers/append | `Headers.append`} method.
     * @see {@link RequestInit.headers}
     */
    appendHeaders?: FetchHeaders;
    /**
     * Define a default callback for resolved requests with sucessful responses (i.e. `res.ok`),
     * which may be used to perform some background task (if callback is `void`/`async`)
     * or intercept the returned response (if anything other than `undefined` is returned). \
     * *Asynchronous callbacks that return a `Promise` may be awaited and resolved if the
     * callback was provided as an object under the `await` property instead.*
     */
    onres?: FetchResponseHandler | {
        await: FetchResponseHandler;
    };
    /**
     * Define a default callback to handle any errors during
     * the fetch request and non-sucessful responses (i.e. `!res.ok`).
     */
    onError?: (res: (Response | FetchRequest) & {
        error?: Error;
    }) => any;
}

/**
 * Deep clone *most* standard objects.
 * *Does **not** handle circular references.*
 */
export declare const clone: <T>(target: T) => T;

/**
 * common content-types \
 * {@link https://stackoverflow.com/a/48704300}
 */
declare type ContentType = 'application/EDI-X12' | 'application/EDIFACT' | 'application/java-archive' | 'application/javascript' | 'application/json' | 'application/ld+json' | 'application/octet-stream' | 'application/ogg' | 'application/pdf' | 'application/x-shockwave-flash' | 'application/x-www-form-urlencoded' | 'application/xhtml+xml' | 'application/xml' | 'application/zip' | 'audio/mpeg' | 'audio/vnd.rn-realaudio' | 'audio/x-ms-wma' | 'audio/x-wav' | 'image/gif' | 'image/jpeg' | 'image/png' | 'image/svg+xml' | 'image/tiff' | 'image/vnd.djvu' | 'image/x-icon' | 'multipart/alternative' | 'multipart/form-data' | 'multipart/mixed' | 'multipart/related' | 'text/css' | 'text/csv' | 'text/html' | 'text/javascript' | 'text/plain' | 'text/xml' | 'video/mp4' | 'video/mpeg' | 'video/quicktime' | 'video/webm' | 'video/x-flv' | 'video/x-ms-wmv' | 'video/x-msvideo';

declare const _default: FetchedApi;
export default _default;

declare type Extends<T1, T2> = Type<[
T1
] extends [never] ? false : [T2] extends [never] ? false : T1 extends T2 ? true : false>;

export declare type FetchBody = BodyInit | Jsonifiable | Set<Jsonifiable> | Map<JsonPrimitive, Jsonifiable>;

export declare type FetchConfig = Merge<Omit<RequestInit, 'method'>, ApiOptions>;

export declare interface FetchedApi extends Merge<FetchConfig, ApiDispatch & RequestDispatch> {
}

export declare type FetchHeaders = Headers | Partial<HttpHeaders> | Entries<HttpHeaders>;

export declare type FetchInit = Merge<FetchConfig, PartialRecord<HttpMethod, FetchConfig>>;

export declare type FetchInput = RequestInfo | URL;

declare type FetchMethod<T extends {
    responseHasBody: boolean;
} = {
    responseHasBody: false;
}> = {
    <Data = JsonObject, Transform extends boolean = T['responseHasBody']>(input: FetchInput, options?: FetchOptions & {
        transform?: Transform;
    }): Promise<(Transform extends false ? Response : Data) & {
        error?: Error;
    }>;
} & FetchConfig;

declare type FetchMethodWithBody<T extends {
    responseHasBody: boolean;
} = {
    responseHasBody: false;
}> = {
    <Data = JsonObject, Transform extends boolean = T['responseHasBody']>(input: FetchInput, body: FetchBody, options?: Omit<FetchOptions, 'body'> & {
        transform?: Transform;
    }): Promise<(Transform extends false ? Response : Data) & {
        error?: Error;
    }>;
} & FetchConfig;

declare type FetchMethodWithoutBody<T extends {
    responseHasBody: boolean;
} = {
    responseHasBody: false;
}> = {
    <Data = JsonObject, Transform extends boolean = T['responseHasBody']>(input: FetchInput, options?: Omit<FetchOptions, 'body'> & {
        transform?: Transform;
    }): Promise<(Transform extends false ? Response : Data) & {
        error?: Error;
    }>;
} & Omit<FetchConfig, 'body'>;

declare type FetchOptions = FetchConfig & {
    /** May be used to override if using custom non-standard method. */
    method?: Union<HttpMethod>;
};

declare type FetchQuery = JsObject<JsonPrimitive> | ConstructorParameters<typeof URLSearchParams>[0];

export declare type FetchRequest = Merge<RequestInit, {
    input: FetchInput;
}>;

declare type FetchResponseHandler = (res: Response, req: FetchRequest) => unknown;

declare type HttpHeaders = Merge<Record<Union<KeyOf<IncomingHttpHeaders>>, string>, Record<'accept' | 'content-type', Union<ContentType>>>;

declare type HttpMethod = KeyOf<RequestDispatch>;

/**
 * Create and initialize a new api instance with the provided defaults.
 */
export declare const initapi: (defaults?: FetchInit) => FetchedApi;

declare type IsLiteral<T> = Type<string extends T ? false : number extends T ? false : boolean extends T ? false : object extends T ? false : Function extends T ? false : [T] extends [never] ? false : T extends readonly (infer Item)[] ? IsLiteral<Item> : T extends JsObject ? Extends<PickIndexSignature<T>, EmptyObject> : Extends<T, Primitive>>;

declare type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

declare type JsObject<value = unknown> = {
    [key: string]: value;
};

declare type JsonObject = {
    [key in string]?: JsonValue;
};

declare type KeyOf<T, Explicit = OmitIndexSignature<Readonly<UnionToIntersection<T>>>, Key = keyof (Explicit extends EmptyObject ? T : Explicit)> = Key extends keyof (IsUnion<T> extends true ? Explicit : T) ? `${Exclude<Key, symbol>}` : never;

declare type Narrow<T> = Type<T extends string ? string : T extends number ? number : T extends boolean ? boolean : T extends undefined ? undefined : T extends null ? null : T extends readonly (infer Item)[] ? Narrow<Item>[] : T extends ReadonlySet<infer Item> ? Set<Narrow<Item>> : T extends ReadonlyMap<infer K, infer V> ? Map<Narrow<K>, Narrow<V>> : T extends Promise<infer Resolved> ? Promise<Narrow<Resolved>> : T extends JsObject<infer Values> ? JsObject<Narrow<Values>> : T extends object ? object : {}>;

declare interface NonNullish {
}

declare type PartialRecord<K, V> = {
    [key in K as K extends PropertyKey ? K : K extends Exclude<Primitive, symbol> ? `${K}` : never]?: V;
};

declare interface RequestDispatch {
    /**
     * The `GET` method requests a representation of the specified
     * resource. Requests using `GET` should only retrieve data.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET | MDN Reference}
     */
    get: FetchMethodWithoutBody<{
        responseHasBody: true;
    }>;
    /**
     * The `POST` method submits an entity to the specified resource,
     * often causing a change in state or side effects on the server.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST | MDN Reference}
     */
    post: FetchMethodWithBody<{
        responseHasBody: true;
    }>;
    /**
     * The `PUT` method replaces all current representations
     * of the target resource with the request payload.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT | MDN Reference}
     */
    put: FetchMethodWithBody;
    /**
     * The `PATCH` method applies partial modifications to a resource.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH | MDN Reference}
     */
    patch: FetchMethodWithBody;
    /**
     * The `DELETE` method deletes the specified resource.
     *
     *{@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE | MDN Reference}
     */
    delete: FetchMethod;
    /**
     * The `OPTIONS` method describes the communication options for the target resource.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS | MDN Reference}
     */
    options: FetchMethod<{
        responseHasBody: true;
    }>;
    /**
     * The `HEAD` method asks for a response identical
     * to a `GET` request, but without the response body.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD | MDN Reference}
     */
    head: FetchMethodWithoutBody;
    /**
     * The `TRACE` method performs a message loop-back
     * test along the path to the target resource.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE | MDN Reference}
     */
    trace: FetchMethod;
    /**
     * The `CONNECT` method establishes a tunnel to
     * the server identified by the target resource.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT | MDN Reference}
     */
    connect: FetchMethod;
}

declare type Type<T> = T;

declare type Union<T> = IsLiteral<T> extends true ? T | (Narrow<T> & NonNullish) : T;

export { }
