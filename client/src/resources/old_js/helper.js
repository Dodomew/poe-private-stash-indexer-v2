const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
};

const getDateOfToday = () => {
    let date = new Date();
    let dateDay = date.getDate();
    let dateMonth = date.getMonth() + 1; //zero based
    let dateYear = date.getFullYear();
    return `${dateDay}_${dateMonth}_${dateYear}`;
};

const getDateOfYesterday = () => {
    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.toDateString();

    let dateDay = yesterday.getDate();
    let dateMonth = yesterday.getMonth() + 1; //zero based
    let dateYear = yesterday.getFullYear();
    return `${dateDay}_${dateMonth}_${dateYear}`;
};

module.exports = {
    capitalize,
    getDateOfToday,
    getDateOfYesterday
};
