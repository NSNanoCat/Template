# Template

开箱即用的脚本模板仓库 / Out-of-the-box Script Template Repository

## 📦 简介 / Introduction

这是一个模板仓库，让用户可以开箱即用脚本组件。用户只需要书写内容主体，而不需要关心运行环境等一系列配置问题。

This is a template repository that allows users to use script components out of the box. Users only need to write the main content without worrying about the runtime environment and other configuration issues.

## 🚀 快速开始 / Quick Start

### 1. 使用此模板创建新仓库 / Use this template to create a new repository

点击仓库页面上的 "Use this template" 按钮创建你自己的仓库。

Click the "Use this template" button on the repository page to create your own repository.

### 2. 安装依赖 / Install dependencies

```bash
npm install
```

### 3. 编写你的脚本 / Write your scripts

在 `src/request.js` 和 `src/response.js` 中编写你的业务逻辑。模板已经为你导入了必要的依赖包。

Write your business logic in `src/request.js` and `src/response.js`. The template has already imported the necessary dependencies for you.

### 4. 构建 / Build

**生产构建（压缩，用于实际部署）：**
```bash
npm run build
```

**开发构建（未压缩，便于调试）：**
```bash
npm run build:dev
```

`build:dev` 使用 `rollup.dev.config.js`，生成的文件不会压缩（保留可读性，便于调试）。

构建后的文件将输出到 `js/` 目录。

The built files will be output to the `js/` directory.

## 📁 项目结构 / Project Structure

```
Template/
├── src/
│   ├── request.js    # 请求处理脚本模板 / Request handler script template
│   └── response.js   # 响应处理脚本模板 / Response handler script template
├── js/               # 构建输出目录 / Build output directory
│   ├── request.js    # 生产构建（压缩） / Production build (minified)
│   ├── response.js   # 生产构建（压缩） / Production build (minified)
│   ├── request.dev.js  # 开发构建（未压缩） / Development build (uncompressed)
│   └── response.dev.js # 开发构建（未压缩） / Development build (uncompressed)
├── package.json      # 项目配置和依赖 / Project configuration and dependencies
├── rollup.config.js  # Rollup 主配置 / Rollup main configuration
├── rollup.default.config.js  # 生产构建配置 / Production build configuration
├── rollup.dev.config.js      # 开发构建配置（未压缩） / Development build configuration (uncompressed)
└── README.md         # 项目说明 / Project documentation
```

## 📦 已包含的依赖 / Included Dependencies

- [@nsnanocat/util](https://www.npmjs.com/package/@nsnanocat/util) - 实用工具函数库 / Utility functions library
- [@nsnanocat/url](https://www.npmjs.com/package/@nsnanocat/url) - URL 和 URLSearchParams polyfill
- [@nsnanocat/grpc](https://www.npmjs.com/package/@nsnanocat/grpc) - gRPC 客户端库 / gRPC client library
- [crypto-js](https://www.npmjs.com/package/crypto-js) - 加密库（默认注释，按需启用）/ Crypto library (commented by default, enable as needed)
- [Rollup](https://www.rollupjs.com) - 模块打包工具 / Module bundler

### 可用的导入模块 / Available Imports

**@nsnanocat/util** (使用命名导入 / Use named imports):
```javascript
import { 
  $app,          // 当前应用检测 / Current app detection
  $argument,     // 脚本参数 / Script arguments
  Console,       // 日志工具类 / Logging utility class
  Lodash as _,   // Lodash 工具方法（别名为 _）/ Lodash utility methods (aliased as _)
  done,          // 完成脚本执行 / Complete script execution
  notification,  // 系统通知 / System notification
  time,          // 时间格式化 / Time formatting
  wait,          // Promise延迟 / Promise-based delay
  fetch,         // Fetch polyfill
  Storage        // Storage polyfill
} from '@nsnanocat/util';
```

**@nsnanocat/url** (使用命名导入 / Use named imports):
```javascript
import { URL, URLSearchParams } from '@nsnanocat/url';
```

**@nsnanocat/grpc** (使用默认导入 / Use default import):
```javascript
import gRPC from '@nsnanocat/grpc';
// 使用 gRPC.decode() 和 gRPC.encode() / Use gRPC.decode() and gRPC.encode()
```

**crypto-js** (使用默认导入，默认注释 / Use default import, commented by default):
```javascript
import CryptoJS from 'crypto-js';
// 使用场景 / Use cases:
// - AES/DES/TripleDES 加密解密 / AES/DES/TripleDES encryption/decryption
// - MD5/SHA1/SHA256/SHA512 哈希计算 / Hash calculation
// - HMAC 签名生成和验证 / HMAC signature generation and verification
// - Base64 编码解码 / Base64 encoding/decoding

// 示例 / Examples:
// const encrypted = CryptoJS.AES.encrypt('message', 'secret').toString();
// const decrypted = CryptoJS.AES.decrypt(encrypted, 'secret').toString(CryptoJS.enc.Utf8);
// const hash = CryptoJS.SHA256('message').toString();
// const hmac = CryptoJS.HmacSHA256('message', 'secret').toString();
```

## ✏️ 编写脚本 / Writing Scripts

模板文件已包含完整的 `switch (FORMAT)` 逻辑结构，支持多种数据格式处理。

The template files now include a complete `switch (FORMAT)` logic structure that supports multiple data format processing.

### 主要特性 / Key Features

- **精确格式检测** / Precise format detection based on exact Content-Type MIME types
- **支持多种格式** / Supports multiple formats:
  - M3U8 (application/x-mpegURL, application/vnd.apple.mpegurl, audio/mpegurl)
  - XML/HTML/Plist (text/xml, text/html, application/xml, application/plist)
  - VTT (text/vtt, application/vtt)
  - JSON (text/json, application/json)
  - Protobuf/gRPC (application/protobuf, application/x-protobuf, application/grpc, application/octet-stream)
  - Plain text and form-urlencoded
- **Console.debug 日志** / Console.debug logging for debugging
- **多应用支持** / Multi-app support (Quantumult X, Surge, Loon, etc.)
- **二进制数据处理** / Binary data handling (bodyBytes, rawBody)
- **环境检测** / Environment detection using $app

### FORMAT 检测方式 / FORMAT Detection

模板使用精确的 Content-Type 匹配，而不是简单的字符串包含检测：

The template uses exact Content-Type matching instead of simple string inclusion:

```javascript
// Extract FORMAT from Content-Type (remove charset and other parameters)
const contentType = $response.headers?.['Content-Type'] || $response.headers?.['content-type'] || '';
const FORMAT = contentType.split(';')[0].trim();

// 格式判断 - Format detection
switch (FORMAT) {
  case "application/json":
    // Handle JSON
    break;
  case "application/protobuf":
  case "application/x-protobuf":
  case "application/grpc":
    // Handle protobuf/gRPC
    break;
  // ... more cases
}
```

### request.js 示例 / request.js Example

```javascript
!(async () => {
  // Import utilities using named exports
  // import { $app, Console } from '@nsnanocat/util';
  // import gRPC from '@nsnanocat/grpc';
  
  // Detect current app environment
  Console.debug(`Current App: ${$app}`);
  
  // Detect FORMAT based on Content-Type
  const FORMAT = $request.headers?.['Content-Type']?.includes('protobuf') ? 'protobuf' : 'json';
  
  switch (FORMAT) {
    case 'json':
      // Handle JSON format
      let body = JSON.parse($request.body);
      body.customField = 'customValue';
      $request.body = JSON.stringify(body);
      break;
      
    case 'protobuf':
      // Handle protobuf format
      let rawBody = ($app === "Quantumult X") ? new Uint8Array($request.bodyBytes ?? []) : $request.body ?? new Uint8Array();
      // Process protobuf data using gRPC.decode()
      const decodedBody = gRPC.decode(rawBody);
      // Modify the decoded data as needed
      // const encodedBody = gRPC.encode(modifiedData);
      // $request.body = encodedBody;
      break;
  }
  
  return $request;
})();
```

### response.js 示例 / response.js Example

```javascript
!(async () => {
  // Import utilities using named exports
  // import { $app, Console } from '@nsnanocat/util';
  // import gRPC from '@nsnanocat/grpc';
  
  // Detect current app environment
  Console.debug(`Current App: ${$app}`);
  
  // Detect FORMAT from Content-Type header
  const contentType = $response.headers?.['Content-Type'] || '';
  let FORMAT = contentType.includes('protobuf') ? 'protobuf' : 'json';
  
  switch (FORMAT) {
    case 'json':
      // Parse and modify JSON response
      let body = JSON.parse($response.body);
      body.modified = true;
      $response.body = JSON.stringify(body);
      break;
      
    case 'protobuf':
      // Handle binary protobuf data
      let rawBody = ($app === "Quantumult X") ? new Uint8Array($response.bodyBytes ?? []) : $response.body ?? new Uint8Array();
      const decodedBody = gRPC.decode(rawBody);
      Console.debug(`Decoded protobuf body`);
      // Process the decoded data
      // const modifiedBody = processData(decodedBody);
      // Encode back and update response
      // const encodedBody = gRPC.encode(modifiedBody);
      // $response.body = encodedBody;
      break;
  }
  
  return $response;
})();
```

## 🔧 NPM 脚本 / NPM Scripts

- `npm run build` - 构建生产版本（压缩） / Build production version (minified)
- `npm run build:dev` - 使用 `rollup.dev.config.js` 构建开发版本（未压缩） / Build development version with `rollup.dev.config.js` (uncompressed)
- `npm run build:watch` - 监听模式构建 / Build in watch mode

## 📚 参考 / References

本模板参考了以下项目的结构：

This template is inspired by the structure of the following projects:

- [BiliUniverse/Enhanced](https://github.com/BiliUniverse/Enhanced)
- [BiliUniverse/Redirect](https://github.com/BiliUniverse/Redirect)

## 📄 License

MIT
