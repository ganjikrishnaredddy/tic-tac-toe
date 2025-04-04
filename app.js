let boxes = document.querySelectorAll(".box");
    let resetbtn = document.querySelector("#resetbtn");
    let newgame = document.querySelector("#newbtn");
    let msgcontainer = document.querySelector("#message");
    let msg = document.querySelector("#msg");

    let turno = true; // true -> 0, false -> X

    const winpatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8],
        [2, 4, 6]
    ];

    const resetGame = () => {
        turno = true;
        enableBoxes();
        msgcontainer.classList.add("hide");
    };

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (turno) {
                box.innerText = "0";
                turno = false;
            } else {
                box.innerText = "X";
                turno = true;
            }
            box.disabled = true;
            checkwinner();
        });
    });

    const showwinner = (winner) => {
        console.log(`showwinner called with ${winner}`);
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgcontainer.classList.remove("hide");
        disableBoxes();
    };

    const disableBoxes = () => {
        boxes.forEach((box) => {
            box.disabled = true;
        });
    };

    const enableBoxes = () => {
        boxes.forEach((box) => {
            box.disabled = false;
            box.innerText = "";
        });
    };

    const checkwinner = () => {
        for (let pattern of winpatterns) {
            let pos1 = boxes[pattern[0]].innerText;
            let pos2 = boxes[pattern[1]].innerText;
            let pos3 = boxes[pattern[2]].innerText;

            if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
                if (pos1 === pos2 && pos2 === pos3) {
                    console.log("WINNER", pos1);
                    showwinner(pos1);
                    return;
                }
            }
        }
    };

    resetbtn.addEventListener("click", resetGame);
    newgame.addEventListener("click", resetGame);