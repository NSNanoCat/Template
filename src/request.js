// 导入依赖项
// Import dependencies
import { $app, Console, Lodash, done, notification, time, wait, getStorage, fetch, Storage, StatusTexts } from '@nsnanocat/util';
import { URL, URLSearchParams } from '@nsnanocat/url';
import gRPC from '@nsnanocat/grpc';

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
  // 获取 Content-Type 并提取主 MIME 类型
  // Get Content-Type and extract the main MIME type
  const contentType = $request.headers?.['Content-Type'] || $request.headers?.['content-type'] || '';
  // 从 Content-Type 中提取 FORMAT（删除 charset 和其他参数）
  // Extract FORMAT from Content-Type (remove charset and other parameters)
  const FORMAT = contentType.split(';')[0].trim();
  
  Console.debug(`Content-Type: ${contentType}`);
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
    case "application/octet-stream":
      Console.log(`📦 Processing Protobuf/gRPC format`);
      //Console.debug(`$request.body: ${JSON.stringify($request.body)}`);
      //let rawBody = ($app === "Quantumult X") ? new Uint8Array($request.bodyBytes ?? []) : $request.body ?? new Uint8Array();
      //Console.debug(`isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`);
      // 写入二进制数据
      // Write binary data
      //Console.debug(`rawBody: ${JSON.stringify(rawBody)}`);
      //$request.body = rawBody;
      break;
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
        break;
    }
  });
