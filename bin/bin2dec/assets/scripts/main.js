function converter(binary){
    let nums = binary.split('')
    let base_index = nums.length-1

    nums = nums.map((item)=>Number(item))

    return nums.reduce((preview,current)=>{

        current = (current * (2**base_index))             
        
        base_index --
        
        return current + preview
    },0)
}

window.onload = ()=>{
    const DECIMAL = document.getElementById('decimal')
    const BINARY = document.getElementById('binary')
    const AVISO = document.querySelector('.aviso')
    AVISO.className = "aviso hidden"
    
    BINARY.addEventListener('keyup',({target})=>{
        AVISO.className = "aviso hidden"
        
        let {value} = target
        
        if(value.length > 8){
            target.value = value.substring(0,8)
        }else{
            DECIMAL.value = converter(value)
        }

        if(Number(value.substring(value.length-1)) !== 1 && Number(value.substring(value.length-1)) !== 0){
            AVISO.classList.toggle('hidden')
            target.value = value.substring(0,value.length-1)
            DECIMAL.value = converter(target.value)
        }

    })
}