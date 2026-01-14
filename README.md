# m1a

- Start with index.html and main.js
- Have a textarea that fills the viewport exactly (no scrollbar)
- When I type a space or newline and there is no space or new line before that
  - if the letter before is a punctuation mark, then read the whole sentence before the space (using speech api)
  - else read the word before the space (using speech api)

# m1b
- auto-focus on the text-area
- make the text 2x as big
- Also read the word that precede it if the character typed is a punctuation mark

# m1c
- make the text 2x as big
- When a new line is enter, read the whole previous paragraph instead (regardless of whether there is a new line or space before it).