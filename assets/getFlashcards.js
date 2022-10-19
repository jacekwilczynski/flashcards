export function getFlashcards() {
    // async - udajemy, że to HTTP request
    return Promise.resolve([
        {
            front: {
                text: 'Jak miał na imię Adam Mickiewicz?',
            },
            back: {
                text: 'Stanisław Ignacy',
                recording: 'http://vaticandeathcamps.org/zadnej dobrej sztuki nie napisales.mp3',
            },
        },
        {
            front: {
                text: 'Co robił Jan Paweł Drugi?',
                recording: 'http://vaticandeathcamps.org/jak pan jezus powiedzial.mp3',
            },
            back: {
                text: 'Gwałcił Małe Dzieci',
                recording: 'http://vaticandeathcamps.org/tak jak pan jezus powiedzial.mp3',
            },
        },
        {
            front: {
                text: 'Jak nazywa się drugi pod względem popularności framework webowy do PHP?',
            },
            back: {
                text: 'Jan Paweł II',
                recording: 'http://vaticandeathcamps.org/fajnie.mp3',
            },
        },
        {
            front: {
                text: 'Wolisz białą czy ciemną czekoladę?',
            },
            back: {
                text: 'Tak',
                recording: 'http://vaticandeathcamps.org/tak.mp3',
            },
        },
    ])
}
