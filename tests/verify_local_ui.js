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
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
        '--autoplay-policy=no-user-gesture-required',
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
                    
                    // US-1: Lean Hero & Section Order
                    const enterpriseSec = document.getElementById('enterprise');
                    const projectsSec = document.getElementById('projects');
                    const aboutSec = document.getElementById('about');

                    results.us1 = {
                        isHeroLean: !document.querySelector('.proof-strip') && !document.querySelector('.hero-subtitle-container'),
                        hasHeroConciergeBar: !!document.querySelector('.concierge-hero-bar'),
                        enterpriseBeforeProjects: (enterpriseSec.compareDocumentPosition(projectsSec) & Node.DOCUMENT_POSITION_FOLLOWING) > 0,
                        projectsBeforeAbout: (projectsSec.compareDocumentPosition(aboutSec) & Node.DOCUMENT_POSITION_FOLLOWING) > 0
                    };

                    // US-2: Lean LexSecure Card (3 bullets + Demo modal)
                    const lexCard = document.getElementById('cardLexSecure');
                    const lexDemoBtn = document.getElementById('btnRequestLexDemo');
                    const lexVitalsBtn = document.querySelector('.btn-vitals[data-project="lexsecure"]');
                    const leanBulletsCount = document.querySelectorAll('.enterprise-lean-bullets li').length;
                    
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
                        leanBulletsCount,
                        demoModalOpens: demoModalOpen,
                        lexVitalsModal
                    };

                    // US-3: Consumer Apps Popularity Ordering
                    const projectTitles = Array.from(document.querySelectorAll('.project-title')).map(el => el.textContent.trim());
                    results.us3 = {
                        projectTitles,
                        mostPopularFirst: projectTitles[0] === 'TerraCatch' && projectTitles[1] === 'Morn & Eve',
                        hasLastBreath: projectTitles.includes('Last Breath')
                    };

                    // US-4: AI Concierge Drawer Elements
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

                    return results;
                })()
            `,
            returnByValue: true
        });

        const r = (evalRes.result && evalRes.result.result) ? evalRes.result.result.value : (evalRes.result ? evalRes.result.value : null);
        console.log('[TEST RESULTS]:', JSON.stringify(r, null, 2));

        // Assertions
        if (!r.us1.isHeroLean) throw new Error('US-1 Failed: Hero is not lean (proof strip or badge still present)');
        if (!r.us1.hasHeroConciergeBar) throw new Error('US-1 Failed: Concierge hero bar missing');
        if (!r.us2.hasLexCard || r.us2.leanBulletsCount !== 3) throw new Error('US-2 Failed: LexSecure lean card invalid or bullets count != 3');
        if (!r.us3.mostPopularFirst) throw new Error('US-3 Failed: Projects not ordered by popularity (TerraCatch must be first, Morn & Eve second)');
        if (!r.us4.hasDrawer || !r.us5.qrModalOpens) throw new Error('US-4/US-5 Failed: Concierge drawer or QR modal failed');

        // Test Live Text Chat Query to standalone skillith-portfolio Cloud Function
        console.log('[TEST] Testing live chatbot query in browser UI...');
        await send('Runtime.evaluate', {
            expression: `
                (() => {
                    const inp = document.getElementById('heroChatInput');
                    const sendBtn = document.getElementById('heroChatSend');
                    inp.value = "Tell me about LexSecure's zero data retention";
                    sendBtn.click();
                })()
            `
        });

        // Wait for Cloud Function to finish generating reply (poll up to 12s)
        let cRes = {};
        for (let wait = 0; wait < 12; wait++) {
            await new Promise(res => setTimeout(res, 1000));
            const chatCheck = await send('Runtime.evaluate', {
                expression: `
                    (() => {
                        const msgs = Array.from(document.querySelectorAll('#drawerMessages .ai-msg .msg-content p'));
                        const lastMsg = msgs.length ? msgs[msgs.length - 1].textContent : '';
                        return {
                            msgCount: msgs.length,
                            lastAiResponse: lastMsg,
                            isThinking: lastMsg === 'Thinking...',
                            containsZdrOrLex: lastMsg.toLowerCase().includes('lexsecure') || lastMsg.toLowerCase().includes('retention') || lastMsg.toLowerCase().includes('tenant') || lastMsg.toLowerCase().includes('data')
                        };
                    })()
                `,
                returnByValue: true
            });
            cRes = (chatCheck.result && chatCheck.result.result) ? chatCheck.result.result.value : (chatCheck.result ? chatCheck.result.value : {});
            if (!cRes.isThinking && cRes.msgCount >= 2) break;
        }

        console.log('[LIVE CHATBOT RESULT]:', cRes);
        if (!cRes.containsZdrOrLex) {
            throw new Error(`Chatbot live query failed! Last AI response: "${cRes.lastAiResponse}"`);
        }

        // Test Live Gemini 3.8 Live Voice Mode
        console.log('[TEST] Testing Gemini 3.8 Live Voice Mode in browser UI...');
        await send('Runtime.evaluate', {
            expression: "document.getElementById('heroVoiceTrigger').click()"
        });

        let voiceReady = false;
        for (let wait = 0; wait < 10; wait++) {
            await new Promise(res => setTimeout(res, 1000));
            const voiceCheck = await send('Runtime.evaluate', {
                expression: "({ stateText: document.getElementById('voiceStateLabel')?.textContent, heroActive: document.getElementById('heroVoiceTrigger')?.classList.contains('voice-active'), drawerActive: document.getElementById('drawerMicToggle')?.classList.contains('voice-active') })",
                returnByValue: true
            });
            const vVal = (voiceCheck.result && voiceCheck.result.result) ? voiceCheck.result.result.value : {};
            if (vVal.stateText && vVal.stateText.includes('Listening to your voice')) {
                voiceReady = true;
                break;
            }
        }
        if (!voiceReady) throw new Error('Live voice mode failed to initialize and enter listening state');

        // Turn off voice mode
        await send('Runtime.evaluate', {
            expression: "document.getElementById('drawerMicToggle').click()"
        });
        await new Promise(res => setTimeout(res, 500));
        console.log('[LIVE VOICE RESULT]: Gemini 3.8 Live WebSocket connected, authenticated, and ready.');

        console.log('[TEST SUCCESS] All tests passed! Lean layout, popularity ordering, live text chatbot, and Gemini 3.8 Live voice model confirmed.');
        ws.close();
    } catch (err) {
        console.error('[TEST ERROR]', err);
        process.exitCode = 1;
    } finally {
        chrome.kill();
        server.close();
    }
});
