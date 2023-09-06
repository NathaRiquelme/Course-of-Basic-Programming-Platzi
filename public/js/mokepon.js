const sectionSelectionOfAttack = document.getElementById("attack_selection")
const sectionRestart = document.getElementById("restart")
const buttonSelectPetPlayer = document.getElementById('button_select_pet')
const buttonRestart = document.getElementById("button_restart")
sectionRestart.style.display = "none"

const sectionSelectionOfPet = document.getElementById("pet_selection")
const spanPetPlayer = document.getElementById("pet_player")

const spanRivalPet = document.getElementById("rivals_pet")

const spanPlayersLives = document.getElementById("players_lives") 
const spanRivalsLives = document.getElementById("rivals_lives") 

const sectionMessages = document.getElementById("result")
const playersAttack1 = document.getElementById("players_attack")
const rivalsAttack1 = document.getElementById("rivals_attack")
const cardsContainer = document.getElementById("cards_container")
const attacksContainer = document.getElementById("attacks_container")

const sectionViewMap = document.getElementById('view_map')
const map = document.getElementById('map')

let playerId = null
let enemyId = null
let mokepons = []
let mokeponsEnemies = []
let playersAttack = []
let rivalsAttack = []
let mokeponsOptions
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let inputPydos
let inputLangostelvis
let inputTucapalma
let petOfThePlayer
let petSelectedObject
let mokeponsAttacks
let mokeponsAttacksOfTheEnemy
let buttonFire
let buttonWater 
let buttonEarth 
let buttons = []
let playersAttackIndex 
let rivalsAttackIndex
let playersVictories = 0
let rivalsVictories = 0
let canvas = map.getContext('2d')
let interval
let mapBackground = new Image()
mapBackground.src = './assets/mokemap.png'
let heightWeAreLooking
let widthMap = window.innerWidth - 20
const widthMaxMap  = 450

if (widthMap > widthMaxMap){
    widthMap = widthMaxMap - 20
}

heightWeAreLooking = widthMap * 350 / 450

map.width = widthMap
map.height = heightWeAreLooking

class Mokepon {
    constructor(name, picture, live, id = 0) {
        this.id = id
        this.name = name
        this.picture = picture
        this.live = live
        this.attacks = []
        this.width = 40
        this.height = 40
        this.x = random(0, map.width - this.width)
        this.y = random(0, map.height - this.height)
        this.mapPic = new Image()
        this.mapPic.src = picture
        this.velocityX = 0
        this.velocityY = 0
    }

    paintMokepons(){
        canvas.drawImage(
            this.mapPic,
            this.x,
            this.y,
            this.width,
            this.height
         )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 3)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 3)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 3)
let pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 3)
let langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 3)
let tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 3)

const HIPODOGE_ATTACKS = [
    {name: '💦', id: 'button_water'},
    {name: '💦', id: 'button_water'},
    {name: '💦', id: 'button_water'},
    {name: '🔥', id: 'button_fire'},
    {name: '🌎', id: 'button_earth'}
]

const CAPIPEPO_ATTACKS = [
    {name: '🌎', id: 'button_earth'},
    {name: '🌎', id: 'button_earth'},
    {name: '🌎', id: 'button_earth'},
    {name: '💦', id: 'button_water'},
    {name: '🔥', id: 'button_fire'}
]

const RATIGUEYA_ATTACKS = [
    {name: '🔥', id: 'button_fire'},
    {name: '🔥', id: 'button_fire'},
    {name: '🔥', id: 'button_fire'},
    {name: '🌎', id: 'button_earth'},
    {name: '💦', id: 'button_water'}
]

const PYDOS_ATTACKS = [
    {name: '💦', id: 'button_water'},
    {name: '💦', id: 'button_water'},
    {name: '💦', id: 'button_water'},
    {name: '🔥', id: 'button_fire'},
    {name: '🌎', id: 'button_earth'}
]

const LANGOSTELVIS_ATTACKS = [
    {name: '🌎', id: 'button_earth'},
    {name: '🌎', id: 'button_earth'},
    {name: '🌎', id: 'button_earth'},
    {name: '💦', id: 'button_water'},
    {name: '🔥', id: 'button_fire'}
]

const TUPACALMA_ATTACKS = [
    {name: '🔥', id: 'button_fire'},
    {name: '🔥', id: 'button_fire'},
    {name: '🔥', id: 'button_fire'},
    {name: '🌎', id: 'button_earth'},
    {name: '💦', id: 'button_water'}
]

hipodoge.attacks.push(...HIPODOGE_ATTACKS)
capipepo.attacks.push(...CAPIPEPO_ATTACKS)
ratigueya.attacks.push(...RATIGUEYA_ATTACKS)
pydos.attacks.push(...PYDOS_ATTACKS)
langostelvis.attacks.push(...LANGOSTELVIS_ATTACKS)
tucapalma.attacks.push(...TUPACALMA_ATTACKS)

mokepons.push(hipodoge, capipepo, ratigueya, pydos, langostelvis, tucapalma)

function startGame() {
    sectionSelectionOfAttack.style.display = "none"
    sectionViewMap.style.display = 'none'
    
    mokepons.forEach((mokepon) => {
        mokeponsOptions = `
        <input type="radio" name = "pet" id=${mokepon.name} />
        <label class="mokepons_card" for= ${mokepon.name}>
        <p>${mokepon.name}</p>
        <img src=${mokepon.picture} alt=${mokepon.name}>
    </label>
    `
    cardsContainer.innerHTML += mokeponsOptions

    inputHipodoge = document.getElementById("Hipodoge")
    inputCapipepo = document.getElementById("Capipepo")
    inputRatigueya = document.getElementById("Ratigueya")
    inputPydos = document.getElementById("Pydos")
    inputLangostelvis = document.getElementById("Langostelvis")
    inputTucapalma = document.getElementById('Tucapalma')

    })

    buttonSelectPetPlayer.addEventListener('click', selectPetPlayer)
    buttonRestart.addEventListener("click", restartGame)
    joinTheGame()
}

function joinTheGame(){
    fetch('http://192.168.10.10:8080/join')
    .then((res) => {
        if (res.ok){
            res.text()
                .then((answer) => {
                    console.log(answer);
                    playerId = answer
                })
        }
    })
}

function selectPetPlayer() {

    if (inputHipodoge.checked) {
        spanPetPlayer.innerHTML = inputHipodoge.id
        petOfThePlayer = inputHipodoge.id
    }
    else if (inputCapipepo.checked) {
        spanPetPlayer.innerHTML = inputCapipepo.id
        petOfThePlayer = inputCapipepo.id
    }
    else if (inputRatigueya.checked) {
        spanPetPlayer.innerHTML = inputRatigueya.id
        petOfThePlayer = inputRatigueya.id
    }
    else if (inputPydos.checked) {
        spanPetPlayer.innerHTML = inputPydos.id
        petOfThePlayer = inputPydos.id
    }
    else if (inputLangostelvis.checked) {
        spanPetPlayer.innerHTML = inputLangostelvis.id
        petOfThePlayer = inputLangostelvis.id
    }
    else if (inputTucapalma.checked) {
        spanPetPlayer.innerHTML = inputTucapalma.id
        petOfThePlayer = inputTucapalma.id
    }
    else {
        alert('Select a pet please 🙏')
        return
    }

    sectionSelectionOfPet.style.display = "none"
    selectMokepon(petOfThePlayer)
    extractAttacks(petOfThePlayer)
    sectionViewMap.style.display = 'flex'
    startMap()
}

function selectMokepon(petOfThePlayer){
    fetch(`http://192.168.10.10:8080/mokepon/${playerId}`,{
        method: 'post',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            mokepon: petOfThePlayer
        })
    })
}

function extractAttacks(petOfThePlayer){
    let attacks
    for (let i = 0; i < mokepons.length; i++) {
        if (petOfThePlayer === mokepons[i].name) {
            attacks = mokepons[i].attacks
        }
    }
    showAttacks(attacks)
}

function showAttacks(attacks){
    attacks.forEach((attack) => {
        mokeponsAttacks = `
        <button id=${attack.id} class="attack_button BAttack">${attack.name}</button>
        `
        attacksContainer.innerHTML += mokeponsAttacks
    })

    buttonFire = document.getElementById('button_fire')
    buttonWater = document.getElementById('button_water')
    buttonEarth = document.getElementById('button_earth')
    buttons = document.querySelectorAll('.BAttack')

}

function sequenceOfAttack(){
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                playersAttack.push('Fire 🔥')
                button.style.background = '#FFE17B'
                button.disabled = true
            } else if (e.target.textContent === '💦') {
                playersAttack.push('Water 💦')
                button.style.background = '#FFE17B'
                button.disabled = true
            } else {
                playersAttack.push('Earth 🌎')
                button.style.background = '#FFE17B'
                button.disabled = true
            }
            if(playersAttack.length === 5){
                sendAttacks()
            }
        })
    })
}

function sendAttacks(){
    console.log('send attacks', playersAttack);

    fetch(`http://192.168.10.10:8080/mokepon/${playerId}/attacks`,{
        method: 'post',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            attacks: playersAttack
        })
    })
    interval = setInterval(obtainAttacks, 50)
}

function obtainAttacks(){
    console.log('OBTAIN ATTACKS');

    fetch(`http://192.168.10.10:8080/mokepon/${enemyId}/attacks`)
    .then(function (res){
        if (res.ok) {
            res.json()
            .then(function({ attacks }){
                if(attacks.length === 5){
                    rivalsAttack = attacks
                    combat()
                }
            })
        }
    })
}

function selectPetRival(rival){
    spanRivalPet.innerHTML = rival.name
    mokeponsAttacksOfTheEnemy = rival.attacks
    sequenceOfAttack()
}

function rivalsRandomAttack() {
    console.log('enemy attacks', mokeponsAttacksOfTheEnemy)
    let randomAttack = random(0, mokeponsAttacksOfTheEnemy.length -1)
    
    if (randomAttack == 0 || randomAttack ==1) {
        rivalsAttack.push('Fire 🔥')
    } else if (randomAttack == 3 || randomAttack == 4) {
        rivalsAttack.push('Water 💦')
    } else {
        rivalsAttack.push('Earth 🌎')
    }
    console.log(rivalsAttack)
    startFight()
}

function startFight(){
    if (playersAttack.length === 5) {
        combat()
    }
}

function bothOpponentsIndex(player, rival){
    playersAttackIndex = playersAttack[player]
    rivalsAttackIndex = rivalsAttack[rival]
}

function combat(){
    clearInterval(interval)
    console.log('COMBAT');

    for (let index = 0; index < playersAttack.length; index++) {
        if(playersAttack[index] === rivalsAttack[index]) {
            bothOpponentsIndex(index, index)
            createMessage("You have tied")
        } else if(playersAttack[index] === 'Fire 🔥' && rivalsAttack[index] === 'Earth 🌎') {
            bothOpponentsIndex(index, index)
            createMessage("You won 🥇")
            playersVictories++
            spanPlayersLives.innerHTML = playersVictories
        } else if(playersAttack[index] === 'Water 💦' && rivalsAttack[index] === 'Fire 🔥') {
            bothOpponentsIndex(index, index)
            createMessage("You won 🥇")
            playersVictories++
            spanPlayersLives.innerHTML = playersVictories
        } else if(playersAttack[index] === 'Earth 🌎' && rivalsAttack[index] === 'Water 💦') {
            bothOpponentsIndex(index, index)
            createMessage("You won 🥇")
            playersVictories++
            spanPlayersLives.innerHTML = playersVictories
        } else{
            bothOpponentsIndex(index, index)
            createMessage("You lost")
            rivalsVictories++
            spanRivalsLives.innerHTML = rivalsVictories
        }
    checkPlayersLives()
}}

function checkPlayersLives(){
    if (playersVictories == rivalsVictories){
        createFinalMessage("You tied")
    }else if (playersVictories < rivalsVictories){
        createFinalMessage("You finally lost")
    }else {
        createFinalMessage("You finally won 🥇, congratulations!")
    }
}

function createMessage(result){
    let playersNewAttack = document.createElement('p')
    let rivalsNewAttack = document.createElement('p')

    sectionMessages.innerHTML = result
    playersNewAttack.innerHTML = playersAttackIndex
    rivalsNewAttack.innerHTML = rivalsAttackIndex

    playersAttack1.appendChild(playersNewAttack)
    rivalsAttack1.appendChild(rivalsNewAttack)

}

function createFinalMessage(finalResult){
    
    sectionMessages.innerHTML = finalResult
    
    sectionRestart.style.display = "block"
}

function restartGame(){
    location.reload()
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function canvasPainting(){
    petSelectedObject.x = petSelectedObject.x + petSelectedObject.velocityX
    petSelectedObject.y = petSelectedObject.y + petSelectedObject.velocityY
    canvas.clearRect(0, 0, map.width, map.height)
    canvas.drawImage(
        mapBackground,
        0,
        0,
        map.width,
        map.height
    )
    petSelectedObject.paintMokepons()

    sendPosition(petSelectedObject.x, petSelectedObject.y)

    mokeponsEnemies.forEach(function (mokepon){
        // if (mokepon != undefined){
            mokepon.paintMokepons()
            checkCollision(mokepon)
        })
    }

function sendPosition(x, y){
    fetch(`http://192.168.10.10:8080/mokepon/${playerId}/position`, {
        method: 'post',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function({ rivals }){
                    mokeponsEnemies = rivals.map(function (rival){
                        console.log({rival});
                    let mokeponRival = null
                    // if (mokeponRival != undefined) 
                    const mokeponName = rival.mokepon.name || ""
                    if (mokeponName === "Hipodoge") {
                        mokeponRival = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 3, rival.id)
                    } else if (mokeponName === "Capipepo") {
                        mokeponRival = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 3, rival.id)
                    } else if (mokeponName === "Ratigueya") {
                        mokeponRival = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 3, rival.id)
                    } else if (mokeponName === "Pydos") {
                        mokeponRival = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 3, rival.id)
                    } else if (mokeponName === "Langostelvis") {
                        mokeponRival = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 3, rival.id)
                    } else if (mokeponName === "Tucapalma") {
                        mokeponRival = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 3, rival.id)
                    } 

                    mokeponRival.x = rival.x || 0
                    mokeponRival.y = rival.y || 0

                    return mokeponRival
                })
            })
        }
    })
}

function moveRight(){
    petSelectedObject.velocityX = 5
    canvasPainting()
}

function moveLeft(){
    petSelectedObject.velocityX = -5
    canvasPainting()
}

function moveUp(){
    petSelectedObject.velocityY = -5
    canvasPainting()
}

function moveDown(){
    petSelectedObject.velocityY= 5
    canvasPainting()
}

function stopMovement(){
    petSelectedObject.velocityX= 0
    petSelectedObject.velocityY= 0
}

function aKeyWasPressed(event){
    switch (event.key) {
        case 'ArrowRight':
            moveRight()
            break
        case 'ArrowLeft':
            moveLeft()
            break
        case 'ArrowUp':
            moveUp()
            break
        case 'ArrowDown':
            moveDown()
            break
        default:
            break;
    }
}

function startMap(){
    petSelectedObject = obtainSelectedPet(petOfThePlayer)
    interval = setInterval(canvasPainting, 50)
    window.addEventListener('keydown', aKeyWasPressed)
    window.addEventListener('keyup', stopMovement)
}

function obtainSelectedPet(){
    for (let i = 0; i < mokepons.length; i++) {
        if (petOfThePlayer === mokepons[i].name) {
            return mokepons[i]
        }
    }
}

function checkCollision(rival){
    const upRival = rival.y
    const downRival = rival.y + rival.height
    const rightRival = rival.x + rival.width
    const leftRival = rival.x

    const upPlayer = petSelectedObject.y
    const downPlayer = petSelectedObject.y + petSelectedObject.height
    const rightPlayer = petSelectedObject.x + petSelectedObject.width
    const leftPlayer = petSelectedObject.x
    
    if(
        downPlayer < upRival ||
        upPlayer > downRival ||
        rightPlayer < leftRival ||
        leftPlayer > rightRival
    ) {
        return
    }

    stopMovement()
    clearInterval(interval)
    console.log('A collision was detected');
    enemyId = rival.id
    sectionSelectionOfAttack.style.display = "flex"
    sectionViewMap.style.display = 'none'
    selectPetRival(rival)
}

window.addEventListener('load', startGame)