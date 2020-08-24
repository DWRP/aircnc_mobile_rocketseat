
const TOP = document.querySelector('.top')
const BOTTOM = document.querySelector('.bottom')
const BOX = document.querySelector('.box')
let type = "px"
let DATA_COPY

document.addEventListener('copy', function(e) {

  e.clipboardData.setData('text/plain', `${DATA_COPY}`);

  e.preventDefault();
});

const COPY_BUTTON = document.querySelector('.copy')

COPY_BUTTON.addEventListener('click',()=>{
    DATA_COPY = BOX.style.cssText.split(';')
    
    DATA_COPY = DATA_COPY.filter(item=>!(item.includes('width')) && !(item.includes('height')))
    DATA_COPY = DATA_COPY.join(';\n')

    document.execCommand('copy')
    alert('CSS copied success')

})

document.getElementsByName(setSelector(type))[0].classList.toggle('active')

document.querySelector(".max-size").innerHTML = "(Max box height: 268px)"

const SIZES = Array.prototype.slice.call(document.getElementsByClassName('size_input'))

SIZES.forEach(input=>{
    input.addEventListener('keyup',({target})=>{
        if(target.name === "width"){
            BOX.style.width = `${target.value}px`
        }else{
            BOX.style.height = `${target.value}px`
        }
    })
})

function setSelector(bt_type){
    if(bt_type==="px"){
        return "_pixel"
    }
    else if(bt_type==="%"){
        return "_percent"
    }else{
        return "_rem"
    }
}

function changeType(bt_type){
    if(document.getElementsByName(setSelector(type))[0].classList.contains('active')){
        document.getElementsByName(setSelector(type))[0].classList.toggle('active')
    }
    type = bt_type

    BOX.style.borderTopLeftRadius = ""
    BOX.style.borderTopRightRadius = ""
    BOX.style.borderBottomLeftRadius = ""
    BOX.style.borderBottomRightRadius = ""

    TOP.querySelector('.left').value = ""
    TOP.querySelector('.right').value = ""
    BOTTOM.querySelector('.left').value = ""
    BOTTOM.querySelector('.right').value = ""

    document.getElementsByName(setSelector(bt_type))[0].classList.toggle('active')
}

TOP.querySelector('.left').addEventListener('keyup',({target})=>{
    const value = target.value?target.value:0
    BOX.style.borderTopLeftRadius = `${value}${type}`
})
TOP.querySelector('.right').addEventListener('keyup',({target})=>{
    const value = target.value?target.value:0
    BOX.style.borderTopRightRadius = `${value}${type}`
})

BOTTOM.querySelector('.left').addEventListener('keyup',({target})=>{
    const value = target.value?target.value:0
    BOX.style.borderBottomLeftRadius = `${value}${type}`
    
})
BOTTOM.querySelector('.right').addEventListener('keyup',({target})=>{
    const value = target.value?target.value:0
    BOX.style.borderBottomRightRadius = `${value}${type}`

})

document.querySelector("body > div > div > div.box")
