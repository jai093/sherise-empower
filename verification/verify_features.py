
import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1280, "height": 720}
        )
        page = context.new_page()

        # 1. Login
        print("Navigating to login page...")
        page.goto("http://localhost:8080/signin")
        page.wait_for_load_state("networkidle")

        # Fill login form
        print("Filling login form...")
        page.fill("input[type='email']", "test@example.com")
        page.fill("input[type='password']", "password123")
        # page.fill("input[id='age']", "30") # Removed as Signin page does not have age input
        page.click("button:has-text('Sign In')")

        # Wait for dashboard
        print("Waiting for dashboard...")
        page.wait_for_url("**/dashboard/mid")
        page.wait_for_load_state("networkidle")

        # 2. Verify Job Search
        print("Navigating to Job Search...")
        page.click("text=Job Search") # This should work if the text is visible
        # If 'Job Search' text is not visible directly, we might need to find the card or link.
        # The card has title "Job Search" (or "नौकरी खोज").
        # If language is EN (default), it should be "Job Search".

        page.wait_for_url("**/job-search")
        page.wait_for_load_state("networkidle")

        # Take screenshot of Job Search
        print("Taking Job Search screenshot...")
        page.screenshot(path="verification/job_search.png", full_page=True)

        # 3. Verify Silver Tutorials
        # We are logged in as 'mid' age (hardcoded in Signin.tsx).
        # We can navigate directly to /silver-tutorials or logout/login as silver.
        # Let's just navigate directly.

        print("Navigating to Silver Tutorials...")
        page.goto("http://localhost:8080/silver-tutorials")
        page.wait_for_load_state("networkidle")

        # Take screenshot of Silver Tutorials List
        print("Taking Silver Tutorials List screenshot...")
        page.screenshot(path="verification/silver_tutorials_list.png", full_page=True)

        # Click on a tutorial
        print("Starting a tutorial...")
        page.click("text=How to Make a Video Call on WhatsApp")
        page.wait_for_selector("text=Step 1")

        # Take screenshot of Tutorial Step
        print("Taking Tutorial Step screenshot...")
        page.screenshot(path="verification/tutorial_step.png", full_page=True)

        # Click next until quiz
        print("Navigating through steps...")
        # Assuming 4 steps (0 to 3), so 3 clicks to reach last step, then one more or button changes?
        # Step 0: Prev(disabled), Next
        # Step 1: Prev, Next
        # Step 2: Prev, Next
        # Step 3: Prev, Quiz

        # Click Next 3 times to get to the last step (Step 4, index 3)
        page.click("button:has-text('Next')") # Go to Step 2
        time.sleep(0.5)
        page.click("button:has-text('Next')") # Go to Step 3
        time.sleep(0.5)
        page.click("button:has-text('Next')") # Go to Step 4
        time.sleep(0.5)

        # Now button should say "Take Quiz" or "प्रश्नोत्तरी लें"
        page.click("button:has-text('Take Quiz')")
        page.wait_for_selector("text=Test Your Knowledge")

        # Take screenshot of Quiz
        print("Taking Quiz screenshot...")
        page.screenshot(path="verification/quiz.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    run()
