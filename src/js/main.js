import { GameController } from "./game/controller.js";
import { GameModel } from "./game/model.js";
import { GameView } from "./game/view.js";

function main() {
    const game = new GameController(new GameModel(), new GameView()); 

    // const range = {
    //     from: 1,
    //     to: 5,
    // };

    // range[Symbol.iterator] = function() {
    //     return {
    //         current: this.from,
    //         last: this.to,

    //         next() {
    //             if(this.current <= this.last) {
    //                 return { done: false, value: this.current++ };
    //             } else {
    //                 return { done: true };
    //             }
    //         },
    //     }
    // } 

    // for(let number of range) {
    //     console.log(number);
    // }
}

main();