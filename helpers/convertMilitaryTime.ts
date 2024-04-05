export const convertMilitaryTime = (time) => {
const [hours, minutes] = time.split(':').map(Number);

const hours12 = (hours % 12) || 12;
const period = hours < 12 ? 'AM' : 'PM';
const formattedTime = `${hours12}:${minutes} ${period}`;

return formattedTime;
}