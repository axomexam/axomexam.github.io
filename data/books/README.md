# e-Books Content Folder

Upload every e-book as a **single JSON file** in this folder: `data/books/`.

After you upload a new `.json` file here, it automatically appears on the
E-Books library page (`/ebooks`) — no code change is needed.

## Rules

- File name = book id. Use only small letters, numbers and dashes.
  Example: `assam-history.json`
- Keep the folder at the repo root path `data/books/`.
- E-books are **reading-only**. They are never shown as a PDF download.

## JSON format (schema)

```json
{
  "id": "assam-history",
  "title": { "en": "Assam History", "as": "অসমৰ ইতিহাস" },
  "subject": { "en": "History", "as": "ইতিহাস" },
  "subjectKey": "history",
  "color": "#d97706",
  "author": { "en": "axomexam Study Team", "as": "axomexam অধ্যয়ন দল" },
  "description": {
    "en": "Short introduction of the book...",
    "as": "কিতাপখনৰ চমু পৰিচয়..."
  },
  "updated": "2026-09-06",
  "chapters": [
    {
      "id": "chapter-one",
      "title": { "en": "Chapter Title", "as": "অধ্যায়ৰ শিৰোনাম" },
      "content": {
        "en": "Paragraph one.\n\nParagraph two.\n\nKey points:\n- Point one\n- Point two",
        "as": "অসমীয়া ভাষাত সমল..."
      }
    }
  ]
}
```

## Field guide

| Field        | Required | Meaning                                                                  |
| ------------ | -------- | ------------------------------------------------------------------------ |
| `id`         | yes      | Same as the file name (without `.json`).                                 |
| `title`      | yes      | Book title in `en` and `as` (Assamese).                                  |
| `subject`    | yes      | Subject name shown on the book card.                                     |
| `subjectKey` | yes      | Used to group books on the shelf, e.g. `history`, `polity`, `economy`.   |
| `color`      | no       | Cover colour (hex). A default is used if missing.                        |
| `author`     | no       | Author / source name.                                                    |
| `description`| no       | Shown on the shelf card and at the top of the reader.                    |
| `updated`    | no       | Date string, e.g. `2026-09-06`.                                          |
| `chapters`   | yes      | Array of chapters. Each has `id`, `title`, `content`.                    |

## Writing the content text

- Inside `content`, put each paragraph on its own line.
- Leave a blank line between paragraphs.
- Start a line with `- ` (dash) to make a bullet point. Consecutive bullet
  lines are grouped into one list.
- `en` is required for every chapter. `as` (Assamese) is optional — if you
  leave it empty for a chapter, readers will see the English text only.
