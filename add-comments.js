function addComments (newArticle) {
    const modalTriggerButton = document.createElement('button');
    modalTriggerButton.classList.add('myBtn');
    modalTriggerButton.innerText = 'Open comment section';

    modalTriggerButton.addEventListener('click', () => {
      event.preventDefault();

      const modalContainer = document.createElement('div');
      modalContainer.classList.add('modal')

      const theModal = document.createElement('div');
      theModal.classList.add('modal-content');
      const closingBtn = document.createElement('span')
      closingBtn.innerText = "x"
      closingBtn.classList.add('close');
      const modalContent = document.createElement('p');
      modalContent.textContent = 'Product comments:';
      const newform = document.createElement('form');
        const newInput = document.createElement('input');
        const newButton = document.createElement('button');
        newInput.classList.add('input');
        newButton.classList.add('comment-button');
        newButton.innerText = 'Add comment';
        newform.append(newInput, newButton);

        modalContent.append(newform);

        newButton.addEventListener('click', () => {
          event.preventDefault();
          const newComment = document.createElement('div');
          const commentText = document.createElement('p');
          commentText.innerText = newInput.value;
          newInput.value = ' ';

          
          newComment.append(commentText);
          newCommentList.append(newComment);
        })

        const newCommentList = document.createElement('div');
       
      modalContainer.append(theModal);
      theModal.append(modalContent, closingBtn, newCommentList);
      document.body.append(modalContainer);
      

      modalTriggerButton.onclick = function () {
        modalContainer.style.display = "block";
      }

      closingBtn.onclick = function () {
        modalContainer.style.display = "none";
      }

      window.onclick = function (event) {
        if(event.target == modalContainer) {
          modalContainer.style.display = "none";
        }
      }
    })

    newArticle.append(modalTriggerButton);
    }

    