let mainBox = document.querySelector('.saved-box')
let getSavedCustomExercise = JSON.parse(localStorage.getItem("savedCustomExercises"))

const showSavedExercises = () => {
    let box = ""

    getSavedCustomExercise.forEach((internArray, id) => {
        let savedExercises = ""

        internArray.forEach(exercise => {
            savedExercises += `<div class="box-exercises">
                        <div class="saved-exercise-name">
                            <p>${exercise.exerciseName}</p>
                        </div>
                        <div class="saved-set-x-rep">
                            <p>${exercise.setsAndReps}</p>
                        </div>
                    </div>`
        })

        box += `<div class="box">
                <div class="box-title">
                    <h1>Treino ${id + 1}</h1>
                    <button>
                        <ion-icon onclick="deleteSavedExercise(${id})" name="trash-outline"></ion-icon>
                    </button>
                </div>
                <div class="box-content">
                    ${savedExercises}
                </div>
            </div>`
    })

    mainBox.innerHTML = box
}

const deleteSavedExercise = (savedExerciseId) => {
    getSavedCustomExercise.splice(savedExerciseId, 1)

    localStorage.setItem("savedCustomExercises", getSavedCustomExercise)
    showSavedExercises()
}

showSavedExercises()