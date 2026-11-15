// 回显模式入口（Quantumult X script-analyze-echo-response）：请求阶段取上游并处理响应。
// Echo mode entry (Quantumult X script-analyze-echo-response): fetch the upstream response and process it in the request phase.
import { Console, done, fetch } from "@nsnanocat/util";
import { Request } from "./process/Request.mjs";
import { Response } from "./process/Response.mjs";
/***************** Processing *****************/
let $response;
!(async () => {
	// 回显模式下请求体已完整，先执行请求处理；已构造响应时直接使用。
	// The request body is complete in echo mode, so run request processing first; use the response if one is constructed.
	({ $request, $response } = await Request($request));
	if (typeof $response === "undefined") {
		// 要求上游返回未压缩内容，便于 Response() 直接读取文本。
		// Ask the upstream for an uncompressed body so Response() can read the text directly.
		const aeKey = Object.keys($request.headers ?? {}).find(k => k.toLowerCase() === "accept-encoding") ?? "Accept-Encoding";
		($request.headers ??= {})[aeKey] = "identity";
		$response = await fetch($request);
		$response = await Response($request, $response);
	}
})()
	.catch(e => Console.error(e))
	.finally(() => {
		// 回显模式必须交回完整响应；异常时返回 502，避免空响应。
		// Echo mode must return a complete response; return 502 on failure to avoid an empty reply.
		$response ??= { status: 502, headers: {}, body: "" };
		$response.status ??= 200;
		// 响应体可能已被改写，去掉与编码和长度相关的响应头。
		// The body may have been rewritten, so drop encoding and length headers.
		for (const name of ["Content-Encoding", "content-encoding", "Content-Length", "content-length", "Transfer-Encoding", "transfer-encoding"]) {
			delete $response.headers?.[name];
		}
		done($response);
	});
