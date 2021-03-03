const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")

// Show Loading
const loading = () => {
  loader.hidden = false
  quoteContainer.hidden = true
}

//hide loading
const complete = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false
    loader.hidden = true
  }
}

// get Quote from API
//  https://api.forismatic.com/api/1.0/?method=getQuote&lang=en

const getQuote = async () => {
  loading()
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"
  const apiUrl =
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
  try {
    // const response = await fetch(proxyUrl + apiUrl).then((quote) => {
    //   console.log(quote.json())
    // })
    const response2 = await fetch(proxyUrl + apiUrl)
    const data = await response2.json()
    console.log(data)

    // if author is blank. add 'Unknown'
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown"
    } else {
      authorText.innerText = data.quoteAuthor
    }
    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote")
    } else {
      quoteText.classList.remove("long-quote")
    }
    quoteText.innerText = data.quoteText
    //Stop loader
    complete()
  } catch (error) {
    getQuote()
  }
}

// Tweet Quote
const tweetQuote = () => {
  const quote = quoteText.innerText
  const author = authorText.innerText
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`
  window.open(twitterUrl, "_blank")
}

// Event Listener
twitterBtn.addEventListener("click", tweetQuote)
newQuoteBtn.addEventListener("click", getQuote)

// on Load
getQuote()
// loading()
