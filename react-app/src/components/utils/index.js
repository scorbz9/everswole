// Parse datetime obj for header display
export const parseDate = datetime => {
    let month = datetime.getMonth() + 1
    let day = datetime.getDate()
    let year = datetime.getFullYear()

    return month + "/" + day + "/" + year;
}
