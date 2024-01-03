// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const localDSettings= {};
dayjs.locale(localDSettings);
//wait until the browser has finished rendering all the elements(DOM)
$(function () {
  //Get the current hour of the day using the dayjs library
  const PresentHour = dayjs().format('H');

  function dataEntry(){
    $('.saveBtn').on('click', function(){
      const key = $(this).parent().attr('id');
      const value = $(this).sibling('.description').val();
      localStorage.setItem(key, value);
    });

  }

  function colorByHour(){
    $('.time-block').each(function(){
      const blockHour = parseInt(this.id);
      $(this).toggleClass('past', blockHour < PresentHour);
      $(this).toggleClass('present', blockHour === PresentHour);
      $(this).toggleClass('future', blockHour > PresentHour);
    });

  }

  function restartColor(){
    $('.time-block').each(function(){
      const blockHour = parseInt(this.id);
      if (blockHour == PresentHour){
        $(this).removeClass('past future').addClass('present');
      } else if (blockHour < PresentHour){
        $(this).removeClass('future present').addClass('past');
        
      } else{
        $(this).removeClass('past present').addClass('future');
      }
    });
  }
  
  //Get user entry from local storage and set text area values for each time block.
  $('.time-block').each(function(){
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });
  
});
