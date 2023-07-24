let e={configurable:!1,enumerable:!1,writable:!1},t={create:e,with:e,set:e,use:e,get:e,post:e,put:e,patch:e,delete:e,options:e,head:e,trace:e,connect:e},r=/* @__PURE__ */new Set(["get","post","put","patch","delete","options","head","trace","connect"]),a=/* @__PURE__ */new Set(["URLSearchParams","ReadableStream","FormData","ArrayBuffer","SharedArrayBuffer"]),n=/* @__PURE__ */new Set(["Date","Error","Headers","RegExp","Request","Response","URL","URLSearchParams"]),i=/* @__PURE__ */new Set(["ArrayBuffer","AudioData","Blob","CropTarget","CryptoKey","DOMException","DOMMatrix","DOMMatrixReadOnly","DOMPoint","DOMPointReadOnly","DOMQuad","DOMRect","DOMRectReadOnly","File","FileList","FileSystemDirectoryHandle","FileSystemFileHandle","FileSystemHandle","GPUCompilationInfo","GPUCompilationMessage","ImageBitmap","ImageData","RTCCertificate","SharedArrayBuffer","VideoFrame"]),o=e=>{let t=f(e);if(p(e))return e;if(Array.isArray(e))return e.map(o);if("Set"===t)return new Set([...e].map(o));if("Map"===t)return new Map([...e].map(o));if(n.has(t))return new e.constructor(e);if(i.has(t)||ArrayBuffer.isView(e))return l(e);let r="function"==typeof e?e.bind({}):{};for(let t of Object.keys(e)){let a=e[t];p(a)||(a=o(a)),r[t]=a}return r},s=e=>{if(!e)return{};for(let t of Object.keys(e))delete e[t];return e},l=globalThis.structuredClone||(e=>e),f=e=>Object.prototype.toString.call(e).slice(8,-1),c=e=>JSON.stringify("Map"===f(e)?Object.fromEntries(e):e?.[Symbol.iterator]?[...e]:e),u=e=>h(e)||ArrayBuffer.isView(e)||a.has(f(e)),p=e=>!e||!("object"==typeof e||"function"==typeof e),d=e=>!!e&&"Promise"===f(e),y=e=>!!e&&"Request"===f(e),h=e=>{if("string"==typeof e)return!0;if(!e)return!1;let t=f(e);return"File"===t||"Blob"===t},b=(e,t,r)=>{if(!t&&!r)return e||"";let a=r?`?${new URLSearchParams(r)}`:"",n=(e?.url||`${e||""}`).trim();return(n.startsWith("http")&&n.startsWith(t)&&(t=""),n&&t)?O(`${t=t.replace(/\/+$/,"")}/${n=n.replace(/^\/+/,"")}${a}`,e):O(`${t||n}${a}`,e)},m=(e,...t)=>{let r=Object.assign({transform:"get"===e||"post"===e||"options"===e},...t);if(null==r.body||u(r.body))return r;let a=r.headers??=new Headers,n=a.get("content-type");return n||a.set("content-type","application/json"),r.body=/multipart\/form-data/.test(n)?(a.delete("content-type"),g(r.body)):/application\/x-www-form-urlencoded/.test(n)?new URLSearchParams(r.body):c(r.body),r},w=(...e)=>{let t={};for(let{headers:r,appendHeaders:a}of e){if(r){if(t.headers)for(let e of(r.entries||(r=Object.entries(r)),r))t.headers.set(...e);else t.headers=new Headers(r)}if(a){if(t.headers)for(let e of(a.entries||(a=Object.entries(a)),a))t.headers.append(...e);else t.headers=new Headers(a)}}return t},O=(e,t)=>{let r=new URL(e);return y(t)?new Request(r,t):r},g=e=>{let t=new FormData;if(null==e)return t;for(let r of("object"==typeof e||(e={0:e}),Object.keys(e))){let a=e[r];t.append(r,h(a)?a:c(a))}return t},S=async(e,t,r)=>{r.method||=e.toUpperCase();let{onres:a,onError:n,transform:i,...o}=r,s={...o,input:t},l=await fetch(t,o).catch(j(s,n));if("error"in s)return l??s;if(!l.ok)return j(l,n)(`${l.status} ${l.statusText}`.trim());let f=a?.await||a;if("function"==typeof f){let e=f(l,s),t=d(e)&&!("await"in a),r=t?void 0:await e;if(void 0!==r)return r}return i&&l.body&&!l.bodyUsed?l.clone().json().catch(()=>l.text().catch(j(l,n))):l},j=(e,t)=>("function"==typeof t||(t=e=>e),r=>{(r||="Unknown Exception While Fetching...")instanceof Error||(r=Error(r));let a=setTimeout(()=>{console.error("Unhandled (in fetched-api)",r.stack||r)},10);return t(Object.defineProperty(e||{},"error",{enumerable:!0,configurable:!0,get:()=>(clearTimeout(a),r)}))}),R=e=>{let a=D();for(let t of(e&&Object.assign(a,o(e)),r))"post"===t||"put"===t||"patch"===t?a[t]=(e,r,n)=>{(n||={}).body=r;let i=w(a,a[t],n),{baseURL:o,query:s,...l}=m(t,a,a[t],n,i),f=b(e,o,s);return S(t,f,l)}:a[t]=(e,r)=>{let n=w(a,a[t],r||{}),{baseURL:i,query:o,...s}=m(t,a,a[t],r,n),l=b(e,i,o);return S(t,l,s)},e?.[t]&&Object.assign(a[t],o(e[t]));return Object.defineProperties(a,t)},D=()=>({create:R,with(e){let t=R(this);return e?t.use(e):t},set(e){for(let e of(s(this),r))s(this[e]);return this.use(e)},use(e){for(let t of Object.keys(e||{})){let r=e[t];p(r)||(r=o(r));let a="function"==typeof this[t];a?Object.assign(this[t],r):this[t]=r}return this}});var M=/* @__PURE__ */R();export{o as clone,M as default,R as initapi};
