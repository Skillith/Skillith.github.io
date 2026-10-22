const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const ARTIFACT_DIR = path.resolve('C:\\Users\\skill\\.gemini\\antigravity\\brain\\0e3786db-6295-4665-81ab-54eb2db7b043');

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

server.listen(8093, async () => {
    console.log('[VISUAL] Local server started on http://127.0.0.1:8093');

    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const chrome = spawn(chromePath, [
        '--headless=new',
        '--remote-debugging-port=9226',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-gpu',
        'about:blank'
    ]);

    await new Promise(r => setTimeout(r, 1500));

    try {
        const listRes = await fetch('http://127.0.0.1:9226/json/list');
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

        // 1. Desktop Viewport (1440x900)
        await send('Emulation.setDeviceMetricsOverride', {
            width: 1440,
            height: 900,
            deviceScaleFactor: 1,
            mobile: false
        });

        console.log('[VISUAL] Navigating desktop to http://127.0.0.1:8093 ...');
        await send('Page.navigate', { url: 'http://127.0.0.1:8093' });
        await new Promise(r => setTimeout(r, 2000));

        // Take Desktop Top View
        const shotDesktop = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'preview-desktop-hero.png'), Buffer.from(shotDesktop.result.data, 'base64'));
        console.log('[VISUAL] Saved preview-desktop-hero.png');

        // Scroll to Enterprise Section
        await send('Runtime.evaluate', { expression: "document.getElementById('enterprise').scrollIntoView();" });
        await new Promise(r => setTimeout(r, 800));
        const shotEnterprise = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'preview-desktop-enterprise.png'), Buffer.from(shotEnterprise.result.data, 'base64'));
        console.log('[VISUAL] Saved preview-desktop-enterprise.png');

        // Scroll to Projects Section (showing Last Breath)
        await send('Runtime.evaluate', { expression: "document.getElementById('projects').scrollIntoView();" });
        await new Promise(r => setTimeout(r, 800));
        const shotProjects = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'preview-desktop-projects.png'), Buffer.from(shotProjects.result.data, 'base64'));
        console.log('[VISUAL] Saved preview-desktop-projects.png');

        // Click QR Pass Button & Take Screenshot
        await send('Runtime.evaluate', { expression: "document.getElementById('qrOpenBtn').click();" });
        await new Promise(r => setTimeout(r, 600));
        const shotQr = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'preview-desktop-qr-modal.png'), Buffer.from(shotQr.result.data, 'base64'));
        console.log('[VISUAL] Saved preview-desktop-qr-modal.png');
        await send('Runtime.evaluate', { expression: "document.getElementById('qrModalClose').click();" });

        // Click Request Demo Button & Take Screenshot
        await send('Runtime.evaluate', { expression: "document.getElementById('btnRequestLexDemo').click();" });
        await new Promise(r => setTimeout(r, 600));
        const shotDemo = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'preview-desktop-demo-modal.png'), Buffer.from(shotDemo.result.data, 'base64'));
        console.log('[VISUAL] Saved preview-desktop-demo-modal.png');
        await send('Runtime.evaluate', { expression: "document.getElementById('demoModalClose').click();" });

        // 2. Mobile Viewport (390x844 - iPhone 14)
        await send('Emulation.setDeviceMetricsOverride', {
            width: 390,
            height: 844,
            deviceScaleFactor: 2,
            mobile: true
        });
        await send('Runtime.evaluate', { expression: "window.scrollTo(0, 0);" });
        await new Promise(r => setTimeout(r, 1000));
        const shotMobile = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'preview-mobile-hero.png'), Buffer.from(shotMobile.result.data, 'base64'));
        console.log('[VISUAL] Saved preview-mobile-hero.png');

        console.log('[VISUAL SUCCESS] All screenshots captured successfully in artifact directory!');
        ws.close();
    } catch (err) {
        console.error('[VISUAL ERROR]', err);
    } finally {
        chrome.kill();
        server.close();
    }
});
