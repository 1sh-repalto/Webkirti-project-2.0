document.addEventListener('DOMContentLoaded', function(){
  const allButtons = document.querySelectorAll('.search_button');
  const searchBar = document.querySelector('.searchBar'); // Notice the plural name
  const searchInput = document.getElementById('searchInput');
  const searchClose = document.getElementById('searchClose');

  for(let i = 0; i < allButtons.length; i++){
    allButtons[i].addEventListener('click', function(){
      searchBar.style.visibility = 'visible';
      searchBar.classList.add('open');
      this.setAttribute('aria-expanded', 'true');
      searchInput.focus();
    });
  }

  searchClose.addEventListener('click', function(){
    searchBar.style.visibility = 'hidden';
    searchBar.classList.remove('open');
    this.setAttribute('aria-expanded', 'false');
  });
});