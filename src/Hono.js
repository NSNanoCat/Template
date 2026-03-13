// Hono 运行时入口，复用共享响应处理流程为 HTTP 服务提供适配层。
// Hono runtime entry that reuses the shared response pipeline as an HTTP service adapter.
import { Hono } from "hono";
import { fetch } from "@nsnanocat/util";
// import { Request } from "./process/Request.mjs";
import { Response } from "./process/Response.mjs";

/**
 * Hono 应用实例。
 * Hono application instance.
 * @type {import("hono").Hono}
 */
const app = new Hono();

/***************** Processing *****************/
app.all("/:rest{.*}", async c => {
	const url = new URL(c.req.url);
	// 对 URL 进行必要的修改和重定向。
	// Apply any required URL rewrites or redirects.
	// url.hostname = "httpbin.org";

	// 将 Hono 请求转换为脚本运行时使用的 $request 结构。
	// Normalize the Hono request into the $request shape used by the script runtime.
	let $request = {
		method: c.req.method,
		url: url.toString(),
		headers: c.req.header(),
		bodyBytes: await c.req.arrayBuffer().catch(error => {
			console.info(error);
			return undefined;
		}),
	};
	let $response;
	// 预留请求前置处理钩子，启用时可在上游 fetch 前复用 Request() 逻辑。
	// Keep a request preprocessing hook available so Request() can be reused before the upstream fetch.
	// ({ $request, $response } = await Request($request));
	// if ($response) {
	//     Object.keys($response.headers).map(k => c.header(k, $response.headers[k]));
	//     return c.body($response.body);
	// }
	$response = await fetch($request);
	// 删除 content-length，避免响应体被修改后头部长度失真。
	// Remove content-length so header size does not drift after the response body is modified.
	delete $response.headers["content-length"];

	$response = await Response($request, $response);
	// 将脚本响应对象重新映射回 Hono 响应。
	// Map the processed script response back into the Hono response.
	Object.keys($response.headers).map(k => c.header(k, $response.headers[k]));
	return c.body($response.body);
});

export default app;
