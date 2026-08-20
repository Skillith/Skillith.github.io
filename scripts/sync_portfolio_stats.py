"""
Synchronize live Firebase Auth counts to public Firestore stats document.
Can be executed locally or in a CI/CD schedule.
"""
import firebase_admin
from firebase_admin import auth, firestore, credentials
import google.auth
from datetime import datetime

adc, _ = google.auth.default()

def get_real_accounts_count(project_id: str) -> int:
    try:
        app = firebase_admin.initialize_app(credentials.ApplicationDefault(), {'projectId': project_id}, name=f"sync-{project_id}")
    except ValueError:
        app = firebase_admin.get_app(f"sync-{project_id}")
    
    page = auth.list_users(app=app)
    real_count = 0
    for user in page.iterate_all():
        # Count accounts with email, Google, or Apple auth provider
        if user.provider_data or user.email:
            real_count += 1
    return real_count

def update_public_stats():
    print("Fetching live Firebase Auth counts...")
    me_count = get_real_accounts_count('morn-and-eve')
    tc_count = get_real_accounts_count('terracatch-d0910')
    dalil_count = get_real_accounts_count('dalil-notecard')
    pq_count = get_real_accounts_count('pingquest-rpg')
    
    print(f"  Morn & Eve: {me_count}")
    print(f"  TerraCatch: {tc_count}")
    print(f"  Dalil Notecard: {dalil_count}")
    print(f"  Pingquest: {pq_count}")
    
    try:
        pq_app = firebase_admin.initialize_app(credentials.ApplicationDefault(), {'projectId': 'pingquest-rpg'}, name="pq-db")
    except ValueError:
        pq_app = firebase_admin.get_app("pq-db")
        
    db = firestore.client(app=pq_app)
    db.collection('public_stats').document('portfolio').set({
        'morn_and_eve_users': me_count,
        'terracatch_users': tc_count,
        'dalil_users': dalil_count,
        'pingquest_users': pq_count,
        'last_updated': firestore.SERVER_TIMESTAMP
    }, merge=True)
    print("Successfully updated public_stats/portfolio in Firestore!")

if __name__ == '__main__':
    update_public_stats()
