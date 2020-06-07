const StatesUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
const StateInput = $('[name = state]')
const CityInput = $('[name = city]')
const ItenInput = $('#itensInput')
const Loading = $('.loading')
let bolRes = false
const ufs = fetch(StatesUrl).then(async(res)=>await res.json())
const objPost = {
    iten : []

}
const changeState = () => {
    StateInput.change(async(e)=> {
        CityInput.prop('disabled','true')
        CityInput.html('<option value="undefined">Selecione a cidade</option>')
        val = StateInput.val()
        const city = await (await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${val}/distritos`).catch(e=>{
            return CityInput.addClass('is-invalid')
        })).json()
        await city.forEach(element => {
            const name = element.nome
            CityInput.append(`<option value="${name}">${name}</option>`)
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
            $('.form-control').each((index,element)=> {
                const el = $(element)
                const val = el.val()
                if(!val) {
                    e.preventDefault()
                    el.addClass('is-invalid')
                    return 
                }
                console.log(val)
                if(CityInput.val().length <= 0){
                    e.preventDefault()
                    return $('.items-grid li').each((index,element)=>{ $(element).addClass('err')})
                }
                if(objPost.iten.length <= 0){
                    e.preventDefault()
                    return $('.items-grid li').each((index,element)=>{ $(element).addClass('err')})
                
                }
            Loading.addClass('d-flex')
            el.removeClass('is-invalid')
            $('.items-grid li').each((index,element)=> $(element).removeClass('err'))
            const data = element.dataset.name
            ItenInput.val(Array(objPost.iten))

        })

    })
}

$('.items-grid li').each(async(index,element)=> {
    $(element).click(()=> {
        $(element).toggleClass('Clicked')
        const elementId = element.dataset.id
        const index = objPost.iten.indexOf(elementId)
        let filter
        if(index > -1){
            filter = objPost.itens.filter(filterElement=> elementId != filterElement)
            Array(objPost.iten) = Array(filter)
        }
        else objPost.iten.push(elementId)


    })
})


$(document).ready(()=> {
    changeState()
    resize(resStates)
    submit()

})