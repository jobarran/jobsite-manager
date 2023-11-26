interface MyObject {
    [key: string]: string | number; // Assuming keys are strings or numbers, adjust as needed
  }
  
  export const sortObjectsByProperty = (objects: MyObject[], property: string): MyObject[] => {
    return objects.sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];
  
      if (typeof valueA === "string" && typeof valueB === "string") {
        const stringA = valueA.toUpperCase();
        const stringB = valueB.toUpperCase();
  
        if (stringA < stringB) {
          return -1;
        }
        if (stringA > stringB) {
          return 1;
        }
        return 0;
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return valueA - valueB;
      } else {
        // Fallback case if the values are not both strings or numbers
        return 0;
      }
    });
  }