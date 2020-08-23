const IFRAME = document.querySelector('.iframe')
const BACK_BUTTON = document.querySelector('.back')
const CARDS = document.querySelector('.cards')

const DATABASE = new Database()
const COMPONENTS = new Components()
let ATUAL_LEVEL = "0"

const LEVEIS = [
    {
        index :"0",
        img : "begginer.png",
        level : "begginer",
    },
    {
        index: "1", 
        img : "intermediary.png",
        level : "intermediary"
    },
    {
        index : "2", 
        img : "advanced.png",
        level: "advanced"
    }
]


function changeFrame(name){
    console.log(name)
    IFRAME.src = `./src/projects/${name}/index.html`
    IFRAME.classList.remove('hidden')
    BACK_BUTTON.classList.remove('hidden')
    CARDS.classList.add('hidden')
}

function loadLeveis(){
    CARDS.innerHTML = ""
    
    if(IFRAME.classList.contains('hidden')){
        console.log(CARDS)
        LEVEIS.map(item=>{
            console.log("entrei?")
            CARDS.innerHTML += COMPONENTS.cardLeveis(item)
        })
        BACK_BUTTON.classList.add('hidden')
    }
    else{
        IFRAME.classList.add('hidden')
        IFRAME.src = ''
        BACK_BUTTON.classList.add('hidden')
        CARDS.classList.remove('hidden')
        loadProjects(ATUAL_LEVEL)
    }

}

async function loadProjects(level){
    ATUAL_LEVEL = level
    const data = await DATABASE.readData()

    const projects = data.filter(item=>item.level === level)
    
    if(projects.length > 0){
        CARDS.innerHTML = ""
        BACK_BUTTON.classList.remove('hidden')
        projects.map(item=>{
            CARDS.innerHTML += COMPONENTS.cardProjects(item)
        })
    }else{
        BACK_BUTTON.classList.remove('hidden')
        CARDS.innerHTML = "0 projects viables in moment!!"
    }

}

async function main(){
    LEVEIS.map(item=>{
        CARDS.innerHTML += COMPONENTS.cardLeveis(item)
    })
}

main()

