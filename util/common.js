export function shortenSentence(sentence, limit){

    if(sentence.length > limit){
        return sentence.substring(0,limit) + "..."
    }

    return sentence;
}