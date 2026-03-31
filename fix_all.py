import os, glob, re

html_files = glob.glob('*.html') + glob.glob('services/*.html')
html_files = sorted([f for f in html_files if f not in ('global_header.html', 'index.html', 'services/code.html')])

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    orig = content

    # 1. Brutally rip out any <nav> block
    content = re.sub(r'<nav.*?</nav>', '', content, flags=re.DOTALL)

    # 2. Brutally rip out any <header> block that isn't the <header id="site-header">
    # Wait, the injection target is <div id="site-header"></div>. If there's an actual <header> tag, kill it.
    content = re.sub(r'<header.*?</header>', '', content, flags=re.DOTALL)

    # 3. Brutally rip out the giant TopNavBar div if it exists. Sometimes they used a <div class="fixed top-0..."> or similar for the header.
    # Look for the comment "TopNavBar" or "Top Navigation Shell" and remove the block after it until the <main> or next section.
    content = re.sub(r'<!--\s*(TopNavBar|Top Navigation Shell)\s*-->\s*<div[^>]*>.*?</div>\s*(?=<main|<section)', '', content, flags=re.DOTALL)

    # 4. Remove multiple <div id="site-header"></div> if they exist.
    content = content.replace('<div id="site-header"></div>', '')

    # 5. Insert exactly ONE <div id="site-header"></div> right after <body>
    content = re.sub(r'(<body[^>]*>)', r'\1\n<!-- Top Navigation Shell -->\n<div id="site-header"></div>\n', content, count=1)

    # 6. Ensure the module script is injected once. First strip out any existing src/main.js
    content = re.sub(r'<script[^>]*src=[\'"](\.\./)?/src/main\.js[\'"][^>]*></script>', '', content)
    # Then insert it right before </head>
    content = content.replace('</head>', '  <script type="module" src="/src/main.js"></script>\n</head>')

    # 7. Write back to file if changed.
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Cleaned and standardized {filepath}")
