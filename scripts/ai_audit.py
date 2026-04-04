import os
import sys
import google.generativeai as genai

# Configure with Free Tier Key
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-3-flash")

def audit_files(files):
    # Process files together to save API requests
    for file_path in files:
        if not os.path.exists(file_path): continue
        
        with open(file_path, "r") as f:
            content = f.read()

        prompt = f"Identify critical HTML/JSON-LD errors in this code. Be brief:\n\n{content}"
        
        try:
            response = model.generate_content(prompt)
            print(f"### Report for {file_path}\n{response.text}\n")
        except Exception as e:
            print(f"Error on {file_path}: {e}")

if __name__ == "__main__":
    audit_files(sys.argv[1:])
