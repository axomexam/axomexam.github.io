"""Rewordings for DHS & DME Grade IV extra-bank questions whose English text
would otherwise duplicate a question already published elsewhere on the site.

The bank is authored fresh, but many natural phrasings for very common facts
clash with wording already used by the other exam banks. Each entry below
replaces the question stem with a different, equally clear phrasing so the
extra sets stay fully unique across the site. Options, answer key and
explanations are unchanged.

Keyed by the original English stem; the value is (new English, new Assamese).
"""

REWORD = {
}


def apply_reword(rows):
    """Replace any stem that duplicates existing site wording with its reworded
    twin from REWORD, keeping the options, key and explanations intact."""
    for r in rows:
        fix = REWORD.get(r["en"])
        if fix:
            r["en"], r["as"] = fix
    return rows
