/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sectors = document.getElementsByTagName("section");
let ulItem = sectors.length;
let sectorTopHeight = [];
 
function sectTopHeight() {
    const footerHeight = document.getElementById("footer").getBoundingClientRect().top + window.pageYOffset;
    for(let i = 0; i < sectors.length; i ++) {
        let topHeight = sectors[i].getBoundingClientRect().top + window.pageYOffset;
        sectorTopHeight[i] = topHeight;
        if(i + 1 == ulItem) {
            sectorTopHeight[i + 1] = footerHeight;
        }
    }
}
function handlerForActives() {
    const aTags = document.getElementsByTagName("a");
    for (let i = 0; i < sectors.length; i ++) {
        sectors[i].classList.remove("active-state");
        aTags[i].classList.remove("active");
    }
}
//Building Nav

//Populating or navbar.

function createNavItems() {
    for(let i = 0; i < sectors.length ; i++) {
        const navLi = document.getElementById("navbar__list");
//Populating Nav with anchors and labels...(creating our navbarList) w/ a for Loop
        const navItems = document.createElement("li");
        const aElement = document.createElement("a");
        const anchorLabel = sectors[i].getAttribute("data-nav");
//Labeling specific Elemts.
        aElement.classList.add("anchorLItem");
        aElement.innerHTML = anchorLabel;
        navItems.classList.add("sectorLabelItem");

        aElement.setAttribute("href", "#" + sectors[i].id);
        aElement.setAttribute("data-id", sectors[i].id);
       
//Appending/Binding nav list to list items
        navItems.append(aElement);
        navLi.append(navItems);
    
        aElement.addEventListener("click", function(event) {
            event.preventDefault(); 
            const sectionId = event.target.getAttribute("data-id");
            const sectorScrollTo = document.getElementById(sectionId);
            handlerForActives();
            sectorScrollTo.scrollIntoView({
                behavior: "smooth"
            });
        });
    }
}

function inViewPort (elem) {
    let positionView = elem.getBoundingClientRect();
    return (positionView.top >= 0);
}

function toggleActiveState() {
    for (section of sectors) {

        if (inViewPort(section)) {
            if (!section.classList.contains("active")) {
            section.classList.add("active-state");
            section.style.cssText = "background-color: linear-gradient(0deg, rgb(255, 255, 255, .1) 0%, rgb(255, 255, 255, .2) 100%)";
            }

        } else {
            section.classList.remove("active-state");
            section.style.cssText = "background-color: teal;";
        }
    }
}

createNavItems();
document.addEventListener("scroll", toggleActiveState);
sectTopHeight();


// Add class 'active' to section when near top of viewport
