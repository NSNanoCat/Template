// Import dependencies
import * as util from '@nsnanocat/util';
import { URL, URLSearchParams } from '@nsnanocat/url';
import * as grpc from '@nsnanocat/grpc';

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
  // TODO: Add your request handling logic here
  // ============================================
  
  // Example: Modify request URL
  // const url = new URL($request.url);
  // url.searchParams.set('key', 'value');
  // $request.url = url.toString();
  
  // Example: Add or modify headers
  // $request.headers['Authorization'] = 'Bearer token';
  
  // Example: Log request details
  // console.log('Request URL:', $request.url);
  // console.log('Request Method:', $request.method);
  
  // Return the modified request
  // return $request;
})();
