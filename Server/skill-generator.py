import sys
import json
import google.generativeai as genai
import logging

# Set up logging to capture stderr output
logging.basicConfig(level=logging.DEBUG)

# Configure the Google Generative AI model
GOOGLE_API_KEY = 'AIzaSyDvWHOj66I_JTJYy2o_0Ayt6QYyMftqHxw'  # Replace with your actual API key
genai.configure(api_key=GOOGLE_API_KEY)

def generate_skills(job_title, description, total_skills):
    """
    Generate skills using the Gemini model and return the results in JSON format.

    Parameters:
    - job_title (str): Job title for context.
    - description (str): Job description.
    - total_skills (int): Total number of skills to generate.

    Returns:
    - list: List of dictionaries containing a single skill.
    """
    model = genai.GenerativeModel('gemini-pro')
    skills_list = []
    batch_size = 10  # Generate skills in batches of 100

    while len(skills_list) < total_skills:
        remaining_skills = total_skills - len(skills_list)
        current_batch_size = min(batch_size, remaining_skills)
        prompt = f"""
        Generate a list of exactly {current_batch_size} skills
        that are highly relevant to the job title and description provided below:

        - Job Title: {job_title}
        - Job Description: {description}

        Format the output strictly as follows:
        Skill1
        Skill2
        Skill3
        ...

        Each skill must appear on a new line.
        """
        try:
            response = model.generate_content(prompt)
            lines = response.text.strip().split('\n')
            for line in lines:
                if line.strip():  # Ensure the line is not empty
                    try:
                        # Extract the skill
                        skill = line.strip()
                        skills_list.append({"skills": [skill]})  # Store as a single skill in a list
                    except Exception as e:
                        print(f"Error parsing line: {line}. Error: {e}")
            print(f"Generated {len(skills_list)} skills so far...")  # Print progress after each batch
        except Exception as e:
            print(f"Error generating skills: {e}. Retrying...")
            continue

    return skills_list[:total_skills]  # Ensure we return only the required number of skills

def main():
    # Ensure the script gets parameters passed from Node.js (sys.argv)
    if len(sys.argv) < 4:
        print("Error: Insufficient arguments.")
        sys.exit(1)

    job_title = sys.argv[1]
    description = sys.argv[2]
    total_skills = int(sys.argv[3])

    print(f"Generating a total of {total_skills} skills...\n")

    # Generate skills
    skills_list = generate_skills(job_title, description, total_skills)

    # Display the output in JSON format
    output_json = json.dumps(skills_list, indent=4)
    print("\nGenerated Skills (JSON format):")
    print(output_json)

if __name__ == "__main__":
    main()
