// Parse datetime obj for header display on split views
export const parseDate = datetime => {
    let month = datetime.getMonth() + 1
    let day = datetime.getDate()
    let year = datetime.getFullYear()

    return month + "/" + day + "/" + year;
}

// Weekday array for indexing into on split views
export const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
