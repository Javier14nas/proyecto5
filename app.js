let residuoRPBI = {
    area: '',
    tipo: '',
    peso: 0,
    registros: JSON.parse(localStorage.getItem('misResiduos')) || [],

    Total: function(tipoBuscado) {
        let suma = 0;
        for (let i = 0; i < this.registros.length; i++) {
            if (this.registros[i].tipo === tipoBuscado) {
                suma += this.registros[i].peso;
            }
        }
        return suma;
    }
};

let actualizarVista = function() {
    let lista = document.getElementById('listaResiduos');
    lista.innerHTML = '';

    for (let i = 0; i < residuoRPBI.registros.length; i++) {
        let r = residuoRPBI.registros[i];
        lista.innerHTML += `<li class="list-group-item d-flex justify-content-between"><span><strong>${r.area}</strong> (${r.tipo})</span><span>${r.peso} kg</span></li>`;
    }

    document.getElementById('totPunzo').innerText = residuoRPBI.Total('punzocortante').toFixed(2);
    document.getElementById('totPato').innerText = residuoRPBI.Total('patologico').toFixed(2);
};

document.getElementById('btnAgregarResiduo').addEventListener('click', function() {
    vaciado();
});

let vaciado = function() {
    residuoRPBI.area = document.getElementById('areaHosp').value;
    residuoRPBI.tipo = document.getElementById('tipoRPBI').value;
    residuoRPBI.peso = parseFloat(document.getElementById('pesoKg').value);

    if (residuoRPBI.area === '' || isNaN(residuoRPBI.peso) || residuoRPBI.peso <= 0) {
        alert('Llena bien los campos');
        return;
    }

    residuoRPBI.registros.push({
        area: residuoRPBI.area,
        tipo: residuoRPBI.tipo,
        peso: residuoRPBI.peso
    });

    localStorage.setItem('misResiduos', JSON.stringify(residuoRPBI.registros));
    actualizarVista();

    console.table(residuoRPBI);
    for (let atributo in residuoRPBI) {
        console.log(atributo + " : " + residuoRPBI[atributo]);
    }

    document.getElementById('areaHosp').value = '';
    document.getElementById('pesoKg').value = '';
};

document.addEventListener('DOMContentLoaded', actualizarVista);