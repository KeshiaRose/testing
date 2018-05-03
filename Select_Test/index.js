$(document).ready(function() {
    tableau.extensions.initializeAsync({ 'configure': configure }).then(() => {
        configure();
    });
});

function configure(payload) {
    const popupUrl = `${window.location.origin}/testing/Select_Test/config.html`;
    tableau.extensions.ui.displayDialogAsync(popupUrl, payload, { height: 150, width: 150 }).then((closePayload) => {});
}