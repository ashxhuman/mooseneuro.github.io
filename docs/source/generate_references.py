#!/usr/bin/env python3
"""
Generate RST reference files for all MOOSE classes from moose.doc().
Run from the Sphinx docs/source directory:
    python generate_references.py
Output goes to ../../references/
"""

import io
import os
import sys

import moose

OUT_DIR = os.path.join(os.path.dirname(__file__), 'references')
os.makedirs(OUT_DIR, exist_ok=True)


def get_doc(name):
    """Capture moose.doc() output as a string."""
    old_stdout = sys.stdout
    sys.stdout = buf = io.StringIO()
    try:
        moose.doc(name, paged=False)
    except Exception:
        pass
    finally:
        sys.stdout = old_stdout
    return buf.getvalue().strip()


def doc_to_rst(classname, raw):
    """Convert moose.doc() plain-text output to RST."""
    lines = raw.splitlines()
    rst = []

    # Title
    title = classname
    rst.append(title)
    rst.append('=' * len(title))
    rst.append('')

    # Skip the first "class ClassName" line
    start = 0
    if lines and lines[0].strip().startswith('class '):
        start = 1

    i = start
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Section headers (e.g. "Attributes:", "Value Attributes:", "Source messages:")
        if stripped.endswith(':') and stripped == stripped.strip() and len(stripped) < 60:
            rst.append('')
            rst.append(stripped)
            rst.append('-' * len(stripped))
            rst.append('')
            i += 1
            continue

        # Field entries: "fieldName (type: ..., class: ...)"
        if stripped and '(type:' in stripped and not stripped.startswith(' '):
            field_line = stripped
            rst.append('.. describe:: ' + field_line)
            i += 1
            # Collect description lines (indented)
            desc_lines = []
            while i < len(lines) and (lines[i].startswith('  ') or lines[i].strip() == ''):
                desc = lines[i].strip()
                if desc:
                    desc_lines.append(desc)
                i += 1
            if desc_lines:
                rst.append('')
                for d in desc_lines:
                    rst.append('   ' + d)
            rst.append('')
            continue

        # Regular text (class description, author, etc.)
        if stripped:
            rst.append(stripped)
        else:
            rst.append('')
        i += 1

    return '\n'.join(rst)


def get_all_classes():
    """Return sorted list of all moose class names."""
    classes = []
    for name in dir(moose):
        obj = getattr(moose, name)
        if isinstance(obj, type) and not name.startswith('_'):
            classes.append(name)
    return sorted(classes)


def generate():
    classes = get_all_classes()
    generated = []
    skipped = []

    print(f"Found {len(classes)} moose classes. Generating RST files...")

    for classname in classes:
        raw = get_doc(classname)
        if not raw:
            skipped.append(classname)
            continue

        rst_content = doc_to_rst(classname, raw)
        out_path = os.path.join(OUT_DIR, classname + '.rst')
        with open(out_path, 'w') as f:
            f.write(rst_content + '\n')
        generated.append(classname)
        print(f"  wrote {classname}.rst")

    # Generate index_ref.rst
    index_path = os.path.join(OUT_DIR, 'index_ref.rst')
    with open(index_path, 'w') as f:
        f.write('MOOSE Class Reference\n')
        f.write('=====================\n\n')
        f.write('Auto-generated from ``moose.doc()`` — do not edit manually.\n')
        f.write('Re-run ``generate_references.py`` to update.\n\n')
        f.write('.. toctree::\n')
        f.write('   :maxdepth: 1\n')
        f.write('   :glob:\n\n')
        f.write('   moose_classes\n')
        for classname in generated:
            f.write(f'   {classname}\n')

    print(f"\nDone: {len(generated)} files written, {len(skipped)} skipped.")
    if skipped:
        print(f"Skipped (no doc): {skipped}")
    print(f"Index written to: {index_path}")


if __name__ == '__main__':
    generate()
