const block = document.querySelectorAll(".case");
const mouv = document.querySelector("#mouv")
const container = document.querySelector("#container")
const lnbr = document.querySelectorAll(".listenbr");
const error = document.querySelector("#error")
const bterror = document.querySelector("#error span")
const pause = document.querySelector("#pause")
const btpause = document.querySelector("#pause #ppause")
const bouton = document.querySelectorAll("#diffi button")
const tmouv = document.querySelectorAll(".mouv")
const boutont = document.querySelectorAll("#touche button")
const precord = document.querySelector("#precord #record")

bordd = container.getBoundingClientRect().right
bordg = container.getBoundingClientRect().left
width = bordd - bordg
width2 = mouv.getBoundingClientRect().width
height2 = mouv.getBoundingClientRect().height

direction = [0, 0]

score = 0
niv = 0
diffi = [300, 200, 100, 50]

cible = 0

record = [0, 0, 0, 0]

game = false

interval = 0

histopos = []

touche = false

mode = 0

function temps() {
	if (tempo < 11) {
		clearInterval(interval)
		interval = window.setInterval("poschange()", diffi[niv]*((20 - tempo)/10))
		console.log(diffi[niv]*((20 - tempo)/10))
	}	
}

function newtable() {
	table = []
	for (let x=0; x<10; x++) {
		table.push([])
		for (let x2=0; x2<10; x2++) {
			table[x].push(0)
		}
	}	
}

for (let x=0; x<boutont.length; x++) {
	boutont[x].addEventListener("click", function() {
		if (x==0) {
			boutont[0].classList.add("on")
			boutont[1].classList.remove("on")
			mode = 0
		} else {
			boutont[1].classList.add("on")
			boutont[0].classList.remove("on")
			mode = 1
		}
	})
}

function posaléatoire() {
	pos = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
}

for (let x=0; x<bouton.length; x++) {
	bouton[x].addEventListener("click", function() {
		bouton[niv].classList.remove("on")
		niv = x
		bouton[niv].classList.add("on")
		newgame()
	})
}

function newpos() {
	block[cible].classList.remove("on")
	cible = Math.floor(Math.random() * 100)
	pos2 = [cible - Math.floor(cible / 10) * 10, Math.floor(cible / 10)]
	console.log("cible =", pos2)
	block[cible].classList.add("on")
	scorev()
}

function scorev() {
	if (score < 10) {
		lnbr[2].style.display = "flex"
		lnbr[1].style.display = "none"
		lnbr[0].style.display = "none"
		lnbr[2].style.transform = "translateY(calc(-"+score+" * 2vw))"
	} else if (score < 100) {
		lnbr[1].style.display = "flex"
		lnbr[2].style.display = "flex"
		lnbr[0].style.display = "none"
		lnbr[1].style.transform = "translateY(calc(-"+(Math.floor(score / 10))+" * 2vw))"
		lnbr[2].style.transform = "translateY(calc(-"+(score - Math.floor(score / 10)*10)+" * 2vw))"
	} else if (score < 1000) {
		lnbr[1].style.display = "flex"
		lnbr[2].style.display = "flex"
		lnbr[0].style.display = "flex"
		lnbr[0].style.transform = "translateY(calc(-"+(Math.floor(score / 100))+" * 2vw))"
		lnbr[1].style.transform = "translateY(calc(-"+(Math.floor(score - Math.floor(score / 100)*100))+" * 2vw))"
		lnbr[2].style.transform = "translateY(calc(-"+(score - Math.floor(score / 100)*100 - Math.floor(score - Math.floor(score / 100)*100))+" * 2vw))"
	}
}


function cubechange() {
	histopos.push([pos[0], pos[1]])
	newtable()
	for (x = 1; x < score + 1; x++) {
		table[histopos[histopos.length - x][1]][histopos[histopos.length - x][0]] = 1
		tmouv[x].style.left = (histopos[histopos.length - x][0] * width2)+"px"
		tmouv[x].style.top = (histopos[histopos.length - x][1] * width2)+"px"
	}
}

function poschange() {
	cubechange()
	pos[0] = pos[0] + direction[0]
	pos[1] = pos[1] + direction[1]
	
	if (pos[0] < 0 || pos[0] > 9 || pos[1] < 0 || pos[1] > 9) {
		if (score > record[niv]) {
			record[niv] = score
			precord.innerHTML = record[niv]
		}
		clearInterval(interval)
		error.classList.add("on")
		game = false
		cursor()

	} else {
		mouv.style.left = (pos[0] * width2)+"px"
		mouv.style.top = (pos[1] * height2)+"px"
		if (direction[0] != 0 || direction[1] != 0) {
			tempo++
			temps()
			console.log(direction)
		}
		if (table[pos[1]][pos[0]] == 0) {
			table[pos[1]][pos[0]] = 1
			if (pos[0] == pos2[0] && pos[1] == pos2[1]) {
				score++
				cubeplus()
				scorev()
				newpos()
				console.log(table)
				while (table[pos2[1]][pos2[0]] == 1) {
					newpos()
					console.log("error")
				}		
			}
		} else {
			if (score > [niv]) {
				record[niv] = score
				precord.innerHTML = record[niv]
			}
			clearInterval(interval)
			error.classList.add("on")
			game = false
			cursor()
		}
	}
}

document.addEventListener('keydown', function (e) {
	if (mode == 0) {
		if (e.keyCode == 37) {
			mouvG()
		}
		else if (e.keyCode == 39) {
			mouvD()
		}
		else if (e.keyCode == 38) {
			mouvH()
		}
		else if (e.keyCode == 40) {
			mouvB()
		}
	}
	if (e.keyCode == 32) {
		if (game == true) {
			clearInterval(interval)
			pause.classList.add("on")
			game = false
			cursor()
		} else {
			interval = window.setInterval("poschange()", diffi[niv])
			pause.classList.remove("on")
			game = true
			cursor()
		}
	} else if (e.keyCode == 13) {
		newgame()
	}
	if (mode == 1) {
		if (e.key == "z") {
			mouvH()
		} else if (e.key == "q") {
			mouvG()
		} else if (e.key == "s") {
			mouvB()
		} else if (e.key == "d") {
			mouvD()
		}
	}
})

function depause () {
	interval = window.setInterval("poschange()", diffi[niv])
	pause.classList.remove("on")
	game = true
	cursor()
}

btpause.addEventListener("click", depause)


function mouvG () {
	direction = [-1, 0]
}

function mouvD () {
	direction = [1, 0]
}

function mouvH () {
	direction = [0, -1]
}

function mouvB () {
	direction = [0, 1]
}

function newgame () {
	tempo = 0
	newtable()
	score = 0
	scorev()
	histopos = []
	posaléatoire()
	newpos()
	temps()
	direction = [0, 0]
	poschange()
	game = true
	cursor()
	error.classList.remove("on")
	precord.innerHTML = record[niv]
	for (x=0; x<tmouv.length;x++) {
		tmouv[x].classList.remove("on")
	}
}

bterror.addEventListener("click", newgame)

window.onload = function(){
	newgame()
}

function cubeplus() {
	tmouv[score].classList.add("on")
	cubechange()
	// tmouv[score].style.left = (histopos[histopos.length - score][0] * width2)+"px"
	// tmouv[score].style.top = (histopos[histopos.length - score][1] * width2)+"px"
	// table[histopos[histopos.length - score][1]][histopos[histopos.length - score][0]] = 1
}

function cursor() {
	if (game == true) {
		container.style.cursor = "none"
	} else {
		container.style.cursor = "initial"
	}
}