// Import dependencies
import { $app, Console, Lodash, done, notification, time, wait, getStorage, fetch, Storage, StatusTexts } from '@nsnanocat/util';
import { URL, URLSearchParams } from '@nsnanocat/url';
import gRPC from '@nsnanocat/grpc';

// Request Script Template
// This script is executed before sending a request
// You can modify the request, add headers, parameters, etc.

/**
 * Main request handler
 * @param {Object} $request - The request object
 * @param {Object} $environment - Environment variables
 * @returns {Object} Modified request object
 */
!(async () => {
  // ============================================
  // Format Detection and Initialization
  // ============================================
  // Detect current app environment  
  Console.debug(`Current App: ${$app}`);
  
  Console.log(`\n🚀 ========== Request Start ==========`);
  Console.debug(`$request: ${JSON.stringify($request)}`);
  
  // Parse URL for processing
  const url = new URL($request.url);
  Console.debug(`Request URL: ${url.toString()}`);
  Console.debug(`URL Params: ${JSON.stringify(Object.fromEntries(url.searchParams))}`);
  
  // ============================================
  // Format-based Request Processing
  // ============================================
  // Get Content-Type and extract the main MIME type
  const contentType = $request.headers?.['Content-Type'] || $request.headers?.['content-type'] || '';
  // Extract FORMAT from Content-Type (remove charset and other parameters)
  const FORMAT = contentType.split(';')[0].trim();
  
  Console.debug(`Content-Type: ${contentType}`);
  Console.debug(`Detected FORMAT: ${FORMAT}`);
  
  // 格式判断
  switch (FORMAT) {
    case undefined: // 视为无body
      Console.log(`📦 No body (undefined)`);
      break;
      
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
      //Console.debug(`rawBody: ${JSON.stringify(rawBody)}`);
      //$request.body = rawBody;
      break;
  }
  
  // ============================================
  // Common Request Modifications
  // ============================================
  // Example: Add custom headers
  // $request.headers['X-Custom-Header'] = 'CustomValue';
  // $request.headers['User-Agent'] = 'Custom User Agent';
  
  // Example: Modify URL parameters
  // url.searchParams.set('key', 'value');
  // $request.url = url.toString();
  
  Console.log(`🏁 ========== Request End ==========\n`);
  Console.debug(`Modified $request: ${JSON.stringify($request)}`);
  
  // IMPORTANT: Uncomment the return statement below when you add your logic
  // Return the modified request
  // return $request;
})();
