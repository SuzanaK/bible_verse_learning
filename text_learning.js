const texts = [{"text_ref": "Römer 12:10", "text_content": "Liebt einander wie Brüder und habt innige Zuneigung zueinander. Ergreift die Initiative, wenn es darum geht, einander Ehre zu erweisen."}, {"text_ref": "Jakobus 5:11", "text_content": "Wir betrachten die als glücklich, die ausgeharrt haben. Ihr habt vom Ausharren Hiobs gehört und habt gesehen, wie Jehova das Ganze ausgehen ließ, dass Jehova voll inniger Liebe und barmherzig ist."}]

function isTitle(str)
{
    return str[0] == str[0].toUpperCase() && str[0] != str[0].toLowerCase();
};

let currentWordIndex = 0;
let currentVerseIndex = 0;

function endsWithPunctuation(str) {
	return (str.endsWith('.') || str.endsWith('!') || str.endsWith('?') || str.endsWith(':'))
}

function findNextTitledWord(words, i) {
	const wordsToSearch = words.slice(i, words.length);
	const nextNounIndexInSearchedWords = wordsToSearch.findIndex(isTitle);
	return nextNounIndexInSearchedWords;
}

function getTextUntilNextNoun(words, i) {
	const result = {};
	if (i === words.length -1) {
		result.textToShow = words.join(' ');
		result.isEnd = true;
		return result;
	}
	if (i === 0) {
		i = 1;
	}
	const nextNounIndexInSearchedWords = findNextTitledWord(words, i);

	if (nextNounIndexInSearchedWords == -1) {
		result.textToShow = words.join(' ');
		result.isEnd = true;
		result.currentWordIndex = -1;
		result.currentNoun = '';
		return result;
	}
	const nextNounIndex = i + nextNounIndexInSearchedWords;

	const wordBefore = words[nextNounIndex - 1];
	if (endsWithPunctuation(wordBefore)) {
		return getTextUntilNextNoun(words, i+1);
	}
	const nextNoun = words[nextNounIndex];
	const wordsToShow = words.slice(0, nextNounIndex);
	const textToShow = wordsToShow.join(' ') + ' ' + nextNoun[0] + '...'; 

	result.textToShow = textToShow;
	result.currentNoun = nextNoun;
	result.currentWordIndex = nextNounIndex +1;
	result.isEnd = false;
	return result;
};

function updateHeader() {
	const currentVerse = texts[currentVerseIndex];
	const header = document.getElementById("header");
	header.innerHTML = '<h1>' + currentVerse.text_ref + '</h1>';

}

function onClick() {

	updateHeader();
	console.log(currentVerseIndex);
	console.log(currentWordIndex);

	const textField = document.getElementById("text_field");
	const currentVerse = texts[currentVerseIndex];
	if (currentWordIndex === 0 && currentVerseIndex > 0){
		textField.innerHTML = '';
		currentWordIndex = 1;
		return;
	}
	// TODO beim laden machen
	// TODO generalize to whitespace
	let currentWordArray = currentVerse.text_content.split(' ');
	currentWordArray = currentWordArray.filter(x => (x != null && x != ''));
	const result = getTextUntilNextNoun(currentWordArray, currentWordIndex);

	// set text field 
	textField.innerHTML = '<p>' + result.textToShow + '</p>';	

	// update for next round
	currentWordIndex = result.currentWordIndex;
	if (result.isEnd) {
		currentVerseIndex += 1;
		if (currentVerseIndex > texts.length - 1) {
			currentVerseIndex = 0;
		}
		currentWordIndex = 0;
	}
};

document.getElementById('button').onclick = onClick;
updateHeader();


