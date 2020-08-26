const BUTTONS = Array.prototype.slice.call(document.querySelectorAll('button'))
const DISPLAY = document.querySelector('.display')
const INPUT = document.querySelector('input')
const CALCULATOR = new Calc()

function verify(key_value){
    if (INPUT.value.length <= 8){
        let type = CALCULATOR.checkInput(key_value)
        
        if (type === "number"){
            if(CALCULATOR.data.operator === true){
                INPUT.value = ""
                CALCULATOR.data.operator = false
            }
            
            INPUT.value += key_value
        }
        else if(type === "clear"){
            INPUT.value = CALCULATOR.checkClear(key_value,INPUT.value)
            DISPLAY.innerHTML = CALCULATOR.data.string_calc
        }
        else if(type === "operator"){
            if (CALCULATOR.data.string_calc === null){
                CALCULATOR.data.string_calc = `${INPUT.value}${key_value}`
            }else{
                CALCULATOR.data.string_calc += `${INPUT.value}`
                INPUT.value = CALCULATOR.calculate()
                CALCULATOR.data.string_calc += `${key_value}`
            }
            DISPLAY.innerHTML = CALCULATOR.data.string_calc
            
            CALCULATOR.data.operator = true
        }
        else if(type === "calc"){
            
        }
    }
}

document.addEventListener('keyup',(event)=>{
    verify(event.key)
})

BUTTONS.forEach((button) => {
    button.addEventListener('click',({target})=>{
        verify(target.innerHTML)
    })
})