$("#plus").on("click", () => {
    $(".window").css("visibility", "visible");
});
function Card(id, title = "Task title", description = "Task description") {
    this.title = title;
    this.description = description;
    this.id = id;
    this.isCurrent = true;

    this.gethtml = function () {
        return `<div class='child' id='c${this.id}'><h3>${this.title}</h3><p>${this.description}</p>
        <button class="delbt" onclick="delcard('${this.id}')">delete</button></div>`;
    };
}

function TaskCards() {
    this.tasks = [];
    this.render = function () {
        $("#current").empty();
        $("#completed").empty();
        for (card of this.currentTasks) {
            if (card.isCurrent) {
                $("#current").append(card.gethtml());
            } else {
                $("#complete").append(card.gethtml());
            }
            $(`#${$(card.gethtml()).attr("id")}`).draggable({ revert: true });
        }
    };
}

let taskcards = new TaskCards();

function delcard(id) {
    taskcards.tasks.splice(id, 1);
    $(`#c${id}`).remove();
    console.log(taskcards);
}

$("#create").on("click", () => {
    $(".window").css("visibility", "hidden");
    let card = new Card(
        taskcards.tasks.length,
        $("#title").val(),
        $("#desc").val()
    );
    taskcards.tasks.push(card);
    $("#current").append(card.gethtml());
    console.log(`#${$(card.gethtml()).attr("id")}`);
    $(`#${$(card.gethtml()).attr("id")}`).draggable({ revert: true });
    console.log(taskcards.tasks);
});
$(".child").draggable({
    revert: true,
});

$(".parent").droppable({
    accept: ".child",
    drop: function (event, ui) {
        console.log($(ui.draggable));

        if ($(this).attr("id") == "completed") {
            taskcards.tasks[
                Number($(ui.draggable).attr("id").replace("c", ""))
            ].isCurrent = false;
        } else {
            taskcards.tasks[
                Number($(ui.draggable).attr("id").replace("c", ""))
            ].isCurrent = true;
        }
        console.log($(this).attr("id"));
        console.log(taskcards);
        $(this).append($(ui.draggable));
    },
});
