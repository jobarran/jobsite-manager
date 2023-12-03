
export const getSeniority = (startDate:string) => {


function parseDate(dateString:any) {
  const parts = dateString.split('-');
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

const start = parseDate(startDate);
const end = new Date();

const timeDifference = end.getTime() - start.getTime();

const yearsDifference = timeDifference / (1000 * 3600 * 24 * 365.25);

  // Round down to the nearest whole number
  const years = Math.floor(yearsDifference);
  if ( years < 1 ) {
    return "<1"
  }
  return years;
  
}