The wordcloud is often maligned as a visual layout. 
Raw frequencies without filtering stopwords and general loss of word context attribute to this negative stigma. 
In an attempt to provide a more insightful wordcloud, I have included a basic NLP technique to pick out action phrases in plain text. 
I'm no master in linguistics, but by using a pseudo-regex (verb, *, noun) we can detect phrases that serve as actionable highlights from a textbody. 
It's not perfect, but try it out with your own text!

This demo includes the wordcloud layout from Jason Davies and Percy Wegmann's POS tagger. 
https://www.jasondavies.com/wordcloud/
https://www.npmjs.com/package/pos