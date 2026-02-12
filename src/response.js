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
  // Detect FORMAT based on Content-Type header
  const contentType = $response.headers?.['Content-Type'] || $response.headers?.['content-type'] || '';
  let FORMAT = 'json'; // default
  
  if (contentType.includes('protobuf') || contentType.includes('x-protobuf')) {
    FORMAT = 'protobuf';
  } else if (contentType.includes('xml')) {
    FORMAT = 'xml';
  } else if (contentType.includes('json')) {
    FORMAT = 'json';
  }
  
  Console.debug(`Detected FORMAT: ${FORMAT}`);
  Console.debug(`$response.body: ${JSON.stringify($response.body)}`);
  
  switch (FORMAT) {
    case 'json':
      Console.log(`📦 Processing JSON format response`);
      // Example: Parse and modify JSON response
      // try {
      //   let body = JSON.parse($response.body);
      //   Console.debug(`Parsed JSON body:`, body);
      //   
      //   // Modify response data
      //   body.customField = 'customValue';
      //   
      //   $response.body = JSON.stringify(body);
      //   Console.debug(`Modified response body`);
      // } catch (e) {
      //   Console.error(`Failed to parse JSON: ${e.message}`);
      // }
      break;
      
    case 'protobuf':
    case 'x-protobuf':
      Console.log(`📦 Processing Protobuf format response`);
      // Example: Handle binary protobuf data
      // let rawBody = ($app === "Quantumult X") ? new Uint8Array($response.bodyBytes ?? []) : $response.body ?? new Uint8Array();
      // Console.debug(`isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`);
      // 
      // // Process protobuf data using gRPC.decode()
      // const decodedBody = gRPC.decode(rawBody);
      // // const modifiedMessage = processMessage(decodedBody);
      // // rawBody = gRPC.encode(modifiedMessage);
      // 
      // // Write binary data back
      // Console.debug(`rawBody: ${JSON.stringify(rawBody)}`);
      // $response.body = rawBody;
      break;
      
    case 'xml':
      Console.log(`📦 Processing XML format response`);
      // Handle XML format responses
      break;
      
    default:
      Console.log(`📦 Processing default format response`);
      // Handle other formats or plain text
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
