const StatesUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
const StateInput = $('[name = state]')
const CityInput = $('[name = city]')
let bolRes = false
const ufs = fetch(StatesUrl).then(async(res)=>await res.json())
const objPost = {
    data:[]
}
const changeState = () => {
    StateInput.change(async(e)=> {

        CityInput.prop('disabled','true')
        CityInput.html('')
        val = StateInput.val()
        const city = await (await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${val}/distritos`).catch(e=>{
            console.log(e)
            return CityInput.addClass('is-invalid')
        })).json()
        await city.forEach(element => {
            const CityId = element.id
            const name = element.nome
            CityInput.append(`<option value="${CityId}">${name}</option>`)
        })
        CityInput.removeAttr('disabled')
        
    })
}
const resStates = (width) => {
    if(width < 1250)
        bolRes = true
    else bolRes = false
    init(bolRes)
}
    const init = async(boll)=> {
        StateInput.html('<option value="undefined">Selecione o estado</option>')
        if(boll)
            StateInput.html('<option value="undefined">Estado</option>')
        uf = await ufs

        uf.forEach(element => {
            const StatesName = element.nome
            const StatesUf = element.sigla
            if(boll){
                return StateInput.append(`<option value = ${StatesUf}> ${StatesUf}</option>`)}
             StateInput.append(`<option value = ${StatesUf}> ${StatesName}</option>`)

        });
        
    }
const submit = ()=> {
    $('form').submit(e=> {
        e.preventDefault()
        if(objPost.data.length <= 0)
            $('.items-grid li').each((index,element)=>{ $(element).addClass('err')})
        const inputs = $('.form-control').each((index,element)=> {
            const el = $(element)
            const val = el.val()
            if(!val) 
                return el.addClass('is-invalid')
            el.removeClass('is-invalid')

            console.log()
        })
    })
}
    $(document).ready(()=> {
        changeState()
        resize(resStates)
        submit()

})

$('.items-grid li').each(async(index,element)=> {
    console.log(element)
    $(element).click(()=> {
            console.log(element)
            let classBolean = $(element).hasClass('Clicked')
            let data = element.dataset
            let index = objPost.data.indexOf(data)
            if(!classBolean && index == -1){
                objPost.data.push(data)
                $(element).addClass('Clicked')
            }
            else{
                $(element).removeClass('Clicked')
                console.log(index)
                if(index > -1)
                    objPost.data.splice(index-1,1)
            }
        console.log(objPost)
    })
})