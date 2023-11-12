
export const getYearsBetweenDates = (startDate:string, endDate:string) => {


// Custom date parsing function
function parseDate(dateString:any) {

  const parts = dateString.split('-');

  return new Date(parts[0], parts[1] - 1, parts[2]);
}

// Parse the start and end dates
const start = parseDate(startDate);

const end = parseDate(endDate);

const timeDifference = end.getTime() - start.getTime();


const yearsDifference = timeDifference / (1000 * 3600 * 24 * 365.25);

  // Round down to the nearest whole number
  const years = Math.floor(yearsDifference);
  return years;
  
}