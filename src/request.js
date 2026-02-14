// 导入依赖项
// Import dependencies
import { $app, $argument, Console, Lodash as _, done, notification, time, wait, fetch, Storage } from '@nsnanocat/util';
import { URL, URLSearchParams } from '@nsnanocat/url';
import gRPC from '@nsnanocat/grpc';
// 加密库（按需启用）
// Crypto library (enable as needed)
// 使用场景 / Use cases:
// - 数据加密解密（AES, DES, TripleDES 等）/ Data encryption/decryption (AES, DES, TripleDES, etc.)
// - 哈希计算（MD5, SHA1, SHA256, SHA512 等）/ Hash calculation (MD5, SHA1, SHA256, SHA512, etc.)
// - HMAC 签名生成和验证 / HMAC signature generation and verification
// - Base64 编码解码 / Base64 encoding/decoding
// - 请求体加密或签名 / Request body encryption or signing
//import CryptoJS from 'crypto-js';

// 请求脚本模板
// Request Script Template
// 此脚本在发送请求之前执行
// This script is executed before sending a request
// 您可以修改请求、添加请求头、参数等
// You can modify the request, add headers, parameters, etc.

/**
 * 主请求处理程序
 * Main request handler
 * @param {Object} $request - 请求对象 / The request object
 * @param {Object} $environment - 环境变量 / Environment variables
 * @returns {Object} 修改后的请求对象 / Modified request object
 */
!(async () => {
  // ============================================
  // 格式检测和初始化
  // Format Detection and Initialization
  // ============================================
  // 检测当前应用环境
  // Detect current app environment  
  Console.debug(`Current App: ${$app}`);
  
  Console.log(`\n🚀 ========== Request Start ==========`);
  Console.debug(`$request: ${JSON.stringify($request)}`);
  
  // 解析 URL 以便处理
  // Parse URL for processing
  const url = new URL($request.url);
  Console.debug(`Request URL: ${url.toString()}`);
  Console.debug(`URL Params: ${JSON.stringify(Object.fromEntries(url.searchParams))}`);
  
  // ============================================
  // 基于格式的请求处理
  // Format-based Request Processing
  // ============================================
  // 从 Content-Type 中提取 FORMAT（主 MIME 类型）
  // Extract FORMAT (main MIME type) from Content-Type
  const FORMAT = ($request.headers?.["Content-Type"] ?? $request.headers?.["content-type"])?.split(";")?.[0];
  
  Console.debug(`Detected FORMAT: ${FORMAT}`);
  
  // 格式判断
  // Format detection
  switch (FORMAT) {
    case undefined: // 视为无body / Treated as no body
      Console.log(`📦 No body (undefined)`);
      break;
      
    // 这些情况有意直通到 default（相同处理）
    // These cases intentionally fall through to default (same handling)
    case "application/x-www-form-urlencoded":
    case "text/plain":
    default:
      Console.log(`📦 Processing plain text or default format`);
      break;
      
    case "application/x-mpegURL":
    case "application/x-mpegurl":
    case "application/vnd.apple.mpegurl":
    case "audio/mpegurl":
      Console.log(`📦 Processing M3U8 format`);
      //body = M3U8.parse($request.body);
      //Console.debug(`body: ${JSON.stringify(body)}`);
      //$request.body = M3U8.stringify(body);
      break;
      
    case "text/xml":
    case "text/html":
    case "text/plist":
    case "application/xml":
    case "application/plist":
    case "application/x-plist":
      Console.log(`📦 Processing XML/HTML/Plist format`);
      //body = XML.parse($request.body);
      //Console.debug(`body: ${JSON.stringify(body)}`);
      //$request.body = XML.stringify(body);
      break;
      
    case "text/vtt":
    case "application/vtt":
      Console.log(`📦 Processing VTT format`);
      //body = VTT.parse($request.body);
      //Console.debug(`body: ${JSON.stringify(body)}`);
      //$request.body = VTT.stringify(body);
      break;
      
    case "text/json":
    case "application/json":
      Console.log(`📦 Processing JSON format`);
      //body = JSON.parse($request.body ?? "{}");
      //Console.debug(`body: ${JSON.stringify(body)}`);
      //$request.body = JSON.stringify(body);
      break;
      
    case "application/protobuf":
    case "application/x-protobuf":
    case "application/vnd.google.protobuf":
    case "application/grpc":
    case "application/grpc+proto":
    case "application/octet-stream": {
      Console.log(`📦 Processing Protobuf/gRPC format`);
      //Console.debug(`$request.body: ${JSON.stringify($request.body)}`);
      // 读取二进制数据
      // Read binary data
      let rawBody = ($app === "Quantumult X") ? new Uint8Array($request.bodyBytes ?? []) : ($request.body ?? new Uint8Array());
      //Console.debug(`isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`);
      // 格式判断
      // Format detection
      switch (FORMAT) {
        case "application/protobuf":
        case "application/x-protobuf":
        case "application/vnd.google.protobuf":
          break;
        case "application/grpc":
        case "application/grpc+proto":
          // 解码 gRPC 数据
          // Decode gRPC data
          rawBody = gRPC.decode(rawBody);
          // 解析链接并处理 protobuf 数据
          // Parse link and process protobuf data
          // 示例：解析路径（需要先定义）
          // Example: Parse paths (need to be defined first)
          // const PATHs = url.pathname.split("/").filter(Boolean);
          // 主机判断
          // Host detection
          //switch (url.hostname) {
          //  case "example.com":
          //    // 路径判断
          //    // Path detection
          //    switch (PATHs?.[0]) {
          //      case "service.path":
          //        // 处理 protobuf 消息
          //        // Process protobuf message
          //        //body = ProtoMessage.fromBinary(rawBody);
          //        //Console.debug(`body: ${JSON.stringify(body)}`);
          //        // 修改消息内容
          //        // Modify message content
          //        //body.field = value;
          //        //rawBody = ProtoMessage.toBinary(body);
          //        break;
          //    }
          //    break;
          //}
          // 编码 gRPC 数据
          // Encode gRPC data
          rawBody = gRPC.encode(rawBody);
          break;
      }
      // 写入二进制数据
      // Write binary data
      //Console.debug(`rawBody: ${JSON.stringify(rawBody)}`);
      $request.body = rawBody;
      break;
    }
  }
  
  // ============================================
  // 通用请求修改
  // Common Request Modifications
  // ============================================
  // 示例：添加自定义请求头
  // Example: Add custom headers
  // $request.headers['X-Custom-Header'] = 'CustomValue';
  // $request.headers['User-Agent'] = 'Custom User Agent';
  
  // 示例：修改 URL 参数
  // Example: Modify URL parameters
  // url.searchParams.set('key', 'value');
  $request.url = url.toString();
  Console.debug(`$request.url: ${$request.url}`);
  
  Console.log(`🏁 ========== Request End ==========\n`);
  Console.debug(`Modified $request: ${JSON.stringify($request)}`);
  
  // 重要：添加您的逻辑时，请取消注释下面的 return 语句
  // IMPORTANT: Uncomment the return statement below when you add your logic
  // 返回修改后的响应数据（如果有）或由 finally 块处理
  // Return the modified response data (if any) or let the finally block handle it
  // return $response;
})()
  .catch(e => Console.error(e))
  .finally(() => {
    switch (typeof $response) {
      case "object": // 有构造回复数据，返回构造的回复数据
        // Has constructed response data, return the constructed response data
        //Console.debug("finally", `echo $response: ${JSON.stringify($response, null, 2)}`);
        if ($response.headers?.["Content-Encoding"]) $response.headers["Content-Encoding"] = "identity";
        if ($response.headers?.["content-encoding"]) $response.headers["content-encoding"] = "identity";
        switch ($app) {
          default:
            done({ response: $response });
            break;
          case "Quantumult X":
            if (!$response.status) $response.status = "HTTP/1.1 200 OK";
            delete $response.headers?.["Content-Length"];
            delete $response.headers?.["content-length"];
            delete $response.headers?.["Transfer-Encoding"];
            done($response);
            break;
        }
        break;
      case "undefined": // 无构造回复数据，发送修改的请求数据
        // No constructed response data, send the modified request data
        //Console.debug("finally", `$request: ${JSON.stringify($request, null, 2)}`);
        done($request);
        break;
      default:
        Console.error(`不合法的 $response 类型: ${typeof $response}`);
        done();
        break;
    }
  });
