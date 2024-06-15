/** Textual markov chain generator */


class MarkovMachine {

  static randomWord(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  makeChains() {
    this.chains = {};
    
    for (let i = 0; i < this.words.length; i++){
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;
      
      if (!this.chains[word]) {
        this.chains[word] = [];
      }
      
      this.chains[word].push(nextWord);
    }
  }

  makeText(numWords = 100) {
    let keys = Array.from(Object.keys(this.chains));
    let key = MarkovMachine.randomWord(keys);
    let result = [];
    
    for (let i = 0; i < numWords; i++){
      result.push(key);
      let nextWords = this.chains[key];
      if (!nextWords || numWords.length === 0) break;
      key = MarkovMachine.randomWord(nextWords);
    }
    return result.join(" ");
  }
}

module.exports = MarkovMachine;