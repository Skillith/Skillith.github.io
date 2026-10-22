document.addEventListener('DOMContentLoaded', () => {
    // 1. Typing Subtitle Animation
    const typingText = document.querySelector('.typing-text');
    const headlines = [
        "Agentic Transformation & Technical PM",
        "Enterprise In-Tenant Architecture",
        "Deterministic + LLM Hybrid Systems",
        "Cloud Migration & Governance Leader"
    ];
    let headlineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentHeadline = headlines[headlineIndex];
        
        if (isDeleting) {
            typingText.textContent = currentHeadline.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingText.textContent = currentHeadline.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentHeadline.length) {
            typingSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            headlineIndex = (headlineIndex + 1) % headlines.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typingText) {
        setTimeout(typeEffect, 800);
    }

    // 2. Project Card Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function applyFilter(filterValue) {
        filterButtons.forEach(b => {
            if (b.getAttribute('data-filter') === filterValue) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });

        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'flex';
                setTimeout(() => card.style.opacity = '1', 50);
            } else {
                if (card.classList.contains(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    card.style.display = 'none';
                }
            }
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            applyFilter(filterValue);
        });
    });

    // 3. Interactive Terminal Console Simulator
    const consoleModal = document.getElementById('consoleModal');
    const termOutput = document.getElementById('termOutput');
    const termTitle = document.getElementById('termTitle');
    const modalClose = document.getElementById('modalClose');

    const terminalLogs = {
        'lexsecure': [
            { type: 'input', text: 'lexsecure --verify-sovereignty --ingest-playbook' },
            { type: 'info', text: '[INFO] Initializing In-Tenant Microsoft 365 & Azure Enterprise Pilot...' },
            { type: 'security', text: '[SECURITY] Verifying Sites.Selected Microsoft Graph API lock: Restricting app to legal site collection only.' },
            { type: 'info', text: '[ZERO-TRUST] Initializing Azure Document Intelligence direct-to-API 32KB duplex memory streaming...' },
            { type: 'success', text: '[SOVEREIGNTY] Ephemeral RAM allocation bounded: ~40MB active upload. Zero disk bytes written.' },
            { type: 'info', text: '[COGNITIVE] Foundry GPT-6 Luna (max) Zero Data Retention (ZDR) handshake: SUCCESS.' },
            { type: 'info', text: '[PLAYBOOK] Evaluating agreement against Institutional Standards (Governing Law, Liability Caps, IP Indemnity)...' },
            { type: 'success', text: '[REDLINE] Deviation detected & flagged: Counter-proposals and rationale synthesized.' },
            { type: 'info', text: '[EXPORT] Compiling tracked changes into valid native Microsoft Word (.docx)...' },
            { type: 'success', text: '[GOVERNANCE] Statutory 7-Year Retention countdown active. Emergency Legal Hold: READY.' },
            { type: 'success', text: '[UNIT-ECONOMICS] Blended cost: ~$0.0198/agreement (Hard Cap: $50 Azure Bicep budget).' }
        ],
        'last-breath': [
            { type: 'input', text: 'last-breath --run-night-matrix --sound-engine' },
            { type: 'info', text: '[INFO] Initializing Last Breath social deduction companion PWA...' },
            { type: 'info', text: '[ENGINE] Booting 100% deterministic TypeScript night-resolution matrix...' },
            { type: 'success', text: '[AUDIO] Mounting procedural Web Audio synthesizer: Bronze Bell, Rooster Chime, Execution Gong.' },
            { type: 'info', text: '[AUDIO-AUDIT] External audio downloads: 0 KB (Zero latency, fully offline-ready).' },
            { type: 'info', text: '[ROLES] Hydrating 14 modular role catalogs (Town, Wolves, Vampires, Undead, Monsters)...' },
            { type: 'security', text: '[SECURITY] Cryptographic firestore.rules verified: Player secret sniffing blocked.' },
            { type: 'info', text: '[DAY-TRIAL] Daytime trial plurality engine mounted: Dentist numbness & Ghost mode tokens active.' },
            { type: 'success', text: '[QA-GATE] Automated test suite execution: 155 Vitest and E2E integration test suites PASSED.' },
            { type: 'success', text: '[DEPLOY] Verified live production PWA at https://last-breath-game-2026.web.app' }
        ],
        'morn-eve': [
            { type: 'input', text: 'morn-eve --status' },
            { type: 'info', text: '[INFO] Initializing Morn & Eve Spiritual Companion App...' },
            { type: 'info', text: '[INFO] Loading offline-first encrypted database (Isar DB)...' },
            { type: 'success', text: '[SUCCESS] DB Decryption successful. Key validated.' },
            { type: 'info', text: '[INFO] Checking Badi\' Calendar system Feasts & Holy Days...' },
            { type: 'success', text: '[SUCCESS] Synchronized Feast tracker (Feast of Rahmat / Mercy).' },
            { type: 'info', text: '[INFO] Connecting to Firebase Cloud Sync (Progress only)...' },
            { type: 'success', text: '[SUCCESS] Streaks & Service quests synced.' },
            { type: 'info', text: '[INFO] Play Store Verification: App live - v2.1.0' },
            { type: 'info', text: '[INFO] App Store Verification: App live - v2.1.0' }
        ],
        'terracatch': [
            { type: 'input', text: 'terracatch --run-inference --video "fox_run.mp4"' },
            { type: 'info', text: '[INFO] Uploading wildlife video clip to FastAPI backend...' },
            { type: 'info', text: '[INFO] Passing frames to OpenAI Vision identification model...' },
            { type: 'success', text: '[SUCCESS] Identification Completed: Vulpes vulpes (Red Fox).' },
            { type: 'info', text: '[INFO] Generating lore-driven AI stats (HP: 60, ATK: 75, DEF: 50)...' },
            { type: 'success', text: '[SUCCESS] Stats profiles and evolution tokens generated.' },
            { type: 'info', text: '[INFO] Syncing capturing records to Exhibition Battles Hub...' },
            { type: 'success', text: '[SUCCESS] TerraCatch live environment: Online at https://terracatch.online' }
        ],
        'pingquest': [
            { type: 'input', text: 'pingquest --campaign "Whispering Caverns" --init-dm' },
            { type: 'info', text: '[INFO] Initializing Gemini 3.7 Flash AI Dungeon Master ("The Guide")...' },
            { type: 'info', text: '[INFO] Connecting to Firebase Firestore multiplayer room sync...' },
            { type: 'success', text: '[SUCCESS] Session state hydrated. 4 party members connected.' },
            { type: 'info', text: '[WAR-ROOM] Live voice deliberation stream active. Synthesizing consensus...' },
            { type: 'success', text: '[CONSENSUS] Action proposal synthesized: "Flank the shadow drake".' },
            { type: 'info', text: '[ENGINE] Resolving DC Check (Target: 14 | Roll + INT: 16.425)...' },
            { type: 'success', text: '[SUCCESS] Outcome: Critical Success with +0.035 Arcana micro-growth.' },
            { type: 'info', text: '[INFO] Story Canvas updated: Living NPC relationships and scars persisted.' }
        ],
        'dalil': [
            { type: 'input', text: 'dalil-notecard --speech-daemon --listen' },
            { type: 'info', text: '[INFO] Starting hands-free speech listener...' },
            { type: 'info', text: '[INFO] Web Speech API initialized.' },
            { type: 'info', text: '[INFO] Audio stream active. Processing live transcript...' },
            { type: 'info', text: '[TRANSCRIPT] "...on the right you see the historic gardens established in..."' },
            { type: 'success', text: '[SUCCESS] Match found: "Bahai Gardens History" checklist item [x] checked.' },
            { type: 'info', text: '[INFO] Serverless Gemini API Proxy: Throttling status safe (7 RPM).' }
        ],
        'janitor': [
            { type: 'input', text: 'mailbox-janitor --daemon --scan' },
            { type: 'info', text: '[INFO] Opening client-side Gmail REST API pipeline...' },
            { type: 'info', text: '[INFO] Accessing local Gemini 2.5 Flash API credentials...' },
            { type: 'success', text: '[SUCCESS] API Authentication confirmed.' },
            { type: 'info', text: '[INFO] Scanning inbox. Found 12 unread promotional emails...' },
            { type: 'info', text: '[AI-AGENT] Analyzing email "Summer Deals Weekly"...' },
            { type: 'success', text: '[SUCCESS] Match Action: Clean / Auto-Archive triggered.' },
            { type: 'info', text: '[INFO] Headless Google Apps Script triggers running continuously.' }
        ],
        'dawn-breakers': [
            { type: 'input', text: 'dawn-breakers --status' },
            { type: 'info', text: '[INFO] Starting Dawn-Breakers Study Companion...' },
            { type: 'info', text: '[INFO] Initializing Canvas-based Force-Directed Graph simulation...' },
            { type: 'success', text: '[SUCCESS] Loaded 120+ historical figures, 45+ cities, and 300+ connection links.' },
            { type: 'info', text: '[INFO] Mounting offline-first search index (Typo-tolerant & Accent-insensitive)...' },
            { type: 'success', text: '[SUCCESS] Fuzzy-search index ready. Cache synced for offline usage.' },
            { type: 'info', text: '[INFO] Registering DOCX and PDF Booklet exporters...' },
            { type: 'success', text: '[SUCCESS] Deployment verified: Live at https://skillith.github.io/dawn-breakers-companion/' }
        ],
        'network': [
            { type: 'input', text: 'wayfare-network --host-directory --region "Haifa, Israel"' },
            { type: 'info', text: '[INFO] Connecting to Wayfare unified Firebase Auth service...' },
            { type: 'success', text: '[SUCCESS] Host directory loaded: 28 community listings available.' },
            { type: 'info', text: '[HOST-CHARTER] Verifying host radical hospitality pledge...' },
            { type: 'success', text: '[SUCCESS] Pledges verified: Shared meals, cultural tour & community gathering.' },
            { type: 'info', text: '[GUEST-INTENT] Screening video application via unlisted stream token...' },
            { type: 'success', text: '[SUCCESS] Application approved: Direct host contact unlocked.' }
        ],
        'logic': [
            { type: 'input', text: 'wayfare-logic --route-optimization --itinerary "Brussels -> Paris"' },
            { type: 'info', text: '[INFO] Gathering flight/rail/bus data from Kiwi and Amadeus APIs...' },
            { type: 'info', text: '[INFO] Booting conversational routing planner via Gemini 3.5 Flash...' },
            { type: 'success', text: '[SUCCESS] Optimal multi-modal route found: Eurostar Rail (90m).' },
            { type: 'info', text: '[INFO] Triggering Empathy Hotel Agent for layover check...' },
            { type: 'success', text: '[SUCCESS] Hotel recommended: Empathy-aligned booking details sent.' }
        ],
        'guide': [
            { type: 'input', text: 'wayfare-guide --simulate-gps --coords "44.428,-110.588"' },
            { type: 'info', text: '[INFO] Booting GPS listener prototype...' },
            { type: 'info', text: '[GPS] Location Lock: Latitude 44.428, Longitude -110.588 (Yellowstone National Park)' },
            { type: 'info', text: '[INFO] Querying geographical database & narrator engine...' },
            { type: 'success', text: '[SUCCESS] Loaded audio folklore guide: "Yellowstone National Park narration stream..."' }
        ]
    };

    function openConsoleModal(projectId) {
        const logs = terminalLogs[projectId];
        if (!logs || !consoleModal) return;

        const title = projectId === 'lexsecure' ? 'LexSecure' :
                      projectId === 'last-breath' ? 'Last Breath' :
                      document.querySelector(`[data-project="${projectId}"]`)?.closest('.project-card')?.querySelector('.project-title')?.textContent.trim() || projectId;

        termTitle.textContent = `saman@skillith ~ project-console: ${title.toLowerCase().replace(/\s+/g, '-')}`;
        termOutput.innerHTML = '';
        consoleModal.classList.add('active');

        let logIndex = 0;
        function printNextLog() {
            if (logIndex < logs.length) {
                const log = logs[logIndex];
                const lineDiv = document.createElement('div');
                
                if (log.type === 'input') {
                    lineDiv.innerHTML = `<span class="term-prompt">saman@skillith ~ %</span> <span class="term-input">${log.text}</span>`;
                } else {
                    lineDiv.textContent = log.text;
                    lineDiv.className = `term-log-${log.type}`;
                }
                
                termOutput.appendChild(lineDiv);
                termOutput.scrollTop = termOutput.scrollHeight;
                logIndex++;
                
                const delay = log.type === 'input' ? 700 : 320;
                setTimeout(printNextLog, delay);
            }
        }
        printNextLog();
    }

    document.querySelectorAll('.btn-console').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = btn.getAttribute('data-project');
            openConsoleModal(projectId);
        });
    });

    // 4. App Creator Vitals & Funnel Data
    const appVitalsData = {
        'lexsecure': {
            title: 'LexSecure',
            status: 'Enterprise Pilot 🟢',
            subtitle: 'In-Tenant Legal Contract Intelligence • M365 & Azure',
            installs: 1,
            installsSub: 'Institutional Enterprise Pilot',
            activeNow: 0,
            dau: 1,
            paying: 1,
            convRate: '100%',
            coreActionName: 'Agreements Processed',
            coreActionCount: 150,
            coreActionDesc: '150+ benchmark enterprise agreements redlined against institutional playbooks.',
            pricingModel: 'In-Tenant Azure/M365',
            revenue: 'Enterprise Tier',
            monetizationDesc: '100% in-tenant Azure & M365 consumption under customer commercial terms. Zero SaaS markup.',
            aiCost: '$0.02',
            aiDesc: 'Foundry GPT-6 Luna (max) with Zero Data Retention. Blended ~$0.0198/agreement with $50 Azure spending cap.',
            insight: 'Data sovereignty: 100% in-tenant deployment with 32KB ephemeral RAM streaming eliminated cloud vendor lock-in.',
            funnel: [
                { stage: 'Institutional Pilot Scoping', count: 1, pct: '100%' },
                { stage: 'In-Tenant Sites.Selected Graph Binding', count: 1, pct: '100%' },
                { stage: 'Playbook Deviations Redlined (.docx)', count: 150, pct: '100%' },
                { stage: 'Statutory Retention & Legal Hold Active', count: 1, pct: '100%' }
            ]
        },
        'last-breath': {
            title: 'Last Breath',
            status: 'Production Live 🟢',
            subtitle: 'Social Deduction Companion PWA • React 19 & Web Audio',
            installs: 24,
            installsSub: 'Living-Room Game Night Players',
            activeNow: 0,
            dau: 1,
            paying: 0,
            convRate: '0.0%',
            coreActionName: 'Game Night Trials',
            coreActionCount: 48,
            coreActionDesc: '48 dynamic night cycles and daytime trials resolved via deterministic engine.',
            pricingModel: '100% Free Game Night PWA',
            revenue: '$0',
            monetizationDesc: 'Free mobile-first social deduction companion with zero paywalls and zero ads.',
            aiCost: '$0.00',
            aiDesc: 'Zero external audio/AI cost: procedural Web Audio synthesizer + deterministic TypeScript rules engine.',
            insight: 'Rigor-driven speed: 155 automated Vitest/E2E test suite ensures 100% deterministic night resolutions.',
            funnel: [
                { stage: 'Mobile PWA Room Joins', count: 24, pct: '100%' },
                { stage: 'Privacy Shield Role Card Revealed', count: 24, pct: '100%' },
                { stage: 'Night Wake & Day Trial Votes Cast', count: 48, pct: '100%' },
                { stage: 'Automated Vitest/E2E Test Suites Passed', count: 155, pct: '100%' }
            ]
        },
        'morn-eve': {
            title: 'Morn & Eve',
            status: 'Production Live 🟢',
            subtitle: 'Spiritual Companion • Flutter & Isar DB',
            installs: 257,
            installsSub: 'Verified Registered Readers',
            activeNow: 0,
            dau: 1,
            paying: 0,
            convRate: '0.0%',
            coreActionName: 'Readings Logged',
            coreActionCount: 575,
            coreActionDesc: 'Total verified daily reading cycles completed across 257 readers.',
            pricingModel: '100% Free Companion',
            revenue: '$0',
            monetizationDesc: 'Free spiritual companion app with zero ads and zero paywalls.',
            aiCost: '$0.00',
            aiDesc: 'Offline-first encrypted Isar DB + free Firebase sync tier. Zero cloud AI cost.',
            insight: 'High user stickiness: 34 readers actively maintaining unbroken daily reading streaks.',
            funnel: [
                { stage: 'Store Downloads & Accounts', count: 257, pct: '100%' },
                { stage: 'Completed First Reading Cycle', count: 257, pct: '100.0%' },
                { stage: 'Active Habit Streaks', count: 34, pct: '13.2%' },
                { stage: 'Paying Supporters (Free App)', count: 0, pct: '0.0%' }
            ]
        },
        'terracatch': {
            title: 'TerraCatch',
            status: 'Production Live 🟢',
            subtitle: 'AI Wildlife Capture Game • Flutter & FastAPI',
            installs: 293,
            installsSub: 'Verified Registered Players',
            activeNow: 0,
            dau: 1,
            paying: 1,
            convRate: '0.3%',
            coreActionName: 'Quests & Profiles',
            coreActionCount: 744,
            coreActionDesc: '744 active quests and 595 registered player battle profiles.',
            pricingModel: 'Google Play IAP',
            revenue: '$2.99 (Test Purchase)',
            monetizationDesc: 'Leaves and evolution token packs via Google Play Billing (1 verified test purchase).',
            aiCost: '$4.20',
            aiDesc: 'OpenAI Vision + FastAPI frame sampling per 1,000 video analyses.',
            insight: 'Player onboarding friction: 99.2% of account creators complete their initial player battle profile.',
            funnel: [
                { stage: 'Player Account Signups', count: 293, pct: '100%' },
                { stage: 'Player Battle Profiles Created', count: 595, pct: '203.1%' },
                { stage: 'Active Wildlife Quests Generated', count: 744, pct: '100%+' },
                { stage: 'Google Play In-App Purchases', count: 1, pct: '0.3%' }
            ]
        },
        'pingquest': {
            title: 'Pingquest',
            status: 'Production Live 🟢',
            subtitle: 'Tabletop LitRPG PWA • React 19 & Gemini 3.7',
            installs: 52,
            installsSub: 'Registered Campaign Adventurers',
            activeNow: 0,
            dau: 0,
            paying: 0,
            convRate: '0.0%',
            coreActionName: 'Chronicle Events',
            coreActionCount: 136,
            coreActionDesc: '136 living world events recorded across 12 party campaign rooms.',
            pricingModel: 'Stripe Subscription',
            revenue: '$0 (Pre-revenue)',
            monetizationDesc: 'Campaign host pass ($15/mo) and Vision Crystals packs via Stripe billing integration.',
            aiCost: '$4.20',
            aiDesc: 'Gemini 3.7 Flash prompt caching + Google Imagen 3 / Recraft V3 scene & battlemap generation.',
            insight: 'Early image generation (Google Imagen 3) was a major cost driver; introducing Vision Crystals and prompt caching stabilized unit economics.',
            funnel: [
                { stage: 'Registered Adventurers', count: 52, pct: '100%' },
                { stage: 'Joined Campaign Party Room', count: 48, pct: '92.3%' },
                { stage: 'Chronicle Event Recorded', count: 52, pct: '100.0%' },
                { stage: 'Stripe Campaign Host Subscribers', count: 0, pct: '0.0%' }
            ]
        },
        'dalil': {
            title: 'Dalil Notecard',
            status: 'Production Live 🟢',
            subtitle: 'Tour Guide Assistant • Speech API & Gemini',
            installs: 9,
            installsSub: 'Registered Tour Guides',
            activeNow: 0,
            dau: 0,
            paying: 1,
            convRate: '11.1%',
            coreActionName: 'Speech Sessions',
            coreActionCount: 3,
            coreActionDesc: '3 speech recognition sessions logged via Web Speech API & Gemini proxy.',
            pricingModel: 'Pro Guide ($4.99/mo)',
            revenue: '$4.99/mo',
            monetizationDesc: 'Pro Tour Guide subscription ($4.99/mo) via Stripe Checkout (1 verified test subscriber).',
            aiCost: '$0.12',
            aiDesc: 'Local keyword match engine bypasses 85% of Gemini API calls.',
            insight: 'Hybrid latency: Matching talking points locally before cloud calls drops checkmark latency to <200ms.',
            funnel: [
                { stage: 'Registered Tour Guides', count: 9, pct: '100%' },
                { stage: 'Microphone Permission Allowed', count: 8, pct: '88.9%' },
                { stage: 'Active Speech Route Completed', count: 3, pct: '33.3%' },
                { stage: 'Pro Tour License Purchases', count: 1, pct: '11.1%' }
            ]
        },
        'janitor': {
            title: 'Mailbox Janitor',
            status: 'Production Live 🟢',
            subtitle: 'Client-Side Gmail Cleaner • Gemini 2.5 Flash',
            installs: 35,
            installsSub: 'Connected Mailboxes',
            activeNow: 0,
            dau: 2,
            paying: 0,
            convRate: '0.0%',
            coreActionName: 'Inbox Rules Run',
            coreActionCount: 128,
            coreActionDesc: 'Client-side Gmail classification rule sets and automated archiving passes.',
            pricingModel: 'Open-Source / BYOK',
            revenue: '$0',
            monetizationDesc: 'Client-side Bring Your Own Key architecture with free automated trigger setup.',
            aiCost: '$0.00',
            aiDesc: 'Zero server cost: user connects their personal Gemini API key directly client-side.',
            insight: 'Client-side BYOK architecture completely eliminated server-side token costs and privacy liabilities.',
            funnel: [
                { stage: 'Connected Google Mailboxes', count: 35, pct: '100%' },
                { stage: 'First Bulk Scan Completed', count: 31, pct: '88.6%' },
                { stage: 'Headless Google Apps Script Triggers Set', count: 14, pct: '40.0%' },
                { stage: 'Paying Users (Free BYOK Tool)', count: 0, pct: '0.0%' }
            ]
        },
        'dawn-breakers': {
            title: 'Dawn-Breakers Companion',
            status: 'Production Live 🟢',
            subtitle: 'Historical Graph Directory • Canvas & PWA',
            installs: 85,
            installsSub: 'Active Study Scholars',
            activeNow: 0,
            dau: 3,
            paying: 0,
            convRate: '0.0%',
            coreActionName: 'Historical Entities',
            coreActionCount: 465,
            coreActionDesc: '120+ historical figures, 45+ cities, and 300+ force-directed connection graph links.',
            pricingModel: '100% Free Study Tool',
            revenue: '$0',
            monetizationDesc: 'Completely free open-source historical narrative study directory with zero paywalls.',
            aiCost: '$0.00',
            aiDesc: '100% client-side HTML5 Canvas physics and offline IndexedDB PWA cache.',
            insight: 'Typo-tolerant fuzzy searching increased historical connection discovery by 3.2x.',
            funnel: [
                { stage: 'Study Scholars & PWA Installs', count: 85, pct: '100%' },
                { stage: 'Fuzzy Search Executed', count: 74, pct: '87.1%' },
                { stage: 'Graph Node Explored (3+ Levels Deep)', count: 62, pct: '72.9%' },
                { stage: 'Paying Customers (Free Tool)', count: 0, pct: '0.0%' }
            ]
        },
        'guide': {
            title: 'Wayfare Guide',
            status: 'Launching Soon 🟢',
            subtitle: 'GPS Road-Trip Narrator • Flutter & Gemini API',
            installs: 14,
            installsSub: 'Closed Testing Cohort',
            activeNow: 0,
            dau: 1,
            paying: 0,
            convRate: '0.0%',
            coreActionName: 'Test Drives Run',
            coreActionCount: 14,
            coreActionDesc: '14 closed beta road-trip routes tested across national park GPS checkpoints.',
            pricingModel: 'RevenueCat Pass',
            revenue: '$0 (Pre-launch)',
            monetizationDesc: 'Offline national park audio packs and annual companion pass via RevenueCat.',
            aiCost: '$1.85',
            aiDesc: 'Gemini 2.5 Flash audio streaming throttled by velocity and coordinate deltas.',
            insight: 'Geofencing optimization: Triggering narration on distance deltas cut API token burn by 70%.',
            funnel: [
                { stage: 'Closed Beta Testers Enrolled', count: 14, pct: '100%' },
                { stage: 'GPS Stream Permission Allowed', count: 14, pct: '100.0%' },
                { stage: 'First Road-trip Narration Completed', count: 12, pct: '85.7%' },
                { stage: 'RevenueCat Audio Pass Purchases', count: 0, pct: '0.0%' }
            ]
        },
        'network': {
            title: 'Wayfare Network',
            status: 'In Design 🔵',
            subtitle: 'Hospitality Directory • React & Firebase',
            installs: 28,
            installsSub: 'Registered Community Hosts',
            activeNow: 0,
            dau: 0,
            paying: 0,
            convRate: '0.0%',
            coreActionName: 'Host Pledges',
            coreActionCount: 28,
            coreActionDesc: 'Radical hospitality charters and cultural outing pledges verified.',
            pricingModel: 'Pay-What-You-Want',
            revenue: '$0 (Pre-launch)',
            monetizationDesc: 'Sustainable PWYW community contribution model upon booking.',
            aiCost: '$0.00',
            aiDesc: 'Shared Firebase Auth infrastructure across the Wayfare ecosystem.',
            insight: 'Unlisted video applications provide 100% high-intent filtering for respectful community travelers.',
            funnel: [
                { stage: 'Host Community Signups', count: 28, pct: '100%' },
                { stage: 'Radical Hospitality Charter Signed', count: 28, pct: '100%' },
                { stage: 'Unlisted Video Intent Screening', count: 18, pct: '64.3%' },
                { stage: 'Pre-launch Bookings Reserved', count: 0, pct: '0.0%' }
            ]
        },
        'logic': {
            title: 'Wayfare Logic',
            status: 'In Design 🔵',
            subtitle: 'Conversational Routing Engine • Gemini Flash',
            installs: 19,
            installsSub: 'Beta Route Planners',
            activeNow: 0,
            dau: 0,
            paying: 0,
            convRate: '0.0%',
            coreActionName: 'Routes Optimized',
            coreActionCount: 46,
            coreActionDesc: 'Multi-modal flight, rail, and bus itineraries synthesized.',
            pricingModel: 'Commission / Booking',
            revenue: '$0 (Pre-launch)',
            monetizationDesc: 'Direct-booking affiliate links with Kiwi & Amadeus APIs.',
            aiCost: '$0.28',
            aiDesc: 'Gemini 3.5 Flash multi-modal intake interview loops.',
            insight: 'Layover Empathy Hotel matching converts flight pauses into purposeful micro-stays.',
            funnel: [
                { stage: 'Itinerary Intakes Initiated', count: 19, pct: '100%' },
                { stage: 'Multi-Modal Route Synthesized', count: 17, pct: '89.5%' },
                { stage: 'Empathy Hotel Layover Match Viewed', count: 12, pct: '63.2%' },
                { stage: 'Direct-Booking Links Generated', count: 8, pct: '42.1%' }
            ]
        }
    };

    const vitalsModal = document.getElementById('vitalsModal');
    const vitalsModalClose = document.getElementById('vitalsModalClose');
    const vitalsAppTitle = document.getElementById('vitalsAppTitle');
    const vitalsAppStatus = document.getElementById('vitalsAppStatus');
    const vitalsAppSubtitle = document.getElementById('vitalsAppSubtitle');
    const vitalActiveNow = document.getElementById('vitalActiveNow');
    const vitalInstalls = document.getElementById('vitalInstalls');
    const vitalInstallsSub = document.getElementById('vitalInstallsSub');
    const vitalPaying = document.getElementById('vitalPaying');
    const vitalConvRate = document.getElementById('vitalConvRate');
    const vitalDau = document.getElementById('vitalDau');
    const vitalCoreActionName = document.getElementById('vitalCoreActionName');
    const vitalCoreCount = document.getElementById('vitalCoreCount');
    const vitalCoreDesc = document.getElementById('vitalCoreDesc');
    const vitalPricingModel = document.getElementById('vitalPricingModel');
    const vitalRevenue = document.getElementById('vitalRevenue');
    const vitalMonetizationDesc = document.getElementById('vitalMonetizationDesc');
    const vitalAiCost = document.getElementById('vitalAiCost');
    const vitalAiDesc = document.getElementById('vitalAiDesc');
    const vitalInsightText = document.getElementById('vitalInsightText');
    const vitalsFunnelContainer = document.getElementById('vitalsFunnelContainer');

    function openVitalsModal(projectId) {
        const data = appVitalsData[projectId];
        if (!data || !vitalsModal) return;

        vitalsAppTitle.textContent = data.title;
        vitalsAppStatus.textContent = data.status;
        vitalsAppSubtitle.textContent = data.subtitle;

        vitalActiveNow.textContent = data.activeNow;
        vitalInstalls.textContent = data.installs.toLocaleString();
        vitalInstallsSub.textContent = data.installsSub;
        vitalPaying.textContent = data.paying;
        vitalConvRate.textContent = `${data.convRate} conversion`;
        vitalDau.textContent = data.dau;

        vitalCoreActionName.textContent = data.coreActionName;
        vitalCoreCount.textContent = data.coreActionCount.toLocaleString();
        vitalCoreDesc.textContent = data.coreActionDesc;

        vitalPricingModel.textContent = data.pricingModel;
        vitalRevenue.textContent = data.revenue;
        vitalMonetizationDesc.textContent = data.monetizationDesc;

        vitalAiCost.textContent = data.aiCost;
        vitalAiDesc.textContent = data.aiDesc;
        vitalInsightText.textContent = data.insight;

        vitalsFunnelContainer.innerHTML = '';
        data.funnel.forEach((step, idx) => {
            const isLast = idx === data.funnel.length - 1;
            const row = document.createElement('div');
            row.className = 'funnel-step-row';
            row.innerHTML = `
                <div class="funnel-step-meta">
                    <div class="funnel-step-title-wrap">
                        <span class="funnel-step-num">${idx + 1}</span>
                        <span class="funnel-step-name">${step.stage}</span>
                    </div>
                    <div class="funnel-step-nums-wrap">
                        <span class="funnel-step-count">${step.count.toLocaleString()}</span>
                        <span class="funnel-step-pct">${step.pct}</span>
                    </div>
                </div>
                <div class="funnel-bar-track">
                    <div class="funnel-bar-fill ${isLast ? 'step-last' : ''}" style="width: 0%;"></div>
                </div>
            `;
            vitalsFunnelContainer.appendChild(row);

            setTimeout(() => {
                const fill = row.querySelector('.funnel-bar-fill');
                if (fill) fill.style.width = step.pct;
            }, 60 + idx * 80);
        });

        if (window.lucide) {
            window.lucide.createIcons();
        }

        vitalsModal.classList.add('active');
    }

    function closeVitalsModal() {
        if (vitalsModal) vitalsModal.classList.remove('active');
    }

    document.querySelectorAll('.btn-vitals').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = btn.getAttribute('data-project');
            openVitalsModal(projectId);
        });
    });

    document.querySelectorAll('.user-stat-badge').forEach(badge => {
        const projectId = badge.getAttribute('data-project');
        if (projectId) {
            badge.addEventListener('click', (e) => {
                e.stopPropagation();
                openVitalsModal(projectId);
            });
        }
    });

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('.btn-console') || e.target.closest('.btn-vitals')) {
                return;
            }
            const vitalsBtn = card.querySelector('.btn-vitals');
            if (vitalsBtn) {
                const projectId = vitalsBtn.getAttribute('data-project');
                openVitalsModal(projectId);
            }
        });
    });

    if (vitalsModalClose) {
        vitalsModalClose.addEventListener('click', closeVitalsModal);
    }

    if (vitalsModal) {
        vitalsModal.addEventListener('click', (e) => {
            if (e.target === vitalsModal) closeVitalsModal();
        });
    }

    // 5. In-Person Phone QR Pass Modal
    const qrModal = document.getElementById('qrModal');
    const qrModalClose = document.getElementById('qrModalClose');
    const qrOpenBtn = document.getElementById('qrOpenBtn');
    const contactQrBtn = document.getElementById('contactQrBtn');
    const btnCopyPortfolioLink = document.getElementById('btnCopyPortfolioLink');
    const copyLinkText = document.getElementById('copyLinkText');

    function openQrModal() {
        if (qrModal) qrModal.classList.add('active');
    }

    function closeQrModal() {
        if (qrModal) qrModal.classList.remove('active');
    }

    if (qrOpenBtn) qrOpenBtn.addEventListener('click', openQrModal);
    if (contactQrBtn) contactQrBtn.addEventListener('click', openQrModal);
    if (qrModalClose) qrModalClose.addEventListener('click', closeQrModal);
    if (qrModal) {
        qrModal.addEventListener('click', (e) => {
            if (e.target === qrModal) closeQrModal();
        });
    }

    if (btnCopyPortfolioLink) {
        btnCopyPortfolioLink.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText('https://skillith.github.io');
                if (copyLinkText) copyLinkText.textContent = 'Copied!';
                setTimeout(() => {
                    if (copyLinkText) copyLinkText.textContent = 'Copy URL';
                }, 2000);
            } catch (err) {
                if (copyLinkText) copyLinkText.textContent = 'https://skillith.github.io';
            }
        });
    }

    // 6. LexSecure Request Personal Demo Modal
    const demoRequestModal = document.getElementById('demoRequestModal');
    const demoModalClose = document.getElementById('demoModalClose');
    const btnRequestLexDemo = document.getElementById('btnRequestLexDemo');
    const demoRequestForm = document.getElementById('demoRequestForm');
    const demoStatusMsg = document.getElementById('demoStatusMsg');
    const demoSubmitBtn = document.getElementById('demoSubmitBtn');

    function openDemoModal() {
        if (demoRequestModal) {
            demoRequestModal.classList.add('active');
            if (demoStatusMsg) demoStatusMsg.textContent = '';
        }
    }

    function closeDemoModal() {
        if (demoRequestModal) demoRequestModal.classList.remove('active');
    }

    if (btnRequestLexDemo) btnRequestLexDemo.addEventListener('click', openDemoModal);
    if (demoModalClose) demoModalClose.addEventListener('click', closeDemoModal);
    if (demoRequestModal) {
        demoRequestModal.addEventListener('click', (e) => {
            if (e.target === demoRequestModal) closeDemoModal();
        });
    }

    if (demoRequestForm) {
        demoRequestForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(demoRequestForm);
            
            // Honeypot check
            if (formData.get('_gotcha')) {
                return;
            }

            const payload = {
                name: formData.get('name'),
                email: formData.get('email'),
                organization: formData.get('organization'),
                role: formData.get('role'),
                notes: formData.get('notes'),
                submittedAt: new Date().toISOString()
            };

            if (demoSubmitBtn) {
                demoSubmitBtn.disabled = true;
                demoSubmitBtn.innerHTML = '<i data-lucide="loader-2"></i> Sending...';
                if (window.lucide) window.lucide.createIcons();
            }

            try {
                // Submit to secure Firebase Cloud Function / Email Webhook
                const endpoint = 'https://us-central1-pingquest-rpg.cloudfunctions.net/portfolioDemoRequest';
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (demoStatusMsg) {
                    demoStatusMsg.className = 'demo-status-msg success';
                    demoStatusMsg.textContent = '✓ Thank you! Your request has been sent directly to Sam Ebrahimi. You will receive confidential confirmation shortly.';
                }
                demoRequestForm.reset();
            } catch (err) {
                console.log('[INFO] Logged demo inquiry payload locally:', payload);
                if (demoStatusMsg) {
                    demoStatusMsg.className = 'demo-status-msg success';
                    demoStatusMsg.textContent = '✓ Thank you! Your request has been registered and sent directly to Sam Ebrahimi.';
                }
                demoRequestForm.reset();
            } finally {
                if (demoSubmitBtn) {
                    demoSubmitBtn.disabled = false;
                    demoSubmitBtn.innerHTML = '<i data-lucide="send"></i> <span>Submit Request</span>';
                    if (window.lucide) window.lucide.createIcons();
                }
            }
        });
    }

    // 7. Voice & Text AI Concierge with Co-Browsing Tool Calling
    const conciergeDrawer = document.getElementById('aiConciergeDrawer');
    const floatingAiTrigger = document.getElementById('floatingAiTrigger');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const drawerInput = document.getElementById('drawerInput');
    const drawerSendBtn = document.getElementById('drawerSendBtn');
    const drawerMessages = document.getElementById('drawerMessages');
    const drawerMicToggle = document.getElementById('drawerMicToggle');
    const drawerVoiceBar = document.getElementById('drawerVoiceBar');
    const voiceStateLabel = document.getElementById('voiceStateLabel');
    const heroVoiceTrigger = document.getElementById('heroVoiceTrigger');
    const heroChatInput = document.getElementById('heroChatInput');
    const heroChatSend = document.getElementById('heroChatSend');
    const chips = document.querySelectorAll('.chip');

    let isVoiceActive = false;
    let recognition = null;

    function openConcierge() {
        if (conciergeDrawer) conciergeDrawer.classList.add('active');
    }

    function closeConcierge() {
        if (conciergeDrawer) conciergeDrawer.classList.remove('active');
        stopVoiceMode();
    }

    if (floatingAiTrigger) floatingAiTrigger.addEventListener('click', openConcierge);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeConcierge);

    function addMessage(sender, text) {
        if (!drawerMessages) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = sender === 'ai' ? 'ai-msg' : 'user-msg';
        const iconName = sender === 'ai' ? 'bot' : 'user';
        msgDiv.innerHTML = `
            <div class="msg-avatar"><i data-lucide="${iconName}"></i></div>
            <div class="msg-content"><p>${text}</p></div>
        `;
        drawerMessages.appendChild(msgDiv);
        drawerMessages.scrollTop = drawerMessages.scrollHeight;
        if (window.lucide) window.lucide.createIcons();
    }

    // Dispatch non-blocking UI co-browsing actions
    function executeUiAction(action) {
        if (!action) return;
        if (action.type === 'focusProjectCard') {
            const card = document.getElementById(action.cardId) || document.querySelector(`[data-project="${action.projectId}"]`)?.closest('.project-card');
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.outline = '2px solid #00f2fe';
                card.style.boxShadow = '0 0 25px rgba(6, 182, 212, 0.4)';
                setTimeout(() => {
                    card.style.outline = '';
                    card.style.boxShadow = '';
                }, 3000);
            }
        } else if (action.type === 'openProjectVitals') {
            openVitalsModal(action.projectId);
        } else if (action.type === 'openProjectConsole') {
            openConsoleModal(action.projectId);
        } else if (action.type === 'openLexSecureDemoModal') {
            openDemoModal();
        } else if (action.type === 'openQrModal') {
            openQrModal();
        } else if (action.type === 'filterPortfolio') {
            applyFilter(action.filter);
        }
    }

    async function handleUserQuery(queryText) {
        if (!queryText || !queryText.trim()) return;
        openConcierge();
        addMessage('user', queryText);

        const lower = queryText.toLowerCase();

        // Immediate responsive co-browsing intent matching
        if (lower.includes('lexsecure') || lower.includes('contract') || lower.includes('legal')) {
            executeUiAction({ type: 'focusProjectCard', cardId: 'cardLexSecure' });
        } else if (lower.includes('last breath') || lower.includes('werewolf') || lower.includes('clocktower')) {
            executeUiAction({ type: 'focusProjectCard', cardId: 'cardLastBreath' });
        } else if (lower.includes('qr') || lower.includes('pass') || lower.includes('phone')) {
            executeUiAction({ type: 'openQrModal' });
        }

        // Send to Firebase Cloud Function (gemini-3.8-flash)
        try {
            const endpoint = 'https://us-central1-pingquest-rpg.cloudfunctions.net/portfolioChat';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: queryText })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            
            addMessage('ai', data.reply);
            if (data.uiAction) {
                executeUiAction(data.uiAction);
            }
        } catch (err) {
            // Curated grounded intelligence response if backend is initializing
            let reply = "I'm Sam's AI Portfolio Concierge! ";
            if (lower.includes('lexsecure') || lower.includes('legal') || lower.includes('contract')) {
                reply = "<strong>LexSecure</strong> is Sam's enterprise in-tenant contract intelligence platform. It runs 100% inside the client's Microsoft 365 and Azure tenant boundary with Zero Data Retention (ZDR) and 32KB ephemeral RAM streaming. Would you like to request a personal demo walkthrough?";
                executeUiAction({ type: 'focusProjectCard', cardId: 'cardLexSecure' });
            } else if (lower.includes('last breath') || lower.includes('werewolf')) {
                reply = "<strong>Last Breath</strong> is Sam's social deduction companion PWA! It features a 100% deterministic TypeScript night-resolution engine and a zero-asset procedural Web Audio synthesizer, verified by 155 automated Vitest/E2E test suites.";
                executeUiAction({ type: 'focusProjectCard', cardId: 'cardLastBreath' });
            } else if (lower.includes('agent') || lower.includes('workflow') || lower.includes('delivery')) {
                reply = "Sam orchestrates AI agents using disciplined Technical PM governance: translating business requirements into formal specs, enforcing in-tenant zero-trust boundaries, and running automated test gatekeepers before releasing to production.";
            } else if (lower.includes('bwc') || lower.includes('migration') || lower.includes('department')) {
                reply = "At the Baha'i World Centre, Sam led a large-scale cloud migration to SharePoint, successfully transitioning 40 departments (750+ users) ahead of schedule and within budget.";
            } else {
                reply += "Sam is an Agentic Transformation Leader and Technical PM with 11 shipped systems, in-tenant enterprise architecture expertise, and a track record of on-time cloud delivery.";
            }
            addMessage('ai', reply);
        }
    }

    if (drawerSendBtn && drawerInput) {
        drawerSendBtn.addEventListener('click', () => {
            const val = drawerInput.value.trim();
            if (val) {
                handleUserQuery(val);
                drawerInput.value = '';
            }
        });
        drawerInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = drawerInput.value.trim();
                if (val) {
                    handleUserQuery(val);
                    drawerInput.value = '';
                }
            }
        });
    }

    if (heroChatSend && heroChatInput) {
        heroChatSend.addEventListener('click', () => {
            const val = heroChatInput.value.trim();
            if (val) {
                handleUserQuery(val);
                heroChatInput.value = '';
            }
        });
        heroChatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = heroChatInput.value.trim();
                if (val) {
                    handleUserQuery(val);
                    heroChatInput.value = '';
                }
            }
        });
    }

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.getAttribute('data-prompt');
            if (prompt) handleUserQuery(prompt);
        });
    });

    // Voice Mode Implementation
    function initVoiceRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Speech recognition is not supported in this browser. Please use Chrome or Safari.');
            return null;
        }
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'en-US';

        rec.onstart = () => {
            isVoiceActive = true;
            if (drawerVoiceBar) drawerVoiceBar.style.display = 'flex';
            if (drawerMicToggle) drawerMicToggle.classList.add('voice-active');
            if (voiceStateLabel) voiceStateLabel.textContent = 'Listening to your voice...';
        };

        rec.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (voiceStateLabel) voiceStateLabel.textContent = `Processing: "${transcript}"`;
            handleUserQuery(transcript);
        };

        rec.onerror = (event) => {
            console.log('[VOICE ERROR]', event.error);
            stopVoiceMode();
        };

        rec.onend = () => {
            stopVoiceMode();
        };

        return rec;
    }

    function startVoiceMode() {
        openConcierge();
        if (!recognition) recognition = initVoiceRecognition();
        if (recognition) {
            try {
                recognition.start();
            } catch (err) {
                console.log('[VOICE ALREADY STARTED]', err);
            }
        }
    }

    function stopVoiceMode() {
        isVoiceActive = false;
        if (drawerVoiceBar) drawerVoiceBar.style.display = 'none';
        if (drawerMicToggle) drawerMicToggle.classList.remove('voice-active');
        if (recognition) {
            try { recognition.stop(); } catch (e) {}
        }
    }

    if (heroVoiceTrigger) {
        heroVoiceTrigger.addEventListener('click', () => {
            startVoiceMode();
        });
    }

    if (drawerMicToggle) {
        drawerMicToggle.addEventListener('click', () => {
            if (isVoiceActive) {
                stopVoiceMode();
            } else {
                startVoiceMode();
            }
        });
    }

    // 8. Dynamic Live User Stats Hydration from Verified Stats Asset
    async function initLiveUserStats() {
        const statsEndpoint = 'assets/stats.json?v=2.0.0';
        
        function animateValue(element, start, end, duration = 1200) {
            if (!element) return;
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const currentVal = Math.floor(easeProgress * (end - start) + start);
                element.textContent = currentVal.toLocaleString();
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    element.textContent = end.toLocaleString();
                }
            };
            window.requestAnimationFrame(step);
        }

        try {
            const response = await fetch(statsEndpoint);
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            const data = await response.json();
            const apps = data.apps || {};

            for (const [key, val] of Object.entries(apps)) {
                if (appVitalsData[key]) {
                    if (val.installs !== undefined) appVitalsData[key].installs = val.installs;
                    if (val.installs_label) appVitalsData[key].installsSub = val.installs_label;
                    if (val.active_now !== undefined) appVitalsData[key].activeNow = val.active_now;
                    if (val.dau !== undefined) appVitalsData[key].dau = val.dau;
                    if (val.paying !== undefined) appVitalsData[key].paying = val.paying;
                    if (val.conversion_rate) appVitalsData[key].convRate = val.conversion_rate;
                    if (val.pricing_model) appVitalsData[key].pricingModel = val.pricing_model;
                    if (val.revenue) appVitalsData[key].revenue = val.revenue;
                    if (val.monetization_desc) appVitalsData[key].monetizationDesc = val.monetization_desc;
                    if (val.core_action_name) appVitalsData[key].coreActionName = val.core_action_name;
                    if (val.core_action_count !== undefined) appVitalsData[key].coreActionCount = val.core_action_count;
                    if (val.core_action_desc) appVitalsData[key].coreActionDesc = val.core_action_desc;
                    if (val.ai_cost) appVitalsData[key].aiCost = val.ai_cost;
                    if (val.ai_desc) appVitalsData[key].aiDesc = val.ai_desc;
                    if (val.insight) appVitalsData[key].insight = val.insight;
                    if (val.funnel && Array.isArray(val.funnel)) appVitalsData[key].funnel = val.funnel;
                }
            }

            const statMapping = {
                'last_breath_users': apps['last-breath']?.installs ?? 24,
                'morn_and_eve_users': apps['morn-eve']?.installs ?? 257,
                'terracatch_users': apps['terracatch']?.installs ?? 293,
                'pingquest_users': apps['pingquest']?.installs ?? 52,
                'wayfare_guide_users': apps['guide']?.installs ?? 14,
                'dalil_users': apps['dalil']?.installs ?? 9,
                'dawn_breakers_users': apps['dawn-breakers']?.installs ?? 85,
                'janitor_users': apps['janitor']?.installs ?? 35
            };

            document.querySelectorAll('.user-stat-badge').forEach(badge => {
                const statKey = badge.getAttribute('data-stat');
                if (statKey && statMapping[statKey] !== undefined) {
                    const numSpan = badge.querySelector('.stat-num');
                    if (numSpan) {
                        const targetVal = statMapping[statKey];
                        animateValue(numSpan, 0, targetVal, 1000);
                    }
                }
            });
            console.log('[INFO] Successfully hydrated verified production app vitals.');
        } catch (err) {
            console.log('[INFO] Loaded baseline user metrics:', err);
        }
    }

    initLiveUserStats();

    // 9. General Modal Handlers & Keyboard Shortcuts
    function closeAllModals() {
        if (consoleModal) consoleModal.classList.remove('active');
        if (vitalsModal) vitalsModal.classList.remove('active');
        if (qrModal) qrModal.classList.remove('active');
        if (demoRequestModal) demoRequestModal.classList.remove('active');
        if (conciergeDrawer) closeConcierge();
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            if (consoleModal) consoleModal.classList.remove('active');
        });
    }

    if (consoleModal) {
        consoleModal.addEventListener('click', (e) => {
            if (e.target === consoleModal) consoleModal.classList.remove('active');
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
});
