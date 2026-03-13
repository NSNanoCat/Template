# Template

开箱即用的脚本模板仓库 / Out-of-the-box Script Template Repository

## 📦 简介 / Introduction

这是一个以请求/响应处理为核心的模板仓库，当前结构已经将 `Request()` 与 `Response()` 彻底拆分为两个独立处理函数。`src/request*.js` 与 `src/response*.js` 仅负责调用它们并适配宿主环境，你也可以在 `src/Hono.js` 中复用同一套函数对接 Hono HTTP 服务。

This template repository centers on request/response processing and now fully separates `Request()` and `Response()` into two independent processing functions. `src/request*.js` and `src/response*.js` only invoke them and adapt to the host runtime, while `src/Hono.js` can reuse the same functions in a Hono-based HTTP service.

## 🚀 快速开始 / Quick Start

### 1. 使用此模板创建新仓库 / Use this template to create a new repository

点击仓库页面上的 "Use this template" 按钮创建你自己的仓库。

Click the "Use this template" button on the repository page to create your own repository.

### 2. 安装依赖 / Install dependencies

```bash
npm install
```

### 3. 编写你的脚本 / Write your scripts

将业务逻辑分别写在 `src/process/Request.mjs` 和 `src/process/Response.mjs` 中：前者只处理请求阶段，后者只处理响应阶段。若你使用开发构建进行调试，请同步维护 `src/process/Request.dev.mjs` 与 `src/process/Response.dev.mjs`。

Write your business logic separately in `src/process/Request.mjs` and `src/process/Response.mjs`: the former handles only the request phase, and the latter handles only the response phase. If you rely on the development build for debugging, keep `src/process/Request.dev.mjs` and `src/process/Response.dev.mjs` in sync as well.

### 4. 构建 / Build

**生产构建（压缩，用于实际部署）：**

```bash
npm run build
```

**开发构建（未压缩，便于调试）：**

```bash
npm run build:dev
```

`build:dev` 使用 `rollup.dev.config.js`，生成的文件不会压缩（保留可读性，便于调试）。默认构建仅输出脚本运行时入口，不包含 `src/Hono.js`。

`build:dev` uses `rollup.dev.config.js` to emit readable, unminified files for debugging. The default build targets only the script-runtime entry files and does not bundle `src/Hono.js`.

构建后的文件将输出到 `dist/` 目录。

The built files are written to the `dist/` directory.

## 🧭 处理架构 / Processing Architecture

| 路径 / Path | 角色 / Role | 说明 / Description |
| --- | --- | --- |
| `src/request.js`<br>`src/request.dev.js` | 请求入口包装器 / Request entry wrapper | 只负责调用 `Request()` 并处理宿主环境的 `done()` 输出 / Only calls `Request()` and finalizes host-specific `done()` output |
| `src/response.js`<br>`src/response.dev.js` | 响应入口包装器 / Response entry wrapper | 只负责调用 `Response()` 并回传处理后的响应 / Only calls `Response()` and returns the processed response |
| `src/process/Request.mjs` | 请求处理函数 / Request processing function | 独立的 `Request($request)` 函数，负责请求阶段改写，并可返回构造响应 / Independent `Request($request)` function for request-phase mutations, optionally returning a constructed response |
| `src/process/Response.mjs` | 响应处理函数 / Response processing function | 独立的 `Response($request, $response)` 函数，负责响应阶段改写 / Independent `Response($request, $response)` function for response-phase mutations |
| `src/process/Request.dev.mjs`<br>`src/process/Response.dev.mjs` | 开发版函数实现 / Development function implementations | 与生产函数结构一致，但保留可读性，便于调试和排查 / Match the production function structure while remaining readable for debugging and inspection |
| `index.js` | 统一部署入口 / Unified deployment entry | 根目录入口，直接用于 Vercel 与 Cloudflare Workers 部署 / Root entry used directly for Vercel and Cloudflare Workers deployments |
| `src/Hono.js` | Hono 适配入口 / Hono adapter entry | 将 HTTP 请求映射到模板约定的 `$request/$response` 结构 / Maps HTTP traffic into the template's `$request/$response` structure |

## 📁 项目结构 / Project Structure

```text
Template/
├── index.js                # Vercel / Cloudflare Workers 统一部署入口 / Unified deployment entry for Vercel and Cloudflare Workers
├── src/
│   ├── request.js           # 生产请求入口 / Production request entry
│   ├── request.dev.js       # 开发请求入口 / Development request entry
│   ├── response.js          # 生产响应入口 / Production response entry
│   ├── response.dev.js      # 开发响应入口 / Development response entry
│   ├── Hono.js              # Hono HTTP 适配入口 / Hono HTTP adapter entry
│   └── process/
│       ├── Request.mjs      # 生产请求处理核心 / Production request processing core
│       ├── Request.dev.mjs  # 开发请求处理核心 / Development request processing core
│       ├── Response.mjs     # 生产响应处理核心 / Production response processing core
│       └── Response.dev.mjs # 开发响应处理核心 / Development response processing core
├── dist/                    # 构建输出目录 / Build output directory
│   ├── request.js           # 生产构建（压缩） / Production build (minified)
│   ├── response.js          # 生产构建（压缩） / Production build (minified)
│   ├── request.dev.js       # 开发构建（未压缩） / Development build (uncompressed)
│   └── response.dev.js      # 开发构建（未压缩） / Development build (uncompressed)
├── package.json             # 项目配置和依赖 / Project configuration and dependencies
├── rollup.config.js         # Rollup 主配置 / Rollup main configuration
├── rollup.default.config.js # 生产构建配置 / Production build configuration
├── rollup.dev.config.js     # 开发构建配置 / Development build configuration
└── README.md                # 项目说明 / Project documentation
```

## 📦 已包含的依赖 / Included Dependencies

- [@nsnanocat/util](https://www.npmjs.com/package/@nsnanocat/util) - 实用工具函数库 / Utility functions library
- [@nsnanocat/url](https://www.npmjs.com/package/@nsnanocat/url) - URL polyfill
- [@nsnanocat/grpc](https://www.npmjs.com/package/@nsnanocat/grpc) - gRPC 客户端库 / gRPC client library
- [crypto-js](https://www.npmjs.com/package/crypto-js) - 加密库（默认注释，按需启用） / Crypto library (commented by default, enable as needed)
- [hono](https://www.npmjs.com/package/hono) - HTTP 运行时适配器 / HTTP runtime adapter
- [node-fetch](https://www.npmjs.com/package/node-fetch) 与 [fetch-cookie](https://www.npmjs.com/package/fetch-cookie) - 预留给服务端扩展的 fetch 能力 / Reserved fetch helpers for server-side extensions
- [Rollup](https://www.rollupjs.com) - 模块打包工具 / Module bundler

### 可用的导入模块 / Available Imports

**@nsnanocat/util** (使用命名导入 / Use named imports)

```javascript
import {
  $app,
  $argument,
  Console,
  Lodash as _,
  done,
  notification,
  time,
  wait,
  fetch,
  Storage
} from "@nsnanocat/util";
```

**@nsnanocat/url** (使用命名导入 / Use named imports)

```javascript
import { URL } from "@nsnanocat/url";
```

**@nsnanocat/grpc** (使用默认导入 / Use default import)

```javascript
import gRPC from "@nsnanocat/grpc";
```

**crypto-js** (使用默认导入，默认注释 / Use default import, commented by default)

```javascript
import CryptoJS from "crypto-js";
```

**hono** (在 HTTP 适配层使用 / Used by the HTTP adapter)

```javascript
import { Hono } from "hono";
```

## ✏️ 编写脚本 / Writing Scripts

模板已经将请求与响应逻辑拆成两个独立函数：`Request()` 只处理请求阶段，`Response()` 只处理响应阶段。入口文件只负责调用函数和处理运行时兼容，不再承载实际业务逻辑。

The template now splits request and response logic into two independent functions: `Request()` handles only the request phase, and `Response()` handles only the response phase. Entry files only invoke these functions and handle runtime compatibility instead of carrying business logic themselves.

### 执行流程 / Execution Flow

1. 请求进入 `src/request.js` 或 `src/request.dev.js`。
2. 入口包装器调用 `Request($request)`。
3. `Request()` 返回 `{ $request, $response }`：
   如果返回 `$response`，则直接短路返回响应；否则继续发送修改后的 `$request`。
4. 响应进入 `src/response.js` 或 `src/response.dev.js`。
5. 入口包装器调用 `Response($request, $response)`。
6. `Response()` 返回最终响应对象，由宿主环境输出。

1. A request enters `src/request.js` or `src/request.dev.js`.
2. The entry wrapper calls `Request($request)`.
3. `Request()` returns `{ $request, $response }`:
   when `$response` is returned, the flow short-circuits with that response; otherwise the modified `$request` continues upstream.
4. The response enters `src/response.js` or `src/response.dev.js`.
5. The entry wrapper calls `Response($request, $response)`.
6. `Response()` returns the final response object for the host runtime to output.

### 主要特性 / Key Features

- **精确格式检测** / Precise format detection based on exact Content-Type MIME types
- **支持多种格式** / Supports multiple formats
- **请求与响应函数彻底分离** / Request and response functions are fully separated
- **入口包装器与业务逻辑分离** / Entry wrappers are separated from business logic
- **生产与开发函数结构一致** / Production and development functions share the same structure
- **多应用支持** / Multi-app support (Quantumult X, Surge, Loon, etc.)
- **可选 Hono 运行时适配** / Optional Hono runtime adapter

### FORMAT 检测方式 / FORMAT Detection

模板使用精确的 Content-Type 匹配，而不是简单的字符串包含检测：

The template uses exact Content-Type matching instead of simple string inclusion:

```javascript
const contentType = $response.headers?.["Content-Type"] ?? $response.headers?.["content-type"] ?? "";
const format = contentType.split(";")[0].trim();
```

### Request.mjs 示例 / Request.mjs Example

```javascript
export async function Request($request) {
  let $response;
  const format = ($request.headers?.["Content-Type"] ?? $request.headers?.["content-type"])?.split(";")?.[0];

  switch (format) {
    case "application/json": {
      const body = JSON.parse($request.body ?? "{}");
      body.customField = "customValue";
      $request.body = JSON.stringify(body);
      break;
    }
    case "application/grpc":
    case "application/grpc+proto":
      // 在这里解码并重新编码 gRPC 负载。
      // Decode and re-encode the gRPC payload here.
      break;
    default:
      break;
  }

  return { $request, $response };
}
```

### Response.mjs 示例 / Response.mjs Example

```javascript
export async function Response($request, $response) {
  const format = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];

  switch (format) {
    case "application/json": {
      const body = JSON.parse($response.body ?? "{}");
      body.modified = true;
      $response.body = JSON.stringify(body);
      break;
    }
    case "application/protobuf":
    case "application/grpc":
      // 在这里处理二进制响应体。
      // Process the binary response body here.
      break;
    default:
      break;
  }

  return $response;
}
```

## 🌐 Hono 入口 / Hono Entry

根目录 `index.js` 是统一部署入口，直接导出 `src/Hono.js` 的默认实例，供 Vercel 与 Cloudflare Workers 直接作为入口文件使用。

The root `index.js` is the unified deployment entry. It re-exports the default instance from `src/Hono.js` so Vercel and Cloudflare Workers can use it directly as the entry file.

`src/Hono.js` 提供了一个可选的 HTTP 适配层，用于复用这两个独立函数。当前实现会先把传入请求转换为 `$request`，然后通过 `fetch()` 请求上游，再调用 `Response()` 处理器；如有需要，也可以启用预留的 `Request()` 钩子。

`src/Hono.js` provides an optional HTTP adapter for reusing these two independent functions. The current implementation normalizes the inbound request into `$request`, performs the upstream `fetch()`, and then runs the `Response()` processor; the scaffolded `Request()` hook can also be enabled when needed.

请求前置处理钩子 `Request()` 已在文件中预留，但默认保持注释状态；如果你需要在发起上游请求前改写请求或直接短路返回响应，可以手动启用这段逻辑。

The `Request()` preprocessing hook is already scaffolded in the file but remains commented out by default. Enable it when you need to mutate requests before the upstream fetch or short-circuit with a constructed response.

## 🔧 NPM 脚本 / NPM Scripts

- `npm run build` - 构建生产版本（压缩） / Build production version (minified)
- `npm run build:dev` - 构建开发版本（未压缩） / Build development version (uncompressed)
- `npm run build:watch` - 监听模式构建 / Build in watch mode

## 📚 参考 / References

本模板参考了以下项目的结构：

This template is inspired by the structure of the following projects:

- [BiliUniverse/Enhanced](https://github.com/BiliUniverse/Enhanced)
- [BiliUniverse/Redirect](https://github.com/BiliUniverse/Redirect)
- [NSRingo/WeatherKit](https://github.com/NSRingo/WeatherKit)
- [NSRingo/Maps](https://github.com/NSRingo/Maps)

## 📄 License

MIT
