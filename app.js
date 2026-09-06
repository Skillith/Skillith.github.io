document.addEventListener('DOMContentLoaded', () => {
    // 1. Typing Subtitle Animation
    const typingText = document.querySelector('.typing-text');
    const headlines = [
        "Technical Project Manager",
        "AI-Powered Product Delivery",
        "Cloud Migration Expert"
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
            typingSpeed = 50;
        } else {
            typingText.textContent = currentHeadline.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentHeadline.length) {
            // Wait before starting to delete
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            headlineIndex = (headlineIndex + 1) % headlines.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typingText) {
        setTimeout(typeEffect, 1000);
    }

    // 2. Project Card Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state of buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                    // Trigger reflow/animation
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
        });
    });

    // 3. Interactive Terminal Console Simulator
    const consoleModal = document.getElementById('consoleModal');
    const termOutput = document.getElementById('termOutput');
    const termTitle = document.getElementById('termTitle');
    const modalClose = document.getElementById('modalClose');

    // Terminal data mockups
    const terminalLogs = {
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

    const consoleButtons = document.querySelectorAll('.btn-console');
    
    consoleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const logs = terminalLogs[projectId];
            const title = btn.closest('.project-card').querySelector('.project-title').textContent.trim();
            
            if (logs) {
                termTitle.textContent = `saman@skillith ~ project-console: ${title.toLowerCase().replace(/\s+/g, '-')}`;
                termOutput.innerHTML = '';
                consoleModal.classList.add('active');
                
                // Print command prompt first
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
                        
                        // Add slight delays between outputs for typing/processing realism
                        const delay = log.type === 'input' ? 800 : 350;
                        setTimeout(printNextLog, delay);
                    }
                }
                
                printNextLog();
            }
        });
    });

    // 4. App Creator Vitals & Conversion Funnel Data
    const appVitalsData = {
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
            paying: 0,
            convRate: '0.0%',
            coreActionName: 'Quests & Profiles',
            coreActionCount: 744,
            coreActionDesc: '744 active quests and 595 registered player battle profiles.',
            pricingModel: 'Google Play IAP',
            revenue: '$0 (Pre-revenue)',
            monetizationDesc: 'Evolution token packs and exhibition battle passes via Google Play Billing.',
            aiCost: '$4.20',
            aiDesc: 'OpenAI Vision + FastAPI frame sampling per 1,000 video analyses.',
            insight: 'Player onboarding friction: 99.2% of account creators complete their initial player battle profile.',
            funnel: [
                { stage: 'Player Account Signups', count: 293, pct: '100%' },
                { stage: 'Player Battle Profiles Created', count: 595, pct: '203.1%' },
                { stage: 'Active Wildlife Quests Generated', count: 744, pct: '100%+' },
                { stage: 'Google Play In-App Purchases', count: 0, pct: '0.0%' }
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
            monetizationDesc: 'Campaign host pass ($15/mo) via Stripe billing integration.',
            aiCost: '$0.35',
            aiDesc: 'Gemini 3.7 Flash high-throughput prompt caching per 1k action checks.',
            insight: 'Room utilization: 12 dedicated campaign party rooms actively hosting living chronicles.',
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
            paying: 0,
            convRate: '0.0%',
            coreActionName: 'Speech Sessions',
            coreActionCount: 3,
            coreActionDesc: '3 speech recognition sessions logged via Web Speech API & Gemini proxy.',
            pricingModel: 'Pro Tour License',
            revenue: '$0 (Pre-revenue)',
            monetizationDesc: 'Unlimited offline tour routes and serverless speech quota upgrades.',
            aiCost: '$0.12',
            aiDesc: 'Local keyword match engine bypasses 85% of Gemini API calls.',
            insight: 'Hybrid latency: Matching talking points locally before cloud calls drops checkmark latency to <200ms.',
            funnel: [
                { stage: 'Registered Tour Guides', count: 9, pct: '100%' },
                { stage: 'Microphone Permission Allowed', count: 8, pct: '88.9%' },
                { stage: 'Active Speech Route Completed', count: 3, pct: '33.3%' },
                { stage: 'Pro Tour License Purchases', count: 0, pct: '0.0%' }
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
            installs: 38,
            installsSub: 'Alpha Roadtrippers & Drivers',
            activeNow: 0,
            dau: 1,
            paying: 0,
            convRate: '0.0%',
            coreActionName: 'Driver Profiles',
            coreActionCount: 38,
            coreActionDesc: 'Dynamic GPS coordinate listeners & automated folklore narration streams.',
            pricingModel: 'RevenueCat Pass',
            revenue: '$0 (Pre-launch)',
            monetizationDesc: 'Offline national park audio packs and annual companion pass via RevenueCat.',
            aiCost: '$1.85',
            aiDesc: 'Gemini 2.5 Flash audio streaming throttled by velocity and coordinate deltas.',
            insight: 'Geofencing optimization: Triggering narration on distance deltas cut API token burn by 70%.',
            funnel: [
                { stage: 'Driver Signups & Mobile Installs', count: 38, pct: '100%' },
                { stage: 'GPS Stream Permission Allowed', count: 34, pct: '89.5%' },
                { stage: 'First Road-trip Narration Completed', count: 26, pct: '68.4%' },
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

    // 5. Interactive Vitals Modal Logic
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

        // Render Funnel Steps with animated bars
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

            // Animate bar width smoothly
            setTimeout(() => {
                const fill = row.querySelector('.funnel-bar-fill');
                if (fill) fill.style.width = step.pct;
            }, 60 + idx * 90);
        });

        if (window.lucide) {
            window.lucide.createIcons();
        }

        vitalsModal.classList.add('active');
    }

    function closeVitalsModal() {
        if (vitalsModal) {
            vitalsModal.classList.remove('active');
        }
    }

    // Attach listeners for Vitals buttons
    document.querySelectorAll('.btn-vitals').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = btn.getAttribute('data-project');
            openVitalsModal(projectId);
        });
    });

    // Attach listeners for clickable user-stat-badges
    document.querySelectorAll('.user-stat-badge').forEach(badge => {
        const projectId = badge.getAttribute('data-project');
        if (projectId) {
            badge.addEventListener('click', (e) => {
                e.stopPropagation();
                openVitalsModal(projectId);
            });
        }
    });

    // Allow clicking on any project card directly to open Vitals
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('.btn-console')) {
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
            if (e.target === vitalsModal) {
                closeVitalsModal();
            }
        });
    }

    // 6. Dynamic Live User Stats Hydration from Verified Stats Asset
    async function initLiveUserStats() {
        const statsEndpoint = 'assets/stats.json?v=1.0.6';
        
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

            // Hydrate appVitalsData with verified production metrics
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
                'morn_and_eve_users': apps['morn-eve']?.installs ?? 257,
                'terracatch_users': apps['terracatch']?.installs ?? 293,
                'pingquest_users': apps['pingquest']?.installs ?? 52,
                'wayfare_guide_users': apps['guide']?.installs ?? 38,
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

    // 7. General Modal Handlers & Keyboard Shortcuts
    function closeAllModals() {
        if (consoleModal) consoleModal.classList.remove('active');
        if (vitalsModal) vitalsModal.classList.remove('active');
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            if (consoleModal) consoleModal.classList.remove('active');
        });
    }

    if (consoleModal) {
        consoleModal.addEventListener('click', (e) => {
            if (e.target === consoleModal) {
                consoleModal.classList.remove('active');
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
});

