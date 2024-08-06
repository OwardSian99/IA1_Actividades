function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

function test(states, visitedStates, iterationCount, maxIterations) {
    if (iterationCount > maxIterations) {
        document.getElementById("log").innerHTML += "<br>All states have been processed. Stopping.";
        return;
    }
    
    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    document.getElementById("log").innerHTML += "<br> Location: " + location + " | Action: " + action_result;
    
    if (action_result == "CLEAN") {
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    } else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";
    
    // Mark the state as visited
    var currentState = `${states[0]}-${states[1]}-${states[2]}`;
    visitedStates.add(currentState);
    
    if (visitedStates.size === 8) {
        document.getElementById("log").innerHTML += "<br>All states have been processed. Stopping.";
    } else {
        if (Math.random() < 0.5) {
            states[1] = "DIRTY"; 
        } else {
            states[2] = "DIRTY"; 
        }
        setTimeout(function() { test(states, visitedStates, iterationCount + 1, maxIterations); }, 100);
    }
}

var states = ["A", "DIRTY", "DIRTY"];
var visitedStates = new Set();
var a = 1;
var b = 200;
test(states, visitedStates, a, b);
