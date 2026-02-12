// Import dependencies
import * as util from '@nsnanocat/util';
import { URL, URLSearchParams } from '@nsnanocat/url';
import * as grpc from '@nsnanocat/grpc';

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
  // TODO: Add your response handling logic here
  // ============================================
  
  // Example: Parse JSON response
  // const data = JSON.parse($response.body);
  
  // Example: Modify response body
  // data.modified = true;
  // $response.body = JSON.stringify(data);
  
  // Example: Log response details
  // console.log('Response Status:', $response.statusCode);
  // console.log('Response Body:', $response.body);
  
  // Example: Handle errors
  // if ($response.statusCode >= 400) {
  //   console.error('Request failed:', $response.statusCode);
  // }
  
  // Return the modified response
  // return $response;
})();
