function createImageSlider(product, newImageSection) {
  const newImage = document.createElement('img');
  const prevButton = document.createElement('button');
  const nextButton = document.createElement('button');
  const dotContainer = document.createElement('div');
  const favButton = document.createElement('button');


  let imageIndex = 0;
  newImage.src = product.images[imageIndex];
  prevButton.innerText = '<';
  nextButton.innerText = '>';
  favButton.innerText = 'Add to favourite';


  prevButton.classList.add('prev-btn');
  nextButton.classList.add('next-btn');
  dotContainer.classList.add('dot-container');
  favButton.classList.add('favourite-btn');


  prevButton.addEventListener('click', previousImage);
  nextButton.addEventListener('click', nextImage);
  favButton.addEventListener('click', favouriteButton);
  createDotsForImages();

  let dotArr = Array.from(dotContainer.childNodes);
  dotArr[0].classList.add('active');

  function createDotsForImages() {
    for (let i = 0; i < product.images.length; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dotContainer.append(dot);
      dot.addEventListener('click', () => {
        newImage.src = product.images[i];
        dotArr.forEach((elem) => elem.classList.remove('active'));
        dotArr[i].classList.add('active');
      });
    }
  }

  function previousImage() {
    if (imageIndex === 0) {
      imageIndex = product.images.length - 1;
      newImage.src = product.images[imageIndex];
      dotArr[imageIndex].classList.add('active');
      dotArr[0].classList.remove('active');
    } else {
      imageIndex -= 1;
      newImage.src = product.images[imageIndex];
      dotArr[imageIndex].classList.add('active');
      dotArr[imageIndex + 1].classList.remove('active');
    }
  }

  function nextImage() {
    if (imageIndex === product.images.length - 1) {
      imageIndex = 0;
      newImage.src = product.images[imageIndex];
      dotArr[imageIndex].classList.add('active');
      dotArr[product.images.length - 1].classList.remove('active');
    } else {
      imageIndex += 1;
      newImage.src = product.images[imageIndex];
      dotArr[imageIndex].classList.add('active');
      dotArr[imageIndex - 1].classList.remove('active');
    }
  }

  function favouriteButton(e) {
    e.preventDefault();
    let data = product

    fetch('http://localhost:3000/favourites', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Favourite Added: ", data);
      })
      .catch((error) => {
        console.error("Error:", error)
        alert('Product is already in favourites.');
      });
  }


  newImageSection.append(newImage, prevButton, nextButton, dotContainer, favButton);

  newImage.addEventListener('click', productDetails);

  function productDetails() {
    location.href = `productDetails.html?productId=${product.id}`;
  }
}
