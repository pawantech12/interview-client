import absl.logging
import json
import google.generativeai as genai
import sys
import time

# Configure the logging verbosity
absl.logging.set_verbosity(absl.logging.ERROR)  # Set logging to show only errors

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
    skills_set = set()  # To store unique skills
    skills_list = []
    batch_size = 100  # Generate skills in batches of 100

    while len(skills_set) < total_skills:
        remaining_skills = total_skills - len(skills_set)
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
                    skill = line.strip()
                    if skill not in skills_set:  # Add only unique skills
                        skills_set.add(skill)
                        skills_list.append({"skills": [skill]})  # Store as a single skill in a list
            print(f"Generated {len(skills_set)} unique skills so far...")  # Print progress after each batch
        except Exception as e:
            print(f"Error generating skills: {e}. Retrying...")
            # Adding retry delay if error occurs
            time.sleep(5)  # Sleep for 5 seconds before retrying
            continue

    return skills_list[:total_skills]  # Ensure we return only the required number of skills

def main():
    # Check if the script received command-line arguments
    if len(sys.argv) > 1:
        job_title = sys.argv[1]
        description = sys.argv[2]
        total_skills = int(sys.argv[3])

        # Generate skills
        skills_list = generate_skills(job_title, description, total_skills)
        output_json = json.dumps(skills_list, indent=4)
        print(output_json)
    else:
         print("This script must be called with command-line arguments.")


if __name__ == "__main__":
    main()
