
export const convertToSlug = (inputString:string) => {

    let lowercaseString = inputString.toLowerCase();
    
    let slug = lowercaseString.replace(/\s+/g, '-');

    return slug;
}