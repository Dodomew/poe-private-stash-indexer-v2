const getCurrentLeague = require('../getters/getCurrentLeague');
const getAllStats = require('../getters/getAllExistingTradeModifiers');
let instance = null;

class EnvironmentVariables {

    constructor() {
        if (instance) {
            return instance;
        }

        this.league = null;
        this.stats = null;

        instance = this;
        return instance;
    }

    getInstance() {
        return instance || new EnvironmentVariables();
    }

    getLeague() {
        console.log('EnvironmentVariables getLeague')
        if(this.league !== null) {
            console.log('return league')
            return this.league;
        }
        else {
            console.log('await getCurrentLeague');
            // this.league = getCurrentLeague.get();
            getCurrentLeague.get().then((league) => {
                this.league = league;
                return this.league;
            });
        }
    }

    replaceNumbersWithCharacter(str) {
        return str.replace(/[0-9]+/g, '#');
    }

    getStats() {
        console.log('EnvironmentVariables getStats')
        if(this.stats !== null) {
            console.log('return stats')
            return this.stats;
        }

        console.log('await getAllStats');
        getAllStats.get().then((statsObj) => {
            this.stats = statsObj;
            this.sanitizeStats();
            return this.stats;
        });
    }

    sanitizeStats() {
        console.log('sanitizeStats start')
        let statsArray = this.stats.result;
        for (let i = 0; i < statsArray.length; i++) {
            if(statsArray[i].label === 'Pseudo') {
                continue;
            }
            let entries = statsArray[i].entries;
            for (let j = 0; j < entries.length; j++) {
                entries[j].text = this.replaceNumbersWithCharacter(entries[j].text);
                // if(entries[j].text.includes('Onslaught')) {
                //     console.log('onslaught');
                // }
            }
        }

        this.stats = statsArray;
        console.log('sanitizeStats end')
    }
}

module.exports = EnvironmentVariables;
