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
  // Detect or set FORMAT (e.g., 'json', 'protobuf', 'xml')
  const FORMAT = $request.headers?.['Content-Type']?.includes('protobuf') ? 'protobuf' : 'json';
  Console.debug(`Detected FORMAT: ${FORMAT}`);
  
  switch (FORMAT) {
    case 'json':
      Console.log(`📦 Processing JSON format request`);
      // Example: Parse and modify JSON body
      // if ($request.body) {
      //   let body = JSON.parse($request.body);
      //   body.customField = 'customValue';
      //   $request.body = JSON.stringify(body);
      // }
      break;
      
    case 'protobuf':
    case 'x-protobuf':
      Console.log(`📦 Processing Protobuf format request`);
      // Example: Handle binary protobuf data
      // let rawBody = ($app === "Quantumult X") ? new Uint8Array($request.bodyBytes ?? []) : $request.body ?? new Uint8Array();
      // Console.debug(`isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`);
      // Process protobuf data here using gRPC.decode()
      // const decodedBody = gRPC.decode(rawBody);
      // $request.body = rawBody;
      break;
      
    case 'xml':
      Console.log(`📦 Processing XML format request`);
      // Handle XML format requests
      break;
      
    default:
      Console.log(`📦 Processing default format request`);
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
