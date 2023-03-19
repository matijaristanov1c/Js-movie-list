window.addEventListener('load', init);
var niz_za_localstorage
var filmovi_div;
var rez;
var racun_greska = document.getElementById('racun_greska');
var za_racunanje = document.getElementById('za_racunanje')
var a = Math.floor(Math.random() * 11)
var b = Math.floor(Math.random() * 11)
var forma = document.getElementById('forma')

var svi_filmovi = [
    {
        'id':1,
        'naziv':'The grey',
        'zanr':'Action',
        'reziser':'Joe Carnahan',
        'glavnaUloga':'Liam Neeson',
        'imdb': 6.8,
        'godina':2011
    },
    {
        'id':2,
         'naziv':'Matrix',
         'zanr':'Action',
         'reziser':'Lana Wachowski',
         'glavnaUloga':'Lilly Wachowski',
         'imdb':8.7,
         'godina':1999
    },
    {
        'id':3,
        'naziv':'Mask',
        'zanr':'Drama',
        'reziser':'Jim Carrey',
        'glavnaUloga':'Olivier Polge',
        'imdb':8.1,
        'godina': 1994  
    }
]

function init()
{

    niz_za_localstorage = JSON.parse(localStorage.getItem('filmovi'))

    if(niz_za_localstorage == null)
    {
        niz_za_localstorage = svi_filmovi
    }
    localStorage.setItem('filmovi', JSON.stringify(niz_za_localstorage));
    filmovi_div = document.getElementById('filmovi')
    filmovi_div.innerHTML = ""
    napravi_tabelu(niz_za_localstorage);
    forma = document.getElementById('forma')
    forma.addEventListener('submit', proveri_film);
    za_racunanje.addEventListener('submit', za_proveru)
    zadatak_tajmer.className = "sakriji"

}

function za_proveru_filmova()
{
    var id = document.getElementById('id').value;
    var naziv = document.getElementById('naziv').value;
    var zanr = document.getElementById('zanr').value;
    var reziser = document.getElementById('reziser').value;
    var glavnaUloga = document.getElementById('glavnaUloga').value;
    var imdb = document.getElementById('imdb').value;
    var godina = document.getElementById('godina').value;
    console.log(id,naziv,zanr,reziser,glavnaUloga,imdb,godina);
    svi_filmovi = JSON.parse(localStorage.getItem('filmovi'))
    for(var i=0; i<svi_filmovi.length; i++)
    {
        if(svi_filmovi[i].id == id)
        {
            var id_error = document.getElementById('id_error')
            id_error.innerText = "ID vec postoji"
            return false;
        }
    }

    if(naziv.length < 3)
    {
        var naziv_error = document.getElementById('naziv_error')
        naziv_error.innerText ="Naziv mora sadrzati vise od 2 karaktera"
        return false;
    }

    var tipovi_zanrova = ['akcija','drama','triler','komedija']
    
    zanr = zanr.toLowerCase()
    var zanr_error = document.getElementById('zanr_error')
    if(zanr != tipovi_zanrova[0] && zanr != tipovi_zanrova[1] && zanr != tipovi_zanrova[2] && zanr != tipovi_zanrova[3])
    {
        zanr_error.innerText = "Mora biti akcija drama triler ili komedija";
        return false;
    }

    if(reziser.indexOf(' ') <=0 || glavnaUloga.indexOf(' ') <= 0 )
    {
        var space_error = document.getElementById('space_error_reziser');
        var space_error_glavna = document.getElementById('space_error_glavna');
        space_error.innerText = "Mora sadrzati razmak";
        space_error_glavna.innerText  = "Mora sadrzati razmak";
        return false;
    }
    if(imdb < 1 || imdb > 10)
    {
        var imdb_error = document.getElementById('imdb_error')
        imdb_error.innerText = "IMDB mora biti izmedju 1 i 10"
        return false;
    }
    if(godina > 2022)
    {
        var godina_error = document.getElementById('godina_error')
        godina_error.innerText = "Godina ne moze biti veca od 2022"
        return false;
    }
    return true
}


function proveri_film(e)
{
    e.preventDefault();
    console.log('Iz proveri film');

    var nesto = za_proveru_filmova()
    console.log("OVDE PISE NESTO",nesto)
    if(nesto == false)
    {
        zadatak_tajmer.className = "sakriji"
        console.log("DESILA SE GRESKA");
        return false
    }
    za_proveru_filmova();
    zadatak_tajmer.className = "prikazi"
    var za_a = document.getElementById('za_a')
    var za_b = document.getElementById('za_b')
    var znak = ["+","-","*","/"];
    var za_znak = document.getElementById('znak');
    var random_znak = Math.floor(Math.random() * znak.length);
    var znak_operacije
    if(random_znak == 0)    
    {
        rez = sabiranje(a,b)
        znak_operacije = "+"
    }
    else if(random_znak == 1)
    {
        rez = oduzimanje(a,b)
        znak_operacije = "-"
    }
    else if(random_znak == 2)
    {
        rez = mnozenje(a,b)
        znak_operacije = "*"
    }
    else{
        rez = deljenje(a,b)
        znak_operacije = "/"
    }
    
    za_a.innerText = a;
    za_znak.innerText = znak_operacije;
    za_b.innerText = b;
    racun_greska.innerText = "";
}

function za_proveru(e)
{
    e.preventDefault();
    var korisnikov_racun = document.getElementById('korisnikov_racun').value;
    if(korisnikov_racun != rez)
    {
        racun_greska.innerText = "Greska"
    }
    else if(za_proveru_filmova() == false)
    {
        console.log("Greska se desila za proveru")
    }
    else{
        napravi_film();
    }
}



function napravi_film()
{
    var id = document.getElementById('id').value;
    var naziv = document.getElementById('naziv').value;
    var zanr = document.getElementById('zanr').value;
    var reziser = document.getElementById('reziser').value;
    var glavnaUloga = document.getElementById('glavnaUloga').value;
    var imdb = document.getElementById('imdb').value;
    var godina = document.getElementById('godina').value;
    var dodaj_film = {
        'id':id,
        'naziv':naziv,
        'zanr':zanr,
        'reziser':reziser,
        'glavnaUloga':glavnaUloga,
        'imdb':imdb,
        'godina':godina
    }
    svi_filmovi.push(dodaj_film)
    console.log('Svi filmovi ', svi_filmovi)
    var tabela_za_upis = document.getElementById('tabela')
    console.log(tabela_za_upis);
    var dodaj_red = document.createElement('tr')
    var dodaj_vrednosti = [id,naziv,zanr,reziser,glavnaUloga,imdb,godina]
    for(var i=0; i<dodaj_vrednosti.length; i++)
    {
        var td_za_upis = document.createElement('td');
        td_za_upis.innerText = dodaj_vrednosti[i]
        td_za_upis.className = "napravi_border"
        dodaj_red.appendChild(td_za_upis)
    }
    tabela_za_upis.append(dodaj_red)
    localStorage.setItem('filmovi', JSON.stringify(svi_filmovi));
}

function sabiranje(a,b)
{
    return a+b
}
function oduzimanje(a,b)
{
    return a-b
}
function mnozenje(a,b)
{
    return a * b
}
function deljenje(a,b)
{
    return parseInt(a/b);
}

function napravi_tabelu(niz_za_localstorage)
{
    var tabela = document.createElement('table')
    tabela.id = "tabela"
    var nazivi_kolona = ["ID","Naziv","Zanr","reziser","Glavna uloga", "IMDB", "godina"];
    var napravi_tr = document.createElement('tr')
    for (const kolona_u_tabeli of nazivi_kolona) {
        var napravi_th = document.createElement('th')
        napravi_th.innerText = kolona_u_tabeli;
        napravi_th.className = "napravi_border";
        napravi_tr.appendChild(napravi_th)
    }
    tabela.appendChild(napravi_tr)
    for(var i=0; i<niz_za_localstorage.length; i++)
    {
        var novi_red = document.createElement('tr')
        novi_red.id = "novi_red"
        var vrednosti_za_td = [niz_za_localstorage[i].id, niz_za_localstorage[i].naziv, niz_za_localstorage[i].zanr, niz_za_localstorage[i].reziser, niz_za_localstorage[i].glavnaUloga, niz_za_localstorage[i].imdb, niz_za_localstorage[i].godina]
        for(var j=0; j<vrednosti_za_td.length; j++)
        {
            var novi_td = document.createElement('td')
            novi_td.id = 'novi_td'
            novi_td.innerText = vrednosti_za_td[j]
            novi_td.className = "novi_td"
            novi_red.appendChild(novi_td)
        }
        novi_red.addEventListener('click', oboji_red)
        tabela.appendChild(novi_red)
    }
    var tab = document.getElementById('filmovi');
    tab.appendChild(tabela)
}


var za_oboji_red = 0;
function oboji_red(e){
    var meta = e.target;
    za_oboji_red++;
    if(za_oboji_red % 2 == 0)
    {
        meta.style.backgroundColor = "white"
    }
    else
    {
        meta.style.backgroundColor = "gray";
    }
}