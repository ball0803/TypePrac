import React, { useState, useEffect } from 'react'
import Keyset from './Keyset'

const Input = (props) => {
    const { user, currentUser, addData, addTypeSpeed } = props
    // , getData, data
    const [Quote, setQuote] = useState('')
    const [IsWrongIndex, setIsWrongIndex] = useState([])
    const [CurrentText, setCurrentText] = useState([])
    const [Timer, setTimer] = useState(0)
    const [isStarted, setIsStarted] = useState(false)
    const [Wpm, setWpm] = useState(0)
    const [DelWpm, setDelWpm] = useState(0)
    const [Acc, setAcc] = useState(0)
    const [DelAcc, setDelAcc] = useState(0)
    const [Score, setScore] = useState(0)
    const [DelScore, setDelScore] = useState(0)
    const [KeyDown, setKeyDown] = useState([])
    const [Fullscreen, setFullscreen] = useState(false)
    const [Activate, setActivate] = useState(true)

    // useEffect(() => {
    //     if (user) {
    //         getData(currentUser)
    //     }
    // }, [user])

    useEffect(() => {
        const newQuote = randQuote(['ฟ', 'ห', 'ก', 'ด'], 3, 5, 20)
        setQuote(newQuote)
    }, [])

    useEffect(() => {
        if (CurrentText.length !== 0 && CurrentText[CurrentText.length - 1] !== Quote.charAt(CurrentText.length - 1)) {
            if (!IsWrongIndex.includes(CurrentText.length - 1)) {
                setIsWrongIndex([...IsWrongIndex, CurrentText.length - 1])
            }
        }
        if (CurrentText.length === Quote.length) {
            if (user) {
                // if (data.Accuracy.length === 0 || data.Accuracy) {
                //     setDelAcc(0)
                //     setDelWpm(0)
                //     setDelScore(0)
                // } else {
                //     setDelAcc(((Quote.length / 5) / (Timer / 60000)).toFixed(1) - data.Accuracy.pop())
                //     setDelWpm((((Quote.length - IsWrongIndex.length) / Quote.length) * 100).toFixed(1) - data.TypeSpeed.pop())
                //     setDelScore((1000 * (Wpm ^ 2) * (Acc / 100) ^ 2) - data.Score.pop())
                // }
            } else {
                if (Wpm === 0) {
                    setDelAcc(0)
                    setDelWpm(0)
                    setDelScore(0)
                } else {
                    setDelAcc(((((Quote.length - IsWrongIndex.length) / Quote.length) * 100) - Acc).toFixed(1))
                    setDelWpm((((Quote.length / 5) / (Timer / 60000)) - Wpm).toFixed(1))
                    setDelScore((1000 * (Wpm ^ 2) * (Acc / 100) ^ 2) - Score)
                }
            }

            setWpm(((Quote.length / 5) / (Timer / 60000)).toFixed(1))
            setAcc((((Quote.length - IsWrongIndex.length) / Quote.length) * 100).toFixed(1))
            setScore(1000 * (Wpm ^ 2) * (Acc / 100) ^ 2)


            if (user) {
                addTypeSpeed(currentUser.uid, ((Quote.length / 5) / (Timer / 60000)).toFixed(1), (((Quote.length - IsWrongIndex.length) / Quote.length) * 100).toFixed(1), 1000 * (Wpm ^ 2) * (Acc / 100) ^ 2)
            }

            setIsStarted(false)
            reset()
            // console.log(Math.floor(Timer / 1000))
        }
    }, [CurrentText])


    useEffect(() => {
        let interval = null;

        if (isStarted) {
            interval = setInterval(() => {
                setTimer((Timer) => Timer + 10)
            }, 10);
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isStarted])

    useEffect(() => {
        KeyDown.map((id) => {
            // console.log(`Key${id}`)
            document.getElementById(`Key${id}`).style.fill = '#333333'
            if (id !== "32") {
                document.getElementById(`Key${id}_T`).style.fill = '#EFEFEF'
            }

        })
    }, [KeyDown])

    useEffect(() => {
        window.addEventListener('click', function (e) {
            if (document.getElementById('quote').contains(e.target)) {
                window.addEventListener('keydown', handleKeyDown)
                window.addEventListener('keyup', handleKeyUp)
                setActivate(false)
            } else {
                window.removeEventListener('keydown', handleKeyDown)
                window.removeEventListener('keyup', handleKeyUp)
                setActivate(true)
                reset()
            }
        });
    }, [])

    const handleKeyDown = event => {
        setIsStarted(true)
        //prevent keyboard function and get keydown for keyboard
        if (event.keyCode === 9) {
            event.preventDefault()
        }
        let KeyCom = event.keyCode + getLocation(event.location)
        if (!KeyDown.includes(KeyCom)) {
            setKeyDown([...KeyDown, KeyCom])
        }

        //set text on change
        if (event.keyCode === 8) {
            setCurrentText(CurrentText => CurrentText.slice(0, CurrentText.length - 1))
        } else {
            if ((event.key).length === 1) {
                setCurrentText(CurrentText => [...CurrentText, event.key])
            }
        }

    }

    const handleKeyUp = event => {
        let KeyCom = event.keyCode + getLocation(event.location)
        setKeyDown(KeyDown.filter(e => { if (e !== KeyCom) { return e } }))
        if (event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 13 || event.keyCode === 20 || event.keyCode === 17 || event.keyCode === 18 || event.keyCode === 16) {
            document.getElementById(`Key${KeyCom}`).style.fill = '#E3E3E1'
        } else {
            document.getElementById(`Key${KeyCom}`).style.fill = '#F2F2F2'
        }
        if (KeyCom !== "32") {
            document.getElementById(`Key${KeyCom}_T`).style.fill = '#4F4B4B'
        }

    }

    function reset() {
        setCurrentText([])
        setIsWrongIndex([])
        setTimer(0)
    }

    const getLocation = l => {
        return l === 0 ? "" : l === 1 ? "_L" : "_R"
    }
    // console.log(IsWrongIndex)
    // console.log(quote)

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


    const QuoteArray = Quote.split('')
    return (
        <>
            <div className="Pratice-indicator">
                <div className="Indicator-gauges">
                    <span className="Indicator-gauges-Practice" title="Typing speed key per minute">
                        <span className="name">Speed:
                            <span className="Indicator-gaugesValue">
                                <span className="Value"> {isNaN(Wpm) ? '--' : Wpm} </span>
                                (<span className="ValueDelta-default">{isNaN(DelWpm) ? '--' : DelWpm}</span>)
                            </span>
                        </span>
                    </span>
                    <span className="Indicator-gauges-Practice" title="error, and different between average">
                        <span className="name">Accuracy:
                            <span className="Indicator-gaugesValue">
                                <span className="Value"> {isNaN(Acc) ? '--' : Acc}% </span>
                                (<span className="ValueDelta-default">{isNaN(DelAcc) ? '--' : DelAcc}</span>)
                            </span>
                        </span>
                    </span>
                    <span className="Indicator-gauges-Practice" title="Score in that calculate i don't come up with">
                        <span className="name">Score:
                            <span className="Indicator-gaugesValue">
                                <span className="Value">{isNaN(Acc) ? '--' : Score}</span>
                                (<span className="ValueDelta-default">{isNaN(DelScore) ? '--' : DelScore}</span>)
                            </span>
                        </span>
                    </span>
                </div>
                <div className="Pratice-control">
                    <div className="control-icon" onClick={() => setQuote(randQuote(['ฟ', 'ห', 'ก', 'ด'], 3, 5, 25))}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" className="svg-inline--fa fa-arrow-right fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#344154" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
                    </div>
                    <div className="control-icon" onClick={() => setFullscreen(!Fullscreen)}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="expand" className="svg-inline--fa fa-expand fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#344154" d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"></path></svg>
                    </div>
                    <div className="setting">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sliders-h" className="svg-inline--fa fa-sliders-h fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#F2F2F2" d="M496 384H160v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h336c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160h-80v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h336v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160H288V48c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16C7.2 64 0 71.2 0 80v32c0 8.8 7.2 16 16 16h208v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h208c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16z"></path></svg>
                        <span>Setting...</span>
                    </div>
                </div>
            </div>
            <div className="TextBox">
                <div id='quote' className='quote'>
                    {QuoteArray.map((letter, i) => {
                        const letterFormat = letter === ' ' ? '␣' : letter
                        return i === CurrentText.length ? <span id='current' className='current' style={{ color: 'white', backgroundColor: Activate ? 'gray' : 'black' }}>{letterFormat}</span> :
                            IsWrongIndex.includes(i) && letter === CurrentText[i] ? <span className='wrong' style={{ color: '#EAC531', backgroundColor: '#FAEED3' }}>{letterFormat}</span> :
                                CurrentText[i] === undefined ? <span className='not reach' style={{ color: 'grey' }}>{letterFormat}</span> :
                                    letter === CurrentText[i] ? <span className='correct' style={{ color: '#B8D358' }}>{letterFormat}</span> :
                                        <span className='wrong' style={{ color: '#D84E4E', backgroundColor: '#FBD9D9' }}>{letterFormat}</span>
                    })
                    }
                </div>
                <div className="startIndicator" style={{ display: Activate ? 'block' : 'none' }}>Click to start</div>
            </div>
            <Keyset />
        </>

    )
}

export default Input
