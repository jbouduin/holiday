source: http://www.staff.science.uu.nl/~gent0113/islam/addfiles/hijri_calendar.js

The javascript file contents are stored here, just in case the source goes offline.

```javascript
function gmod(n,m){

// generalized modulo function (n mod m) also valid for negative values of n

  return ((n%m)+m)%m;
}

function setdate(){

// set current calendar date and set calendar type to Gregorian

  var today = new Date( );

  document.calendar.year.value          = today.getFullYear();
  document.calendar.month.selectedIndex = today.getMonth();
  document.calendar.day.value           = today.getDate();

  document.calendar.caltype.selectedIndex = 1;

  updatecalendar();
}

function addthousandyears(){
  document.calendar.year.value = year+1000;
  updatecalendar();
}

function subtractthousandyears(){
  document.calendar.year.value = year-1000;
  updatecalendar();
}

function addhundredyears(){
  document.calendar.year.value = year+100;
  updatecalendar();
}

function subtracthundredyears(){
  document.calendar.year.value = year-100;
  updatecalendar();
}

function addtenyears(){
  document.calendar.year.value = year+10;
  updatecalendar();
}

function subtracttenyears(){
  document.calendar.year.value = year-10;
  updatecalendar();
}

function addoneyear(){
  document.calendar.year.value = year+1;
  updatecalendar();
}

function subtractoneyear(){
  document.calendar.year.value = year-1;
  updatecalendar();
}

function addonemonth(){
  if(month==12) {
    month = 0;
    document.calendar.year.value = year+1;
    }
  document.calendar.month.selectedIndex = month;
  updatecalendar();
}

function subtractonemonth(){
  if(month==1) {
    month = 13;
    document.calendar.year.value = year-1;
    }
  document.calendar.month.selectedIndex = month-2;
  updatecalendar();
}

function addtendays(){
  document.calendar.day.value = day+10;
  updatecalendar();
}

function subtracttendays(){
  document.calendar.day.value = day-10;
  updatecalendar();
}

function addoneweek(){
  document.calendar.day.value = day+7;
  updatecalendar();
}

function subtractoneweek(){
  document.calendar.day.value = day-7;
  updatecalendar();
}

function addoneday(){
  document.calendar.day.value = day+1;
  updatecalendar();
}

function subtractoneday(){
  document.calendar.day.value = day-1;
  updatecalendar();
}

function updatecalendar(){

// update calendar date and calendar type

  day=parseFloat(document.calendar.day.value);
  month=document.calendar.month.selectedIndex;
  year=parseFloat(document.calendar.year.value);
  caltype=document.calendar.caltype.selectedIndex;

  m = month+1;
  y = year;

// append January and February to the previous year (i.e. regard March as
// the first month of the year in order to simplify leapday corrections)

  if(m<3) {
    y -= 1;
    m += 12;
  }

// determine offset between Julian and Gregorian calendar

  if(y<1583) jgc = 0;

  if(y==1582) {
    if(m>10)  jgc = 10;
    if(m==10 && day<5) jgc = 0;
    if(m==10 && day>14) jgc = 10;
    if(m==10 && day>4 && day<15) {
      if(caltype==0) {
        jgc = 10;
        day += 10;
      }
      if(caltype==1) {
        jgc = 0;
        day -= 10;
      }  
    }  
  }

  if(y>1582) {
    a   = Math.floor(y/100.);
    jgc = a-Math.floor(a/4.)-2;
  }

// compute Chronological Julian Day Number (CJDN)

  cjdn = Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+day-jgc-1524;

// output calendar type (0 = Julian; 1 = Gregorian)

  if(cjdn<2299161) {
    document.calendar.caltype.selectedIndex = 0;
    jgc = 0;
  }

  if(cjdn>2299160) {
    document.calendar.caltype.selectedIndex = 1;
    a = Math.floor((cjdn-1867216.25)/36524.25);
    jgc = a-Math.floor(a/4.)+1;
  }

  b     = cjdn+jgc+1524;
  c     = Math.floor((b-122.1)/365.25);
  d     = Math.floor(365.25*c);
  month = Math.floor((b-d)/30.6001);
  day   = (b-d)-Math.floor(30.6001*month);

  if(month>13) {
    c     += 1;
    month -= 12;
  }

  month -= 1;
  year   = c-4716;

  bj     = cjdn+1524;
  cj     = Math.floor((bj-122.1)/365.25);
  dj     = Math.floor(365.25*cj);
  monthj = Math.floor((bj-dj)/30.6001);
  dayj   = (bj-dj)-Math.floor(30.6001*monthj);

  if(monthj>13) {
    cj     += 1;
    monthj -= 12;
  }

  monthj -= 1;
  yearj   = cj-4716;

// output Western calendar date

  document.calendar.day.value           = day;
  document.calendar.month.selectedIndex = month-1;
  document.calendar.year.value          = year;

// compute weekday

  wd = gmod(cjdn+1,7)+1;

// output weekday  

  document.calendar.wkday.selectedIndex = wd-1;

// output Chronological Julian Day Number

  document.calendar.julday.value = cjdn;

// output date in the Rumi calendar

  document.calendar.dayrc.value           = dayj;
  document.calendar.monthrc.selectedIndex = monthj-1;

  if(monthj<10) yearg = yearj+311;

  if(monthj>9) yearg = yearj+312;

  if(yearj<1677) document.calendar.yearrc.value = yearg;

  if(yearj>1676){

    if(yearj>1676) yearm = yearj-589;
    if(yearj>1709) yearm = yearj-588;
    if(yearj>1741) yearm = yearj-587;
    if(yearj>1774) yearm = yearj-586;
    if(yearj>1806) yearm = yearj-585;
    if(yearj>1839) yearm = yearj-584;

    if(yearj<1918 && monthj<3) yearm = yearm-1
    document.calendar.yearrc.value = yearg+" ["+yearm+"]";
  }

  if(yearj == 1677 && monthj<3) document.calendar.yearrc.value = yearg;

// compute date in non-intercalated Egyptian calendar

  ecc  = 1448638;
  ecy  = Math.floor((cjdn-ecc)/365);
  ecdn = (cjdn-ecc)-365*ecy;
  ecm  = Math.floor(ecdn/30.);
  ecd  = ecdn-30*ecm;

  ecy1 = ecy+1;
  ecy2 = ecy1-424;

// output Egyptian calendar date

  document.calendar.dayec.value           = ecd+1;
  document.calendar.monthec.selectedIndex = ecm;
  document.calendar.yearec.value          = ecy1+" ["+ecy2+"]";

  // compute date in the (intercalated) Coptic calendar

  ccc  = 1824665;
  ccd  = cjdn-ccc;
  ccqy = Math.floor(ccd/1461);
  ccd  = ccd-1461*ccqy;
  ccy  = Math.floor(ccd/365)-Math.floor(ccd/1460);
  ccd  = ccd-365*ccy;
  ccm  = Math.floor(ccd/30);
  ccd  = Math.floor(ccd-30*ccm+1);
  ccy  = 4*ccqy+ccy;
  ccyi = gmod(ccy+1,15)+1;

// output Coptic calendar date

  document.calendar.daycc.value           = ccd;
  document.calendar.monthcc.selectedIndex = ccm;
  document.calendar.yearcc.value          = ccy+" ["+ccyi+"]";

// compute date in Yazdigird calendar

  ycc  = 1952063;
  ycy  = Math.floor((cjdn-ycc)/365);
  ycdn = (cjdn-ycc)-365*ycy;
  if(ycy<375) {
    if(ycdn<245) {
      ycm = Math.floor(ycdn/30.);
      ycd = ycdn-30*ycm;
    }
    if(ycdn>244) {
      ycm = Math.floor((ycdn-5)/30.);
      ycd = ycdn-5-30*ycm;
      if(ycm>7) ycm = ycm+1;
    }
  }
  if(ycy>374) {
    ycm = Math.floor(ycdn/30);
    ycd = ycdn-30*ycm;
    if(ycm>7) ycm = ycm+1;
  }

// output Yazdegird calendar date

  document.calendar.dayyc.value           = ycd+1;
  document.calendar.monthyc.selectedIndex = ycm;
  document.calendar.yearyc.value          = ycy+1;

// set mean length and epochs (astronomical & civilian) of the tabular Islamic year  

  iyear = 10631./30.;
  epochastro = 1948084;
  epochcivil = 1948085;

// compute and output Islamic calendar date (type I)

  shift1 = 4.01/30.; // results in 2, 5, 7, 10, 13, 15, 18, 21, 24, 26 & 29 as intercalary years

  z = cjdn-epochcivil;
  cyc = Math.floor(z/10631.);
  z = z-10631*cyc;
  j = Math.floor((z-shift1)/iyear);
  iy = 30*cyc+j;
  z = z-Math.floor(j*iyear+shift1);
  im = Math.floor((z+28.5001)/29.5);
  if(im==13) im = 12;
  id = z-Math.floor(29.5001*im-29);

  document.calendar.iday1c.value           = id;
  document.calendar.imonth1c.selectedIndex = im-1;
  document.calendar.iyear1c.value          = iy;

  z = cjdn-epochastro;
  cyc = Math.floor(z/10631.);
  z = z-10631*cyc;
  j = Math.floor((z-shift1)/iyear);
  iy = 30*cyc+j;
  z = z-Math.floor(j*iyear+shift1);
  im = Math.floor((z+28.5001)/29.5);
  if(im==13) im = 12;
  id = z-Math.floor(29.5001*im-29);

  document.calendar.iday1a.value           = id;
  document.calendar.imonth1a.selectedIndex = im-1;
  document.calendar.iyear1a.value          = iy;

// compute and output Islamic calendar date (type II)   

  shift2 = 3.01/30.; // results in 2, 5, 7, 10, 13, 16, 18, 21, 24, 26 & 29 as intercalary years

  z = cjdn-epochcivil;
  cyc = Math.floor(z/10631.);
  z = z-10631*cyc;
  j = Math.floor((z-shift2)/iyear);
  iy = 30*cyc+j;
  z = z-Math.floor(j*iyear+shift2);
  im = Math.floor((z+28.5001)/29.5);
  if(im==13) im = 12;
  id = z-Math.floor(29.5001*im-29);

  document.calendar.iday2c.value           = id;
  document.calendar.imonth2c.selectedIndex = im-1;
  document.calendar.iyear2c.value          = iy;

  z = cjdn-epochastro;
  cyc = Math.floor(z/10631.);
  z = z-10631*cyc;
  j = Math.floor((z-shift2)/iyear);
  iy = 30*cyc+j;
  z = z-Math.floor(j*iyear+shift2);
  im = Math.floor((z+28.5001)/29.5);
  if(im==13) im = 12;
  id = z-Math.floor(29.5001*im-29);

  document.calendar.iday2a.value           = id;
  document.calendar.imonth2a.selectedIndex = im-1;
  document.calendar.iyear2a.value          = iy;

// compute and output Islamic calendar date (type III)   

  shift3 = 0.01/30.; // results in 2, 5, 8, 10, 13, 16, 19, 21, 24, 27 & 29 as intercalary years

  z = cjdn-epochcivil;
  cyc = Math.floor(z/10631.);
  z = z-10631*cyc;
  j = Math.floor((z-shift3)/iyear);
  iy = 30*cyc+j;
  z = z-Math.floor(j*iyear+shift3);
  im = Math.floor((z+28.5001)/29.5);
  if(im==13) im = 12;
  id = z-Math.floor(29.5001*im-29);

  document.calendar.iday3c.value           = id;
  document.calendar.imonth3c.selectedIndex = im-1;
  document.calendar.iyear3c.value          = iy;

  z = cjdn-epochastro;
  cyc = Math.floor(z/10631.);
  z = z-10631*cyc;
  j = Math.floor((z-shift3)/iyear);
  iy = 30*cyc+j;
  z = z-Math.floor(j*iyear+shift3);
  im = Math.floor((z+28.5001)/29.5);
  if(im==13) im = 12;
  id = z-Math.floor(29.5001*im-29);

  document.calendar.iday3a.value           = id;
  document.calendar.imonth3a.selectedIndex = im-1;
  document.calendar.iyear3a.value          = iy;

  // compute and output Islamic calendar date (type IV)   

  shift4 = -1.99/30.; // results in 2, 5, 8, 11, 13, 16, 19, 21, 24, 27 & 30 as intercalary years

  z = cjdn-epochcivil;
  cyc = Math.floor(z/10631.);
  z = z-10631*cyc;
  j = Math.floor((z-shift4)/iyear);
  iy = 30*cyc+j;
  z = z-Math.floor(j*iyear+shift4);
  im = Math.floor((z+28.5001)/29.5);
  if(im==13) im = 12;
  id = z-Math.floor(29.5001*im-29);

  document.calendar.iday4c.value           = id;
  document.calendar.imonth4c.selectedIndex = im-1;
  document.calendar.iyear4c.value          = iy;

  z = cjdn-epochastro;
  cyc = Math.floor(z/10631.);
  z = z-10631*cyc;
  j = Math.floor((z-shift4)/iyear);
  iy = 30*cyc+j;
  z = z-Math.floor(j*iyear+shift4);
  im = Math.floor((z+28.5001)/29.5);
  if(im==13) im = 12;
  id = z-Math.floor(29.5001*im-29);

  document.calendar.iday4a.value           = id;
  document.calendar.imonth4a.selectedIndex = im-1;
  document.calendar.iyear4a.value          = iy;

}
```
