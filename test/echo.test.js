// 回显入口的单元测试：模拟 Quantumult X 运行环境，检查请求阶段取上游、返回响应与失败兜底。
// Unit tests for the echo entry: simulate the Quantumult X runtime and check upstream fetching, response delivery and failure handling.
import assert from "node:assert/strict";
import { test } from "node:test";

/**
 * 在模拟的 Quantumult X 环境中执行一次回显入口。
 * Run the echo entry once in a simulated Quantumult X environment.
 * @param {string} name - 模块缓存键，保证每个用例都会重新执行入口 / Cache key that makes every case run the entry again.
 * @param {Object} request - 模拟的 $request 对象 / Simulated $request object.
 * @param {Function} fetchImpl - 模拟的 $task.fetch 实现 / Simulated $task.fetch implementation.
 * @returns {Promise<Object>} 交给 $done 的响应 / Response passed to $done.
 */
async function runEcho(name, request, fetchImpl) {
	const finished = new Promise(resolve => {
		globalThis.$done = resolve;
	});
	globalThis.$task = { fetch: fetchImpl };
	globalThis.$request = request;
	await import(`../src/echo.js?case=${name}`);
	return finished;
}

test("回显入口：请求阶段取上游并返回处理后的响应 / echo entry fetches upstream and returns the processed response", async () => {
	const sent = [];
	const out = await runEcho("ok", { url: "https://example.com/api", method: "POST", headers: { "Content-Type": "application/json", "Accept-Encoding": "gzip, br", Host: "example.com" }, body: '{"route":"demo"}' }, async req => {
		sent.push(req);
		return { statusCode: 200, headers: { "Content-Type": "application/json", "Content-Encoding": "gzip" }, body: '{"ok":true}' };
	});
	assert.equal(sent.length, 1);
	assert.equal(sent[0].url, "https://example.com/api");
	assert.equal(sent[0].headers["Accept-Encoding"], "identity");
	assert.equal(out.body, '{"ok":true}');
	assert.equal(out.headers["Content-Encoding"], undefined);
});

test("回显入口：上游请求失败时返回 502 / echo entry returns 502 when the upstream request fails", async () => {
	const out = await runEcho("fail", { url: "https://example.com/api", method: "GET", headers: {} }, async () => {
		throw new Error("network down");
	});
	assert.ok(String(out.status).includes("502"));
});
