import os

def create_project_structure(structure_file):
    with open(structure_file, 'r', encoding='utf-8') as f:
        structure = f.read()

    lines = structure.strip().split('\n')
    base_path = ""

    for line in lines:
        line = line.replace("│", "").replace("├──", "").replace("└──", "").strip()
        depth = line.count("   ")
        name = line.replace("   ", "")

        path = os.path.join(base_path, name)
        if depth == 0:
            base_path = name
            if not os.path.exists(base_path):
                os.makedirs(base_path, exist_ok=True)
        else:
            current_path = base_path
            parts = name.split('/')
            for i, part in enumerate(parts):
                current_path = os.path.join(current_path, part)
                if '.' in part:
                    os.makedirs(os.path.dirname(current_path), exist_ok=True)
                    if not os.path.exists(current_path):
                        with open(current_path, 'w', encoding='utf-8'):
                            pass  # Create an empty file
                else:
                    if not os.path.exists(current_path):
                        os.makedirs(current_path, exist_ok=True)

# Specify the file name
structure_file = 'project_structure.txt'

# Call the function to create the project structure
create_project_structure(structure_file)

print("Project structure created successfully!")