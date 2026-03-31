import glob, re, os

# Find all HTML files
files = glob.glob('*.html') + glob.glob('services/*.html')
files = [f for f in files if f not in ['global_header.html', 'index.html', 'services/code.html']]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    modified = False

    # 1. Check for <div id="site-header"></div>
    if '<div id="site-header"></div>' not in content:
        # Try to find and replace <nav>...</nav>
        new_content = re.sub(r'<nav[^>]*>.*?</nav>', '<div id="site-header"></div>', content, count=1, flags=re.DOTALL)
        if new_content != content:
            content = new_content
            modified = True
        else:
            # If no <nav>, try replacing <header>...</header>
            new_content = re.sub(r'<header[^>]*>.*?</header>', '<div id="site-header"></div>', content, count=1, flags=re.DOTALL)
            if new_content != content:
                content = new_content
                modified = True
            else:
                # If neither found, just insert it right after <body>
                content = re.sub(r'(<body[^>]*>)', r'\1\n<div id="site-header"></div>\n', content, count=1)
                modified = True
                print(f"Warning: Inserted header directly after <body> in {file}")

    # 2. Check for script import: <script type="module" src="/src/main.js"></script>
    if 'src="/src/main.js"' not in content and "src='../src/main.js'" not in content and 'src="../src/main.js"' not in content:
        # Check if it has the wrong path, e.g. /../src/main.js
        if '/../src/main.js' in content:
            content = content.replace('/../src/main.js', '/src/main.js')
            modified = True
        else:
             # Insert script tag right before </head>
             content = content.replace('</head>', '<script type="module" src="/src/main.js"></script>\n</head>')
             modified = True
             print(f"Warning: Added missing script tag to {file}")

    # Standardize script path to /src/main.js for all files
    if 'src="../src/main.js"' in content:
        content = content.replace('src="../src/main.js"', 'src="/src/main.js"')
        modified = True
    elif "src='../src/main.js'" in content:
         content = content.replace("src='../src/main.js'", 'src="/src/main.js"')
         modified = True

    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {file}")
    else:
        print(f"File {file} was already correct.")
