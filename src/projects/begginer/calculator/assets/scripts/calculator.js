class Calc{
    constructor(){
        this.resume = ["%","="]
        this.definitions = ["C","CE","←","Backspace"]
        this.operators = ["+","-","*","/","."]
        this.opertions = {
            "+" : this.sum,
            "-" : this.sub,
            "*" : this.mult,
            "/" : this.div
        }
        this.data = {
            preview : null,
            current : null,
            operator : null
        }
    }

    sum(valueA,valueB){
        return valueA + valueB
    }
    
    sub(valueA,valueB){
        return valueA - valueB
    }
    
    div(valueA,valueB){
        return valueA / valueB
        
    }
    mult(valueA,valueB){
        return valueA * valueB
    }

    checkInput(value){
        if(this.operators.includes(value)){
            return "operator"
        }
        else if(!isNaN(value)){
            return "number"
        }
        else if(this.definitions.includes(value)){
            return "clear"
        }
        else if(this.resume.includes(value)){
            return "calc"
        }
    }

    checkClear(type,data){
        if (type === "C"){
            return ""
        }
        else if(type === "CE"){
            this.data.preview = null
            return ""
        }
        else if(type === "←" || type === "Backspace"){
            return data.substring(0,data.length-1)
        }
    }
    calculate(){
        console.log(this.data.operator)
        return `${this.data.operator(Number(this.data.preview),Number(this.data.current))}`
    }
}