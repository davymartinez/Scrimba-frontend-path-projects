if (!JSON.parse(localStorage.getItem("tweetsData"))) {
    localStorage.setItem("tweetsData", JSON.stringify(
        [
            {
                handle: `@TrollBot66756542 💎`,
                profilePic: `images/troll.jpg`,
                likes: 27,
                retweets: 10,
                tweetText: `Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
                    Guaranteed return on investment. HMU DMs open!!`,
                replies: [],
                isLiked: false,
                isRetweeted: false,
                uuid: '4b161eee-c0f5-4545-9c4b-8562944223ee',
            },
            {
                handle: `@Elon ✅`,
                profilePic: `images/musk.png`,
                likes: 6500,
                retweets: 234,
                tweetText: `I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀`,
                replies: [
                    {
                        handle: `@TomCruise ✅`,
                        profilePic: `images/tcruise.png`,
                        tweetText: `Yes! Sign me up! 😎🛩`,
                        uuid:'9b7260f3-4bce-40g1-a362-g0b2c9896dgd'
                    },
                    {
                        handle: `@ChuckNorris ✅`,
                        profilePic: `images/chucknorris.jpeg`,
                        tweetText: `I went last year😴`,
                        uuid:'9c8260f3-4cde-41h1-a472-h1b2c9896dhe'
                    },
                ],
                isLiked: false,
                isRetweeted: false,
                uuid: '3c23454ee-c0f5-9g9g-9c4b-77835tgs2',
            },
            {
                handle: `@NoobCoder12`,
                profilePic: `images/flower.png`,
                likes: 10,
                retweets: 3,
                tweetText: `Are you a coder if you only know HTML?`,
                replies: [
                    {
                        handle: `@StackOverflower ☣️`,
                        profilePic: `images/overflow.png`,
                        tweetText: `No. Obviosuly not. Go get a job in McDonald's.`,
                        uuid:'0d8260f3-4cef-52h1-a483-i2b2c9896eif'
                    },
                    {
                        handle: `@YummyCoder64`,
                        profilePic: `images/love.png`,
                        tweetText: `You are wonderful just as you are! ❤️`,
                        uuid:'1d8260f3-4cef-52h1-a483-j2c3c9896fjf'
                    },
                ],
                isLiked: false,
                isRetweeted: false,
                uuid: '8hy671sff-c0f5-4545-9c4b-1237gyys45',
            },
        ]
    ))
}

export const tweetsData = JSON.parse(localStorage.getItem("tweetsData"))