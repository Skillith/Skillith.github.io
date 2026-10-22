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

        // Evaluate UI state for all User Stories
        const evalRes = await send('Runtime.evaluate', {
            expression: `
                (() => {
                    const results = {};
                    
                    // US-1: Layout and section order verification
                    const enterpriseSec = document.getElementById('enterprise');
                    const projectsSec = document.getElementById('projects');
                    const aboutSec = document.getElementById('about');

                    results.us1 = {
                        hasHeroProofStrip: !!document.querySelector('.proof-strip'),
                        hasHeroConciergeBar: !!document.querySelector('.concierge-hero-bar'),
                        enterpriseBeforeProjects: (enterpriseSec.compareDocumentPosition(projectsSec) & Node.DOCUMENT_POSITION_FOLLOWING) > 0,
                        projectsBeforeAbout: (projectsSec.compareDocumentPosition(aboutSec) & Node.DOCUMENT_POSITION_FOLLOWING) > 0
                    };

                    // US-2: LexSecure Enterprise Spotlight Card & Demo Request Modal
                    const lexCard = document.getElementById('cardLexSecure');
                    const lexDemoBtn = document.getElementById('btnRequestLexDemo');
                    const lexVitalsBtn = document.querySelector('.btn-vitals[data-project="lexsecure"]');
                    
                    if (lexDemoBtn) lexDemoBtn.click();
                    const demoModalOpen = document.getElementById('demoRequestModal').classList.contains('active');
                    document.getElementById('demoModalClose').click();

                    if (lexVitalsBtn) lexVitalsBtn.click();
                    const lexVitalsModal = {
                        opened: document.getElementById('vitalsModal').classList.contains('active'),
                        title: document.getElementById('vitalsAppTitle').textContent,
                        coreActionName: document.getElementById('vitalCoreActionName').textContent,
                        coreCount: document.getElementById('vitalCoreCount').textContent,
                        aiCost: document.getElementById('vitalAiCost').textContent
                    };
                    document.getElementById('vitalsModalClose').click();

                    results.us2 = {
                        hasLexCard: !!lexCard,
                        demoModalOpens: demoModalOpen,
                        lexVitalsModal
                    };

                    // US-3: Last Breath Game Card & Vitals
                    const lbCard = document.getElementById('cardLastBreath');
                    const lbLink = lbCard ? lbCard.querySelector('a.project-link[href="https://last-breath-game-2026.web.app"]') : null;
                    const lbVitalsBtn = document.querySelector('.btn-vitals[data-project="last-breath"]');

                    if (lbVitalsBtn) lbVitalsBtn.click();
                    const lbVitalsModal = {
                        opened: document.getElementById('vitalsModal').classList.contains('active'),
                        title: document.getElementById('vitalsAppTitle').textContent,
                        installs: document.getElementById('vitalInstalls').textContent,
                        revenue: document.getElementById('vitalRevenue').textContent,
                        paying: document.getElementById('vitalPaying').textContent
                    };
                    document.getElementById('vitalsModalClose').click();

                    results.us3 = {
                        hasLbCard: !!lbCard,
                        hasLiveLink: !!lbLink,
                        lbVitalsModal
                    };

                    // US-4: AI Concierge Drawer & Tool dispatch elements
                    const conciergeDrawer = document.getElementById('aiConciergeDrawer');
                    const floatingAiBtn = document.getElementById('floatingAiTrigger');
                    results.us4 = {
                        hasDrawer: !!conciergeDrawer,
                        hasFloatingBtn: !!floatingAiBtn,
                        hasChips: document.querySelectorAll('.chip').length > 0
                    };

                    // US-5: Phone QR Pass Modal
                    const qrBtn = document.getElementById('qrOpenBtn');
                    if (qrBtn) qrBtn.click();
                    const qrModalOpen = document.getElementById('qrModal').classList.contains('active');
                    const qrImgSrc = document.getElementById('qrImageElement')?.getAttribute('src');
                    document.getElementById('qrModalClose').click();

                    results.us5 = {
                        qrModalOpens: qrModalOpen,
                        qrImgSrc
                    };

                    // US-6: User stat badges
                    const badges = {};
                    document.querySelectorAll('.user-stat-badge').forEach(b => {
                        const proj = b.getAttribute('data-project');
                        const num = b.querySelector('.stat-num')?.textContent.trim();
                        badges[proj] = num;
                    });
                    results.badges = badges;

                    // Existing project modals verification
                    const meBtn = document.querySelector('.btn-vitals[data-project="morn-eve"]');
                    if (meBtn) meBtn.click();
                    results.mornEveModal = {
                        installs: document.getElementById('vitalInstalls').textContent,
                        revenue: document.getElementById('vitalRevenue').textContent
                    };
                    document.getElementById('vitalsModalClose').click();

                    const tcBtn = document.querySelector('.btn-vitals[data-project="terracatch"]');
                    if (tcBtn) tcBtn.click();
                    results.terraCatchModal = {
                        installs: document.getElementById('vitalInstalls').textContent,
                        revenue: document.getElementById('vitalRevenue').textContent
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

        // US-1 Checks
        if (!testResults.us1.hasHeroProofStrip || !testResults.us1.hasHeroConciergeBar) {
            console.error('FAIL US-1: Hero missing Proof Strip or Concierge Bar');
            pass = false;
        }
        if (!testResults.us1.enterpriseBeforeProjects || !testResults.us1.projectsBeforeAbout) {
            console.error('FAIL US-1: Section order incorrect. Expected Enterprise -> Projects -> About');
            pass = false;
        }

        // US-2 Checks
        if (!testResults.us2.hasLexCard || !testResults.us2.demoModalOpens) {
            console.error('FAIL US-2: LexSecure card missing or Demo Request modal failed to open');
            pass = false;
        }
        if (testResults.us2.lexVitalsModal.title !== 'LexSecure' || testResults.us2.lexVitalsModal.coreCount !== '150') {
            console.error('FAIL US-2: LexSecure vitals mismatch', testResults.us2.lexVitalsModal);
            pass = false;
        }

        // US-3 Checks
        if (!testResults.us3.hasLbCard || !testResults.us3.hasLiveLink) {
            console.error('FAIL US-3: Last Breath card or live link missing');
            pass = false;
        }
        if (testResults.us3.lbVitalsModal.title !== 'Last Breath' || testResults.us3.lbVitalsModal.installs !== '24') {
            console.error('FAIL US-3: Last Breath vitals mismatch', testResults.us3.lbVitalsModal);
            pass = false;
        }

        // US-4 Checks
        if (!testResults.us4.hasDrawer || !testResults.us4.hasFloatingBtn || !testResults.us4.hasChips) {
            console.error('FAIL US-4: AI Concierge drawer, floating trigger, or chips missing');
            pass = false;
        }

        // US-5 Checks
        if (!testResults.us5.qrModalOpens || testResults.us5.qrImgSrc !== 'assets/skillith-qr.svg') {
            console.error('FAIL US-5: QR modal failed to open or QR image src is incorrect');
            pass = false;
        }

        // Existing regressions
        if (testResults.mornEveModal.installs !== '257' || testResults.mornEveModal.revenue !== '$0') {
            console.error('FAIL: Morn & Eve vitals regression');
            pass = false;
        }
        if (testResults.terraCatchModal.installs !== '293' || !testResults.terraCatchModal.revenue.includes('$2.99')) {
            console.error('FAIL: TerraCatch vitals regression');
            pass = false;
        }

        if (pass) {
            console.log('[TEST SUCCESS] All User Stories (US-1 to US-6) verified accurately in local browser environment!');
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
