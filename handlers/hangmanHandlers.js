const { words } = require('../data/words');

// write your handlers here...
const handleWordByID = (req, res) => {
    const _id = req.params.id;
    const word = words.find((word) => {
        return word.id === _id;
    });

    if (word !== undefined) {
        res.status(200).json(word);
    } else {
        res.status(404).json('Word not found!');
    }
    
};

const handleRandomWord = (req, res) => {
    const randomIndex = Math.round((Math.random() * words.length));
    const randomWord = words[randomIndex];
    res.status(200).json({ id: randomWord.id, letterCount: randomWord.letterCount });
};

const handleGuessLetter = (req, res) => {
    const _id = req.params.id;
    const _letter = req.params.letter;
    // define word object
    const wordObj = words.find((word) => {
        return word.id === _id;
    });
    if (wordObj !== undefined) {
        // define word string
        const wordStr = wordObj.word;

        const lettersArr = [];
        for (i = 0; i < wordStr.length; i++) {
            if (wordStr.charAt(i) === _letter) {
                lettersArr[i] = true;
            } else {
                lettersArr[i] = false;
            }
        }
        if (wordStr.indexOf(_letter) !== -1) {
            res.status(200).json(lettersArr);
        } else {
            res.status(404).json('Sorry, try again!');
        }
        
    } else {
        res.status(404).json('Word not found, check the ID!');
    }
};

module.exports = { handleWordByID, handleRandomWord, handleGuessLetter };