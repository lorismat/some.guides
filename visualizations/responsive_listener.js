const mediaQuery = window.matchMedia('(min-width: 768px)') 
function handleTabletChange(e) {

    if (e.matches) {
        console.log("width >= 768px");
    } else {
        console.log("width < 768px");

    }
}

mediaQuery.addListener(handleTabletChange)
handleTabletChange(mediaQuery)
