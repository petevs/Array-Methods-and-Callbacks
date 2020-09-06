import { fifaData } from "./fifa.js";
console.log(fifaData);

// console.log("its working");
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

console.log("2014 World Cup Final");
//Filter Out 2014 World Cup Final
let wcf2014 = fifaData.filter(
  (games) => games.Year === 2014 && games.Stage === "Final"
);

//Get Home Team Name
let wcfHomeTeam = wcf2014.map(function (item) {
  return item["Home Team Name"];
});
console.log(wcfHomeTeam);

//Get Away Team Name
const wcfAwayTeam = wcf2014.map((item) => item["Away Team Name"]);
console.log(wcfAwayTeam);

//Get Home Team Goals
const wcfHomeTeamGoals = wcf2014.map((item) => item["Home Team Goals"]);
console.log(wcfHomeTeamGoals);

//Get Away Team Goals
const wcfAwayTeamGoals = wcf2014.map((item) => item["Away Team Goals"]);
console.log(wcfAwayTeamGoals);

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
  return data.filter((games) => games.Stage === "Final");
}
console.log("All The FIFA Finals");
console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(data, getFinals) {
  /* code here */
  return getFinals(data).map((item) => item.Year);
}
console.log("List of All The Finals Years");
console.log(getYears(fifaData, getFinals));

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */

function getWinners(data, getFinals) {
  let winners = [];
  getFinals(data).forEach(function (item) {
    if (item["Home Team Goals"] > item["Away Team Goals"]) {
      winners.push(item["Home Team Name"]);
    } else {
      winners.push(item["Away Team Name"]);
    }
  });
  return winners;
}
console.log("****** World Cup Winners ******");
console.log(getWinners(fifaData, getFinals));

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(data, getWinners, getYears) {
  let years = getYears(data, getFinals);
  let winners = getWinners(data, getFinals);
  let winnersByYear = [];
  for (let i = 0; i < years.length; i++) {
    winnersByYear.push(`In ${years[i]}, ${winners[i]} won the world cup!`);
  }
  return winnersByYear;
}

console.log("Winners By Year:");
console.log(getWinnersByYear(fifaData, getWinners, getYears));

/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
  let totalHomeGoals = data.reduce(function (accumulator, item) {
    return accumulator + item["Home Team Goals"];
  }, 0);
  let totalAwayGoals = data.reduce(function (accumulator, item) {
    return accumulator + item["Away Team Goals"];
  }, 0);
  let avgHomeGoals = Math.round(totalHomeGoals / data.length);
  let avgAwayGoals = Math.round(totalAwayGoals / data.length);
  return `Average Home Team Goals: ${avgHomeGoals} Average Away Team Goals: ${avgAwayGoals}`;
}

console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
  let countryGames = data.filter(
    (games) =>
      games["Away Team Initials"] === teamInitials ||
      games["Home Team Initials"] === teamInitials
  );
  let winners = [];
  countryGames.forEach(function (item) {
    if (
      item["Home Team Initials"] === teamInitials &&
      item["Home Team Goals"] > item["Away Team Goals"]
    ) {
      winners.push(item);
    } else if (
      item["Away Team Initials"] === teamInitials &&
      item["Away Team Goals"] > item["Home Team Goals"]
    ) {
      winners.push(item);
    }
  });
  return `${teamInitials} has won ${winners.length} world cup games!`;
}

console.log(getCountryWins(fifaData, "FRA"));

/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
  let finals = getFinals(data);
  let teams = [];
  finals.forEach(function (item) {
    if (!teams.includes(item["Away Team Name"])) {
      teams.push(item["Away Team Name"]);
    }
    if (!teams.includes(item["Home Team Name"])) {
      teams.push(item["Home Team Name"]);
    }
  });
  teams.forEach(function (item) {
    let awayGames = finals.filter((games) => games["Away Team Name"] === item);
    let homeGames = finals.filter((games) => games["Home Team Name"] === item);
    let goalList = [];
    awayGames.forEach(function (item) {
      goalList.push(item["Away Team Goals"]);
    });
    homeGames.forEach(function (item) {
      goalList.push(item["Home Team Goals"]);
    });
    let totalGoals = goalList.reduce(function (accumulator, item) {
      return accumulator + item;
    }, 0);
    let avgGoals = Math.round((totalGoals / goalList.length) * 100) / 100;
    console.log({
      team: item,
      appearances: goalList.length,
      totalGoals: totalGoals,
      averageGoals: avgGoals,
    });
  });
}

console.log(getGoals(fifaData));

/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {
  /* code here */
}

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
