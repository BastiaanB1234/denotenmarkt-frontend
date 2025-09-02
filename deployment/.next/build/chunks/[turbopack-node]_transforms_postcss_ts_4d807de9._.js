module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/shopify-webshop/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "build/chunks/bfc9d_2c3f43aa._.js",
  "build/chunks/[root-of-the-server]__5cfa470f._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/shopify-webshop/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];