export const BLOCK_SECTIONS = {
    pFundamentals: ['w3schools', 'freeCodeCamp', 'codeacademy', 'neetCode', 'coursera', 'geeksforgeeks', "harvardCS50"],
    dSA: ['neetCode', 'coursera', 'geeksforgeeks'],
    practiceMasSec: ['leetcode','hackerRank','codeSignal','algoExpert','interviewio'],
    note: ['personalNote', 'onlineNotes'],
    webDev: ['webDevByGoogle','githubAWDRepo', 'frontEndMasters','mdn','w3schools',],
    gameDev: ['gameDevNet','unrealEngine','unityLearn','coursera'],
    resBuild: ['resumeCom','resumeGen','balanceCareers','zety','monsterResume'],
    resTemp: ['canvaTem','simplify','template','googleDocsTemp','hloom'],
    portShow: ['githubPage','dribble','behance','carbonMade'],
    techInterview: ['hackerRank','leetcode','pramp','geeksforgeeks','interviewBit'],
    behInterview: ['interviewio','codeSignal','gainlo','pramp','indeed','theMuse'],
    intern: ['gitHubIntern','zipRecruiter','glassDoor','simplyHired','reu'],
    diverseGroup: ['colorstack','rewritingTheCode','nsbe'],
    techEvents: ['ghc','afroTech','ces','techCrunch','webSummit','googleio','microIgnite','aws','rsa','blackHat','defcon','apple'],
    profOrg: ['codepath','acm','compTIA'],
} 

export const BLOCK_IMAGES = new Set([ 
    'w3schools', 'codeacademy', 'freeCodeCamp', 'neetCode', 'acm','afroTech', 'algoExpert','anitaB','apple','aws','behance','blackHat','theBalanceCareers','canvaTem','carbonMade','cargo',
    'ces','codeacedemy','codepath','codepen','codeSignal','colorstack','compTIA','coursera','defcon', 'dribble','edX',
    'freeCodeCamp', 'frontEndMasters','gainlo','gameDevNet','geeksforgeeks','ghc','github','githubAWDRepo','gitHubIntern','githubPage','glassDoor',
    'google','googleDocsTemp','googleio','hackerRank','harvardCS50','hloom','indeed','interviewBit','interviewio','jsfiddle',
    'khanAcademy','leetcode','mdn','microIgnite','microsoftWord','mit','monsterResume','neetCode','nsbe','onlineNotes','pramp','personalNote',
    'resumeGen','resumeCom','reu','rewritingTheCode','rsa','simplyHired','simplify','techCrunch','template','balanceCareers','theMuse',
    'udacity','udemy','unityLearn','unrealEngine','w3schools','webDevByGoogle','webSummit','wix','zety','zipRecruiter',
]);

export const BLOCK_CONTENTS = await fetch('http://localhost:4000/blockData').then(res => res.json()).catch(err => console.error(err))
