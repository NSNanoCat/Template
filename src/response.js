// Import dependencies
import { $app, Console, Lodash, done, notification, time, wait, getStorage, fetch, Storage, StatusTexts } from '@nsnanocat/util';
import { URL, URLSearchParams } from '@nsnanocat/url';
import gRPC from '@nsnanocat/grpc';

// Response Script Template
// This script is executed after receiving a response
// You can modify the response, parse data, handle errors, etc.

/**
 * Main response handler
 * @param {Object} $response - The response object
 * @param {Object} $request - The original request object
 * @returns {Object} Modified response object
 */
!(async () => {
  // ============================================
  // Format Detection and Initialization
  // ============================================
  // Detect current app environment
  Console.debug(`Current App: ${$app}`);
  
  Console.log(`\n🚀 ========== Response Start ==========`);
  Console.debug(`$response.statusCode: ${$response.statusCode}`);
  Console.debug(`$response.headers: ${JSON.stringify($response.headers)}`);
  
  // ============================================
  // Format-based Response Processing
  // ============================================
  // Get Content-Type and extract the main MIME type
  const contentType = $response.headers?.['Content-Type'] || $response.headers?.['content-type'] || '';
  // Extract FORMAT from Content-Type (remove charset and other parameters)
  const FORMAT = contentType.split(';')[0].trim();
  
  Console.debug(`Content-Type: ${contentType}`);
  Console.debug(`Detected FORMAT: ${FORMAT}`);
  Console.debug(`$response.body: ${JSON.stringify($response.body)}`);
  
  // 格式判断
  switch (FORMAT) {
    case undefined: // 视为无body
      Console.log(`📦 No body (undefined)`);
      break;
      
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
      //body = M3U8.parse($response.body);
      //Console.debug(`body: ${JSON.stringify(body)}`);
      //$response.body = M3U8.stringify(body);
      break;
      
    case "text/xml":
    case "text/html":
    case "text/plist":
    case "application/xml":
    case "application/plist":
    case "application/x-plist":
      Console.log(`📦 Processing XML/HTML/Plist format`);
      //body = XML.parse($response.body);
      //Console.debug(`body: ${JSON.stringify(body)}`);
      //externalSubtitle = XML.parse(externalSubtitle);
      //Console.debug(`externalSubtitle: ${JSON.stringify(externalSubtitle)}`);
      //body = Composite(body, externalSubtitle, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
      //Console.debug(`body: ${JSON.stringify(body)}`);
      //$response.body = XML.stringify(body);
      break;
      
    case "text/vtt":
    case "application/vtt":
      Console.log(`📦 Processing VTT format`);
      //body = VTT.parse($response.body);
      //Console.debug(`body: ${JSON.stringify(body)}`);
      //externalSubtitle = VTT.parse(externalSubtitle);
      //Console.debug(`externalSubtitle: ${JSON.stringify(externalSubtitle)}`);
      //body = Composite(body, externalSubtitle, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
      //Console.debug(`body: ${JSON.stringify(body)}`);
      //$response.body = VTT.stringify(body);
      break;
      
    case "text/json":
    case "application/json":
      Console.log(`📦 Processing JSON format`);
      //body = JSON.parse($response.body ?? "{}");
      //Console.debug(`body: ${JSON.stringify(body)}`);
      //externalSubtitle = JSON.parse(externalSubtitle);
      //Console.debug(`externalSubtitle: ${JSON.stringify(externalSubtitle)}`);
      //body = Composite(body, externalSubtitle, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
      //Console.debug(`body: ${JSON.stringify(body)}`);
      //$response.body = JSON.stringify(body);
      break;
      
    case "application/protobuf":
    case "application/x-protobuf":
    case "application/vnd.google.protobuf":
    case "application/grpc":
    case "application/grpc+proto":
    case "application/octet-stream":
      Console.log(`📦 Processing Protobuf/gRPC format`);
      //Console.debug(`$response.body: ${JSON.stringify($response.body)}`);
      //let rawBody = ($app === "Quantumult X") ? new Uint8Array($response.bodyBytes ?? []) : $response.body ?? new Uint8Array();
      //Console.debug(`isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`);
      // 写入二进制数据
      //Console.debug(`rawBody: ${JSON.stringify(rawBody)}`);
      //$response.body = rawBody;
      break;
  }
  
  // ============================================
  // Common Response Modifications
  // ============================================
  // Example: Add custom response headers
  // $response.headers['X-Custom-Response'] = 'Modified';
  
  // Example: Handle specific status codes
  // if ($response.statusCode >= 400) {
  //   Console.error(`Request failed with status: ${$response.statusCode}`);
  //   // Handle error response
  // }
  
  Console.log(`🏁 ========== Response End ==========\n`);
  Console.debug(`Modified $response.statusCode: ${$response.statusCode}`);
  
  // IMPORTANT: Uncomment the return statement below when you add your logic
  // Return the modified response
  // return $response;
})();
