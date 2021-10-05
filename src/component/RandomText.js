function randQuote(array, min, max, num) {
    let Quote = []
    for (let i = 0; i < num; i++) {
        let string = ''
        for (let i = 0; i < Math.floor(Math.random() * (max - min + 1)) + min; i++) {
            string = string + array[Math.floor(Math.random() * array.length)]
        }
        Quote.push(string)
    }
    return Quote.join(' ')
}


console.log(randQuote(['ฟ', 'ห', 'ก', 'ด'], 3, 5, 20))