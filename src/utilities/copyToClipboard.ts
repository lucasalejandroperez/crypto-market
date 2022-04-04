const copyToClipboard = ( textToClipboard:string ) => {
    navigator.clipboard.writeText(textToClipboard);
}

export default copyToClipboard;