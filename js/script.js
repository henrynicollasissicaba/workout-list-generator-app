const menuIcon = document.querySelector("#menu");
const closeMenuIcon = document.querySelector("#close-menu");
const navBar = document.querySelector(".nav");

const generateWorkoutBtn = document.querySelector("#generateBtn");
const clearBtn = document.querySelector("#clearBtn");

const ul = document.querySelector(".workoutList");

let getExercise = JSON.parse(localStorage.getItem("savedExercises"));

menuIcon.addEventListener("touchstart", () => {
  navBar.classList.toggle("active");
});

closeMenuIcon.addEventListener("touchstart", () => {
  navBar.classList.remove("active");
});

generateWorkoutBtn.addEventListener("click", () => {
  const getRadioExercise = document.querySelector('input[name="exercise"]:checked').value;

  switch (getRadioExercise) {
    case "chest-triceps":
      getExercise = concatExercises(getChestExercise(), getTricepsExercise());
      break;

    case "back-biceps":
      getExercise = concatExercises(getBackExercise(), getBicepsExercise());
      break;

    case "leg-shoulders":
      getExercise = concatExercises(getLegExercise(), getShouldersExercise());
      break;
  }
  
  localStorage.setItem("savedExercises", JSON.stringify(getExercise));

  getCheckedRadio()
  displayCheckedRadio()
  displaySavedExercises();
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  ul.innerHTML = "";
});

const displaySavedExercises = () => {
  let li = "";

  if (!getExercise) {
    getExercise = [];
  } else {
    getExercise.forEach((exercise, index) => {
      let doneExercise = exercise.status == "done" ? "checked" : "";

      li += `<li class="workoutListExercise">
                <label for="${index}">
                    <input onclick="updateCheckboxStatus(this)" type="checkbox" name="workout-exercise" id="${index}" ${doneExercise}>
                    <div class="${doneExercise}">${exercise.exerciseName}</div>
                </label>
                <p>${exercise.reps}</p>
                </li>`;
    });
  }

  ul.innerHTML = li;
};

const getCheckedRadio = () => {
  const radios = document.querySelectorAll('input[type="radio"]')

  radios.forEach(radio => {
    radio.addEventListener('click', () => {
      localStorage.setItem("exercise", radio.value)
    })
  })
}

const displayCheckedRadio = () => {
  const selectedRadio = localStorage.getItem("exercise")

  if(selectedRadio){
    const radio = document.querySelector(`input[value="${selectedRadio}"]`)

    if(radio){
      radio.checked = true
    } else {
      radio.checked = false
    }
  }
}

const updateCheckboxStatus = (selectedExercise) => {
  let checkedExercise = selectedExercise.parentElement.lastElementChild;

  if (selectedExercise.checked) {
    checkedExercise.classList.add("checked");
    getExercise[selectedExercise.id].status = "done";
  } else {
    checkedExercise.classList.remove("checked");
    getExercise[selectedExercise.id].status = "undone";
  }

  localStorage.setItem("savedExercises", JSON.stringify(getExercise));
};

const getIndexOfExercise = (array) => {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const concatExercises = (firstExercise, secondExercise) => {
  const arrayWithAllExercises = [...firstExercise, ...secondExercise];
  return arrayWithAllExercises;
};

const getExercises = (exerciseList, maxNumberOfExercise) => {
  let sortedIndex = [];
  let exercises = [];

  while (sortedIndex.length < maxNumberOfExercise) {
    let sortedExercise = getIndexOfExercise(exerciseList);

    if (!sortedIndex.includes(sortedExercise)) {
      sortedIndex.push(sortedExercise);
      exercises.push(sortedExercise);
    }
  }
  return exercises;
};

const getChestExercise = () => {
  const MAX_NUMBER_OF_EXERCISES = 4;
  return getExercises(chestExercises, MAX_NUMBER_OF_EXERCISES);
};
const getTricepsExercise = () => {
  const MAX_NUMBER_OF_EXERCISES = 3;
  return getExercises(tricepsExercises, MAX_NUMBER_OF_EXERCISES);
};
const getBackExercise = () => {
  const MAX_NUMBER_OF_EXERCISES = 4;
  return getExercises(backExercises, MAX_NUMBER_OF_EXERCISES);
};
const getBicepsExercise = () => {
  const MAX_NUMBER_OF_EXERCISES = 3;
  return getExercises(bicepsExercises, MAX_NUMBER_OF_EXERCISES);
};
const getLegExercise = () => {
  const MAX_NUMBER_OF_EXERCISES = 6;
  return getExercises(legExercises, MAX_NUMBER_OF_EXERCISES);
};
const getShouldersExercise = () => {
  const MAX_NUMBER_OF_EXERCISES = 3;
  return getExercises(shouldersExercises, MAX_NUMBER_OF_EXERCISES);
};

getCheckedRadio()
displayCheckedRadio()
displaySavedExercises();