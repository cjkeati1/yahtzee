/** Rule for Yahtzee scoring.
 *
 * This is an "abstract class"; the real rules are subclasses of these.
 * This stores all parameters passed into it as properties on the instance
 * (to simplify child classes so they don't need constructors of their own).
 *
 * It contains useful functions for summing, counting values, and counting
 * frequencies of dice. These are used by subclassed rules.
 */

class Rule {
    constructor(params) {
        // put all properties in params on instance
        Object.assign(this, params);
    }

    sum(dice) {
        // sum of all dice
        return dice.reduce((prev, curr) => prev + curr);
    }

    freq(dice) {
        // frequencies of dice values
        const freqs = new Map();
        for (let d of dice) freqs.set(d, (freqs.get(d) || 0) + 1);
        return Array.from(freqs.values());
    }

    count(dice, val) {
        // # times val appears in dice
        return dice.filter(d => d === val).length;
    }
}

/** Given a sought-for val, return sum of dice of that val.
 *
 * Used for rules like "sum of all ones"
 */

class TotalOneNumber extends Rule {
    evalRoll = dice => {
        return this.val * this.count(dice, this.val);
    };

    description = `${this.val} point${this.val > 1 ? 's' : ''} per`;
}

/** Given a required # of same dice, return sum of all dice.
 *
 * Used for rules like "sum of all dice when there is a 3-of-kind"
 */

class SumDistro extends Rule {

    evalRoll = dice => {
        if (!this.count) {
            return this.sum(dice)
        }
        const freq = this.freq(dice);
        // do any of the counts meet or exceed this distro?
        if (freq.some(c => c >= this.count)) {
            return dice[freq.indexOf(freq.find(c => c >= this.count))] * this.count;
        } else {
            return 0;
        }
    };

    description = `${this.rule === 'threeOfKind' ? "Sum of all the dice which appear 3x" :
        (this.rule === 'fourOfKind' ? "Sum of all the dice which appear 4x" : "Sum of all the dice ")}`
}

/** Check if full house (3-of-kind and 2-of-kind) */

class FullHouse extends Rule {
    evalRoll = dice => {
        const uniques = new Set(dice);
        let it = uniques.values();

        function check(it) {
            let valueA = it.next().value;
            return dice.filter(i => i === valueA).length === 2 ||
                dice.filter(i => i === valueA).length === 3;
        }

        // full house must have 2 unique values, one with two occurrences, and the other with three
        return uniques.size === 2 && check(it) ? this.score : 0;
    };
    description = `25 points - three of a kind and a pair`;
}

/** Check for small straights. */

class SmallStraight extends Rule {
    evalRoll = dice => {
        const uniques = new Set(dice);

        function check(a, b, c, d) {
            return uniques.has(a) && uniques.has(b) && uniques.has(c) && uniques.has(d);
        }

        // small straight must be 4 different dice
        return uniques.size >= 4 &&
        (check(1, 2, 3, 4) ||
            check(2, 3, 4, 5) ||
            check(3, 4, 5, 6)) ? this.score : 0;
    };

    description = `30 points - four consecutive die faces`;
}

/** Check for large straights. */

class LargeStraight extends Rule {
    evalRoll = dice => {
        const d = new Set(dice);

        // large straight must be 5 different dice & only one can be a 1 or a 6
        return d.size === 5 && (!d.has(1) || !d.has(6)) ? this.score : 0;
    };
    description = `40 points - five consecutive die faces`;
}

/** Check if all dice are same. */

class Yahtzee extends Rule {
    evalRoll = dice => {
        // all dice must be the same
        return this.freq(dice)[0] === 5 ? this.score : 0;
    };
    description = `50 points - all dice are the same`;
}

// ones, twos, etc score as sum of that value
const ones = new TotalOneNumber({val: 1});
const twos = new TotalOneNumber({val: 2});
const threes = new TotalOneNumber({val: 3});
const fours = new TotalOneNumber({val: 4});
const fives = new TotalOneNumber({val: 5});
const sixes = new TotalOneNumber({val: 6});

// three/four of kind score as sum of all dice
const threeOfKind = new SumDistro({count: 3, rule: "threeOfKind"});
const fourOfKind = new SumDistro({count: 4, rule: "fourOfKind"});

// full house scores as flat 25
const fullHouse = new FullHouse({score: 25});

// small/large straights score as 30/40
const smallStraight = new SmallStraight({score: 30});
const largeStraight = new LargeStraight({score: 40});

// yahtzee scores as 50
const yahtzee = new Yahtzee({score: 50});

// for chance, can view as some of all dice, requiring at least 0 of a kind
const chance = new SumDistro({count: 0, rule: "chance"});

export {
    ones,
    twos,
    threes,
    fours,
    fives,
    sixes,
    threeOfKind,
    fourOfKind,
    fullHouse,
    smallStraight,
    largeStraight,
    yahtzee,
    chance
};
