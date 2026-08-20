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

    // 4. Dynamic Live User Stats Hydration
    async function initLiveUserStats() {
        const statsEndpoint = 'https://firestore.googleapis.com/v1/projects/pingquest-rpg/databases/(default)/documents/public_stats/portfolio';
        
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
            const fields = data.fields || {};

            const statMapping = {
                'terracatch_users': parseInt(fields.terracatch_users?.integerValue || '268', 10),
                'morn_and_eve_users': parseInt(fields.morn_and_eve_users?.integerValue || '236', 10),
                'dalil_users': parseInt(fields.dalil_users?.integerValue || '9', 10),
                'pingquest_users': parseInt(fields.pingquest_users?.integerValue || '7', 10)
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
        } catch (err) {
            console.log('[INFO] Loaded baseline user metrics:', err);
        }
    }

    initLiveUserStats();

    // Close Modal
    function closeModal() {
        consoleModal.classList.remove('active');
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (consoleModal) {
        consoleModal.addEventListener('click', (e) => {
            if (e.target === consoleModal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
