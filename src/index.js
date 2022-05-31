const gui = new dat.GUI()

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const wave = {
	axeY: canvas.height / 2,
	longueur: 0.01,
	amplitude: 4,
	frequence: -0.01
}

const strokeColor = {
	spectre: 255,
	saturation: 100,
	luminosite: 50
}

const backgroundColor = {
	rouge: 0,
	vert: 0,
	bleu: 0,
	persistance: 0.01,
	aleatoire: 1,
	frequence: 100
}

const waveFolder = gui.addFolder('Onde')
waveFolder.add(wave, 'axeY', 0, canvas.height)
waveFolder.add(wave, 'longueur', -0.01, 0.1)
waveFolder.add(wave, 'amplitude', -1, 100)
waveFolder.add(wave, 'frequence', -0.01, 1)
waveFolder.open()

const strokeFolder = gui.addFolder('Couleur du Trait')
strokeFolder.add(strokeColor, 'spectre', 0, 255)
strokeFolder.add(strokeColor, 'saturation', 0, 100)
strokeFolder.add(strokeColor, 'luminosite', 0, 100)
strokeFolder.add(backgroundColor, 'persistance', 0, 0.2)
strokeFolder.open()

const backgroundFolder = gui.addFolder('Couleur du Fond')
backgroundFolder.add(backgroundColor, 'rouge', 0, 255)
backgroundFolder.add(backgroundColor, 'vert', 0, 255)
backgroundFolder.add(backgroundColor, 'bleu', 0, 255)
backgroundFolder.add(backgroundColor, 'aleatoire', 0, 1)
backgroundFolder.add(backgroundColor, 'frequence', 0, 100)
backgroundFolder.open()


let increment = wave.frequence
let compteur = 0
function animate() {
	requestAnimationFrame(animate)
	if (backgroundColor.aleatoire > 0) {
		if (compteur % backgroundColor.frequence === 0) {
			c.fillStyle = `rgba(
				${Math.random() * 255},
				${Math.random() * 255},
				${Math.random() * 255},
				${backgroundColor.persistance})`
				compteur = 0
		}
		if (compteur > backgroundColor.frequence) {
			compteur = 0
		} else {
			compteur++
		}

	} else {
		Math.random() * 255
		c.fillStyle = `rgba(
			${backgroundColor.rouge},
			${backgroundColor.vert},
			${backgroundColor.bleu},
			${backgroundColor.persistance}
			)`

	}
	c.fillRect(0, 0, canvas.width, canvas.height)

	c.beginPath()

	c.moveTo(0, canvas.height / 2)

	for (let i = 0; i < canvas.width; i++) {
		c.lineTo(i,
			wave.axeY +
			(Math.sin(i * wave.longueur + increment)
				* wave.amplitude
				// * i
				* Math.sin(increment)
			) * 100
		)
	}

	c.strokeStyle = `hsl(
		 ${Math.abs(strokeColor.spectre * Math.sin(increment))},
	    ${strokeColor.saturation}%,
	    ${strokeColor.luminosite}%
	  )`
	c.stroke()
	increment += wave.frequence

}

animate()
