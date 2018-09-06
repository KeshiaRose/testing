(function() {
    tableau.extensions.initializeAsync().then(() => {
        loadUser();
    });
})();

function loadUser() {
    tableau.extensions.dashboardContent.dashboard.worksheets[0].getSummaryDataAsync().then(dataTable => {
        let el = document.getElementById('user');
        let field = dataTable.columns.find(column => column.fieldName === 'Username');
        let list = [];
        for (let row of dataTable.data) {
            list.push(row[field.index].value);
        }
        let username = list.filter((el, i, arr) => arr.indexOf(el) === i);
        el.innerText = username;
    });
}