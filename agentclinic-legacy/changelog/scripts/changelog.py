#!/usr/bin/env python3
"""Maintain CHANGELOG.md from git commit history."""

import subprocess
import sys
from collections import defaultdict
from pathlib import Path


def git_log():
    """Return commits as list of (date, subject) ordered newest-first."""
    cmd = ["git", "log", "--format=%ad|%s", "--date=short"]
    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    commits = []
    for line in result.stdout.strip().splitlines():
        if "|" in line:
            date, subject = line.split("|", 1)
            commits.append((date.strip(), subject.strip()))
    return commits


def main():
    changelog = Path("CHANGELOG.md")
    commits = git_log()

    if not changelog.exists():
        if not commits:
            print("No commits found — nothing to write.")
            sys.exit(0)

        by_date = defaultdict(list)
        for date, subject in commits:
            by_date[date].append(subject)

        lines = ["# Changelog\n"]
        for date in sorted(by_date.keys(), reverse=True):
            lines.append(f"\n## {date}\n\n")
            for subject in by_date[date]:
                lines.append(f"- {subject}\n")
        changelog.write_text("".join(lines), encoding="utf-8")
        total = sum(len(v) for v in by_date.values())
        print(f"Created CHANGELOG.md with {total} entries across {len(by_date)} date(s).")
        return

    existing_content = changelog.read_text(encoding="utf-8")
    existing_lines = existing_content.splitlines()

    # Extract all existing commit bullet texts
    existing_bullets = set()
    for line in existing_lines:
        trimmed = line.strip()
        if trimmed.startswith("- "):
            existing_bullets.add(trimmed[2:].strip())

    # Find commits not yet recorded in the changelog
    new_by_date = defaultdict(list)
    for date, subject in commits:
        if subject not in existing_bullets:
            new_by_date[date].append(subject)

    total_new = sum(len(v) for v in new_by_date.values())
    if total_new == 0:
        print("No new commits since last entry — CHANGELOG.md is up to date.")
        sys.exit(0)

    # Insert missing entries
    updated_lines = []
    idx = 0
    while idx < len(existing_lines):
        line = existing_lines[idx]
        updated_lines.append(line)
        if line.startswith("## "):
            heading_date = line[3:].strip()
            if heading_date in new_by_date:
                # Add any blank line if needed
                if idx + 1 < len(existing_lines) and existing_lines[idx + 1].strip() == "":
                    idx += 1
                    updated_lines.append(existing_lines[idx])
                for subject in new_by_date[heading_date]:
                    updated_lines.append(f"- {subject}")
                del new_by_date[heading_date]
        idx += 1

    # Any brand-new dates not yet in the file get added right after `# Changelog`
    if new_by_date:
        prefix = []
        insert_pos = 1 if updated_lines and updated_lines[0].startswith("# ") else 0
        new_sections = []
        for date in sorted(new_by_date.keys(), reverse=True):
            new_sections.append("")
            new_sections.append(f"## {date}")
            new_sections.append("")
            for subject in new_by_date[date]:
                new_sections.append(f"- {subject}")
        updated_lines = updated_lines[:insert_pos] + new_sections + updated_lines[insert_pos:]

    changelog.write_text("\n".join(updated_lines) + "\n", encoding="utf-8")
    print(f"Added {total_new} new entries to CHANGELOG.md.")


if __name__ == "__main__":
    main()
