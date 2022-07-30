const crusher = new Tone.BitCrusher(4).toDestination();
const synth = new Tone.Synth().connect(crusher);
const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
var html = '';
for (let octave = 0; octave < 2; octave++) {
    for (let i = 0; i < notes.length; i++) {
        let hasSharp = true;
        let note = notes[i]

        if (note == 'E' || note == 'B')
            hasSharp = false;

        html += `<div class='whitenote' onmousedown='noteDown(this)' onmouseup='noteUp(this, false)' onmouseleave='noteUp(this, false)' data-note='${note + (octave + 1)}'>`

        if (hasSharp) {
            html += `<div class='blacknote' onmousedown='noteDown(this, true)' onmouseup='noteUp(this, true)' onmouseleave='noteUp(this, true)' data-note='${note + '#' + (octave + 1)}'></div>`
        }

        html += `</div>`
    }

}

const distortion = new Tone.Distortion(0.5).toDestination();
const feedbackDelay = new Tone.FeedbackDelay(0.5, 0.75).toDestination();
const filter = new Tone.Filter(1000, "lowpass").toDestination();
filter.frequency.rampTo(50, 1);
synth.connect(distortion);
synth.connect(feedbackDelay);
synth.connect(filter);



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

