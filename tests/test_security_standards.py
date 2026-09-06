import os
import re
import json
import subprocess
import unittest

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_PATTERNS = [
    (r"-----BEGIN [A-Z ]*PRIVATE KEY-----", "Private Key Header"),
    (r"sk_live_[0-9a-zA-Z]{20,}", "Live Stripe Secret Key"),
    (r"rk_live_[0-9a-zA-Z]{20,}", "Restricted Stripe Secret Key"),
    (r"AKIA[0-9A-Z]{16}", "AWS Access Key"),
    (r"ghp_[0-9a-zA-Z]{36}", "GitHub Personal Access Token"),
    (r"\"private_key\":\s*\"-----BEGIN", "Service Account Private Key"),
    (r"xox[baprs]-[0-9a-zA-Z]{10,}", "Slack Token"),
    (r"AIzaSy[0-9A-Za-z-_]{33}", "Privileged Google API Key (unrestricted)")
]

class TestSecurityStandards(unittest.TestCase):

    def test_no_private_keys_or_secrets_in_tracked_files(self):
        """Scan all git-tracked files to ensure zero secrets or private credentials exist."""
        res = subprocess.run(["git", "ls-files"], cwd=REPO_ROOT, capture_output=True, text=True, check=True)
        tracked_files = [f.strip() for f in res.stdout.strip().splitlines() if f.strip()]

        findings = []
        for rel_path in tracked_files:
            abs_path = os.path.join(REPO_ROOT, rel_path)
            if not os.path.isfile(abs_path):
                continue
            # Skip binary / image files
            if rel_path.endswith(('.png', '.jpg', '.jpeg', '.svg', '.ico', '.pdf', '.webp', '.gif')):
                continue

            with open(abs_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()

            for pattern, desc in SECRET_PATTERNS:
                matches = re.findall(pattern, content)
                if matches:
                    findings.append(f"{rel_path}: Matched {desc} ({len(matches)} occurrences)")

        self.assertEqual(findings, [], f"Secret leak detected in repository: {findings}")

    def test_stats_json_sanitized_and_no_pii(self):
        """Ensure assets/stats.json contains strictly sanitized aggregations and ZERO PII."""
        stats_path = os.path.join(REPO_ROOT, 'assets', 'stats.json')
        self.assertTrue(os.path.exists(stats_path), "assets/stats.json must exist")

        with open(stats_path, 'r', encoding='utf-8') as f:
            stats_content = f.read()
            data = json.loads(stats_content)

        # Check for user emails
        email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
        emails = re.findall(email_pattern, stats_content)
        self.assertEqual(emails, [], f"PII detected: email found in stats.json: {emails}")

        # Check for IPv4 addresses
        ip_pattern = r"\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b"
        ips = re.findall(ip_pattern, stats_content)
        self.assertEqual(ips, [], f"PII detected: IP address found in stats.json: {ips}")

        # Check for Firebase Auth UIDs (28 character random alphanumeric strings)
        uid_pattern = r'"(?:uid|userId)":\s*"[a-zA-Z0-9]{28}"'
        uids = re.findall(uid_pattern, stats_content)
        self.assertEqual(uids, [], f"PII detected: User UID found in stats.json: {uids}")

        # Verify structure
        apps = data.get('apps', {})
        self.assertIn('morn-eve', apps)
        self.assertIn('terracatch', apps)
        self.assertIn('pingquest', apps)
        self.assertIn('guide', apps)

    def test_user_monetization_rules_adherence(self):
        """Verify strict compliance with user-specified business and monetization models."""
        stats_path = os.path.join(REPO_ROOT, 'assets', 'stats.json')
        with open(stats_path, 'r', encoding='utf-8') as f:
            data = json.loads(f.read())
        apps = data['apps']

        # Morn & Eve must be 100% free
        morn_eve = apps['morn-eve']
        self.assertFalse(morn_eve['is_monetized'], "Morn & Eve must be completely free")
        self.assertEqual(morn_eve['paying'], 0, "Morn & Eve must have 0 paying users")
        self.assertEqual(morn_eve['revenue'], "$0", "Morn & Eve revenue must be $0")

        # Dawn-Breakers must be 100% free
        dawn_breakers = apps['dawn-breakers']
        self.assertFalse(dawn_breakers['is_monetized'], "Dawn-Breakers must be completely free")
        self.assertEqual(dawn_breakers['paying'], 0, "Dawn-Breakers must have 0 paying users")
        self.assertEqual(dawn_breakers['revenue'], "$0", "Dawn-Breakers revenue must be $0")

        # TerraCatch is Google Play with verified test purchase
        self.assertIn("Google Play", apps['terracatch']['pricing_model'])
        self.assertEqual(apps['terracatch']['paying'], 1, "TerraCatch must reflect 1 verified test purchase")
        self.assertIn("$2.99", apps['terracatch']['revenue'])

        # Dalil Notecard has 1 verified test subscriber
        self.assertEqual(apps['dalil']['paying'], 1, "Dalil Notecard must reflect 1 verified test subscriber")
        self.assertEqual(apps['dalil']['revenue'], "$4.99/mo")

        # Pingquest AI cost reflects image generation
        self.assertIn("Stripe", apps['pingquest']['pricing_model'])
        self.assertEqual(apps['pingquest']['ai_cost'], "$4.20", "Pingquest AI cost must reflect image generation")

        # Wayfare Guide is RevenueCat with 14 closed testers
        self.assertIn("RevenueCat", apps['guide']['pricing_model'])
        self.assertEqual(apps['guide']['installs'], 14, "Wayfare Guide must reflect exactly 14 closed beta testers")

    def test_client_endpoints_are_safe_and_unauthenticated(self):
        """Verify client code does not transmit sensitive headers or use dangerous write endpoints."""
        app_js_path = os.path.join(REPO_ROOT, 'app.js')
        with open(app_js_path, 'r', encoding='utf-8') as f:
            js_code = f.read()

        # No Bearer authorization headers hardcoded in client code
        self.assertNotIn("Bearer ", js_code)
        # No Firestore write tokens
        self.assertNotIn("firebase-adminsdk", js_code)

if __name__ == '__main__':
    unittest.main()
