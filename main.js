const textArea = document.getElementById('textArea');

textArea.addEventListener('input', (e) => {
    const text = e.target.value;
    const cursorPos = e.target.selectionStart;
    
    const lastChar = text[cursorPos - 1];
    const punctuation = ['.', '!', '?', ';', ':'];
    
    // Check if last character is punctuation
    if (punctuation.includes(lastChar)) {
        // Read the word before the punctuation
        const textBefore = text.substring(0, cursorPos - 1);
        const wordMatch = textBefore.match(/\S+$/);
        const textToSpeak = wordMatch ? wordMatch[0] : '';
        
        if (textToSpeak) {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            speechSynthesis.speak(utterance);
        }
        return;
    }
    
    // Check if last character is space or newline
    if (lastChar !== ' ' && lastChar !== '\n') return;
    
    // Check if there's a space/newline before
    const charBefore = text[cursorPos - 2];
    if (charBefore === ' ' || charBefore === '\n' || charBefore === undefined) return;
    
    // Get text before cursor
    const textBefore = text.substring(0, cursorPos - 1);
    
    // Check if character before space is punctuation
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
