dataset = d3.csv("../static/data/directory/file.csv", function(d) {
    return {
        nb_col: +d.nb_col,
        txt_col: d.txt_col,
        date_col_year: new Date(+d.date_col_year, 0, 1)
    }
})

dataset.then(function(data) {
    console.log(data);
})
