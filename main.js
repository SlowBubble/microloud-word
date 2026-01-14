const textArea = document.getElementById('textArea');

textArea.addEventListener('input', (e) => {
    const text = e.target.value;
    const cursorPos = e.target.selectionStart;
    
    // Check if last character is space or newline
    const lastChar = text[cursorPos - 1];
    if (lastChar !== ' ' && lastChar !== '\n') return;
    
    // Check if there's a space/newline before
    const charBefore = text[cursorPos - 2];
    if (charBefore === ' ' || charBefore === '\n' || charBefore === undefined) return;
    
    // Get text before cursor
    const textBefore = text.substring(0, cursorPos - 1);
    
    // Check if character before space is punctuation
    const punctuation = ['.', '!', '?', ';', ':'];
    const isPunctuation = punctuation.includes(charBefore);
    
    let textToSpeak;
    
    if (isPunctuation) {
        // Read whole sentence
        const sentenceMatch = textBefore.match(/[^.!?;:]*[.!?;:]$/);
        textToSpeak = sentenceMatch ? sentenceMatch[0].trim() : textBefore.trim();
    } else {
        // Read last word
        const wordMatch = textBefore.match(/\S+$/);
        textToSpeak = wordMatch ? wordMatch[0] : '';
    }
    
    if (textToSpeak) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        speechSynthesis.speak(utterance);
    }
});
