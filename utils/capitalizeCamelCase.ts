

export const capitalizeCamelCase = (input: string) => {

    const words = input.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');

}