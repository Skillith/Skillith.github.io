const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');

const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];
    if (reqUrl === '/') reqUrl = '/index.html';
    const filePath = path.join(REPO_ROOT, reqUrl);
    
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml'
    };

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not found');
        } else {
            res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
            res.end(data);
        }
    });
});

server.listen(8092, async () => {
    console.log('[TEST] Local server started on http://127.0.0.1:8092');

    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const chrome = spawn(chromePath, [
        '--headless=new',
        '--remote-debugging-port=9225',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-gpu',
        'about:blank'
    ]);

    await new Promise(r => setTimeout(r, 1500));

    try {
        const listRes = await fetch('http://127.0.0.1:9225/json/list');
        const list = await listRes.json();
        const tab = list.find(t => t.type === 'page');

        const ws = new WebSocket(tab.webSocketDebuggerUrl);
        let id = 1;
        const pending = new Map();

        ws.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            if (data.id && pending.has(data.id)) {
                pending.get(data.id)(data);
                pending.delete(data.id);
            }
            if (data.method === 'Runtime.consoleAPICalled') {
                console.log('[BROWSER CONSOLE]', data.params.type, data.params.args.map(a => a.value || a.description).join(' '));
            }
        };

        function send(method, params = {}) {
            return new Promise((resolve) => {
                const curId = id++;
                pending.set(curId, resolve);
                ws.send(JSON.stringify({ id: curId, method, params }));
            });
        }

        await new Promise(r => ws.onopen = r);
        await send('Runtime.enable');
        await send('Page.enable');

        console.log('[TEST] Navigating to http://127.0.0.1:8092 ...');
        await send('Page.navigate', { url: 'http://127.0.0.1:8092' });
        await new Promise(r => setTimeout(r, 2500));

        // Evaluate UI state
        const evalRes = await send('Runtime.evaluate', {
            expression: `
                (() => {
                    const results = {};
                    
                    // 1. Check Badges
                    const badges = {};
                    document.querySelectorAll('.user-stat-badge').forEach(b => {
                        const proj = b.getAttribute('data-project');
                        const num = b.querySelector('.stat-num')?.textContent.trim();
                        badges[proj] = num;
                    });
                    results.badges = badges;

                    // 2. Click Morn & Eve
                    const meBtn = document.querySelector('.btn-vitals[data-project="morn-eve"]');
                    if (meBtn) meBtn.click();
                    results.mornEveModal = {
                        opened: document.getElementById('vitalsModal').classList.contains('active'),
                        title: document.getElementById('vitalsAppTitle').textContent,
                        installs: document.getElementById('vitalInstalls').textContent,
                        revenue: document.getElementById('vitalRevenue').textContent,
                        paying: document.getElementById('vitalPaying').textContent,
                        pricingModel: document.getElementById('vitalPricingModel').textContent,
                        coreCount: document.getElementById('vitalCoreCount').textContent
                    };
                    document.getElementById('vitalsModalClose').click();

                    // 3. Click TerraCatch
                    const tcBtn = document.querySelector('.btn-vitals[data-project="terracatch"]');
                    if (tcBtn) tcBtn.click();
                    results.terraCatchModal = {
                        opened: document.getElementById('vitalsModal').classList.contains('active'),
                        title: document.getElementById('vitalsAppTitle').textContent,
                        installs: document.getElementById('vitalInstalls').textContent,
                        revenue: document.getElementById('vitalRevenue').textContent,
                        paying: document.getElementById('vitalPaying').textContent,
                        pricingModel: document.getElementById('vitalPricingModel').textContent,
                        coreCount: document.getElementById('vitalCoreCount').textContent
                    };
                    document.getElementById('vitalsModalClose').click();

                    // 4. Click Pingquest
                    const pqBtn = document.querySelector('.btn-vitals[data-project="pingquest"]');
                    if (pqBtn) pqBtn.click();
                    results.pingquestModal = {
                        opened: document.getElementById('vitalsModal').classList.contains('active'),
                        title: document.getElementById('vitalsAppTitle').textContent,
                        installs: document.getElementById('vitalInstalls').textContent,
                        revenue: document.getElementById('vitalRevenue').textContent,
                        paying: document.getElementById('vitalPaying').textContent,
                        pricingModel: document.getElementById('vitalPricingModel').textContent,
                        coreCount: document.getElementById('vitalCoreCount').textContent
                    };
                    document.getElementById('vitalsModalClose').click();

                    // 5. Click Wayfare Guide
                    const wgBtn = document.querySelector('.btn-vitals[data-project="guide"]');
                    if (wgBtn) wgBtn.click();
                    results.wayfareModal = {
                        opened: document.getElementById('vitalsModal').classList.contains('active'),
                        title: document.getElementById('vitalsAppTitle').textContent,
                        installs: document.getElementById('vitalInstalls').textContent,
                        revenue: document.getElementById('vitalRevenue').textContent,
                        paying: document.getElementById('vitalPaying').textContent,
                        pricingModel: document.getElementById('vitalPricingModel').textContent,
                        coreCount: document.getElementById('vitalCoreCount').textContent
                    };
                    document.getElementById('vitalsModalClose').click();

                    // 6. Click Dalil Notecard
                    const dalilBtn = document.querySelector('.btn-vitals[data-project="dalil"]');
                    if (dalilBtn) dalilBtn.click();
                    results.dalilModal = {
                        opened: document.getElementById('vitalsModal').classList.contains('active'),
                        title: document.getElementById('vitalsAppTitle').textContent,
                        installs: document.getElementById('vitalInstalls').textContent,
                        revenue: document.getElementById('vitalRevenue').textContent,
                        paying: document.getElementById('vitalPaying').textContent,
                        pricingModel: document.getElementById('vitalPricingModel').textContent,
                        coreCount: document.getElementById('vitalCoreCount').textContent
                    };
                    document.getElementById('vitalsModalClose').click();

                    return results;
                })()
            `,
            returnByValue: true
        });

        const testResults = evalRes.result?.result?.value;
        console.log('[TEST RESULTS]:', JSON.stringify(testResults, null, 2));

        // Assertions
        let pass = true;
        if (testResults.mornEveModal.installs !== '257') {
            console.error('FAIL: Morn & Eve installs expected 257, got', testResults.mornEveModal.installs);
            pass = false;
        }
        if (testResults.mornEveModal.revenue !== '$0' || testResults.mornEveModal.paying !== '0') {
            console.error('FAIL: Morn & Eve should be free with $0 revenue');
            pass = false;
        }
        if (testResults.terraCatchModal.installs !== '293' || testResults.terraCatchModal.paying !== '1') {
            console.error('FAIL: TerraCatch expected 293 installs and 1 paying user, got', testResults.terraCatchModal);
            pass = false;
        }
        if (!testResults.terraCatchModal.revenue.includes('$2.99')) {
            console.error('FAIL: TerraCatch revenue expected $2.99, got', testResults.terraCatchModal.revenue);
            pass = false;
        }
        if (testResults.pingquestModal.installs !== '52') {
            console.error('FAIL: Pingquest installs expected 52, got', testResults.pingquestModal.installs);
            pass = false;
        }
        if (testResults.wayfareModal.installs !== '14') {
            console.error('FAIL: Wayfare Guide installs expected 14, got', testResults.wayfareModal.installs);
            pass = false;
        }
        if (testResults.dalilModal.installs !== '9' || testResults.dalilModal.paying !== '1' || testResults.dalilModal.revenue !== '$4.99/mo') {
            console.error('FAIL: Dalil Notecard expected 9 installs, 1 paying, $4.99/mo, got', testResults.dalilModal);
            pass = false;
        }

        if (pass) {
            console.log('[TEST SUCCESS] All local UI and Vitals modal data verified accurately!');
        } else {
            process.exitCode = 1;
        }

        ws.close();
    } catch (e) {
        console.error('[TEST ERROR]', e);
        process.exitCode = 1;
    } finally {
        chrome.kill();
        server.close();
    }
});
