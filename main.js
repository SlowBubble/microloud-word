const textArea = document.getElementById('textArea');
let lastLength = 0;
let lastSpoken = '';

textArea.addEventListener('input', (e) => {
    const text = e.target.value;
    const cursorPos = e.target.selectionStart;
    
    // Ignore if text was deleted (backspace, delete, etc.)
    if (text.length < lastLength) {
        lastLength = text.length;
        return;
    }
    lastLength = text.length;
    
    const lastChar = text[cursorPos - 1];
    const punctuation = ['.', '!', '?', ';', ':'];
    
    // Check if last character is newline
    if (lastChar === '\n') {
        // Read the whole previous paragraph (look back until non-empty)
        const textBefore = text.substring(0, cursorPos - 1);
        const paragraphs = textBefore.split('\n');
        
        // Find the last non-empty paragraph
        let textToSpeak = '';
        for (let i = paragraphs.length - 1; i >= 0; i--) {
            if (paragraphs[i].trim()) {
                textToSpeak = paragraphs[i].trim();
                break;
            }
        }
        
        if (textToSpeak) {
            lastSpoken = textToSpeak;
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.rate = 0.7;
            speechSynthesis.speak(utterance);
        }
        return;
    }
    
    // Check if last character is punctuation
    if (punctuation.includes(lastChar)) {
        // Read the word before the punctuation
        const textBefore = text.substring(0, cursorPos - 1);
        const wordMatch = textBefore.match(/\S+$/);
        const textToSpeak = wordMatch ? wordMatch[0] : '';
        
        if (textToSpeak) {
            lastSpoken = textToSpeak;
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.rate = 0.7;
            speechSynthesis.speak(utterance);
        }
        return;
    }
    
    // Check if last character is space
    if (lastChar !== ' ') return;
    
    // Check if there's a space/newline before
    const charBefore = text[cursorPos - 2];
    if (charBefore === ' ' || charBefore === '\n' || charBefore === undefined) {
        // Repeat last spoken text
        if (lastSpoken) {
            const utterance = new SpeechSynthesisUtterance(lastSpoken);
            utterance.rate = 0.7;
            speechSynthesis.speak(utterance);
        }
        return;
    }
    
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
        lastSpoken = textToSpeak;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.7;
        speechSynthesis.speak(utterance);
    }
});
