

export const capitalizaAndAddSpaces = (inputString: string | undefined) => {

        if (inputString !== undefined ) {

            var words = inputString.split('-');
            
            // Capitalize each word and join them with spaces
            var resultString = words.map(function(word) {
                // Capitalize the first letter of each word
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(' ');
            
            return resultString;
        }        

        return ''

}