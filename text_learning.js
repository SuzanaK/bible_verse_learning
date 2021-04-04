const texts = [{"text_ref": "Römer 12:10", "text_content": "Liebt einander wie Brüder und habt innige Zuneigung zueinander. Ergreift die Initiative, wenn es darum geht, einander Ehre zu erweisen."}, {"text_ref": "Römer 12:2", "text_content": "Und lasst euch nicht mehr von diesem Weltsystem formen, sondern werdet durch die Neugestaltung eures Denkens umgewandelt, damit ihr durch Prüfung feststellen könnt, was der gute und annehmbare und vollkommene Wille Gottes ist."}, {"text_ref": "1. Johannes 4:8", "text_content": "Wer nicht liebt, hat Gott nicht kennengelernt, denn Gott ist Liebe."}, {"text_ref": "Jakobus 5:11", "text_content": "Wir betrachten die als glücklich, die ausgeharrt haben. Ihr habt vom Ausharren Hiobs gehört und habt gesehen, wie Jehova das Ganze ausgehen ließ, dass Jehova voll inniger Liebe und barmherzig ist. "}, {"text_ref": "2. Mose 34:6", "text_content": "Jehova ging vor ihm vorbei und rief aus: „Jehova, Jehova, ein Gott, der barmherzig und mitfühlend ist, der nicht schnell zornig wird und reich ist an loyaler Liebe und Wahrheit."}, {"text_ref": "Psalm 51:1", "text_content": "Schenk mir deine Gunst, o Gott, in deiner loyalen Liebe. Lösch meine Übertretungen aus in deiner großen Barmherzigkeit."}, {"text_ref": "Jesaja 49:15", "text_content": "Kann eine Frau ihren Säugling vergessen, wird sie für den Sohn, den sie unter dem Herzen trug, kein Mitgefühl empfinden? Und selbst wenn diese Frauen vergessen, ich würde dich nie vergessen."}, {"text_ref": "Psalm 37:39", "text_content": "Die Rettung der Gerechten kommt von Jehova. Er ist ihre Festung in Zeiten der Not."}, {"text_ref": "1. Korinther 10:13", "text_content": "Ihr seid keiner Versuchung ausgesetzt, der nicht auch andere Menschen ausgesetzt sind. Gott aber ist treu, und er wird nicht zulassen, dass ihr über eure Kraft hinaus versucht werdet, sondern er wird mit der Versuchung auch den Ausweg schaffen, damit ihr sie ertragen könnt."}, {"text_ref": "Epheser 4:32", "text_content": "Geht vielmehr freundlich miteinander um, seid von Herzen mitfühlend, vergebt einander großzügig, so wie auch Gott euch durch Christus großzügig vergeben hat."}, {"text_ref": "Epheser 5:1", "text_content": "Darum nehmt euch Gott zum Vorbild als geliebte Kinder."}, {"text_ref": "1. Petrus 1:22", "text_content": "Ihr habt euch nun durch euren Gehorsam gegenüber der Wahrheit gereinigt – mit ungeheuchelter brüderlicher Zuneigung als Ergebnis. Deshalb habt tiefe, von Herzen kommende Liebe zueinander."}, {"text_ref": "Römer 8:38, 39", "text_content": "Denn ich bin überzeugt, dass weder Tod noch Leben noch Engel noch Regierungen noch Gegenwärtiges noch Zukünftiges noch Mächte noch Höhe noch Tiefe noch irgendeine andere Schöpfung uns von Gottes Liebe trennen können, die in Christus Jesus ist, unserem Herrn."}, {"text_ref": "Epheser 4:3", "text_content": "und bemüht euch ernsthaft, die Einheit des Geistes in dem vereinigenden Band des Friedens zu bewahren."}, {"text_ref": "1. Samuel 16:7", "text_content": "Aber Jehova sagte zu Samuel: „Achte nicht auf sein Aussehen und seinen hohen Wuchs, ich habe ihn bereits abgelehnt. Denn Gott sieht die Dinge nicht so wie der Mensch, weil der Mensch nur das sieht, was vor den Augen erscheint, doch Jehova sieht ins Herz.“"}, {"text_ref": "Psalm 130:3", "text_content": "Wären Vergehen das, worauf du achtest, o Jah, wer, o Jehova, könnte bestehen?"}, {"text_ref": "1. Petrus 2:17", "text_content": "Ehrt Menschen aller Art, liebt die ganze Bruderschaft, habt Ehrfurcht vor Gott, ehrt den König."}, {"text_ref": "Philipper 2:3", "text_content": "Tut nichts aus Streitsucht oder Egoismus, sondern achtet andere in Demut höher als euch selbst."}, {"text_ref": "2. Korinther 1:3", "text_content": "Gepriesen sei der Gott und Vater unseres Herrn Jesus Christus, der Vater tiefen Mitgefühls und der Gott allen Trostes."}]

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
	//textField.innerHTML = '<p>' + result.textToShow + '</p>';	
	textField.innerHTML = result.textToShow;	

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


