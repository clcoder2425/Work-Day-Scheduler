// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements in the html.

const localDSettings = {};
dayjs.locale(localDSettings);
//wait until the browser has finished rendering all the elements(DOM)
$(function () {
  //Get the current hour of the day using the dayjs library
  const PresentHour = dayjs().format('H');

  function dataEntry() {
    $('.saveBtn').on('click', function () {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });

  }

  function colorByHour() {
    $('.time-block').each(function () {
      const timeBlock = parseInt(this.id);
      $(this).toggleClass('past', timeBlock < PresentHour);
      $(this).toggleClass('present', timeBlock === PresentHour);
      $(this).toggleClass('future', timeBlock > PresentHour);
    });

  }

  function restartColor() {
    $('.time-block').each(function () {
      const timeBlock = parseInt(this.id);
      if (timeBlock == PresentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (timeBlock < PresentHour) {
        $(this).removeClass('future present').addClass('past');

      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  //Get user entry from local storage and set text area values for each time block.
  $('.time-block').each(function () {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  function refreshTime() {

    const date = $('#date');
    const time = $('#time');
    const day = dayjs().get('date');
    const month = dayjs().format('MMMM');
    const year = dayjs().format('YYYY');
    //Determing the ordinal value for each day
    const nthNumber = (number) => {
      return number > 0
        ? ["th", "st", "nd", "rd"][
            (number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10
          ]
        : "";
    };
    const presentDate = `${month} ${day}${nthNumber(day)}, ${year}`;
    const presentTime = dayjs().format('hh:mm:ss A');
    date.text(presentDate);
    time.text(presentTime);
  }

  colorByHour();
  dataEntry();
  restartColor();
  setInterval(refreshTime, 1000);
});
