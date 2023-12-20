const images = document.querySelectorAll(".image");
const wrapper = document.querySelector(".wrapper");
const imagesAndChilds = [];

const animationoptions = {
    duration: 850,
    easing: "ease-in-out",
    fill: "forwards"
};

let position = 0;

wrapper.addEventListener(
    "wheel",
    ($event) => {
        $event.preventDefault();
        if ($event.deltaY > 0) {
            position++;
        } else {
            position--;
        }
        imagesAndChilds.forEach((element, index) => {
            setTransfrom(element, baseRotation * (index + position));
        });
    },
    { passive: false }
);

images.forEach((parent) => {
    const child = parent.querySelector("img");
    imagesAndChilds.push({ parent, child });
});

const baseRotation = 360 / imagesAndChilds.length;

imagesAndChilds.forEach((element, index) => {
    setTransfrom(element, baseRotation * index, true);
    animateImg(element.child, index !== 0);
});

function setTransfrom(element, deg, noAnimation = false) {
    if (noAnimation) {
        element.parent.style.transform = `rotate(${deg}deg)`;
    } else {
        element.parent.animate(
            {
                transform: `rotate(${deg}deg)`
            },
            animationoptions
        );
        animateImg(element.child, deg % 360);
    }
}

function animateImg(img, inactive) {
    if (inactive) {
        img.animate(
            {
                transform: `scale(0.7)`,
                opacity: 0.9
            },
            animationoptions
        );
    } else {
        img.animate(
            {
                transform: `scale(1)`,
                opacity: 1
            },
            animationoptions
        );
    }
}
