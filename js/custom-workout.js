const addBox = document.querySelector('.add-box')
const popupBox = document.querySelector('.popup-box')
const closePopup = document.querySelector('#close-popup')
const addBtn = document.querySelector('#addBtn')
const inputExercise = document.querySelector('#name-exercise')
const inputSetsAndReps = document.querySelector('#set-x-rep')
const customList = document.querySelector('.customList')
const cleanCustomList = document.querySelector('#cleanCustomList')
const saveBtn = document.querySelector('#saveList')
const popupSaveBtn = document.querySelector('.popup-saved-box')
const closeSavePopupBtn = document.querySelector('#close-popup-confirm')

let exercises = JSON.parse(localStorage.getItem("customExercises") || "[]")
let savedCustomExercises = JSON.parse(localStorage.getItem("savedCustomExercises") || "[]")

addBox.addEventListener('click', () => {
    popupBox.classList.add('show')
})

closePopup.addEventListener('click', () => {
    inputExercise.value = ""
    inputSetsAndReps.value = ""
    popupBox.classList.remove('show')
})

const showCustomExercises = () => {
    let liTag = ""

    exercises.forEach((exercise, id) => {
        liTag += `<li class="customBox">
                    <div class="customExercise">
                    <ion-icon name="accessibility-outline"></ion-icon>
                        <button onclick="deleteExercise(${id})">
                            <ion-icon name="trash-outline"></ion-icon>
                        </button>
                        <p>${exercise.exerciseName}</p>
                    </div>
                    <div class="customReps">
                        <p>${exercise.setsAndReps}</p>
                    </div>
                </li>`
    })

    customList.innerHTML = liTag
}

saveBtn.addEventListener('click', () => {
    savedCustomExercises.push(exercises)
    localStorage.setItem("savedCustomExercises", JSON.stringify(savedCustomExercises))
    
    popupSaveBtn.classList.add('show')
})

closeSavePopupBtn.addEventListener('click', () => {
    popupSaveBtn.classList.remove('show')
})

const deleteExercise = (exerciseId) => {
    exercises.splice(exerciseId, 1)

    localStorage.setItem("customExercises", JSON.stringify(exercises))
    showCustomExercises()
}

addBtn.addEventListener('click', () => {
    let exercise = inputExercise.value
    let setXRep = inputSetsAndReps.value
    
    if(exercise && setXRep){
        let exerciseInfo = { exerciseName: exercise, setsAndReps: setXRep }
        exercises.push(exerciseInfo)
        localStorage.setItem("customExercises", JSON.stringify(exercises))
        
        closePopup.click()
    }

    showCustomExercises()
})

cleanCustomList.addEventListener('click', () => {
    localStorage.removeItem('customExercises')
    window.location.reload()
})

showCustomExercises()