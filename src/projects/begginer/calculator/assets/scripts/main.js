const BUTTONS = Array.prototype.slice.call(document.querySelectorAll('button'))
const INPUT = document.querySelector('input')
const CALCULATOR = new Calc()

function verify(key_value){
    if (INPUT.value.length <= 8){
        let type = CALCULATOR.checkInput(key_value)

        if (type === "number" && CALCULATOR.data.current === null){
            INPUT.value += key_value
        }
        else if (type === "number" && CALCULATOR.data.current !== null){
            CALCULATOR.data.current = null
            INPUT.value = key_value
        }
        else if(type === "clear"){
            INPUT.value = CALCULATOR.checkClear(key_value,INPUT.value)
        }
        else if(type === "operator"){
            
            if(CALCULATOR.data.preview === null && INPUT.value !== ""){
                CALCULATOR.data.preview = INPUT.value
                INPUT.value = ""
                CALCULATOR.data.operator =  CALCULATOR.opertions[key_value]

            }else if(CALCULATOR.data.preview !== null && INPUT.value !== ""){
                CALCULATOR.data.current = INPUT.value
                INPUT.value = CALCULATOR.calculate()
                CALCULATOR.data.preview = INPUT.value
                CALCULATOR.data.operator =  CALCULATOR.opertions[key_value]
            
            }else{
                CALCULATOR.data.operator =  CALCULATOR.opertions[key_value]
            }
        }
        else if(type === "calc"){
            if(key_value === "=" && CALCULATOR.data.preview !== null){
                CALCULATOR.data.current = INPUT.value
                INPUT.value = CALCULATOR.calculate()
                CALCULATOR.data.preview = null
                CALCULATOR.data.operator = null
            }
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