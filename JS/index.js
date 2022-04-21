const synth = new Tone.PolySynth().toDestination();
const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
var html = '';
for (let octave = 0; octave < 2; octave++) {
    for (let i = 0; i < notes.length; i++) {
        let hasSharp = true;
        let note = notes[i]

        if (note == 'E' || note == 'B')
            hasSharp = false;

        html += `<div class='whitenote' onmousedown='noteDown(this)' onmouseup='noteUp(this, false)' onmouseleave='noteUp(this, false)' data-note='${note + (octave+4)}'>`

        if (hasSharp) {
            html += `<div class='blacknote' onmousedown='noteDown(this, true)' onmouseup='noteUp(this, true)' onmouseleave='noteUp(this, true)' data-note='${note + '#' + (octave+4)}'></div>`
        }

        html += `</div>`
    }

}


document.getElementById('container').innerHTML = html;

const noteUp = (elem, isSharp) => {
    elem.style.background = isSharp ? '#777' : 'white';
}

const noteDown = (elem, isSharp) => {
    const note = elem.dataset.note;
    // alert(note);
    elem.style.background = isSharp ? 'black' : '#ccc';
    synth.triggerAttackRelease(note, '16n');
    event.stopPropagation();
}